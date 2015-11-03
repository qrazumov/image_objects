<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// главаня
Route::get('/', [
    'as' => 'index', 'uses' => 'IndexController@index'
]);
// ajax routes
Route::group(['as' => 'ajax::'], function () {
    Route::post('ajax/addObject', ['as' => 'addObject', 'uses' => 'AjaxController@addObject']);
});