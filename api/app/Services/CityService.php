<?php

namespace App\Services;

use Exception;
use Validator;
use Illuminate\Http\Response;
use App\Services\Contracts\ICityService;
use App\Repositories\Contracts\ICityRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CityService implements ICityService
{
    private $repo;

    public function __construct(ICityRepository $repo)
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
