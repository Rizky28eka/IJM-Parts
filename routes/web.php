<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\InboundController;
use App\Http\Controllers\OutboundController;
use App\Http\Controllers\StockAdjustmentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\PartRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (\Illuminate\Support\Facades\Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User Management (Admin & Owner)
    Route::middleware('role:admin,owner')->group(function () {
        Route::resource('users', UserController::class);
        Route::patch('/users/{user}/verify', [UserController::class, 'verify'])->name('users.verify');
        Route::patch('/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
    });

    // Owner Only Features
    Route::middleware('role:owner')->group(function () {
        Route::delete('/parts/{part}', [PartController::class, 'destroy'])->name('parts.destroy');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        Route::delete('/brands/{brand}', [BrandController::class, 'destroy'])->name('brands.destroy');
        Route::delete('/suppliers/{supplier}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');
        Route::delete('/mechanics/{mechanic}', [MechanicController::class, 'destroy'])->name('mechanics.destroy');
        Route::delete('/inbounds/{inbound}', [InboundController::class, 'destroy'])->name('inbounds.destroy');
        Route::delete('/outbounds/{outbound}', [OutboundController::class, 'destroy'])->name('outbounds.destroy');
        
        // Reporting is still owner only
        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/download', [ReportController::class, 'download'])->name('reports.download');
    });

    // Management Modules (Except Delete)
    Route::resource('parts', PartController::class)->except(['destroy']);
    Route::resource('categories', CategoryController::class)->except(['destroy']);
    Route::resource('brands', BrandController::class)->except(['destroy']);
    Route::resource('suppliers', SupplierController::class)->except(['destroy']);
    Route::resource('mechanics', MechanicController::class)->except(['destroy']);

    // Transaction Modules
    Route::resource('inbounds', InboundController::class)->only(['index', 'create', 'store', 'show']);
    Route::resource('outbounds', OutboundController::class)->only(['index', 'create', 'store', 'show']);
    Route::resource('stock-adjustments', StockAdjustmentController::class)->only(['index', 'create', 'store']);

    // Part Request System
    Route::middleware('role:karyawan,admin,owner')->group(function () {
        Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
        Route::resource('part-requests', PartRequestController::class)->only(['index', 'create', 'store']);
    });

    Route::middleware('role:admin,owner')->group(function () {
        Route::patch('/part-requests/{part_request}/approve', [PartRequestController::class, 'approve'])->name('part-requests.approve');
        Route::patch('/part-requests/{part_request}/reject', [PartRequestController::class, 'reject'])->name('part-requests.reject');
    });
});

require __DIR__.'/auth.php';
