<!DOCTYPE html>

<html class="h-full bg-slate-50" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Bilik Kuliah (BK1 - Level 1) - Faculty Venue Portal</title>
<!-- Tailwind CSS CDN with Forms & Container Queries plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- FontAwesome Icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"/>
<!-- Google Fonts: Plus Jakarta Sans -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind Configuration -->
<script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
              950: '#0f172a',
            }
          }
        }
      }
    }
  </script>
<!-- Custom CSS for typography and scrollbars -->
<style data-purpose="custom-layout">
    body {
      font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    }
    .custom-scrollbar::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
</head>
<body class="min-h-full flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 bg-[#f8f9ff]">
<!-- BEGIN: NavigationShell -->
<header class="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-sm backdrop-blur-md bg-white/95">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex items-center justify-between h-16">
<!-- Left: Logo & Portal Identity -->
<div class="flex items-center space-x-4">
<a class="flex items-center space-x-3 group" href="#" title="Faculty of Computing &amp; Informatics">
<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200">
<i class="fa-solid fa-landmark text-lg"></i>
</div>
<div>
<div class="flex items-center space-x-1.5">
<span class="font-bold text-slate-900 text-sm tracking-tight">Faculty Venue Portal</span>
<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">FCIT</span>
</div>
<p class="text-xs text-slate-500 font-medium">Faculty of Computing &amp; Informatics</p>
</div>
</a>
<!-- Primary Navigation Links -->
<nav class="hidden xl:flex items-center space-x-1 ml-6 border-l border-slate-200 pl-6 text-sm">
<a class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-lg transition-colors" href="#">
<i class="fa-regular fa-chart-bar mr-1.5 text-slate-400"></i>Dashboard
            </a>
<a class="px-3 py-2 text-blue-700 bg-blue-50 font-semibold rounded-lg transition-colors" href="#">
<i class="fa-solid fa-door-open mr-1.5 text-blue-600"></i>Venues &amp; Halls
            </a>
<a class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-lg transition-colors" href="#">
<i class="fa-regular fa-calendar-plus mr-1.5 text-slate-400"></i>Book a Venue
            </a>
<a class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-lg transition-colors inline-flex items-center" href="#">
<i class="fa-regular fa-clock mr-1.5 text-slate-400"></i>Booking Requests
              <span class="ml-1.5 px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full">4</span>
</a>
<a class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-lg transition-colors" href="#">
<i class="fa-regular fa-calendar-days mr-1.5 text-slate-400"></i>Schedule
            </a>
<a class="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-lg transition-colors" href="#">
<i class="fa-solid fa-screwdriver-wrench mr-1.5 text-slate-400"></i>Maintenance
            </a>
</nav>
</div>
<!-- Right: Search, Quick Action & User Profile -->
<div class="flex items-center space-x-3">
<!-- Global Search Shortcut -->
<button class="hidden md:flex items-center px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-all shadow-inner" type="button">
<i class="fa-solid fa-magnifying-glass mr-2"></i>
<span>Quick search...</span>
<kbd class="ml-3 font-mono bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-semibold">⌘K</kbd>
</button>
<!-- Notification Bell -->
<button class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Notifications" type="button">
<i class="fa-regular fa-bell text-base"></i>
<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
</button>
<!-- Role Switcher -->
<button class="hidden sm:inline-flex items-center px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors" type="button">
<i class="fa-solid fa-repeat mr-1.5 text-slate-400"></i>Switch Role
          </button>
<!-- Profile Badge -->
<div class="flex items-center pl-2 sm:border-l sm:border-slate-200 space-x-2.5">
<div class="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs ring-2 ring-blue-500/20">
              AI
            </div>
<div class="hidden lg:block text-left">
<div class="text-xs font-bold text-slate-900 leading-tight">Alif Izuddin</div>
<div class="text-[11px] text-slate-500 leading-tight">Faculty Admin</div>
</div>
</div>
</div>
</div>
</div>
</header>
<!-- END: NavigationShell -->
<!-- BEGIN: MainContent -->
<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
<!-- BEGIN: VenueHeaderBanner -->
<div class="mb-6">
<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumb" class="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-3">
<a class="hover:text-blue-600 transition-colors" href="#">Faculty Portal</a>
<i class="fa-solid fa-chevron-right text-[9px] text-slate-400"></i>
<a class="hover:text-blue-600 transition-colors" href="#">Venues &amp; Halls</a>
<i class="fa-solid fa-chevron-right text-[9px] text-slate-400"></i>
<a class="hover:text-blue-600 transition-colors" href="#">Block N28</a>
<i class="fa-solid fa-chevron-right text-[9px] text-slate-400"></i>
<span aria-current="page" class="text-slate-800 font-semibold">Bilik Kuliah (BK1)</span>
</nav>
<!-- Title, Badges & Quick Action Row -->
<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200">
<div>
<div class="flex flex-wrap items-center gap-3">
<h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bilik Kuliah (BK1 - Level 1)
            </h1>
