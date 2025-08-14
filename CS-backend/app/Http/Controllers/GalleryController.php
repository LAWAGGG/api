<?php

namespace App\Http\Controllers;

use App\Imports\GalleriesImport;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\Console\Input\Input;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gallery = Gallery::get();

        return response()->json([
            "Galleries" => $gallery
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function import(Request $request)
    {
        $request->validate([
            "file" => "required|mimes:xlsx, xls"
        ]);

        Excel::import(new GalleriesImport, $request->file("file"));

        return response()->json([
            "message" => "data berhasil diimport"
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $val = Validator::make($request->all(), [
            "title" => "required",
            "description" => "required",
            "image_url_1" => "required",
            "image_url_2" => "required",
            "image_url_3" => "required",
        ]);

        if ($val->fails()) {
            return response()->json([
                "message" => "invalid fields",
                "errors" => $val->errors()
            ],422);
        }

        $gallery = Gallery::create([
            "title" => $request->title,
            "description" => $request->description,
            "image_url_1" => $request->image_url_1,
            "image_url_2" => $request->image_url_2,
            "image_url_3" => $request->image_url_3,
        ]);

        return response()->json([
            "image" => $gallery,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        if (!$gallery) {
            return response()->json([
                "message" => "image not found"
            ]);
        }

        return response()->json([
            "image" => $gallery
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        if (!$gallery) {
            return response()->json([
                "message" => "image not found"
            ]);
        }

        $gallery->update($request->all());

        return response()->json([
            "image" => $gallery
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        if (!$gallery) {
            return response()->json([
                "message" => "image not found"
            ]);
        }

        $gallery->delete();

        return response()->json([
            "image" => $gallery
        ]);
    }
}
