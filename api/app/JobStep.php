<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

class JobStep extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'job_step';

    protected $fillable = [
        'job_id',
        'name',
        'sequence'
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function job()
    {
        return $this->belongsTo('App\Job');
    }

    public function job_step_candidate()
    {
        return $this->hasMany('App\JobStepCandidate');
    }

    public function job_step_candidate_active()
    {
        return $this->hasMany('App\JobStepCandidate')->where('check',false);
    }

}
