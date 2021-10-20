<?php

namespace App\Services;

use DB;
use Exception;
use Illuminate\Http\Response;
use App\Services\Contracts\ISubscriptionService;
use App\Repositories\Contracts\ISubscriptionRepository;
use App\Repositories\Contracts\IJobRepository;
use App\Repositories\Contracts\IJobStepRepository;
use App\Repositories\Contracts\IJobStepCandidateRepository;
use App\Repositories\Contracts\ICandidateRewardRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SubscriptionService implements ISubscriptionService
{
    private $repo;
    private $repoJob;
    private $repoJobStep;
    private $repoJobStepCandidate;
    private $repoCandidateReward;

    public function __construct(
        ISubscriptionRepository $repo,
        IJobRepository $repoJob,
        IJobStepRepository $repoJobStep,
        IJobStepCandidateRepository $repoJobStepCandidate,
        ICandidateRewardRepository $repoCandidateReward)
    {
        $this->repo = $repo;
        $this->repoJob = $repoJob;
        $this->repoJobStep = $repoJobStep;
        $this->repoJobStepCandidate = $repoJobStepCandidate;
        $this->repoCandidateReward = $repoCandidateReward;
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

        $balance = $this->repoCandidateReward->usableBalance($data['candidate_id']);
        $job = $this->repoJob->findById($data['job_id']);

        $aux = $this->repo->countSubscriptions($data['job_id'], $data['candidate_id']);
        if ($aux->status == 'REJECTED')
            throw new HttpException(Response::HTTP_BAD_REQUEST, "Você não pode se candidatar a esta vaga!");

        if ($aux->status != 'GIVE_UP')
            throw new HttpException(Response::HTTP_BAD_REQUEST, "O candidato ja está inscrito nessa vaga");

        if ($balance['balance'] == 0)
            throw new HttpException(Response::HTTP_BAD_REQUEST, "Você não tem saldo suficiente para se candidatar a esta vaga!");

        if ($aux->status == 'GIVE_UP') {
            DB::beginTransaction();
            try {
                if ($susbs = $this->repo->update($aux->id, ['status' => 'PENDENT'])) {
                    // Ajusta o saldo
                    $candidateReward = [
                        "candidate_id" => $susbs->candidate_id,
                        "type" => $balance['type'],
                        "quantity" => -1,
                        "description" => 'Inscrição na vaga: '. $job->title,
                    ];
                    $this->repoCandidateReward->add($candidateReward);
                } else
                    throw new HttpException(Response::INTERNAL_SERVER_ERROR, "Erro ao cadastrar uma nova inscrição");

                DB::commit();
                return $susbs;
            } catch (HttpException $e) {
                DB::rollBack();
                throw new HttpException($e->getStatusCode(), $e->getMessage());
            }
        }

        DB::beginTransaction();
        try {
            if ($susbs = $this->repo->add($data)) {
                // Ajusta o saldo
                $candidateReward = [
                    "candidate_id" => $susbs->candidate_id,
                    "type" => $balance['type'],
                    "quantity" => -1,
                    "description" => 'Inscrição na vaga: '. $job->title,
                ];
                $this->repoCandidateReward->add($candidateReward);

                // Associa a uma estapa da vaga
                $jobStep = $this->repoJobStep->findByJobId($susbs->job_id, 1);
                $obj = [
                    'candidate_id' => $susbs->candidate_id,
                    'job_step_id' => $jobStep->id
                ];
                if (!$jobStepCandidate = $this->repoJobStepCandidate->add($obj))
                    throw new HttpException(Response::INTERNAL_SERVER_ERROR,"Erro ao associar um candidato a uma vaga");
            } else
                throw new HttpException(Response::INTERNAL_SERVER_ERROR, "Erro ao cadastrar uma nova inscrição");

            DB::commit();
            return $susbs;
        } catch (HttpException $e) {
            DB::rollBack();
            throw new HttpException($e->getStatusCode(), $e->getMessage());
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
