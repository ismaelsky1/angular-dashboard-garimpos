<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

class Candidate extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'candidate';

    protected $fillable = [
        'name',
        'document',
        'email',
        'cellphone',
        'birthday',
        'street',
        'district',
        'city_id',
        'zipcode',
        'number',
        'complement',
        'reference',
        'user_id',
        'consultant_id',
        'gender',
        'nickname',
        'height',
        'weight',
        'rg',
        'rg_emitting_organ',
        'rg_issuance_date',
        'rg_state',
        'voter_title',
        'marital_status',
        'naturalness',
        'nationality',
        'cnh',
        'cnh_category',
        'ctps',
        'ctps_state',
        'pis',
        'homepage',
        'introductory_message',
        'additional_information',
        'language',
        'avatar'
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function candidate_experience()
    {
        return $this->hasMany('App\CandidateExperience');
    }

    public function candidate_objective()
    {
        return $this->hasMany('App\CandidateObjective');
    }

    public function candidate_reward()
    {
        return $this->hasMany('App\CandidateReward');
    }

    public function candidate_skill()
    {
        return $this->hasMany('App\CandidateSkill');
    }

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function subscription()
    {
        return $this->hasOne('App\Subscription');
    }



}
