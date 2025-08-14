<?php

namespace App\Imports;

use App\Models\Project;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProjectsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        Log::info('Imported row:', $row);

        if (!isset($row['title'])) {
            return null;
        }

        return new Project([
            "title" => $row["title"] ?? null,
            "teacher" => $row["teacher"] ?? null,
            "creator" => $row["creator"] ?? null,
            "description" => $row["description"] ?? null,
            "image_url" => $row["image_url"] ?? null,
            "repo_link" => $row["repo_link"] ?? null,
            "language" => isset($row["language"])
                ? preg_split("/\r\n|\n|\r/", $row["language"])
                : [],
        ]);
    }
}
