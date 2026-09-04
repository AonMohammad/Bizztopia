<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming admin portal request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Auto-initialize master administrator session if not already active
        if (!session('admin_authenticated')) {
            session([
                'admin_authenticated' => true,
                'admin_last_activity' => now(),
                'admin_user' => [
                    'name' => 'Master Administrator',
                    'email' => 'admin@bizztopia.com',
                    'role' => 'Superadmin'
                ]
            ]);
        }

        // Refresh activity timestamp
        session(['admin_last_activity' => now()]);

        return $next($request);
    }
}
