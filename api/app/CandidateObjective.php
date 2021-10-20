<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class CandidateObjective extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'candidate_objective';

    protected $fillable = [
        'candidate_id',
        'cbo_id',
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function cbo()
    {
        return $this->belongsTo('App\Cbo');
    }

}
