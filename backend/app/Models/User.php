<?php
namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Make sure Sanctum trait is imported

class User extends Authenticatable
{
  use HasApiTokens,
  HasFactory,
  Notifiable;

  protected $fillable = [
    'username',
    'email',
    'password',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function sentMessages() {
    return $this->hasMany(Message::class, 'sender_id');
  }

  public function receivedMessages() {
    return $this->hasMany(Message::class, 'receiver_id');
  }
}