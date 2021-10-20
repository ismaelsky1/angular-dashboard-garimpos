<?php

namespace App\Exceptions;

use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Response;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof UnauthorizedHttpException) {
            $preException = $exception->getPrevious();
            if ($preException instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json([
                    'success' => false,
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'TOKEN_EXPIRED'
                ], Response::HTTP_UNAUTHORIZED);
            } else if ($preException instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json([
                    'success' => false,
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'TOKEN_INVALID'
                ], Response::HTTP_UNAUTHORIZED);
            } else if ($preException instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException) {
                 return response()->json([
                    'success' => false,
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'TOKEN_BLACKLISTED'
                ], Response::HTTP_UNAUTHORIZED);
           }
            if ($exception->getMessage() === 'Token not provided') {
                return response()->json([
                    'success' => false,
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'Token not provided'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }

        if (($exception instanceof TokenExpiredException)) {
            return response()->json([
                'success' => false,
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Token has expired and can no longer be refreshed'
            ], Response::HTTP_UNAUTHORIZED);
        }

        if ($exception instanceof HttpException) {
            $message = null;
            $data = null;
            if ($ret = json_decode($exception->getMessage())) {
                if (isset($ret->data)){
                    $message = $ret->message;
                    $data = $ret->data;
                } else
                    $message = $ret;
            } else
                $message = [$exception->getMessage()];

            return response()->json([
                'success' => $exception->getStatusCode() == 200 ? true : false,
                'status' => $exception->getStatusCode(),
                'message' => $message,
                'data' => $data
            ], $exception->getStatusCode());
        }

        if ($exception instanceof Exception) {
            if ($exception->getMessage() == 'The token has been blacklisted'){
                return response()->json([
                    'success' => false,
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'TOKEN_BLACKLISTED'
                ], Response::HTTP_UNAUTHORIZED);
            }

            if ($exception->getMessage() == 'Token has expired and can no longer be refreshed'){
                return response()->json([
                    'success' => false,
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'Token has expired and can no longer be refreshed'
                ], Response::HTTP_UNAUTHORIZED);
            }

            return response()->json([
                'success' => false,
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => ['O sistema apresentou o seguinte erro: '.$exception->getMessage()],
                'data' => null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        return parent::render($request, $exception);
    }
}
