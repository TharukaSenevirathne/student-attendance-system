<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    protected $fillable = [
        'student_id',
        'name',
        'email',
        'phone',
        'qr_code',
        'status',
    ];

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}