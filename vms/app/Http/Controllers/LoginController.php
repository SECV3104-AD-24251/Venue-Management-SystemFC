<?php

class LoginController extends Controller
{
    protected function authenticated(Request $request, $user)
    {
        switch ($user->level) {
            case 1:
                return redirect('/admin-dashboard');
            case 2:
                return redirect('/lecturer-dashboard');
            case 3:
                return redirect('/staff-dashboard');
            default:
                return redirect('/unauthorized');
        }
    }
}
