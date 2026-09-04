<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50 text-slate-900 antialiased">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>Bizztopia — Verified Business Directory & Marketplace</title>
    <meta name="description" content="Bizztopia connects business owners with 300,000+ vetted vendors, verified service contractors, and B2B growth partners across North America.">
    <meta name="keywords" content="b2b marketplace, business directory, verified vendors, service contractors, b2b growth, small business tools, commercial services, Bizztopia">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="author" content="Bizztopia Network">
    <meta name="theme-color" content="#0B4778">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Bizztopia">
    <meta property="og:url" content="https://bizztopia.net">
    <meta property="og:title" content="Bizztopia — Verified Business Directory & Marketplace">
    <meta property="og:description" content="Bizztopia connects business owners with 300,000+ vetted vendors, verified service contractors, and B2B growth partners across North America.">
    <meta property="og:image" content="https://bizztopia.net/Bizztopia_logo.jpg">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@bizztopia">
    <meta name="twitter:title" content="Bizztopia — Verified Business Directory & Marketplace">
    <meta name="twitter:description" content="Bizztopia connects business owners with 300,000+ vetted vendors, verified service contractors, and B2B growth partners.">
    <meta name="twitter:image" content="https://bizztopia.net/Bizztopia_logo.jpg">

    <!-- Resource Preconnects for Image CDNs -->
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    <link rel="dns-prefetch" href="https://images.unsplash.com">

    <!-- Preload LCP Hero Background Image -->
    <link rel="preload" as="image" href="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70" fetchpriority="high">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://bizztopia.net">

    <!-- Favicon / Tab Logo -->
    <link rel="icon" type="image/png" sizes="32x32" href="/images/tab-logo.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/tab-logo.png">
    <link rel="shortcut icon" href="/images/tab-logo.png">
    <link rel="apple-touch-icon" href="/images/tab-logo.png">

    <!-- JSON-LD Structured Data Schema for Google Search -->
    @verbatim
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://bizztopia.net/#organization",
          "name": "Bizztopia",
          "url": "https://bizztopia.net",
          "logo": "https://bizztopia.net/Bizztopia_logo.jpg",
          "description": "Premier B2B ecosystem, business directory, and verified vendor network connecting SMBs with top-tier service contractors across North America.",
          "sameAs": [
            "https://twitter.com/bizztopia",
            "https://linkedin.com/company/bizztopia"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://bizztopia.net/#website",
          "url": "https://bizztopia.net",
          "name": "Bizztopia",
          "publisher": {
            "@id": "https://bizztopia.net/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://bizztopia.net/ideas?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    }
    </script>
    @endverbatim

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="h-full font-outfit antialiased bg-slate-50 text-slate-900 selection:bg-[#287FBA] selection:text-white">
    @inertia
</body>
</html>
