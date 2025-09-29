<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StudentController;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Auth Admin
Route::post("/login", [AuthController::class, "login"]);
Route::post("/logout", [AuthController::class, "logout"])->middleware("auth:sanctum");

//project route for user
Route::get("/project", [ProjectController::class, "index"]);
Route::get("/project/{project}", [ProjectController::class, "show"]);

//student route for user
Route::get("/student", [StudentController::class, "index"]);
Route::get("/student/{student}", [StudentController::class, "show"]);

//gallery route for user
Route::get("/gallery", [GalleryController::class, "index"]);
Route::get("/gallery/{gallery}", [GalleryController::class, "show"]);

//admin middleware
Route::middleware("auth:sanctum")->group(function () {
    //import & CRUD features (student)
    Route::post("/student/import", [StudentController::class, "import"]); 
    Route::resource("student", ProjectController::class)->only([
        "store",
        "update",
        "destroy"
    ]);

    //import & CRUD features (project)
    Route::post("/project/import", [ProjectController::class, "import"]);
    Route::resource("project", ProjectController::class)->only([
        "store",
        "update",
        "destroy"
    ]);

    //import & CRUD features (gallery)
    Route::post("/gallery/import", [GalleryController::class, "import"]);
    Route::resource("gallery", GalleryController::class)->only([
        "store",
        "update",
        "destroy"
    ]);
});
