<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // app/Http/Middleware/RoleMiddleware.php
    public function handle($request, Closure $next, $roleLevel)
    {
        if (auth()->check() && auth()->user()->level == $roleLevel) {
            return $next($request);
        }

        return abort(403, 'Unauthorized');
    }
}
