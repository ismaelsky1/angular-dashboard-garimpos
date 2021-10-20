<?php

namespace App\Services;

use Exception;
use Validator;
use Illuminate\Http\Response;
use App\Services\Contracts\IUserService;
use App\Repositories\Contracts\IUserRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserService implements IUserService
{
    private $repo;

    public function __construct(IUserRepository $repo)
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

    public function findByEmail($email)
    {
        return $this->repo->findByEmail($email);
    }

    public function findByToken($token)
    {
        return $this->repo->findByToken($token);
    }

    public function findByRecoveryCode($recoveryCode)
    {
        return $this->repo->findByRecoveryCode($recoveryCode);
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

    public function verifiedEmail($hash)
    {
        return $this->repo->verifiedEmail($hash);
    }
}
