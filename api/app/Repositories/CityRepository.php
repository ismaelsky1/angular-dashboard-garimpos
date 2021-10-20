<?php

namespace App\Repositories;

use App\City;
use App\Repositories\Contracts\ICityRepository;

class CityRepository implements ICityRepository
{
    private $model;

    public function __construct(City $model)
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
            return $this->model->filter($modelFilters)
                               ->with('state')
                               ->select($this->model->getQuery()->from.'.*')
                               ->paginate($items_per_page);
		} else {
			return $this->model->with('state')->paginate($items_per_page);
		}
    }

    public function findById($id)
    {
        return $this->model->with('state')->find($id);
    }

    public function add($data)
    {
        $this->model->fill($data);
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
}
