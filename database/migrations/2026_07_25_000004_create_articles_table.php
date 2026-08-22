<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('author_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('subtitle')->nullable();
            $table->longText('content');
            $table->string('hero_image')->nullable();
            $table->string('content_type')->default('Idea'); // Idea, Guide, How-To, Checklist, FAQ, News
            $table->string('region')->default('North America'); // North America
            $table->string('reading_time')->default('5 min read');
            $table->string('source_rss_name')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('status')->default('published'); // draft, published
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
