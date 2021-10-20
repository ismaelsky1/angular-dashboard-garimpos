<?php

namespace App;

use App\Traits\Guid;
use App\Traits\CustomFilters;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;
use eloquentFilter\QueryFilter\ModelFilters\Filterable;

class User extends Authenticatable implements JWTSubject
{
    use Guid;
    use Notifiable;
    use SoftDeletes;
    use Filterable, CustomFilters;

    protected $keyType = 'string';
    public $incrementing = false;
    public $table = 'user';

    protected $fillable = [
        'email',
        'password',
        'verified_email_at',
        'remember_token',
        'type',
        'recovery_code'
    ];

	protected $dates = ['deleted_at'];

    private static $whiteListFilter = ['*'];

    protected $hidden = [
        'password', 'remember_token', 'token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function candidate()
    {
        return $this->hasOne('App\Candidate');
    }

    public function company()
    {
        return $this->hasOne('App\Company');
    }

    public function notificationsTo()
    {
        return $this->hasMany('App\Notification', 'user_to_id', 'id')->where('read',false);
    }

    public function notificationsFrom()
    {
        return $this->hasMany('App\Notification', 'user_from_id', 'id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        $nickname = null;
        $name = null;
        $phone = null;
        $person_id = null;

        if ($this->candidate) {
            $nickname = explode(" ", $this->candidate->name)[0];
            $name = $this->candidate->name;
            $phone = $this->candidate->cellphone;
            $person_id = $this->candidate->id;
        }

        if ($this->company) {
            $nickname = explode(" ", $this->company->name)[0];
            $name = $this->company->name;
            $phone = $this->company->cellphone;
            $person_id = $this->company->id;
        }

        return [
            'id'        => $this->id,
            'person_id' => $person_id,
            'email'     => $this->email,
            'nickname'  => $nickname,
            'name'      => $name,
            'phone'     => $phone,
            'type'      => $this->type,
        ];
    }
}
