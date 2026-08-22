# Bizztopia --- Master CAP Architecture & Product Specification

**Project:** Bizztopia\
**Parent Ecosystem:** Techception\
**Document Type:** Master Product, UX/UI, Technical & Architecture
Specification\
**Version:** 0.1 --- Foundation Specification\
**Status:** Working Master Specification\
**Date:** 25 July 2026

------------------------------------------------------------------------

## 0. Document Purpose

This document is the single source of truth for the design and
development of **Bizztopia**, Techception's flagship general-business
Customer Acquisition Platform (CAP).

Bizztopia is not intended to be built as a conventional
business-directory website or a conventional brochure website. It is the
first implementation of a reusable **CAP architecture** that will
eventually support multiple industry-specific platforms.

The immediate objective is to make Bizztopia exceptionally complete,
modular, maintainable, scalable, search-friendly, and visually
consistent.

Once Bizztopia is mature, its architecture will become the reference
implementation for future CAPs such as:

-   Regentology
-   Rate My Doc
-   WeddingHub
-   MuzzBizz
-   HouzzWise
-   KiddoTurf
-   TruSecur
-   Heritage Mutual Life
-   Future Automotive Marketplace
-   Future Legal Marketplace
-   Pets & Vets
-   DigiProp

The long-term strategy is therefore:

> **Build Bizztopia once as the master CAP architecture, separate
> reusable infrastructure from vertical-specific configuration, then
> replicate and customise the architecture for each future CAP.**

------------------------------------------------------------------------

# 1. Product Vision

## 1.1 Core Vision

Bizztopia should become a **digital business ecosystem** rather than
merely another website or directory.

A traditional business may need separate systems for:

-   Website
-   Hosting
-   SSL
-   Domain management
-   SEO
-   AEO
-   Landing pages
-   Lead forms
-   CRM
-   Appointment scheduling
-   Email marketing
-   SMS marketing
-   Online chat
-   Reputation management
-   Analytics
-   Business listings
-   Website maintenance
-   Content publishing

Bizztopia's long-term value proposition is to bring these capabilities
into one connected ecosystem.

The business should have:

> **One platform. One profile. One dashboard. One ecosystem.**

## 1.2 Consumer-Side Vision

Bizztopia should become a place where people can:

1.  Learn about businesses and industries.
2.  Discover useful information.
3.  Interact with content.
4.  Use practical tools.
5.  Participate in communities.
6.  Find inspiration.
7.  Eventually discover and connect with businesses.

## 1.3 Business-Side Vision

Businesses should be able to:

-   Establish a professional online presence.
-   Publish content.
-   Build credibility.
-   Collect reviews.
-   Engage with customers.
-   Generate inquiries.
-   Capture leads.
-   Manage customer relationships.
-   Participate in marketing.
-   Analyse performance.
-   Expand their digital capabilities over time.

------------------------------------------------------------------------

# 2. Techception → CAP → Bizztopia Architecture

The ecosystem should be thought of in three layers.

``` text
TECHCEPTION
    |
    +-- Shared Platform Infrastructure
    |
    +-- Central Data / Future Dataology Layer
    |
    +-- CRM / Marketing / Automation Ecosystem
    |
    +-- CAP Architecture
            |
            +-- Bizztopia
            +-- Regentology
            +-- Rate My Doc
            +-- WeddingHub
            +-- MuzzBizz
            +-- HouzzWise
            +-- KiddoTurf
            +-- TruSecur
            +-- Heritage Mutual Life
            +-- Future Automotive Marketplace
            +-- Future Legal Marketplace
            +-- Pets & Vets
            +-- DigiProp
```

Bizztopia is the first **reference CAP implementation**.

------------------------------------------------------------------------

# 3. Current Scope

## 3.1 Current Modules

The first version of Bizztopia is built around five major pillars:

1.  **Attract**
2.  **Engage**
3.  **Value**
4.  **Social**
5.  **Inspire**

These modules should be independently designed and implemented.

## 3.2 Future Module

### Discover --- Future Scope

Discover is part of the long-term CAP vision but is **not being
implemented in the current phase**.

The future Discover layer will be powered by the central
Dataology/database ecosystem and will eventually support:

-   Business profiles
-   Top-rated businesses
-   New businesses
-   Featured businesses
-   Verified businesses
-   Nearby businesses
-   Recently added businesses
-   Categories
-   Services
-   Service areas
-   Maps
-   Advanced search
-   Business matching
-   Lead capture
-   Connection requests

The architecture should be **prepared for Discover without implementing
it now**.

------------------------------------------------------------------------

# 4. Core CAP Philosophy

The five current modules form a consumer journey.

``` text
ATTRACT
  ↓
ENGAGE
  ↓
VALUE
  ↓
SOCIAL
  ↓
INSPIRE
```

These are not isolated content categories.

They are intended to form a connected acquisition ecosystem.

## 4.1 Attract

