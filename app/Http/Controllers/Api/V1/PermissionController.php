<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Check if user is authorized for any action
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(Request $request)
    {
        $request->validate([
           'ability' => 'required'
        ]);
        $response = auth()->user()->can($request->ability);
        return response()->json(['data'=> $response]);
    }

    /**
     * Get All Permissions
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllPermissions(Request $request)
    {
        $response = auth()->user()->allPermissions;
        return response()->json(['data'=> $response]);
    }
}
