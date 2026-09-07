<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Attendance;

class DashboardController
{
    public function dashboard()
    {
        $totalStudents = Student::count();
        $totalAttendance = Attendance::count();
        $todayAttendance = Attendance::whereDate('date', today())->count();

        return response()->json([
            'total_students' => $totalStudents,
            'total_attendance' => $totalAttendance,
            'today_attendance' => $todayAttendance,
        ]);
    }
}