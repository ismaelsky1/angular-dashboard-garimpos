<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class Subscription extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'subscription';

    protected $fillable = [
        'candidate_id',
        'job_id',
        'status',
        /**
         * PENDENT - Pendente,
         * ACCEPTED - Aceita,
         * IN_ANALYSIS - Em análise,
         * REJECTED - Rejeitada,
         * GIVE_UP - Candidato Desistiu
         */
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function candidate()
    {
        return $this->belongsTo('App\Candidate');
    }

    public function job()
    {
        return $this->belongsTo('App\Job');
    }

}