Bring people into Bizztopia through useful, authoritative industry and
business content.

## 4.2 Engage

Turn passive visitors into active participants.

## 4.3 Value

Help consumers make better decisions through useful tools and
interactive resources.

## 4.4 Social

Build trust and community through user-generated content, discussion,
questions, answers, reviews, and experiences.

## 4.5 Inspire

Use visual and aspirational content to create interest, ideas, and
intent.

------------------------------------------------------------------------

# 5. Module Independence Principle

Every major module must be independently maintainable.

A module should have clear boundaries around:

-   Routes
-   Controllers
-   Services
-   Models
-   Policies
-   Components
-   Pages
-   Assets
-   Tests
-   Configuration
-   Events
-   Analytics
-   Permissions

The goal is that a module can be:

-   Enabled
-   Disabled
-   Extended
-   Redesigned
-   Tested
-   Replaced
-   Replicated

without requiring major changes to unrelated modules.

## 5.1 Module Boundary Rule

A module should not directly depend on another module's internal
implementation.

Preferred:

``` text
Module A
    ↓
Shared Contract / Service / Event
    ↓
Module B
```

Avoid:

``` text
Module A
    ↓
Directly manipulates Module B's internal classes/database implementation
```

## 5.2 Shared Infrastructure

Cross-module capabilities should live in a shared/core layer:

-   Authentication
-   Users
-   Roles
-   Permissions
-   Media
-   Notifications
-   Search foundations
-   SEO metadata
-   Analytics
-   Design system
-   Feature flags
-   Audit logs
-   Configuration

------------------------------------------------------------------------

# 6. Module 01 --- Attract

## 6.1 Purpose

Attract should make Bizztopia a trusted knowledge destination.

The strategic goal is:

> **Become the Wikipedia of the business ecosystem.**

## 6.2 Content Types

Initial content types may include:

-   News
-   Blogs
-   Industry Guides
-   Tips & Tricks
-   How-To Articles
-   Checklists
-   Guides
-   FAQs
-   Best Practices
-   Industry Trends
-   Beginner Guides
-   Educational Resources
-   Expert Insights

## 6.3 Content Architecture

``` text
Attract
├── Content Hub
├── Categories
├── Topics
├── Articles
├── Guides
├── News
├── Checklists
├── How-To Content
├── Author Profiles
├── Tags
└── Related Content
```

## 6.4 Article Page Requirements

Each article should support:

-   Title
-   Subtitle/deck
-   Hero image
-   Author
-   Publication date
-   Updated date
-   Category
-   Tags
-   Reading time
-   Table of contents where appropriate
-   Main content
-   Related articles
-   Social sharing
-   Save/bookmark
-   Comments where enabled
-   Related businesses where appropriate
-   CTA
-   SEO metadata
-   Structured data
-   Open Graph metadata

## 6.5 Attract UX Principle

Content should naturally guide users toward another useful action.

Example:

``` text
Article
  ↓
Related Guide
  ↓
Calculator
  ↓
Community Discussion
  ↓
Inspiration
  ↓
Future Discover / Business Connection
```

------------------------------------------------------------------------

# 7. Module 02 --- Engage

## 7.1 Purpose

Engage exists to keep visitors interacting with Bizztopia rather than
consuming one page and leaving.

## 7.2 Engagement Types

-   Giveaways
-   Sweepstakes
-   Contests
-   Polls
-   Quizzes
-   Personality Tests
-   Interactive Calculators where appropriate
-   Games
-   Challenges
-   Spin-to-Win Promotions

## 7.3 Engagement Architecture

``` text
Engage
├── Campaigns
├── Giveaways
├── Sweepstakes
├── Contests
├── Polls
├── Quizzes
├── Personality Tests
├── Challenges
├── Games
└── Promotional Experiences
```

## 7.4 Engagement Requirements

Each interactive experience should support, where applicable:

-   Landing page
-   Rules
-   Eligibility
-   Start/end dates
-   Participation
-   Progress
-   Results
-   Sharing
-   Notifications
-   Analytics
-   Abuse prevention
-   Admin management

## 7.5 Example Experiences

-   What type of business owner are you?
-   Which local service matches your needs?
-   Business knowledge quiz
-   Industry trend poll
-   Business-themed giveaway
-   Local business challenge

------------------------------------------------------------------------

# 8. Module 03 --- Value

## 8.1 Purpose

Value should help users make decisions.

The principle is:

> **Don't just tell users what to do. Give them tools that help them
> decide.**

## 8.2 Tool Types

-   Budget Calculators
-   Cost Estimators
-   Planning Checklists
-   Timeline Planners
-   Savings Calculators
-   Financing Calculators
-   Comparison Tools
-   Decision Tools
-   Recommendation Tools

## 8.3 Example General-Business Tools

Potential Bizztopia tools include:

