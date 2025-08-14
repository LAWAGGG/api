<?php

namespace App\Http\Controllers;

use App\Imports\StudentsImport;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use PHPUnit\Framework\MockObject\Builder\Stub;

class StudentController extends Controller
{
    public function index()
    {
        $student = Student::get();

        return response()->json([
            "Students" => $student
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx, xls'
        ]);

        Excel::import(new StudentsImport, $request->file('file'));

        return response()->json([
            "message" => "data berhasil diimport"
        ]);
    }

    public function store(Request $request)
    {
        $val = Validator::make($request->all(), [
            "name" => "required",
            "birth_date" => "required",
            "sosmed" => "required",
            "gender" => "required",
            "profile_url" => "required",
            "absen" => "required",
            "skill" => "required",
            "description" => "required",
            "position" => "required",
        ]);

        if ($val->fails()) {
            return response()->json([
                "message" => "invalid fields",
                "errors" => $val->errors()
            ]);
        }

        $student = Student::create([
            "name" => $request->name,
            "nis" => $request->nis,
            "sosmed" => $request->sosmed,
            "absen" => $request->absen,
            "gender" => $request->gender,
            "profile_url" => $request->profile_url,
            "skill" => $request->skill,
            "description" => $request->description,
            "postition" => $request->postition,
        ]);

        return response()->json([
            "message" => "student created succesfully",
            "Student" => $student
        ]);
    }

    public function show(Student $student)
    {
        if (!$student) {
            return response()->json([
                "message" => "student not found"
            ], 404);
        }

        return response()->json([
            "student" => $student
        ]);
    }

    public function update(Student $student, Request $request)
    {
        if (!$student) {
            return response()->json([
                "message" => "student not found"
            ], 404);
        }

        $student->update($request->all());

        return response()->json([
            "student" => $student
        ]);
    }

    public function destroy(Student $student)
    {
        if (!$student) {
            return response()->json([
                "message" => "student not found"
            ], 404);
        }

        $student->delete();

        return response()->json([
            "student" => $student
        ]);
    }
}
