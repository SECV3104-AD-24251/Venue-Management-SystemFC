<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RestrictRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $role): Response
    {
        if (Auth::check() && Auth::user()->role !== $role) {
            Auth::logout();

            return redirect('/login')->withErrors(['email' => 'Unauthorized access.']);
        }

        return $next($request);
    }
}
