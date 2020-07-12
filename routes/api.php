<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum','namespace' => 'Api\V1'], function(){


    Route::group(['middleware' => 'verifiedUser'], function (){
        Route::get('/user', function(Request $request){
            return response()->json(['data'=>$request->user()]);
        });
        Route::post('/can','PermissionController@check');
        Route::post('/get-all-permissions','PermissionController@getAllPermissions');
    });
});