<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Available Now
            </span>
<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
<i class="fa-solid fa-graduation-cap mr-1 text-slate-400"></i> General Lecture Hall
            </span>
</div>
<p class="text-sm text-slate-500 mt-1 flex items-center gap-2">
<span><i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> Block N28, Level 1 (Wing A), FCIT Complex</span>
<span>•</span>
<span><i class="fa-solid fa-users text-slate-400 mr-1"></i> Standard 40 Pax Layout</span>
</p>
</div>
<!-- Action Buttons -->
<div class="flex items-center space-x-2.5 shrink-0">
<button class="inline-flex items-center px-3.5 py-2 border border-slate-200 shadow-sm text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 focus:outline-none transition-all" type="button">
<i class="fa-regular fa-share-from-square mr-1.5 text-slate-500"></i> Share Link
          </button>
<button class="inline-flex items-center px-3.5 py-2 border border-slate-200 shadow-sm text-xs font-semibold rounded-lg text-rose-700 bg-white hover:bg-rose-50 hover:border-rose-200 focus:outline-none transition-all" type="button">
<i class="fa-solid fa-triangle-exclamation mr-1.5 text-rose-500"></i> Report Issue
          </button>
<a class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/30 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" href="#booking-card">
<i class="fa-regular fa-calendar-check mr-2"></i> Book This Venue
          </a>
</div>
</div>
</div>
<!-- END: VenueHeaderBanner -->
<!-- BEGIN: MainContentGrid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<!-- LEFT / MAIN COLUMN: Specs, Gallery, Amenities & Timetable (8 Cols) -->
<div class="lg:col-span-8 space-y-6">
<!-- Photo Gallery Showcase -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm" data-purpose="photo-gallery">
<div class="relative overflow-hidden rounded-xl bg-slate-100 group border border-slate-200">
<!-- Provided Reference Image https://lh3.googleusercontent.com/aida-public/AB6AXuAQD459cHFRoLIWx0wQmQpDLk5pSBSCX4m2TKF6_0nLzvicTK5r8wEShp9emksPfoIDuU97fKJQ1SJC9G_A855ul8-zGW9FUV80Ggn_0g7k9KNTQh70REBuPShx0_Fqho1xJc9jMz9Bl3L0F6AelRIWtenwW-ptkutexR8Pg2E7UW7l2VnqHq3QnRr2D4MjZAV9Uh3LCD0r1Bx1RuZlUn-twzjGoHvnOfkBhMxoFuyJMi7utIUMae5ym1xxtnQA1PZ4xQ -->
<img alt="Bilik Kuliah Classroom View" class="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-[1.01] transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQD459cHFRoLIWx0wQmQpDLk5pSBSCX4m2TKF6_0nLzvicTK5r8wEShp9emksPfoIDuU97fKJQ1SJC9G_A855ul8-zGW9FUV80Ggn_0g7k9KNTQh70REBuPShx0_Fqho1xJc9jMz9Bl3L0F6AelRIWtenwW-ptkutexR8Pg2E7UW7l2VnqHq3QnRr2D4MjZAV9Uh3LCD0r1Bx1RuZlUn-twzjGoHvnOfkBhMxoFuyJMi7utIUMae5ym1xxtnQA1PZ4xQ"/>
<div class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-medium flex items-center space-x-2 shadow-sm">
<i class="fa-solid fa-camera"></i>
<span>Main Classroom &amp; Projection View</span>
</div>
<div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-800 text-xs font-bold border border-white/50 shadow-sm">
<i class="fa-solid fa-expand mr-1 text-slate-500"></i> View 4 Photos
            </div>
