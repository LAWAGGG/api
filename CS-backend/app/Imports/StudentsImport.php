<?php

namespace App\Imports;

use App\Models\Student;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class StudentsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        Log::info('Imported row:', $row);

        if (!isset($row['name'])) {
            return null;
        }

        // default null
        $birthDate = null;

        if (!empty($row['birth_date'])) {
            if (is_numeric($row['birth_date'])) {
                $birthDate = Date::excelToDateTimeObject($row['birth_date'])->format('Y-m-d');
            } elseif (strtotime($row['birth_date']) !== false) {
                $birthDate = date('Y-m-d', strtotime($row['birth_date']));
            }
        }

        return new Student([
            'name'        => $row['name'] ?? null,
            'birth_date'  => $birthDate,   
            'gender'      => $row['gender'] ?? null,
            'sosmed'      => $row['sosmed'] ?? null,
            'profile_url' => $row['profile_url'] ?? null,
            'absen'       => $row['absen'] ?? null,
            'skill'       => $row['skill'] ?? null,
            'description' => $row['description'] ?? null,
            'position'    => $row['position'] ?? null,
        ]);
    }
}
