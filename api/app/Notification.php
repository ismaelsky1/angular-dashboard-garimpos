<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

class Notification extends Model
{
    use Guid;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'notifications';

    protected $fillable = [
        'user_from_id',
        'user_to_id',
        'message',
        'read',
        'url',
    ];

    protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    public function userFrom()
    {
        return $this->belongsTo('App\User', 'user_from_id');
    }
}
