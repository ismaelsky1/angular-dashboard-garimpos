<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class Occupation extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'occupation';

    protected $fillable = [
        'name',
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

}
