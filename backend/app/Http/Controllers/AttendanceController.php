<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;

class AttendanceController
{
    public function showall()
    {
        $attendances = Attendance::with('student')->get();
        return response()->json($attendances);
    }

    public function show($id)
    {
        $attendance = Attendance::with('student')->findOrFail($id);
        return response()->json($attendance);
    }

    public function scan(Request $request)
    {
        $validated = $request->validate(['qr_code' => 'required|string']);
        $student = Student::where('qr_code',$validated['qr_code'])->first();   //need to ask this

        if (!$student) {
            return response()->json(['message' => 'Invalid QR code. Student not found.']);
        }

        $alreadyMarked = Attendance::where('student_id', $student->id)->whereDate('date', today())->exists();
        if ($alreadyMarked) {
            return response()->json([
                'message' => 'Attendance already marked for this student today.',
                'student' => $student,]);
        }

        $attendance = Attendance::create([
            'student_id' => $student->id,
            'date' => today(),
            'time' => now()->format('H:i:s'),
            'status' => 'present',
            'scanned_value' => $validated['qr_code'],
        ]);
        return response()->json([
            'message' => 'Attendance marked successfully.',
            'student' => $student,
            'attendance' => $attendance,
        ]);
    }

  
    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'status' => 'required|in:present,absent',
        ]);

        $attendance->update($validated);
        return response()->json([
            'message' => 'Attendance updated successfully.',
            'attendance' => $attendance,
        ]);
    }

    public function destroy($id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();
        return response()->json([
            'message' => 'Attendance deleted successfully.'
        ]);
    }
}