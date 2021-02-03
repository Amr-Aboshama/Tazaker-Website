<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JWTFanMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $this->authenticate($request);

            $user = auth()->user();

            if($user->role != 'Fan')
                throw new UnauthorizedHttpException('jwt-auth', 'User is not authorized');
        } catch (Exception $e) {
            return response()->json([
                'success' => 'false',
                'message' => 'UnAuthorized access',
            ]);
        }

        return $next($request);
    }
}