-   Business Startup Cost Calculator
-   Marketing Budget Calculator
-   Business Growth Calculator
-   Website Cost Comparison Tool
-   Lead Value Calculator
-   Marketing ROI Calculator
-   Business Expense Planner
-   Small Business Checklist
-   Business Planning Timeline

## 8.4 Tool Architecture

Each tool should ideally separate:

``` text
Input Definition
      ↓
Validation
      ↓
Calculation / Business Logic
      ↓
Result Model
      ↓
Result UI
      ↓
Optional CTA
      ↓
Analytics
```

The calculation/business logic should not be embedded directly into
presentation components.

## 8.5 Future Industry Replication

The Value module should later support industry-specific tool
definitions.

Example:

``` text
WeddingHub
→ Wedding Budget Calculator

Regentology
→ Mortgage Calculator

HouzzWise
→ Bathroom Remodel Cost Estimator

TruSecur
→ Solar Savings Calculator

DigiProp
→ Investment Return Calculator
```

The underlying tool framework should be reusable.

------------------------------------------------------------------------

# 9. Module 04 --- Social

## 9.1 Purpose

Social should create an industry-specific community experience.

The conceptual inspiration is:

-   Quora
-   Reddit-style discussions
-   Community Q&A
-   Review platforms
-   User-generated content

## 9.2 Social Features

-   Questions
-   Answers
-   Discussions
-   Comments
-   Reviews
-   Testimonials
-   Customer photos
-   Before & After galleries
-   Success stories
-   Voting/reactions
-   User profiles
-   Topic following
-   Business interactions
-   Moderation

## 9.3 Community Architecture

``` text
User
  ↓
Post / Question
  ↓
Discussion
  ↓
Answers / Comments
  ↓
Reactions
  ↓
Follow / Save / Share
```

## 9.4 Trust & Moderation

Community functionality must include:

-   Reporting
-   Moderation queues
-   Spam controls
-   Rate limits
-   Content status
-   User restrictions
-   Admin actions
-   Audit logs
-   Review abuse controls

------------------------------------------------------------------------

# 10. Module 05 --- Inspire

## 10.1 Purpose

Inspire is the visual discovery and aspiration layer.

The strategic concept is:

> **Think Pinterest for the relevant industry.**

People often discover what they want by seeing examples.

## 10.2 Content Types

-   Photo Galleries
-   Design Inspiration
-   Success Stories
-   Featured Projects
-   Trending Designs
-   Trending Products
-   Seasonal Ideas
-   User Photos
-   Before & After
-   Collections
-   Visual Guides

## 10.3 Inspiration Architecture

``` text
Inspire
├── Explore
├── Categories
├── Collections
├── Galleries
├── Projects
├── Trends
├── Seasonal Content
├── User Contributions
└── Featured Content
```

## 10.4 Visual Content Requirements

The media system must support:

-   Multiple images
-   Responsive image sizes
-   Image compression
-   Alt text
-   Captions
-   Credits
-   Copyright/ownership metadata
-   Lazy loading
-   Progressive loading
-   Image CDN delivery
-   Gallery navigation
-   Sharing
-   Save/bookmark functionality

------------------------------------------------------------------------

# 11. Cross-Module Experience

The modules should not feel like five unrelated websites.

Example:

``` text
ATTRACTION
Article:
"How to improve your business's local visibility"

        ↓

ENGAGEMENT
Quiz:
"How strong is your online presence?"

        ↓

VALUE
Tool:
"Marketing ROI Calculator"

        ↓

SOCIAL
Discussion:
"What marketing strategy worked for your business?"

        ↓

INSPIRE
Success Stories:
"Businesses that improved their digital presence"
```

Each module should recommend relevant experiences from the others.

------------------------------------------------------------------------

# 12. Business Platform Foundation

Bizztopia should ultimately provide businesses with a professional
digital presence.

Potential business capabilities include:

-   Business profile
-   Business information
-   Logo
-   Cover image
-   Photos
-   Description
-   Services
-   Products where applicable
-   Contact information
-   Website
-   Social links
-   Business hours
-   Service areas
-   Updates/posts
-   Reviews
-   Testimonials
-   Lead inquiries
-   Analytics
-   Team members
-   Profile management

Discover is not being implemented yet, but the business data model
should be structured so that these entities can later become
discoverable.

------------------------------------------------------------------------

# 13. User Types

Initial role architecture should support:

## 13.1 Consumer

Can:

-   Browse content
-   Read articles
-   Participate in public experiences
-   Use tools
-   Ask questions
-   Answer questions
-   Review businesses where permitted
-   Upload permitted content
-   Save content
-   Manage profile

## 13.2 Business Owner

Can:

-   Claim/manage business
-   Edit profile
-   Publish permitted business content
-   Manage media
-   Respond to reviews
-   View inquiries
-   Manage team members
-   View analytics

## 13.3 Business Staff

Permissions should be scoped to assigned business(es).

## 13.4 Content Creator / Author

Can create and manage assigned content according to permissions.

## 13.5 Moderator

