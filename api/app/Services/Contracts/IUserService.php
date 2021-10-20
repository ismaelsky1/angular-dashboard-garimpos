<?php

namespace App\Services\Contracts;

interface IUserService
{
    public function findAll($modelFilters);
    public function findById($id);
    public function findByEmail($email);
    public function findByToken($token);
    public function findByRecoveryCode($recoveryCode);
    public function add($data);
    public function update($id, $data);
    public function remove($id);

    public function verifiedEmail($hash);
}
