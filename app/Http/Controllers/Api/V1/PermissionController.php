<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
           'ability' => 'required'
        ]);
        $response = auth()->user()->can($request->ability);
        return response()->json(['data'=> $response]);
    }
}
