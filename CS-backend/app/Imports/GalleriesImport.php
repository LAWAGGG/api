<?php

namespace App\Imports;

use App\Models\Gallery;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GalleriesImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        Log::info('Imported row:', $row);

          if (!isset($row['title'])) {
            return null;
        }

        return new Gallery([
            "title"=>$row["title"] ?? null,
            "description"=>$row["description"] ?? null,
            "image_url_1"=>$row["image_url_1"] ?? null,
            "image_url_2"=>$row["image_url_2"] ?? null,
            "image_url_3"=>$row["image_url_3"] ?? null,
        ]);
    }
}
