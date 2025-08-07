<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('external_id')->unique();
            $table->string('name');
            $table->string('status');
            $table->string('species');
            $table->string('type')->nullable();
            $table->string('gender');
            $table->string('origin_name');
            $table->string('origin_url');
            $table->string('location_name');
            $table->string('location_url');
            $table->text('image');
            $table->json('episode');
            $table->string('url');
            
            $table->timestamp('created_at_external');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
}; 