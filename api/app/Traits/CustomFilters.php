<?php

namespace App\Traits;

use DateTime;
use Illuminate\Database\Eloquent\Builder;

trait CustomFilters
{
    protected $builder;

    public function where_like(Builder $builder, array $params)
    {
        if ($params['type'] == 'end')
            return $builder->whereRaw("UPPER(".$params['field'].") LIKE '%". strtoupper($params['value'])."'");

        if ($params['type'] == 'start')
            return $builder->whereRaw("UPPER(".$params['field'].") LIKE '". strtoupper($params['value'])."%'");

        if ($params['type'] == 'have')
            return $builder->whereRaw("UPPER(".$params['field'].") LIKE '%". strtoupper($params['value'])."%'");
    }

    public function _where(Builder $builder, array $params)
    {
        if (!isset($params['operator']))
            $params['operator'] = '=';

        $obj = $builder->where($params['field'], $params['operator'], $params['value']);

        if ($params['operator'] == '!=')
            $obj->orWhereNull($params['field']);

        return $obj;
    }

    public function where_null(Builder $builder, $params)
    {
        return $builder->whereNull($params);
    }

    public function where_not_null(Builder $builder, $params)
    {
        return $builder->whereNotNull($params);
    }

    public function where_exists(Builder $builder, array $params)// table, field and value
    {
        return $builder
        ->whereExists(function ($query) use ($params) {
            $query->select('id')
                  ->from($params['table'])
                  ->whereRaw($params['table'].".".$params['field']." = '".$params['value']."'");
        });
    }

    public function date_between(Builder $builder, array $params)
    {
        $dateStart = new DateTime($params['start']);
        $dateEnd = new DateTime($params['end']);
        return $builder
            ->whereDate($params['field'], '>', date_format($dateStart, 'Y-m-d'))
            ->whereDate($params['field'], '<', date_format($dateEnd, 'Y-m-d'));
    }

    public function where_between(Builder $builder, array $params)
    {
        $data = DateTime::createFromFormat('Y-m-d', $params['start']);
        if ($data && $data->format('Y-m-d') === $params['start']){
            return $builder
                ->whereDate($params['field'], '>=', date_format(new DateTime($params['start']), 'Y-m-d'))
                ->whereDate($params['field'], '<=', date_format(new DateTime($params['end']), 'Y-m-d'));
        }

        return $builder->whereBetween($params['field'], [$params['start'], $params['end']]);
    }

    public function join(Builder $builder, array $params)// table, field, value and field-condition
    {
        $master = $builder->getQuery()->from;

        $obj = $builder;
        $table = '';
        foreach ($params as $value) {
            if ($table != $value['table']) {
                $obj->join($value['table'], $master.'.'.$value['field-condition'], '=', $value['table'].'.'.$value['field']);
                $table = $value['table'];
            }
        }
        return $obj;
    }

    public function left_join(Builder $builder, array $params)// table, field, value and field-condition
    {
        $master = $builder->getQuery()->from;

        $obj = $builder;
        $table = '';
        foreach ($params as $value) {
            if ($table != $value['table']) {
                $obj->leftJoin($value['table'], $master.'.'.$value['field-condition'], '=', $value['table'].'.'.$value['field']);
                $table = $value['table'];
            }
        }
        return $obj;
    }

    public function right_join(Builder $builder, array $params)
    {
        $master = $builder->getQuery()->from;

        $obj = $builder;
        $table = '';
        foreach ($params as $value) {
            if ($table != $value['table']) {
                $obj->rightJoin($value['table'], $master.'.'.$value['field-condition'], '=', $value['table'].'.'.$value['field']);
                $table = $value['table'];
            }
        }
        return $obj;
    }

    public function items_per_page(Builder $builder, $params)
    {
        return $builder->paginate($params);
    }
}
