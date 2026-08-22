<?php

namespace App\Modules\Engage\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Engage\Models\Giveaway;
use App\Modules\Engage\Models\GiveawayEntry;
use App\Modules\Engage\Models\Poll;
use App\Modules\Engage\Models\PollOption;
use App\Modules\Engage\Models\PollVote;
use App\Modules\Engage\Models\Quiz;
use App\Modules\Engage\Models\QuizResult;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EngageController extends Controller
{
    /**
     * Display the Engage Hub page with active giveaways, polls, and quizzes.
     */
    public function index(Request $request): Response
    {
        $giveaways = Giveaway::where('status', 'active')
            ->where('ends_at', '>', now())
            ->latest()
            ->get();

        $polls = Poll::with(['options'])
            ->where('status', 'active')
            ->latest()
            ->get()
            ->map(function ($poll) use ($request) {
                $hasVoted = PollVote::where('poll_id', $poll->id)
                    ->where('ip_address', $request->ip())
                    ->exists();

                return array_merge($poll->toArray(), [
                    'has_voted' => $hasVoted,
                ]);
            });

        $quizzes = Quiz::with(['questions.options', 'results'])
            ->where('status', 'active')
            ->latest()
            ->get();

        return Inertia::render('Engage/Index', [
            'giveaways' => $giveaways,
            'polls' => $polls,
            'quizzes' => $quizzes,
        ]);
    }

    /**
     * Enter a giveaway sweepstakes.
     */
    public function enterGiveaway(Request $request, Giveaway $giveaway): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
        ]);

        GiveawayEntry::create([
            'giveaway_id' => $giveaway->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'company_name' => $validated['company_name'] ?? null,
        ]);

        $giveaway->increment('total_entries');

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Your entry has been recorded!',
            ]);
        }

        return back()->with('success', 'Your entry has been recorded!');
    }

    /**
     * Cast a vote on an active poll.
     */
    public function vote(Request $request, Poll $poll): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'poll_option_id' => ['required', 'exists:poll_options,id'],
        ]);

        $ipAddress = $request->ip();

        // Prevent duplicate votes from same IP
        $alreadyVoted = PollVote::where('poll_id', $poll->id)
            ->where('ip_address', $ipAddress)
            ->exists();

        if ($alreadyVoted) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'You have already voted in this poll.'], 422);
            }
            return back()->with('error', 'You have already voted in this poll.');
        }

        $option = PollOption::where('poll_id', $poll->id)
            ->where('id', $validated['poll_option_id'])
            ->firstOrFail();

        // Record vote
        PollVote::create([
            'poll_id' => $poll->id,
            'poll_option_id' => $option->id,
            'ip_address' => $ipAddress,
            'user_agent' => $request->userAgent(),
            'user_id' => auth()->id(),
        ]);

        $option->increment('votes_count');
        $poll->increment('total_votes');

        $updatedPoll = Poll::with('options')->find($poll->id);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'poll' => array_merge($updatedPoll->toArray(), ['has_voted' => true]),
            ]);
        }

        return back()->with('success', 'Thank you for your vote!');
    }

    /**
     * Submit answers for a diagnostic quiz.
     */
    public function submitQuiz(Request $request, Quiz $quiz): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'answers' => ['required', 'array'],
        ]);

        $quiz->increment('completion_count');

        $resultCounts = [];
        foreach ($validated['answers'] as $questionId => $traitScore) {
            $resultCounts[$traitScore] = ($resultCounts[$traitScore] ?? 0) + 1;
        }

        arsort($resultCounts);
        $topTrait = key($resultCounts) ?? 'visionary';

        $quizResult = QuizResult::where('quiz_id', $quiz->id)
            ->where('trait_code', $topTrait)
            ->first();

        if (!$quizResult) {
            $quizResult = QuizResult::where('quiz_id', $quiz->id)->first();
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'result' => $quizResult,
            ]);
        }

        return back()->with('result', $quizResult);
    }
}
