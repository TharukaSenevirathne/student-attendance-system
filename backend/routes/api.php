<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendanceController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum', 'admin')->get('/dashboard', [DashboardController::class, 'dashboard']);

Route::middleware('auth:sanctum', 'admin')->post('/students',[StudentController::class, 'create']);
Route::middleware('auth:sanctum', 'admin')->get('/students',[StudentController::class, 'showall']);
Route::middleware('auth:sanctum', 'admin')->get('/students/{id}',[StudentController::class, 'show']);
Route::middleware('auth:sanctum', 'admin')->put('/students/{id}',[StudentController::class, 'update']);
Route::middleware('auth:sanctum', 'admin')->delete('/students/{id}',[StudentController::class, 'delete']);

Route::middleware('auth:sanctum', 'admin')->get('/attendance', [AttendanceController::class, 'showall']);
Route::middleware('auth:sanctum', 'admin')->get('/attendance/{id}', [AttendanceController::class, 'show']);
Route::middleware('auth:sanctum', 'admin')->put('/attendance/{id}', [AttendanceController::class, 'update']);
Route::middleware('auth:sanctum', 'admin')->delete('/attendance/{id}', [AttendanceController::class, 'destroy']);
Route::middleware('auth:sanctum', 'admin')->post('/attendance/scan', [AttendanceController::class, 'scan']);

