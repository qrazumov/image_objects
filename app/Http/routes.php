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

// группа object
Route::group(['as' => 'object::'], function () {
 //   Route::get('object', ['as' => 'object', 'uses' => 'IndexController@object']);
    Route::get('object/{id}', ['as' => 'object_id', 'uses' => 'IndexController@object_id'])->where('id', '[0-9]+');




});

// ajax routes
Route::group(['as' => 'ajax::'], function () {
    Route::post('ajax/addObject', ['as' => 'addObject', 'uses' => 'AjaxController@addObject']);
    Route::post('ajax/addBgrImg', ['as' => 'addBgrImg', 'uses' => 'AjaxController@addBgrImg']);
    Route::post('ajax/loadObject', ['as' => 'loadObject', 'uses' => 'AjaxController@loadObject']);
    Route::get('ajax/delFile', ['as' => 'delFile', 'uses' => 'AjaxController@delFile']);
});