</div>
<!-- Gallery Thumbnails -->
<div class="grid grid-cols-4 gap-3 mt-3">
<button class="relative rounded-lg overflow-hidden border-2 border-blue-600 aspect-video ring-2 ring-blue-500/20 focus:outline-none" type="button">
<img alt="Front View" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQD459cHFRoLIWx0wQmQpDLk5pSBSCX4m2TKF6_0nLzvicTK5r8wEShp9emksPfoIDuU97fKJQ1SJC9G_A855ul8-zGW9FUV80Ggn_0g7k9KNTQh70REBuPShx0_Fqho1xJc9jMz9Bl3L0F6AelRIWtenwW-ptkutexR8Pg2E7UW7l2VnqHq3QnRr2D4MjZAV9Uh3LCD0r1Bx1RuZlUn-twzjGoHvnOfkBhMxoFuyJMi7utIUMae5ym1xxtnQA1PZ4xQ"/>
<div class="absolute inset-0 bg-blue-900/10 flex items-center justify-center text-[11px] font-bold text-white bg-slate-950/20">Front</div>
</button>
<div class="relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 hover:opacity-90 cursor-pointer flex flex-col items-center justify-center text-slate-500 text-xs p-2 text-center">
<i class="fa-solid fa-desktop mb-1 text-slate-400"></i>
<span class="text-[11px] font-medium leading-none">100" Screen</span>
</div>
<div class="relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 hover:opacity-90 cursor-pointer flex flex-col items-center justify-center text-slate-500 text-xs p-2 text-center">
<i class="fa-solid fa-chalkboard mb-1 text-slate-400"></i>
<span class="text-[11px] font-medium leading-none">Whiteboard</span>
</div>
<div class="relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 hover:opacity-90 cursor-pointer flex flex-col items-center justify-center text-slate-500 text-xs p-2 text-center">
<i class="fa-solid fa-users-rectangle mb-1 text-slate-400"></i>
<span class="text-[11px] font-medium leading-none">Seating Plan</span>
</div>
</div>
</section>
<!-- Quick Specifications Summary Grid -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm" data-purpose="quick-specifications">
<h2 class="text-base font-bold text-slate-900 mb-4 flex items-center">
<i class="fa-solid fa-list-check text-blue-600 mr-2"></i> Key Specifications
          </h2>
<div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
<div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
<span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Capacity</span>
<p class="text-sm font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-user-group text-blue-600 mr-1.5 text-xs"></i> 40 Seats
              </p>
<span class="text-[11px] text-slate-500 mt-0.5 block">Standard Classroom</span>
</div>
<div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
<span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Location</span>
<p class="text-sm font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-building text-blue-600 mr-1.5 text-xs"></i> Block N28
              </p>
<span class="text-[11px] text-slate-500 mt-0.5 block">Level 1, Room BK1</span>
</div>
<div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
<span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Climate Control</span>
<p class="text-sm font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-snowflake text-blue-600 mr-1.5 text-xs"></i> Inverter AC
              </p>
<span class="text-[11px] text-emerald-600 font-medium mt-0.5 block">2x Split-Units Active</span>
</div>
<div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
<span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Presentation</span>
<p class="text-sm font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-video text-blue-600 mr-1.5 text-xs"></i> Ceiling Projector
              </p>
<span class="text-[11px] text-slate-500 mt-0.5 block">HDMI &amp; Type-C Cable</span>
</div>
<div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
<span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Connectivity</span>
<p class="text-sm font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-wifi text-blue-600 mr-1.5 text-xs"></i> WiFi 6 &amp; Gigabit
              </p>
<span class="text-[11px] text-slate-500 mt-0.5 block">High-density AP-BK1</span>
</div>
<div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
<span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Access Method</span>
<p class="text-sm font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-key text-blue-600 mr-1.5 text-xs"></i> Smart Keypad
              </p>
<span class="text-[11px] text-slate-500 mt-0.5 block">SMS/Email PIN Provided</span>
</div>
</div>
</section>
<!-- Comprehensive Facility & Amenities Checklist -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm" data-purpose="amenities-details">
<div class="flex items-center justify-between mb-4">
<h2 class="text-base font-bold text-slate-900 flex items-center">
<i class="fa-solid fa-boxes-packing text-blue-600 mr-2"></i> Facilities &amp; Amenities Included
            </h2>
