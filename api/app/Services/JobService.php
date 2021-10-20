<?php

namespace App\Services;

use Exception;
use Validator;
use Illuminate\Http\Response;
use App\Services\Contracts\IJobService;
use App\Repositories\Contracts\IJobRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class JobService implements IJobService
{
    private $repo;

    public function __construct(IJobRepository $repo)
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

    public function getSteps($id)
    {
        return $this->repo->getSteps($id);
    }
}
