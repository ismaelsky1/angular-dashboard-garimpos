<?php

namespace App\Http\Controllers;

use JWTAuth;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Requests\RegistrationFormRequest;
use App\Services\Contracts\IUserService;
use App\Services\Contracts\IMailService;

class AuthController extends Controller
{
    private $service;
    private $serviceMail;

    public $loginAfterSignUp = true;

	public function __construct(IUserService $service, IMailService $serviceMail)
    {
        $this->middleware('cors');
        $this->middleware('jwt.auth', ['except' => ['login','register','refreshToken','forgotPassword','changePassword']]);
        $this->service = $service;
        $this->serviceMail = $serviceMail;
    }

    public function login(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email'     => 'required|email|max:100',
            'password'  => 'required|min:6|max:255',
            'type'      => 'required'
        ]);

        if($validator->fails())
            return response()->json(['success' => false,'message' => $validator->errors()->all()], Response::HTTP_BAD_REQUEST);

        $credentials = $request->only('email', 'password', 'type');
        $token = null;

        if (!$user = $this->service->findByEmail($credentials['email']))
            return response()->json(['success' => false,'message' => 'Usuário não encontrado',], Response::HTTP_UNAUTHORIZED);

        if (!$token = JWTAuth::attempt($credentials))
            return response()->json(['success' => false,'message' => 'E-mail ou Senha inválidos'], Response::HTTP_UNAUTHORIZED);

        $user = $this->service->update($user->id, ['remember_token' => $token]);

        return response()->json([
            'accessToken' => $token,
            'tokenType' => 'bearer'
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ], Response::HTTP_OK);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function register(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email'     => 'required|unique:clients|max:100',
            'password'  => 'required|min:6|max:255',
            'type'      => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->all()
            ], Response::HTTP_BAD_REQUEST);
        }

        $obj = $this->service->add($data);

        if ($this->loginAfterSignUp) {
            return $this->login($data);
        }

        return response()->json([
            'success'   =>  true,
            'data'      =>  $user
        ], Response::HTTP_OK);
    }

    public function refreshToken(Request $request)
    {
        try {
            $access_token = str_replace('Bearer ', '', $request->header('Authorization'));
            if ($user = $this->service->findByToken($access_token)) {
                $token = JWTAuth::parseToken()->refresh();

                $user = $this->service->update($user->id, ['remember_token' => $token]);

                return response()->json([
                    'accessToken' => $token,
                    'tokenType' => 'bearer'
                ], Response::HTTP_OK);
            } else {
                return response()->json(['message' => 'TOKEN_INVALID'], Response::HTTP_UNAUTHORIZED);
            }
        }catch (JWTException $exception){
            return response()->json(['message' => 'TOKEN_INVALID'], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function forgotPassword($email)
    {
        if (!$user = $this->service->findByEmail($email))
            return response()->json(['success' => false,'message' => 'Usuário não encontrado',], Response::HTTP_UNAUTHORIZED);

        $code = STR::random(32);
        $this->service->update($user->id, ['recovery_code' => $code]);

        $this->serviceMail->sendMail(
            $email,
            $user->candidate->name,
            "Recuperação de Senha",
            "Acesse para a recuperação de senha",
            "/forgotPassowerd?hash=".$code,
        );

        return response()->json(['message' => 'Recuperação de senha enviado com sucesso!'], Response::HTTP_OK);
    }

    public function changePassword(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'password'          => 'required|min:6|max:255',
            'confirm_password'  => 'required_with:password|same:password|min:6|max:255',
            'recovery_code'     => 'required|exists:user'
        ]);

        if($validator->fails())
            return response()->json(['message' => $validator->errors()->all()], Response::HTTP_BAD_REQUEST);

        if (!$user = $this->service->findByRecoveryCode($data['recovery_code']))
            return response()->json(['success' => false,'message' => 'Usuário não encontrado',], Response::HTTP_UNAUTHORIZED);

        $ret = $this->service->update($user->id, ['password' => bcrypt($data['password']), 'recovery_code' => null]);

        return response()->json(['success' => true,'message' => 'Senha alterada com sucesso!',], Response::HTTP_OK);
    }
}
