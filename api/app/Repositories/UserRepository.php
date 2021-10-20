<?php

namespace App\Repositories;

use DateTime;
use App\User;
use App\Repositories\Contracts\IUserRepository;

class UserRepository implements IUserRepository
{
    private $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function findAll($modelFilters)
    {
        $items_per_page = 10;
		if (!empty($modelFilters->filters())) {
			$filters = $modelFilters->filters();
			if (isset($filters['items_per_page'])) {
				$items_per_page = $filters['items_per_page'];
			}
			return $this->model->filter($modelFilters)->select($this->model->getQuery()->from.'.*')->paginate($items_per_page);
		} else {
			return $this->model->paginate($items_per_page);
		}
    }

    public function findById($id)
    {
        return $this->model->find($id);
    }

    public function findByEmail($email)
    {
        return $this->model->with('candidate')->with('company')->where('email', $email)->first();
    }

    public function findByToken($token)
    {
        return $this->model->where('remember_token', $token)->first();
    }

    public function findByRecoveryCode($recoveryCode)
    {
        return $this->model->with('candidate')->with('company')->where('recovery_code', $recoveryCode)->first();
    }

    public function add($data)
    {
        // dd($data);
        $this->model->fill($data);
        // $this->model->email = $data[''];
        // $this->model->type = $data[''];
        $this->model->password = bcrypt($this->model->password);
        $this->model->save();
        return $this->model;
    }

    public function update($id, $data)
    {
        if (!$obj = $this->model->find($id))
            return null;
        $obj->fill($data);
        $obj->save();
        return $obj;
    }

    public function remove($id)
    {
        if (!$obj = $this->model->find($id))
            return null;
        return $obj->delete();
    }

    public function verifiedEmail($hash)
    {
        if (!$obj = $this->model->where('hash',$hash)->first())
            return null;

        $obj->verified_email_at = new DateTime();
        $obj->save();
        return true;
    }

    public function userExists($email, $type)
    {
        if ($obj = $this->model->where('email', $email)->where('type', $type)->first())
            return true;
        return false;
    }
}
