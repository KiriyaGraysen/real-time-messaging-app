<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $request->validate([
      'username' => 'required|string',
      'email' => 'required|unique:users|email',
      'password' => 'required|regex:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/'
    ]);
    
    $user = User::create([
      'username' => $request->username,
      'email' => $request->email,
      'password' => Hash::make($request->password)
    ]);
    
    $token = $user->createToken('chat-app')->plainTextToken;
    
    return response()->json([
      'user' => $user,
      'token' => $token
    ]);
  }
  
  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required'
    ]);
    
    $credentials = $request->only('email', 'password');
    
    if (!Auth::attempt($credentials)) {
      return response()->json([
        'message' => 'Invalid login credentials'
      ], 401);
    }
    
    $user = User::where('email', $request->email)->first();
    
    $token = $user->createToken('chat-app')->plainTextToken;
    
    return response()->json([
      'user' => $user,
      'token' => $token
    ]);
  }
  
  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();
    
    return response()->json([
      'message' => 'Logged out successfully'
    ]);
  }
}