<?php

namespace App\Services\Contracts;

interface ICityService
{
    public function findAll($modelFilters);
    public function findById($id);
    public function add($data);
    public function update($id, $data);
    public function remove($id);
}
