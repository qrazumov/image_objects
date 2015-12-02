<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Object extends Model
{
    protected $fillable = [

        'id',
        'author_id',
        'name',
        'description',
        'json',

    ];
}
