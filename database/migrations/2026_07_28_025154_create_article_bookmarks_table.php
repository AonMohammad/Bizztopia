<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->string('session_id');
            $table->string('ip_address')->nullable();
            $table->timestamps();
            $table->unique(['article_id', 'session_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_bookmarks');
    }
};
