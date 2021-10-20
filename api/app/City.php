<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class City extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'city';

    protected $fillable = [
        'code',
        'name',
        'active',
        'state_id'
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function state()
    {
        return $this->belongsTo('App\State');
    }

}
