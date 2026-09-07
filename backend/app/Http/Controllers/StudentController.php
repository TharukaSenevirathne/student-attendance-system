<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StudentController
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string|unique:students,student_id',
            'name' => 'required|string',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string',
            'status' => 'required|string',
        ]);

        $validated['qr_code'] = 'STU-' . strtoupper(Str::random(10));    //strtoupper used to just look better

        $student = Student::create($validated);
        return response()->json([
            'message' => 'Student created successfully',
            'student' => $student,
        ]);
    }

    public function showall()
    {
        $students = Student::all();
        return response()->json($students);
    }

    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    public function update(Request $request, $id)
    {
    $student = Student::findOrFail($id);
    $validated = $request->validate([
        'student_id' => 'required|string|unique:students,student_id,' . $student->id,  //ignore the student id coz of error due to uniqueness
        'name' => 'required|string',
        'email' => 'required|email|unique:students,email,' . $student->id,  //same here
        'phone' => 'nullable|string',
        'status' => 'required|string',
    ]);
    $student->update($validated);
    return response()->json([
        'message' => 'Student updated successfully',
        'student' => $student,
    ]);
}

public function delete($id)
{
    $student = Student::findOrFail($id);
    $student->delete();
    return response()->json([
        'message' => 'Student deleted successfully',
    ]);
}
}