<span class="text-xs text-slate-500 font-medium">Verified by FCIT Maintenance: Oct 2026</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<!-- Category 1: AV & Presentation -->
<div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
<div class="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-3">
<div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
<i class="fa-solid fa-tv"></i>
</div>
<span>Audio-Visual &amp; Display</span>
</div>
<ul class="space-y-2 text-xs text-slate-600">
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Epson Laser Projector (1080p Full HD)</strong> ceiling-mounted with remote</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Motorized 100" Matte Projection Screen</strong> with wall controller</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Dual Ceramic Whiteboards</strong> with marker refill station and magnetic duster</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Lecturer Podium switcher</strong> (HDMI 2.0 &amp; USB-C DisplayPort support)</span>
</li>
</ul>
</div>
<!-- Category 2: Climate & Seating Comfort -->
<div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
<div class="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-3">
<div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
<i class="fa-solid fa-chair"></i>
</div>
<span>Climate &amp; Seating Comfort</span>
</div>
<ul class="space-y-2 text-xs text-slate-600">
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Dual 2.5HP Inverter Air-Conditioners</strong> pre-cooled during lecture hours</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>40 Fabric Cushioned Chairs</strong> equipped with foldable writing tablets</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Lecturer Desk</strong> with height-adjustable ergonomic swivel chair</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Acoustic Ceiling Tiles</strong> reducing echo during presentations</span>
</li>
</ul>
</div>
<!-- Category 3: Power & Connectivity -->
<div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
<div class="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-3">
<div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
<i class="fa-solid fa-plug"></i>
</div>
<span>Power &amp; Connectivity</span>
</div>
<ul class="space-y-2 text-xs text-slate-600">
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Under-desk 240V Power Outlets</strong> (1 socket shared per 2 students)</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>UTM-WiFi 6 Enterprise Access Point</strong> located directly in the room</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>2x Dedicated Gigabit RJ45 Wall Ports</strong> at lecturer podium</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span>Surge-protected electrical distribution box</span>
</li>
</ul>
</div>
<!-- Category 4: Safety & Accessibility -->
<div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
<div class="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-3">
<div class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
<i class="fa-solid fa-shield-halved"></i>
</div>
<span>Safety &amp; Accessibility</span>
</div>
<ul class="space-y-2 text-xs text-slate-600">
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Wheelchair Friendly</strong> ground-to-level elevator &amp; ramp access</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span><strong>Dual Fire Safety Doors</strong> with illuminated emergency exit signs</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span>Automated smoke detector and ceiling sprinkler system</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 mr-2 shrink-0"></i>
<span>2kg CO2 Fire Extinguisher adjacent to entrance</span>
</li>
</ul>
</div>
</div>
</section>
<!-- Interactive Timetable & Real-Time Availability Schedule -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm" data-purpose="venue-timetable">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
<div>
<h2 class="text-base font-bold text-slate-900 flex items-center">
<i class="fa-regular fa-calendar text-blue-600 mr-2"></i> Today's Schedule &amp; Slot Availability
              </h2>