Can:

-   Review reports
-   Moderate community content
-   Moderate reviews
-   Manage violations
-   Restrict users/content

## 13.6 Administrator

Full platform administration.

## 13.7 Super Administrator

Infrastructure-level/global administrative permissions.

------------------------------------------------------------------------

# 14. Authentication & Authorization

Authentication should be centralized.

Potential methods:

-   Email/password
-   Password reset
-   Email verification
-   Google
-   Apple
-   Future providers

Authorization should use:

-   Roles
-   Permissions
-   Policies
-   Ownership checks
-   Business/team scopes

Never rely solely on frontend visibility for security.

Every sensitive action must be authorized server-side.

------------------------------------------------------------------------

# 15. Design System

The design system must be established before large-scale page
implementation.

## 15.1 Design Principles

Bizztopia should feel:

-   Modern
-   Professional
-   Trustworthy
-   Approachable
-   Fast
-   Clean
-   Content-rich without feeling cluttered
-   Premium without being unnecessarily complicated
-   Mobile-first
-   Accessible

## 15.2 Design Tokens

Define central tokens for:

### Colour

-   Primary
-   Secondary
-   Accent
-   Background
-   Surface
-   Elevated surface
-   Border
-   Text
-   Muted text
-   Success
-   Warning
-   Error
-   Information
-   Disabled

### Typography

Define:

-   Font family
-   Heading family if different
-   H1
-   H2
-   H3
-   H4
-   H5
-   H6
-   Body large
-   Body
-   Body small
-   Caption
-   Label
-   Button text
-   Font weights
-   Line heights
-   Letter spacing

### Spacing

Use a consistent spacing scale rather than arbitrary values.

### Radius

Define:

-   Small
-   Medium
-   Large
-   XL
-   Full/pill

### Shadows

Define a limited elevation system.

### Motion

Define:

-   Duration
-   Easing
-   Hover
-   Focus
-   Enter
-   Exit
-   Reduced-motion behaviour

------------------------------------------------------------------------

# 16. Component System

## 16.1 Global Components

Examples:

-   Button
-   Icon Button
-   Input
-   Textarea
-   Select
-   Checkbox
-   Radio
-   Toggle
-   Form Field
-   Modal
-   Drawer
-   Dropdown
-   Tooltip
-   Toast
-   Alert
-   Badge
-   Avatar
-   Card
-   Tabs
-   Breadcrumbs
-   Pagination
-   Skeleton
-   Empty State
-   Error State
-   Loading State
-   Confirmation Dialog

## 16.2 CAP Components

Examples:

-   Article Card
-   Business Card
-   Review Card
-   Quiz Card
-   Poll Card
-   Calculator Card
-   Gallery Card
-   Project Card
-   Question Card
-   Discussion Card
-   Campaign Card
-   Guide Card
-   Tool Card

## 16.3 Page-Level Components

Examples:

-   Homepage
-   Content Hub
-   Article Page
-   Quiz Page
-   Calculator Page
-   Community Page
-   Discussion Page
-   Inspiration Feed
-   Gallery Page
-   Business Profile
-   Account Dashboard
-   Business Dashboard
-   Admin Dashboard

------------------------------------------------------------------------

# 17. Styling Architecture

Styling must be centrally controlled.

Preferred hierarchy:

``` text
Design Tokens
    ↓
Base UI Components
    ↓
CAP Components
    ↓
Module Components
    ↓
Pages
```

Avoid hardcoding repeated visual decisions across pages.

For example, do not independently define ten different card radii when
all cards should use the same design token.

## 17.1 Styling Change Principle

A major styling decision should be changeable from as few places as
reasonably possible.

Example:

``` text
Change primary colour
→ update token
→ all dependent components update
```

------------------------------------------------------------------------

# 18. Responsive Design

The platform must be designed mobile-first.

Responsive considerations include:

-   Navigation
-   Cards
-   Grids
-   Tables
-   Forms
-   Galleries
-   Calculators
-   Quizzes
-   Community threads
-   Business profiles
-   Dashboards

Every component should define its behaviour at:

-   Mobile
-   Tablet
-   Desktop
-   Large desktop where required

Avoid simply shrinking desktop layouts.

------------------------------------------------------------------------

# 19. Accessibility

Accessibility is a first-class requirement.

The platform should target modern WCAG accessibility practices.

Requirements include:

-   Keyboard navigation
-   Visible focus states
-   Semantic HTML
-   Accessible forms
-   Labels
-   Error messages
-   Screen-reader support
-   Sufficient contrast
-   Alternative text
-   Reduced-motion support
-   Accessible interactive components

------------------------------------------------------------------------

# 20. Technical Stack

## 20.1 Backend

-   Laravel
-   PHP
-   Eloquent ORM
-   Laravel Validation
-   Policies/Gates
-   Queues
-   Events/Listeners
-   Notifications
-   Scheduler
-   API Resources

## 20.2 Frontend

