<?php

namespace App\Repositories\Contracts;

interface IJobStepRepository
{
    public function findAll($modelFilters);
    public function findById($id);
    public function findByJobId($id, $seq);
    public function add($data);
    public function update($id, $data);
    public function remove($id);
}
