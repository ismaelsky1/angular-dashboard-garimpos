<?php

namespace App\Repositories;

use App\CandidateReward;
use App\Repositories\Contracts\ICandidateRewardRepository;

class CandidateRewardRepository implements ICandidateRewardRepository
{
    private $model;

    public function __construct(CandidateReward $model)
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

    public function balance($id)
    {
        if (!$obj = $this->model->where('candidate_id', $id)->first())
            return null;

        $balanceBonus = $this->model->where('candidate_id', $id)->where('type', 'BONUS')->sum('quantity');
        $balanceCredit = $this->model->where('candidate_id', $id)->where('type', 'CREDIT')->sum('quantity');

        return ['balance' => ['CREDIT' => $balanceCredit, 'BONUS' => $balanceBonus]];
    }

    public function usableBalance($id)
    {
        $balanceBonus = $this->model->where('candidate_id', $id)->where('type', 'BONUS')->sum('quantity');
        if ($balanceBonus > 0)
            return ['type' => 'BONUS', 'balance' => $balanceBonus];

        $balanceCredit = $this->model->where('candidate_id', $id)->where('type', 'CREDIT')->sum('quantity');
        if ($balanceCredit > 0)
            return ['type' => 'CREDIT', 'balance' => $balanceCredit];

        return ['type' => null, 'balance' => 0];
    }
}
