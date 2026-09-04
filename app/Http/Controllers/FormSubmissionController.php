<?php

namespace App\Http\Controllers;

use App\Models\BusinessClaim;
use App\Models\ContactInquiry;
use App\Models\Lead;
use App\Modules\Social\Models\Review;
use Illuminate\Http\Request;

class FormSubmissionController extends Controller
{
    /**
     * Store Lead Matching Request into SQLite Database
     */
    public function submitLead(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:100',
            'service_needed' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'details' => 'nullable|string',
            'source_page' => 'nullable|string|max:255',
        ]);

        $lead = Lead::create($validated);

        return back()->with('success', 'Lead request submitted and saved to database successfully!');
    }

    /**
     * Store Contact Inquiry into SQLite Database
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $inquiry = ContactInquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? 'General Support',
            'message' => $validated['message'],
        ]);

        return back()->with('success', 'Contact inquiry submitted and saved to database successfully!');
    }

    /**
     * Store Business Profile Claim into SQLite Database
     */
    public function submitClaim(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:100',
            'website' => 'nullable|string|max:255',
        ]);

        $claim = BusinessClaim::create([
            'business_name' => $validated['business_name'],
            'contact_name' => $validated['contact_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'website' => $validated['website'] ?? null,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Business claim application submitted and saved to database successfully!');
    }

    /**
     * Store Write a Review Submission into SQLite Database
     */
    public function submitReview(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review_body' => 'required|string',
        ]);

        $review = Review::create([
            'business_name' => $validated['business_name'],
            'author_name' => $validated['author_name'],
            'rating' => $validated['rating'],
            'body' => $validated['review_body'],
            'status' => 'approved',
        ]);

        return back()->with('success', 'Review submitted and saved to database successfully!');
    }
}
