<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

class JobStepCandidate extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'job_step_candidate';

    protected $fillable = [
        'job_step_id',
        'candidate_id',
        'check',
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function candidates()
    {
        return $this->hasMany('App\Candidate', 'id', 'candidate_id');
    }

}
