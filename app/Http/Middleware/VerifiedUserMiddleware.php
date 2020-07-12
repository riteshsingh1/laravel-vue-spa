<?php

namespace App\Http\Middleware;

use Closure;

class VerifiedUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->user()->hasVerifiedEmail()){
            return $next($request);
        }
        return response()->json(['data'=>auth()->user()],202);
    }
}
