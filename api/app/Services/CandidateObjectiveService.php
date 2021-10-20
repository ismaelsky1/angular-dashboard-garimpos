<?php

namespace App\Services;

use App\Services\Contracts\ICandidateObjectiveService;
use App\Repositories\Contracts\ICandidateObjectiveRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CandidateObjectiveService implements ICandidateObjectiveService
{
    private $repo;

    public function __construct(ICandidateObjectiveRepository $repo)
    {
        $this->repo = $repo;
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
        return $this->repo->add($data);
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
