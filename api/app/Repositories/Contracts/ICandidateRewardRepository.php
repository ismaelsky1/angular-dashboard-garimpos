<?php

namespace App\Repositories\Contracts;

interface ICandidateRewardRepository
{
    public function findAll($modelFilters);
    public function findById($id);
    public function add($data);
    public function update($id, $data);
    public function remove($id);

    public function balance($id);
    public function usableBalance($id);
}
