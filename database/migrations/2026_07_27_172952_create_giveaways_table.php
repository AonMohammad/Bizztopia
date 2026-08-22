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
        Schema::create('giveaways', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('prize_value')->default('$1,000 USD');
            $table->timestamp('ends_at');
            $table->unsignedInteger('total_entries')->default(0);
            $table->string('status')->default('active'); // active, ended, drafted
            $table->text('rules')->nullable();
            $table->timestamps();
        });

        Schema::create('giveaway_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('giveaway_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('company_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('giveaway_entries');
        Schema::dropIfExists('giveaways');
    }
};