<p class="text-xs text-slate-500 mt-0.5">Wednesday, 14 October 2026 • Semester 1 Session 2026/2027</p>
</div>
<div class="flex items-center space-x-2">
<button class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200">Today</button>
<button class="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100">Week View</button>
</div>
</div>
<!-- Time Slot Badges Legend -->
<div class="flex items-center space-x-4 text-xs font-medium text-slate-600 mb-3 pb-3 border-b border-slate-100">
<span class="flex items-center"><span class="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 mr-1.5"></span> Available</span>
<span class="flex items-center"><span class="w-3 h-3 rounded bg-blue-100 border border-blue-300 mr-1.5"></span> Academic Lecture</span>
<span class="flex items-center"><span class="w-3 h-3 rounded bg-amber-100 border border-amber-300 mr-1.5"></span> Reserved / Buffer</span>
</div>
<!-- Timeline slots -->
<div class="space-y-2.5">
<!-- Slot 1 -->
<div class="flex items-center p-3 rounded-xl border border-blue-200 bg-blue-50/40">
<div class="w-28 shrink-0 text-xs font-bold text-blue-900">08:00 - 10:00</div>
<div class="flex-1 px-3 border-l border-blue-200">
<div class="text-xs font-bold text-slate-800">SECJ1013 - Programming Technique I</div>
<div class="text-[11px] text-slate-500">Dr. Norazah • 36 Students Registered • Section 04</div>
</div>
<span class="px-2.5 py-1 text-[11px] font-semibold bg-blue-100 text-blue-800 rounded-md">Lecture In-Progress</span>
</div>
<!-- Slot 2 -->
<div class="flex items-center p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 transition-colors">
<div class="w-28 shrink-0 text-xs font-bold text-emerald-900">10:00 - 12:00</div>
<div class="flex-1 px-3 border-l border-emerald-200">
<div class="text-xs font-bold text-emerald-900">Available for Booking</div>
<div class="text-[11px] text-emerald-700">Open for faculty seminars, ad-hoc student meetings, or makeup classes</div>
</div>
<a class="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-all" href="#booking-card">Book Slot</a>
</div>
<!-- Slot 3 -->
<div class="flex items-center p-3 rounded-xl border border-amber-200 bg-amber-50/30">
<div class="w-28 shrink-0 text-xs font-bold text-amber-900">12:00 - 14:00</div>
<div class="flex-1 px-3 border-l border-amber-200">
<div class="text-xs font-bold text-slate-800">Faculty Recess &amp; Room Ventilation Buffer</div>
<div class="text-[11px] text-slate-500">Scheduled maintenance check by FCIT operations team</div>
</div>
<span class="px-2.5 py-1 text-[11px] font-semibold bg-amber-100 text-amber-800 rounded-md">Reserved Buffer</span>
</div>
<!-- Slot 4 -->
<div class="flex items-center p-3 rounded-xl border border-blue-200 bg-blue-50/40">
<div class="w-28 shrink-0 text-xs font-bold text-blue-900">14:00 - 16:00</div>
<div class="flex-1 px-3 border-l border-blue-200">
<div class="text-xs font-bold text-slate-800">SECJ3543 - Software Engineering Principles</div>
<div class="text-[11px] text-slate-500">Prof. Dr. Hairil • 38 Students Registered • Section 01</div>
</div>
<span class="px-2.5 py-1 text-[11px] font-semibold bg-blue-100 text-blue-800 rounded-md">Scheduled Class</span>
</div>
<!-- Slot 5 -->
<div class="flex items-center p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 transition-colors">
<div class="w-28 shrink-0 text-xs font-bold text-emerald-900">16:00 - 18:00</div>
<div class="flex-1 px-3 border-l border-emerald-200">
<div class="text-xs font-bold text-emerald-900">Available for Booking</div>
<div class="text-[11px] text-emerald-700">Open for co-curricular club sessions or evening review classes</div>
</div>
<a class="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-all" href="#booking-card">Book Slot</a>
</div>
</div>
</section>
</div>
<!-- RIGHT COLUMN: Booking Widget, Rules & Custodian Support (4 Cols) -->
<div class="lg:col-span-4 space-y-6">
<!-- Quick Booking Card -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm sticky top-20" data-purpose="booking-widget" id="booking-card">
<div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
<div>
<span class="text-xs font-semibold text-blue-600 uppercase tracking-wider block">Reservation Portal</span>
<h3 class="text-lg font-extrabold text-slate-900">Reserve Bilik Kuliah (BK1)</h3>
</div>
<div class="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
<i class="fa-regular fa-calendar-check"></i>
</div>
</div>
<form action="#" class="space-y-4" method="POST">
<!-- Date Picker -->
<div>
<label class="block text-xs font-bold text-slate-700 mb-1">Reservation Date</label>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
<i class="fa-regular fa-calendar"></i>
</div>
<input class="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium text-slate-800" type="date" value="2026-10-14"/>
</div>
</div>
<!-- Time Slot Selection -->
<div>
<label class="block text-xs font-bold text-slate-700 mb-1">Select Available Time Slot</label>
<select class="block w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium text-slate-800">
<option value="10-12">10:00 AM - 12:00 PM (Available)</option>
<option value="16-18">04:00 PM - 06:00 PM (Available)</option>
<option value="18-20">06:00 PM - 08:00 PM (Evening Special)</option>
</select>
</div>
<!-- Expected Pax -->
<div>
<div class="flex justify-between items-center mb-1">
<label class="block text-xs font-bold text-slate-700">Estimated Attendees</label>
<span class="text-[11px] text-slate-400">Max. 40 Pax</span>
</div>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
<i class="fa-solid fa-users text-xs"></i>
</div>
<input class="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-slate-800" max="40" min="1" type="number" value="25"/>
</div>
</div>
<!-- Booking Purpose -->
<div>
<label class="block text-xs font-bold text-slate-700 mb-1">Purpose / Session Title</label>
<input class="block w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-slate-800 placeholder-slate-400" placeholder="e.g. Student Chapter Workshop, Makeup Lecture" type="text"/>
</div>
<!-- Booking Approver Alert -->
<div class="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start space-x-2.5">
<i class="fa-solid fa-circle-info text-blue-600 text-xs mt-0.5 shrink-0"></i>
<p class="text-[11px] text-blue-900 leading-relaxed">
<strong>Instant Auto-Endorsement:</strong> Active academic staff and faculty administrators qualify for instant approval on Bilik Kuliah BK1.
              </p>
