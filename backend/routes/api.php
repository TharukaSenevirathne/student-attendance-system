<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendanceController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/dashboard', [DashboardController::class, 'dashboard']);

Route::middleware('auth:sanctum')->post('/students',[StudentController::class, 'create']);
Route::middleware('auth:sanctum')->get('/students',[StudentController::class, 'showall']);
Route::middleware('auth:sanctum')->get('/students/{id}',[StudentController::class, 'show']);
Route::middleware('auth:sanctum')->put('/students/{id}',[StudentController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/students/{id}',[StudentController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/attendance', [AttendanceController::class, 'showall']);
Route::middleware('auth:sanctum')->get('/attendance/{id}', [AttendanceController::class, 'show']);
Route::middleware('auth:sanctum')->put('/attendance/{id}', [AttendanceController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/attendance/{id}', [AttendanceController::class, 'destroy']);
Route::middleware('auth:sanctum')->post('/attendance/scan', [AttendanceController::class, 'scan']);