-   React
-   TypeScript
-   Inertia
-   Vite
-   Tailwind CSS

## 20.3 Database

Preferred primary database:

-   PostgreSQL

## 20.4 Cache & Queues

-   Redis
-   Laravel Horizon

## 20.5 Search

Future-ready architecture:

-   Laravel Scout
-   Search engine such as Meilisearch/Typesense when needed

Search infrastructure should be designed now but **Discover
functionality is not part of current scope**.

## 20.6 Storage

Use S3-compatible object storage for user-generated and platform media.

## 20.7 CDN / Edge

Cloudflare or equivalent infrastructure may provide:

-   CDN
-   DNS
-   SSL
-   WAF
-   DDoS protection
-   Caching
-   Edge services

## 20.8 Testing

Recommended:

-   Pest/PHPUnit
-   Vitest
-   Playwright

## 20.9 Code Quality

Recommended:

-   Laravel Pint
-   PHPStan/Larastan
-   ESLint
-   Prettier

## 20.10 CI/CD

Recommended:

-   Git
-   GitHub
-   GitHub Actions

------------------------------------------------------------------------

# 21. Laravel Application Architecture

The Laravel application should be organised around domain/module
boundaries rather than one giant collection of controllers.

A conceptual structure:

``` text
app/
├── Core/
│   ├── Auth/
│   ├── Users/
│   ├── Permissions/
│   ├── Media/
│   ├── Notifications/
│   ├── Analytics/
│   ├── SEO/
│   └── FeatureFlags/
│
├── Modules/
│   ├── Attract/
│   ├── Engage/
│   ├── Value/
│   ├── Social/
│   └── Inspire/
│
└── Shared/
    ├── Services/
    ├── DTOs/
    ├── Enums/
    ├── Contracts/
    ├── Events/
    └── Exceptions/
```

The exact directory structure can evolve during implementation, but the
separation of concerns must remain.

------------------------------------------------------------------------

# 22. Frontend Architecture

Conceptual structure:

``` text
resources/js/
├── components/
│   ├── ui/
│   ├── forms/
│   ├── navigation/
│   └── media/
│
├── modules/
│   ├── attract/
│   ├── engage/
│   ├── value/
│   ├── social/
│   └── inspire/
│
├── layouts/
├── pages/
├── hooks/
├── lib/
├── types/
├── services/
└── styles/
```

The final structure should avoid excessive duplication.

------------------------------------------------------------------------

# 23. Database Architecture Principles

The database should be designed for:

-   Data integrity
-   Clear ownership
-   Extensibility
-   Indexing
-   Auditing
-   Soft deletion where appropriate
-   Future CAP replication
-   Future multi-platform support

Potential core entities:

``` text
User
Profile
Business
BusinessTeam
BusinessService
BusinessMedia
BusinessReview
Article
Category
Tag
Author
Comment
Question
Answer
Poll
Quiz
Campaign
Contest
Calculator
CalculatorResult
Gallery
Project
Collection
Notification
Report
Bookmark
Reaction
AnalyticsEvent
```

The exact schema should be finalised in a dedicated database design
phase.

------------------------------------------------------------------------

# 24. Content Architecture

Content must be structured rather than treated as arbitrary page text.

Each content type should have:

-   Unique ID
-   Slug
-   Title
-   Description
-   Status
-   Author/owner
-   Category
-   Tags
-   Media
-   Published date
-   Updated date
-   SEO metadata
-   Visibility
-   Permissions
-   Analytics association

Content statuses may include:

``` text
Draft
Review
Scheduled
Published
Archived
Rejected
```

------------------------------------------------------------------------

# 25. CMS Requirements

Administrators/content teams should be able to:

-   Create content
-   Edit content
-   Schedule content
-   Publish/unpublish
-   Preview
-   Assign categories
-   Add tags
-   Upload media
-   Manage authors
-   Manage SEO metadata
-   Manage featured content
-   Manage related content
-   Review revisions

------------------------------------------------------------------------

# 26. SEO Architecture

SEO must be part of the data model and component architecture.

Every indexable page should have control over:

-   Title
-   Meta description
-   Canonical URL
-   Robots directives
-   Open Graph
-   Social metadata
-   Structured data
-   Sitemap inclusion
-   Breadcrumb data

## 26.1 Content SEO

Attract content should support:

-   Search-friendly URLs
-   Topic clusters
-   Internal linking
-   Related content
-   Author credibility
-   Updated dates
-   Structured headings
-   Semantic content
-   Fast page performance

------------------------------------------------------------------------

# 27. AEO / AI Search Optimization

Bizztopia should be prepared for discovery through:

-   Search engines
-   AI assistants
-   Voice search
-   Answer engines
-   Semantic search

Content should be structured so that important information is:

-   Clear
-   Factual
-   Contextual
-   Well-labelled
-   Entity-aware
-   Machine-readable
-   Supported by structured data where appropriate

