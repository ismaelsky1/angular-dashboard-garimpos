<?php

namespace App\Services;

use DB;
use Exception;
use Illuminate\Http\Response;
use App\Services\Contracts\ICompanyService;
use App\Repositories\Contracts\ICompanyRepository;
use App\Repositories\Contracts\IUserRepository;
use App\Services\Contracts\IMailService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CompanyService implements ICompanyService
{
    private $repo;
    private $repoUser;
    private $serviceMail;

    public function __construct(ICompanyRepository $repo, IUserRepository $repoUser, IMailService $serviceMail)
    {
        $this->repo = $repo;
        $this->repoUser = $repoUser;
        $this->serviceMail = $serviceMail;
    }

    public function findAll($modelFilters)
    {
        return $this->repo->findAll($modelFilters);
    }

    public function findById($id)
    {
        return $this->repo->findById($id);
    }

    public function add($data)
    {
        if ($data['type'] != 'COMPANY')
            return response()->json(['message'   => 'Cadastro somente para empresas'], Response::HTTP_BAD_REQUEST);

        if ($this->repoUser->userExists($data['email'], $data['type']))
            return response()->json(['message'   => 'Usuário já cadastrado!'], Response::HTTP_BAD_REQUEST);

        DB::beginTransaction();
        try {
            if ($user = $this->repoUser->add($data)) {
                $data['user_id'] = $user->id;
                if (!$company = $this->repo->add($data))
                    throw new Exception("Erro ao cadastrar novo usuário");

                $this->serviceMail->sendMail(
                    $company->email,
                    $company->name,
                    "Confirmação de cadastro",
                    "Confirme seu cadastro acessando o ",
                    "http:localhost:8000/api/user"
                );
            } else
                throw new Exception("Erro ao cadastrar novo usuário");

            DB::commit();
            return $user;
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update($id, $data)
    {
        return $this->repo->update($id, $data);
    }

    public function remove($id)
    {
        return $this->repo->remove($id);
    }
}
