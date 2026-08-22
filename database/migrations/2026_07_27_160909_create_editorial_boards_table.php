<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('editorial_boards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('layout_type'); // 'hero_split', '4_column_masonry', 'spotlight_digest', 'market_grid'
            $table->string('category_filter')->nullable(); // e.g. 'News', 'Blog', 'Industry Guide'
            $table->string('ad_type')->default('google_ads'); // 'google_ads', 'engage_poll', 'engage_quiz', 'custom_banner'
            $table->text('ad_code')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('editorial_boards');
    }
};