AEO should not mean keyword stuffing.

The objective is to make Bizztopia genuinely useful and easy for
intelligent retrieval systems to understand.

------------------------------------------------------------------------

# 28. AI Architecture

AI should be implemented behind provider-agnostic application services.

Potential future capabilities:

-   Content ideation
-   Content summarisation
-   Metadata suggestions
-   FAQ generation assistance
-   Business description assistance
-   Semantic classification
-   Topic tagging
-   Content recommendations
-   Personalised discovery
-   Moderation assistance
-   Search assistance
-   AI-friendly content optimisation

AI-generated output should remain reviewable and controllable by
authorised users.

------------------------------------------------------------------------

# 29. Analytics Architecture

Bizztopia should implement first-party event tracking.

Potential events:

``` text
page_view
article_view
article_complete
quiz_start
quiz_complete
poll_vote
calculator_start
calculator_complete
content_share
content_save
question_created
answer_created
comment_created
review_submitted
gallery_view
image_view
business_profile_view
cta_click
form_start
form_submit
registration
login
```

Events should include relevant context without collecting unnecessary
personal data.

Analytics should eventually answer:

> Which content and experiences actually contribute to acquisition?

------------------------------------------------------------------------

# 30. Notifications

Notification channels may include:

-   In-app
-   Email
-   Push
-   SMS in future phases

Notification architecture should support:

-   Templates
-   Preferences
-   Event triggers
-   Queued delivery
-   Delivery status
-   Retry handling
-   Unsubscribe controls

------------------------------------------------------------------------

# 31. Security

Security requirements include:

-   Server-side authorization
-   CSRF protection
-   Secure authentication
-   Password hashing
-   Rate limiting
-   Input validation
-   Output escaping
-   File upload validation
-   Secure media handling
-   Secrets management
-   Audit logs
-   Admin access controls
-   Abuse prevention
-   Spam controls
-   Backup strategy

Never trust client-side validation alone.

------------------------------------------------------------------------

# 32. Performance

Performance should be treated as a product requirement.

Priorities:

-   Server-side rendering where appropriate
-   Efficient database queries
-   Query indexing
-   Caching
-   Redis
-   Queue background work
-   Image optimisation
-   Lazy loading
-   CDN delivery
-   Code splitting
-   Minimal JavaScript where possible
-   Avoid unnecessary third-party scripts

The platform should be designed around strong Core Web Vitals.

------------------------------------------------------------------------

# 33. Media Architecture

Images and media should not be handled as unstructured file uploads.

Media should have:

-   Owner
-   Type
-   MIME type
-   Size
-   Dimensions
-   Alt text
-   Caption
-   Credit
-   Storage location
-   Processing status
-   Visibility
-   Usage references

The system should support responsive image variants.

------------------------------------------------------------------------

# 34. Feature Flags

Feature flags should allow functionality to be enabled/disabled without
major code changes.

Example:

``` text
Bizztopia
├── Attract      ON
├── Engage       ON
├── Value        ON
├── Social       ON
├── Inspire      ON
└── Discover     OFF
```

Future:

``` text
Discover → ON
```

Feature flags should eventually support CAP-specific configuration.

------------------------------------------------------------------------

# 35. CAP Configuration Architecture

The long-term system should support configuration such as:

``` text
CAP
├── Name
├── Domain
├── Industry
├── Theme
├── Enabled Modules
├── Categories
├── Terminology
├── Content Types
├── Tools
├── Community Rules
├── Business Types
└── Feature Flags
```

This allows future CAPs to reuse the engine while changing the vertical
experience.

------------------------------------------------------------------------

# 36. Reusable vs Bizztopia-Specific

## 36.1 Reusable

Should be designed for reuse:

-   Authentication
-   User system
-   Roles
-   Permissions
-   Business accounts
-   Media
-   Content engine
-   Article engine
-   Community engine
-   Review engine
-   Quiz engine
-   Poll engine
-   Calculator framework
-   Gallery engine
-   Analytics
-   Notifications
-   SEO system
-   AEO foundation
-   Design system
-   Feature flags
-   Admin foundation

## 36.2 Bizztopia-Specific

Examples:

-   General-business categories
-   General-business terminology
-   General-business editorial content
-   Bizztopia-specific calculators
-   Bizztopia-specific quizzes
-   Bizztopia-specific inspiration categories
-   Bizztopia-specific branding

------------------------------------------------------------------------

# 37. Future CAP Replication Model

Once Bizztopia is mature:

``` text
MASTER CAP ENGINE
       |
       +-- Bizztopia
       |
       +-- Regentology
       |
       +-- Rate My Doc
       |
       +-- WeddingHub
       |
       +-- MuzzBizz
       |
       +-- HouzzWise
       |
       +-- KiddoTurf
       |
       +-- TruSecur
       |
       +-- Heritage Mutual Life
       |
       +-- Future Automotive Marketplace
       |
       +-- Future Legal Marketplace
       |
       +-- Pets & Vets
       |
       +-- DigiProp
```

