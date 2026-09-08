<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;

class AttendanceController
{
    public function showall(Request $request)
    {
        $query = Attendance::with('student');
        if ($request->has('student_id')) {   //if we need to see only one
            $validated = $request->validate(['student_id' => 'required|integer|exists:students,id',]);   
            $query->where('student_id', $validated['student_id']);
        }
        $attendances = $query->get();
        return response()->json($attendances);  //all
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
            return response()->json(['message' => 'Invalid QR code. Student not found.'],422);
        }

        $alreadyMarked = Attendance::where('student_id', $student->id)->whereDate('date', today())->exists();
        if ($alreadyMarked) {
            return response()->json([
                'message' => 'Attendance already marked for this student today.',
                'student' => $student,], 200);
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
        ],201);
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