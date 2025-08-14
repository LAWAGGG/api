<?php

namespace App\Imports;

use App\Models\Student;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        Log::info('Imported row:', $row);

        if (!isset($row['name'])) {
            return null;
        }

        return new Student([
            'name' => $row['name'] ?? null,
            'birth_date' => $row['birth_date'] ?? null,
            'gender' => $row['gender'] ?? null,
            'sosmed' => $row['sosmed'] ?? null,
            'profile_url' => $row['profile_url'] ?? null,
            'absen' => $row['absen'] ?? null,
            'skill' => $row['skill'] ?? null,
            'description' => $row['description'] ?? null,
            'position' => $row['position'] ?? null,
        ]);
    }
}
