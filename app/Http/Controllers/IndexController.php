<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class IndexController extends Controller
{

    public function index(){


        return view('index', [



        ]);

    }

    public function object_id($id){


        $data = \DB::table('objects')->where('id', $id)->get()[0];


        return view('object', [

            'data' => $data

        ]);

    }

}
