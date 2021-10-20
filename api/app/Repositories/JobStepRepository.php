<?php

namespace App\Repositories;

use App\JobStep;
use App\Repositories\Contracts\IJobStepRepository;

class JobStepRepository implements IJobStepRepository
{
    private $model;

    public function __construct(JobStep $model)
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
        return $this->model->with('job')->with('job_step_candidate.candidates.subscription')->find($id);
    }

    public function findByJobId($id, $seq)
    {
        return $this->model->where('job_id', $id)->where('sequence', $seq)->first();
    }

    public function add($data)
    {
        $nextVal = 1;
        if (isset($data['job_id']))
            $nextVal = $this->model->where('job_id', $data['job_id'])->max('sequence') + 1;

        $this->model->fill($data);
        $this->model->sequence = $nextVal;
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