</div>
<!-- Submit Button -->
<button class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2" type="submit">
<span>Proceed to Booking Confirmation</span>
<i class="fa-solid fa-arrow-right text-xs"></i>
</button>
</form>
</section>
<!-- Venue Rules & Policies Card -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm" data-purpose="venue-rules">
<h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
<i class="fa-solid fa-scale-balanced text-slate-400 mr-2"></i> Policies &amp; Code of Conduct
          </h3>
<ul class="space-y-2.5 text-xs text-slate-600">
<li class="flex items-start">
<i class="fa-solid fa-ban text-rose-500 mr-2 mt-0.5 shrink-0"></i>
<span><strong>Strict No-Food Policy:</strong> Plain bottled water is permissible. Heavy meals must be held outside.</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-power-off text-amber-500 mr-2 mt-0.5 shrink-0"></i>
<span><strong>Energy Conservation:</strong> Please switch off air-conditioners, projector, and lights after checkout.</span>
</li>
<li class="flex items-start">
<i class="fa-solid fa-key text-blue-500 mr-2 mt-0.5 shrink-0"></i>
<span><strong>PIN Access Code:</strong> Will be dispatched via SMS &amp; Email 30 minutes prior to reservation start.</span>
</li>
</ul>
</section>
<!-- Custodian & Technical Support Card -->
<section class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm" data-purpose="custodian-support">
<h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
<i class="fa-solid fa-headset text-slate-400 mr-2"></i> Venue Custodian &amp; Support
          </h3>
<div class="flex items-center space-x-3 mb-3 pb-3 border-b border-slate-100">
<div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
              RZ
            </div>
<div>
<div class="text-xs font-bold text-slate-900">En. Razak Bin Daud</div>
<div class="text-[11px] text-slate-500">Senior Facility &amp; AV Technician (N28)</div>
</div>
</div>
<div class="space-y-2 text-xs">
<div class="flex items-center justify-between text-slate-600">
<span><i class="fa-solid fa-phone text-slate-400 mr-1.5"></i> Direct Ext:</span>
<span class="font-semibold text-slate-800">Ext. 3088 / Bilik Operasi</span>
</div>
<div class="flex items-center justify-between text-slate-600">
<span><i class="fa-solid fa-clock text-slate-400 mr-1.5"></i> Office Hours:</span>
<span class="font-semibold text-slate-800">08:00 AM - 05:00 PM</span>
</div>
<div class="flex items-center justify-between text-slate-600">
<span><i class="fa-solid fa-bolt text-emerald-500 mr-1.5"></i> Technical Dispatch:</span>
<span class="inline-flex items-center font-semibold text-emerald-600">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span> On-Duty
              </span>
</div>
</div>
</section>
</div>
<!-- END: RIGHT COLUMN -->
</div>
<!-- END: MainContentGrid -->
</main>
<!-- END: MainContent -->
<!-- BEGIN: MainFooter -->
<footer class="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
<div class="flex items-center space-x-2">
<div class="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px]">
<i class="fa-solid fa-landmark"></i>
</div>
<span class="font-semibold text-slate-700">Faculty Venue Management System (VMS)</span>
<span>•</span>
<span>Faculty of Computing &amp; Informatics (FCIT)</span>
</div>
<div class="flex items-center space-x-6">
<a class="hover:text-blue-600 transition-colors" href="#">Venue SOP &amp; Guidelines</a>
<a class="hover:text-blue-600 transition-colors" href="#">IT Helpdesk</a>
<a class="hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
<span class="text-slate-400 font-mono text-[11px]">v2.4.2-prod</span>
</div>
</div>
</footer>
<!-- END: MainFooter -->
</body></html>