<?php

namespace App\Repositories;

use DB;
use App\Candidate;
use App\Traits\ImageUpload;
use App\Repositories\Contracts\ICandidateRepository;

class CandidateRepository implements ICandidateRepository
{
    use ImageUpload;

    private $model;

    public function __construct(Candidate $model)
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
            return $this->model
                        ->filter($modelFilters)
                        ->select($this->model->getQuery()->from.'.*')
                        ->with('candidate_experience')
                        ->with('candidate_objective.cbo')
                        ->with('candidate_reward')
                        ->with('candidate_skill')
                        ->with('city.state')
                        ->paginate($items_per_page);
        } else {
            return $this->model
                        ->with('candidate_experience')
                        ->with('candidate_objective.cbo')
                        ->with('candidate_reward')
                        ->with('candidate_skill')
                        ->with('city.state')
                        ->paginate($items_per_page);
        }
    }

    public function findById($id)
    {
        // DB::enableQueryLog();
        return $this->model
                    ->with('candidate_experience')
                    ->with('candidate_objective.cbo')
                    ->with('candidate_reward')
                    ->with('candidate_skill')
                    ->with('city.state')
                    ->with('user.notificationsTo.userFrom.company')
                    ->find($id);

		// return DB::getQueryLog();
    }

    public function add($data)
    {
        $this->model->fill($data);
        $this->model->avatar = $this->uploadBase64($data['avatar'], "Avatar do candidato");
        $this->model->save();
        return $this->model;
    }

    public function update($id, $data)
    {
        if (!$obj = $this->model->find($id))
            return null;

        if (isset($data['avatar']))
			$data['avatar'] = $this->uploadBase64($data['avatar'], "Avatar do candidato", $obj->avatar);

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
