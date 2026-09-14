<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HttpCacheHeaders
{
    /**
     * Handle an incoming request to optimize HTTP caching, ETags, and 304 Not Modified.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only cache GET or HEAD requests
        if (!$request->isMethod('GET') && !$request->isMethod('HEAD')) {
            return $response;
        }

        // Do not cache Admin routes or authenticated responses
        if ($request->is('admin*') || $request->user()) {
            $response->headers->set('Cache-Control', 'no-cache, private, no-store, must-revalidate');
            return $response;
        }

        // For static / public responses (200 OK)
        if ($response->getStatusCode() === 200) {
            $content = $response->getContent();
            if ($content !== false && strlen($content) > 0) {
                // Generate strong ETag based on response content
                $etag = '"' . md5($content) . '"';
                $response->headers->set('ETag', $etag);

                // Check If-None-Match header for instant 304 Not Modified
                $ifNoneMatch = $request->header('If-None-Match');
                if ($ifNoneMatch) {
                    $noneMatches = array_map('trim', explode(',', $ifNoneMatch));
                    if (in_array($etag, $noneMatches) || in_array('*', $noneMatches)) {
                        return response('', 304, [
                            'ETag' => $etag,
                            'Cache-Control' => 'public, max-age=300, stale-while-revalidate=86400',
                            'Vary' => 'X-Inertia, X-Inertia-Version, Accept-Encoding',
                        ]);
                    }
                }
            }

            // Public caching headers for super fast edge & browser caching
            $response->headers->set('Cache-Control', 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400');
            $response->headers->set('Vary', 'X-Inertia, X-Inertia-Version, Accept-Encoding');
        }

        return $response;
    }
}
