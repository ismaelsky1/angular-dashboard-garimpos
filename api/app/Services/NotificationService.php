<?php

namespace App\Services;

use Exception;
use Validator;
use Illuminate\Http\Response;
use App\Services\Contracts\INotificationService;
use App\Repositories\Contracts\INotificationRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class NotificationService implements INotificationService
{
    private $repo;

    public function __construct(INotificationRepository $repo)
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
