<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class Job extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'job';

    protected $fillable = [
        'company_id',
        'title',
        'range_age_start',
        'range_age_end',
        'range_weight_start',
        'range_weight_end',
        'range_height_start',
        'range_height_end',
        'salary_id',
        'work_hour_id',
        'gender',
        'human_characteristics',
        'technical_characteristics',
        'experiences',
        'observations',
        'active',
        'key_words',
        'city_id',
        'cbo_id'
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function job_step()
    {
        return $this->hasMany('App\JobStep');
    }

    public function salary()
    {
        return $this->belongsTo('App\Salary');
    }

    public function work_hour()
    {
        return $this->belongsTo('App\WorkHour');
    }

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function cbo()
    {
        return $this->belongsTo('App\Cbo');
    }

}