The objective is not to copy and paste a complete application.

The objective is:

> **Reuse the engine, configure the vertical, customise the content and
> experience.**

------------------------------------------------------------------------

# 38. Future Discover Architecture

Discover is explicitly out of current implementation scope.

However, current data models should avoid making future Discover
difficult.

Future Discover may include:

-   Business discovery
-   Category discovery
-   Service discovery
-   Nearby discovery
-   Map discovery
-   Verified businesses
-   Featured businesses
-   Top-rated businesses
-   Business matching
-   Lead capture
-   Connection requests
-   Central Dataology integration

Future user journey:

``` text
Attract
   ↓
Engage
   ↓
Value
   ↓
Social
   ↓
Inspire
   ↓
Discover
   ↓
Business / Service
   ↓
Intent Form
   ↓
"Connect with this business"
       OR
"Keep browsing"
   ↓
CRM / Lead / Conversion
```

This is a future-phase architecture, not current implementation scope.

------------------------------------------------------------------------

# 39. Development Strategy

## Phase 1 --- Foundation

-   Laravel project
-   React + Inertia + TypeScript
-   Tailwind
-   Database
-   Authentication
-   Core design system
-   Layout
-   Navigation
-   User system
-   Roles and permissions
-   Media foundation
-   Admin foundation
-   Testing foundation

## Phase 2 --- Attract

-   Content model
-   Categories
-   Tags
-   Authors
-   Article management
-   Content hub
-   Article page
-   SEO
-   Related content
-   Publishing workflow

## Phase 3 --- Engage

-   Interactive engine
-   Polls
-   Quizzes
-   Campaigns
-   Giveaways/contests architecture
-   Results
-   Participation tracking
-   Analytics

## Phase 4 --- Value

-   Tool framework
-   Calculator engine
-   Result architecture
-   General-business calculators
-   Tool analytics
-   CTA integration

## Phase 5 --- Social

-   Community
-   Questions
-   Answers
-   Discussions
-   Comments
-   Reviews
-   Reactions
-   Reporting
-   Moderation

## Phase 6 --- Inspire

-   Galleries
-   Projects
-   Collections
-   Visual feeds
-   Media optimisation
-   User contributions
-   Inspiration categories

## Phase 7 --- Integration & Refinement

-   Cross-module linking
-   Recommendations
-   Analytics
-   Performance
-   SEO/AEO refinement
-   Accessibility
-   Security audit
-   UX refinement
-   Mobile refinement

## Phase 8 --- Master CAP Hardening

Before replicating Bizztopia:

-   Identify reusable modules
-   Remove unnecessary coupling
-   Formalise configuration
-   Formalise theme system
-   Formalise feature flags
-   Document contracts
-   Document module boundaries
-   Build replication checklist

------------------------------------------------------------------------

# 40. Definition of Done

A module is not considered complete merely because its pages exist.

A module is complete when:

-   Requirements are documented
-   UX flows are defined
-   UI is responsive
-   Design tokens are used
-   Components are reusable
-   Data is validated
-   Permissions are enforced
-   Errors are handled
-   Loading states exist
-   Empty states exist
-   Accessibility is considered
-   SEO is implemented where applicable
-   Analytics events exist
-   Tests exist
-   Performance is acceptable
-   Security requirements are met
-   Documentation is updated

------------------------------------------------------------------------

# 41. Quality Standard

Bizztopia should aim to feel like a mature product rather than a
collection of features.

Every feature should be evaluated against:

### UX

Is it obvious?

### Design

Does it feel consistent?

### Performance

Is it fast?

### Accessibility

Can different users operate it?

### SEO/AEO

Can search and intelligent systems understand it?

### Scalability

Can it grow?

### Modularity

Can it be changed independently?

### Reusability

Can another CAP use it?

### Analytics

Can we measure its impact?

### Security

Can it be trusted?

------------------------------------------------------------------------

# 42. Non-Goals for the Current Phase

The following should not expand the initial scope without an explicit
product decision:

-   Full Discover implementation
-   Central Dataology integration
-   All 13 CAPs
-   Complete enterprise CRM
-   Complex marketplace transactions
-   Full financial/payment infrastructure
-   Advanced AI automation
-   Every possible calculator
-   Every possible engagement type

The objective is to build a **strong, complete master foundation**, not
to implement every future idea simultaneously.

------------------------------------------------------------------------

# 43. Guiding Principles

1.  **Bizztopia is the master CAP reference implementation.**
2.  **Modules must be independently maintainable.**
3.  **Reusable infrastructure must be separated from vertical-specific
    content.**
4.  **Design must be tokenised and centrally controllable.**
5.  **SEO/AEO must be architectural, not an afterthought.**
6.  **Performance must be considered from the beginning.**
7.  **Analytics must measure real user behaviour.**
8.  **Security must be enforced server-side.**
9.  **Discover is future scope, not current implementation.**
10. **The platform must be built for eventual CAP replication.**
11. **Content should provide genuine value before asking users to
    convert.**
