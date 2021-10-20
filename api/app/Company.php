<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;


class Company extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'company';

    protected $fillable = [
        'name',
        'fantasy_name',
        'document',
        'email',
        'phone',
        'cellphone',
        'street',
        'district',
        'city_id',
        'zipcode',
        'number',
        'complement',
        'reference',
        'active',
        'user_id',
        'consultant_id',
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function city()
    {
        return $this->belongsTo('App\City');
    }

}
