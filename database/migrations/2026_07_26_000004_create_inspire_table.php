<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Visual Inspiration Galleries & Projects
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('category')->default('Office & Workspaces'); // Workspaces, Retail, Branding, Architecture, Tech
            $table->string('hero_image')->nullable();
            $table->string('client_name')->nullable();
            $table->string('location')->nullable();
            $table->unsignedInteger('views_count')->default(0);
            $table->unsignedInteger('bookmarks_count')->default(0);
            $table->string('status')->default('published');
            $table->timestamps();
        });

        // Gallery Images (Multiple images per gallery)
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained()->cascadeOnDelete();
            $table->string('image_url');
            $table->string('caption')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('credit_name')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // Visual Collections / Playlists
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('collections');
        Schema::dropIfExists('gallery_images');
        Schema::dropIfExists('galleries');
    }
};