12. **The system should evolve without requiring complete rebuilds.**

------------------------------------------------------------------------

# 44. Current Master Architecture

``` text
                         TECHCEPTION
                              |
                 MASTER CAP ARCHITECTURE
                              |
                          BIZztopia
                              |
        +---------------------+---------------------+
        |                     |                     |
     ATTRACT               ENGAGE                VALUE
        |                     |                     |
   Knowledge             Interaction             Tools
        |                     |                     |
        +---------------------+---------------------+
                              |
                           SOCIAL
                              |
                       Community / UGC
                              |
                              v
                           INSPIRE
                              |
                    Visual / Aspirational
                              |
                              v
                    [DISCOVER — FUTURE]
                              |
                    Business Connection
                              |
                       CRM / Conversion
```

------------------------------------------------------------------------

# 45. Final Product Principle

Bizztopia should not be treated as:

> "A website with five sections."

It should be treated as:

> **A modular customer acquisition ecosystem consisting of independent
> but interconnected experiences.**

The ultimate architectural objective is:

``` text
Build once.
Modularise properly.
Document everything.
Measure everything.
Improve continuously.
Replicate intelligently.
Customise by industry.
```

Bizztopia is therefore the **blueprint for the future Techception CAP
ecosystem**.

------------------------------------------------------------------------

## Appendix A --- Initial CAP Replication Matrix

  -----------------------------------------------------------------------
  CAP                     Industry                Current Module Strategy
  ----------------------- ----------------------- -----------------------
  Bizztopia               General Businesses      Master reference

  Regentology             Real Estate             Future vertical
                          Professionals           

  Rate My Doc             Doctors & Healthcare    Future vertical

  WeddingHub              Wedding Professionals   Future vertical

  MuzzBizz                Muslim-Owned Businesses Future vertical

  HouzzWise               Home Improvement        Future vertical

  KiddoTurf               Kids & Family           Future vertical

  TruSecur                Home Security, Solar &  Future vertical
                          Energy                  

  Heritage Mutual Life    Insurance, Investments  Future vertical
                          & Retirement            

  Future Automotive       Automotive              Future vertical
  Marketplace                                     

  Future Legal            Legal                   Future vertical
  Marketplace                                     

  Pets & Vets             Pet Care & Veterinary   Future vertical

  DigiProp                Fractional Real Estate  Future vertical
                          Investment              
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Appendix B --- Open Decisions

The following decisions should be finalised during detailed design
rather than guessed prematurely:

-   Exact Bizztopia brand palette
-   Exact typography
-   Final logo/brand assets
-   Exact navigation structure
-   Final page inventory
-   Final database schema
-   Exact search engine
-   Exact cloud/storage provider
-   Final CRM integration contract
-   Final email/SMS provider
-   Final AI provider(s)
-   Final analytics provider
-   Final hosting/deployment infrastructure
-   Exact subscription/monetisation model
-   Legal/privacy requirements
-   Final moderation policy
-   Final content governance process

These should be documented as decisions when approved.

------------------------------------------------------------------------

# Appendix C --- Decision Log

  -----------------------------------------------------------------------
  ID                      Decision                Status
  ----------------------- ----------------------- -----------------------
  DEC-001                 Laravel is the backend  Confirmed
                          framework               

  DEC-002                 React is the frontend   Confirmed
                          framework               

  DEC-003                 Inertia is the          Proposed
                          Laravel/React bridge    

  DEC-004                 TypeScript will be used Proposed

  DEC-005                 Tailwind CSS will be    Proposed
                          used                    

  DEC-006                 Bizztopia will be the   Confirmed
                          master CAP              
                          implementation          

  DEC-007                 Five modules are        Confirmed
                          current scope: Attract, 
                          Engage, Value, Social,  
                          Inspire                 

  DEC-008                 Discover is future      Confirmed
                          scope                   

  DEC-009                 Modules should be       Confirmed
                          independently           
                          maintainable            

  DEC-010                 Styling should use a    Confirmed
                          central design          
                          system/tokens           

  DEC-011                 Future CAPs should      Confirmed
                          reuse the master        
                          architecture            

  DEC-012                 PostgreSQL is the       Proposed
                          preferred database      

  DEC-013                 Redis/Horizon are       Proposed
                          preferred for           
                          cache/queues            
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Appendix D --- Change Management

This document is a living specification.

When a significant architectural or product decision changes:

1.  Update the relevant section.
2.  Add a Decision Log entry where appropriate.
3.  Update affected module documentation.
4.  Update technical architecture.
5.  Update implementation tasks.
6.  Review downstream CAP replication impact.

No major feature should be implemented in a way that silently
contradicts this specification.

------------------------------------------------------------------------

**End of Bizztopia Master Specification --- Version 0.1**
