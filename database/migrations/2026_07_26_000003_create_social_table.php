<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Community Q&A Questions
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author_name')->default('Community Member');
            $table->string('author_role')->nullable();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->string('category')->default('General Business');
            $table->unsignedInteger('upvotes_count')->default(0);
            $table->unsignedInteger('answers_count')->default(0);
            $table->boolean('is_solved')->default(false);
            $table->string('status')->default('published'); // published, flagged, hidden
            $table->timestamps();
        });

        // Question Answers
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author_name')->default('Community Member');
            $table->string('author_role')->nullable();
            $table->text('body');
            $table->unsignedInteger('upvotes_count')->default(0);
            $table->boolean('is_accepted')->default(false);
            $table->timestamps();
        });

        // Business Reviews & Testimonials
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('reviewer_name');
            $table->string('business_name');
            $table->string('service_category');
            $table->unsignedTinyInteger('rating')->default(5); // 1 to 5 stars
            $table->text('title');
            $table->text('review_body');
            $table->boolean('is_verified')->default(true);
            $table->string('status')->default('approved'); // approved, pending, rejected
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('answers');
        Schema::dropIfExists('questions');
    }
};
