<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class CandidateReward extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'candidate_reward';

    protected $fillable = [
        'candidate_id',
        'type', // BONUS, CREDIT
        'quantity',
        'reward_id',
        'description'
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

}
