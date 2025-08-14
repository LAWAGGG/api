<?php

namespace App\Http\Controllers;

use App\Imports\ProjectsImport;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $project = Project::get();

        return response()->json([
            "Projects" => $project
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx, xls'
        ]);

        Excel::import(new ProjectsImport, $request->file('file'));

        return response()->json([
            "message" => "data berhasil diimport",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $val = Validator::make($request->all(), [
            "title" => "required",
            "creator" => "required",
            "description" => "required",
            "image_url" => "required",
            "repo_link" => "required",
            "language" => "required",
        ]);

        if (!$val) {
            return response()->json([
                "message" => "invalid fields",
                "errors" => $val->errors()
            ], 422);
        }

        $project = Project::create([
            "title" => $request->title,
            "creator" => $request->creator,
            "description" => $request->description,
            "image_url" => $request->image_url,
            "repo_link" => $request->repo_link,
            "language" => $request->language,
        ]);

        return response()->json([
            "message" => "project created succesfully",
            "Project" => $project
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        if (!$project) {
            return response()->json([
                "message" => "project not found"
            ]);
        }

        return response()->json([
            "Project" => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        if (!$project) {
            return response()->json([
                "message" => "project not found"
            ]);
        }

        $project->update($request->all());

        return response()->json([
            "Project" => $project
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if (!$project) {
            return response()->json([
                "message" => "project not found"
            ]);
        }

        $project->delete();

        return response()->json([
            "Project" => $project
        ]);
    }
}
