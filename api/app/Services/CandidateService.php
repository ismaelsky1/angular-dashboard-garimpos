<?php

namespace App\Services;

use DB;
use Exception;
use Illuminate\Http\Response;
use App\Services\Contracts\ICandidateService;
use App\Repositories\Contracts\ICandidateRepository;
use App\Repositories\Contracts\ICandidateRewardRepository;
use App\Repositories\Contracts\IUserRepository;
use App\Services\Contracts\IMailService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CandidateService implements ICandidateService
{
    private $repo;
    private $repoReward;
    private $repoUser;
    private $serviceMail;

    public function __construct(ICandidateRepository $repo, ICandidateRewardRepository $repoReward, IUserRepository $repoUser, IMailService $serviceMail)
    {
        $this->repo = $repo;
        $this->repoReward = $repoReward;
        $this->repoUser = $repoUser;
        $this->serviceMail = $serviceMail;
    }

    public function findAll($modelFilters)
    {
        return $this->repo->findAll($modelFilters);
    }

    public function findById($id)
    {
        $reward = $this->repoReward->balance($id);
        $candidate = $this->repo->findById($id);
        $candidate['reward_balance'] = $reward['balance'];
        return $candidate;
    }

    public function add($data)
    {
        if ($data['type'] != 'CANDIDATE')
            return response()->json(['message'   => 'Cadastro somente para candidatos'], Response::HTTP_BAD_REQUEST);


        if ($this->repoUser->userExists($data['email'], $data['type']))
            return response()->json(['message'   => 'Usuário já cadastrado!'], Response::HTTP_BAD_REQUEST);

        DB::beginTransaction();
        try {
            if ($user = $this->repoUser->add($data)) {
                $data['user_id'] = $user->id;
                if (!$candidate = $this->repo->add($data))
                    throw new Exception("Erro ao cadastrar novo candidato");

                $this->serviceMail->sendMail(
                    $candidate->email,
                    $candidate->name,
                    "Confirmação de cadastro",
                    "Confirme seu cadastro acessando o ",
                    "/api/user"
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
