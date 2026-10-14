<!DOCTYPE html>

<html class="h-full bg-background text-on-surface antialiased" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Faculty Venue Directory &amp; Live Availability | Faculty Venue Portal</title>
<!-- Google Fonts: Inter & Plus Jakarta Sans -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS with CDN -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration matching the Faculty Design System -->
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "error-container": "#ffdad6",
            "secondary-fixed": "#dbe1ff",
            "on-surface-variant": "#45474c",
            "on-secondary": "#ffffff",
            "on-tertiary-container": "#28a094",
            "secondary": "#0051d5",
            "on-tertiary-fixed": "#00201d",
            "surface-bright": "#f8f9ff",
            "on-tertiary-fixed-variant": "#005049",
            "inverse-on-surface": "#eaf1ff",
            "on-primary-container": "#8590a6",
            "background": "#f8f9ff",
            "on-tertiary": "#ffffff",
            "surface-variant": "#d3e4fe",
            "outline-variant": "#c5c6cd",
            "primary-container": "#1e293b",
            "primary-fixed-dim": "#bcc7de",
            "on-error-container": "#93000a",
            "on-secondary-fixed-variant": "#003ea8",
            "on-primary": "#ffffff",
            "inverse-primary": "#bcc7de",
            "on-background": "#0b1c30",
            "surface-container-high": "#dce9ff",
            "on-error": "#ffffff",
            "tertiary-fixed-dim": "#6bd8cb",
            "surface-container-lowest": "#ffffff",
            "on-secondary-container": "#fefcff",
            "secondary-container": "#316bf3",
            "surface-container-low": "#eff4ff",
            "error": "#ba1a1a",
            "tertiary-container": "#002f2a",
            "on-primary-fixed": "#111c2d",
            "primary-fixed": "#d8e3fb",
            "tertiary-fixed": "#89f5e7",
            "tertiary": "#001815",
            "inverse-surface": "#213145",
            "surface": "#f8f9ff",
            "surface-dim": "#cbdbf5",
            "on-primary-fixed-variant": "#3c475a",
            "surface-container": "#e5eeff",
            "primary": "#091426",
            "secondary-fixed-dim": "#b4c5ff",
            "on-surface": "#0b1c30",
            "outline": "#75777d",
            "surface-tint": "#545f73",
            "on-secondary-fixed": "#00174b",
            "surface-container-highest": "#d3e4fe"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "space-xs": "0.25rem",
            "space-xl": "2rem",
            "gutter-desktop": "1.5rem",
            "margin": "1rem",
            "space-md": "1rem",
            "gutter": "1.25rem",
            "margin-desktop": "2rem",
            "space-lg": "1.5rem",
            "space-sm": "0.5rem"
          },
          "fontFamily": {
            "label-md": ["Inter"],
            "body-lg": ["Inter"],
            "headline-lg-mobile": ["Plus Jakarta Sans"],
            "body-md": ["Inter"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "display-lg": ["Plus Jakarta Sans"],
            "caption": ["Inter"],
            "display-md": ["Plus Jakarta Sans"],
            "headline-sm": ["Plus Jakarta Sans"],
            "body-sm": ["Inter"],
            "label-sm": ["Inter"]
          },
          "fontSize": {
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-lg-mobile": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "headline-md": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.025em", "fontWeight": "700" }],
            "caption": ["11px", { "lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "500" }],
            "display-md": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
            "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
            "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.025em", "fontWeight": "600" }]
          }
        }
      }
    }
  </script>
</head>
<body class="min-h-full flex flex-col bg-background font-body-md text-on-surface">
<!-- =========================================================================
       TOP NAV BAR (Shared Component matching JSON exact specification)
       ========================================================================= -->
<header class="docked full-width top-0 sticky z-50 bg-surface-container-lowest dark:bg-primary-container text-primary dark:text-inverse-primary border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none">
<div class="w-full px-space-xl flex items-center justify-between h-16 max-w-full">
<!-- Left: Logo & Product Name -->
<div class="flex items-center space-x-6">
<a class="flex items-center gap-3" href="#">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
<span class="material-symbols-outlined text-[22px]">corporate_fare</span>
</div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md font-bold text-primary dark:text-surface-container-lowest tracking-tight">Faculty Venue Portal</span>
<span class="text-caption font-caption text-on-surface-variant font-medium">Faculty of Computing &amp; Informatics</span>
</div>
</a>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center space-x-6 ml-4 pt-4">
<!-- Dashboard (Inactive) -->
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]">dashboard</span>
<span>Dashboard</span>
</a>
<!-- Venues & Halls (Active per current page context) -->
<a class="text-secondary dark:text-secondary-fixed font-semibold border-b-2 border-secondary dark:border-secondary-fixed pb-4 text-label-md font-label-md flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">domain</span>
<span>Venues &amp; Halls</span>
</a>
<!-- Booking Requests (With Badge '4') -->
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]">event_available</span>
<span>Booking Requests</span>
<span class="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed-variant">4</span>
</a>
<!-- Schedule -->
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]">calendar_month</span>
<span>Schedule</span>
</a>
<!-- Maintenance -->
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]">engineering</span>
<span>Maintenance</span>
</a>
</nav>
</div>
<!-- Right: Search Bar, Notifications, Profile, Trailing Action -->
<div class="flex items-center gap-3">
<!-- Search bar on right -->
<div class="hidden md:flex items-center relative">
<span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
<input class="w-64 pl-9 pr-3 py-1.5 text-body-sm font-body-sm bg-surface-container-low border border-outline-variant/60 rounded-lg text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all" placeholder="Search Bilik, Hall, Lecturer ⌘K" type="text"/>
</div>
<!-- Trailing action: Notifications -->
<button class="relative p-2 text-on-surface-variant hover:text-secondary rounded-lg hover:bg-surface-container-low transition-colors active:scale-95 duration-100 ease-out" title="Notifications">
<span class="material-symbols-outlined text-[20px]">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
</button>
<div class="h-6 w-px bg-outline-variant/50 hidden sm:block"></div>
<!-- Trailing secondary action: Switch Role -->
<button class="hidden sm:inline-flex items-center gap-1 text-label-sm font-label-sm px-2.5 py-1.5 rounded-lg border border-outline-variant/80 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors">
<span class="material-symbols-outlined text-[16px]">sync_alt</span>
<span>Switch Role</span>
</button>
<!-- Profile Avatar & Info -->
<div class="flex items-center gap-2 pl-1">
<div class="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-sm shadow-sm ring-1 ring-secondary/20">
            AI
          </div>
<div class="hidden xl:flex flex-col text-left">
<span class="text-label-sm font-label-sm text-primary leading-tight font-semibold">Alif Izuddin</span>
<span class="text-caption font-caption text-on-surface-variant">Faculty Admin</span>
</div>
</div>
</div>
</div>
</header>
<!-- =========================================================================
       MAIN CANVAS CONTAINER
       ========================================================================= -->
<main class="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-space-xl py-6 space-y-6">
<!-- BREADCRUMBS & SECTION HEADER -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant/40">
<div>
<!-- Breadcrumbs -->
<nav class="flex items-center space-x-2 text-caption font-caption text-on-surface-variant mb-1">
<a class="hover:text-secondary transition-colors" href="#">Portal</a>
<span class="text-outline-variant">/</span>
<a class="hover:text-secondary transition-colors" href="#">Venues &amp; Halls</a>
<span class="text-outline-variant">/</span>
<span class="text-primary font-semibold">Directory &amp; Live Availability</span>
</nav>
<h1 class="text-headline-lg font-headline-lg text-primary tracking-tight">Faculty Venue Directory</h1>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
          Browse, filter, and inspect real-time availability for lecture halls, active learning labs, and tutorial rooms across blocks N28 &amp; N28A.
        </p>
</div>
<!-- Action Buttons -->
<div class="flex items-center gap-2.5 self-start md:self-auto">
<button class="inline-flex items-center gap-2 px-3.5 py-2 text-label-md font-label-md rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low active:scale-95 transition-all shadow-sm">
<span class="material-symbols-outlined text-[18px]">download</span>
<span>Export List / CSV</span>
</button>
<button class="inline-flex items-center gap-2 px-4 py-2 text-label-md font-label-md rounded-lg bg-primary text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
<span>+ Add New Venue</span>
</button>
</div>
</div>
<!-- =========================================================================
         QUICK STATS SUMMARY CARDS (Level 1 Elevation)
         ========================================================================= -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
<!-- Total Venues -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/70 shadow-sm flex items-center justify-between">
<div>
<span class="text-label-sm font-label-sm text-on-surface-variant">Total Venues</span>
<div class="text-display-md font-display-md text-primary mt-1 leading-none">48</div>
<span class="text-caption font-caption text-on-surface-variant mt-1.5 inline-block">Across Blocks N28 &amp; N28A</span>
</div>
<div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[22px]">apartment</span>
</div>
</div>
<!-- Available Now -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/70 shadow-sm flex items-center justify-between">
<div>
<span class="text-label-sm font-label-sm text-on-surface-variant">Available Now</span>
<div class="text-display-md font-display-md text-on-tertiary-container mt-1 leading-none">14</div>
<span class="text-caption font-caption text-on-tertiary-container font-semibold mt-1.5 inline-flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span> Instant Reservation
          </span>
</div>
<div class="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#15803D]">
<span class="material-symbols-outlined text-[22px]">check_circle</span>
</div>
</div>
<!-- Occupied / In Session -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/70 shadow-sm flex items-center justify-between">
<div>
<span class="text-label-sm font-label-sm text-on-surface-variant">Occupied / In Session</span>
<div class="text-display-md font-display-md text-secondary mt-1 leading-none">28</div>
<span class="text-caption font-caption text-on-surface-variant mt-1.5 inline-block">Lectures &amp; Seminars</span>
</div>
<div class="w-10 h-10 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[22px]">groups</span>
</div>
</div>
<!-- Under Maintenance -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/70 shadow-sm flex items-center justify-between">
<div>
<span class="text-label-sm font-label-sm text-on-surface-variant">Under Maintenance</span>
<div class="text-display-md font-display-md text-error mt-1 leading-none">2</div>
<span class="text-caption font-caption text-error font-medium mt-1.5 inline-block">Cisco Labs &amp; DK2 Aircond</span>
</div>
<div class="w-10 h-10 rounded-lg bg-error-container/40 border border-error-container flex items-center justify-center text-error">
<span class="material-symbols-outlined text-[22px]">build_circle</span>
</div>
</div>
</div>
<!-- =========================================================================
         ADVANCED FILTER & SEARCH CONTROL PANEL (Modernized from Image 2)
         ========================================================================= -->
<section class="bg-surface-container-lowest rounded-xl border border-outline-variant/80 p-5 shadow-sm space-y-4">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-outline-variant/40">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">tune</span>
<h2 class="text-headline-sm font-headline-sm text-primary">Availability &amp; Session Filters</h2>
<span class="text-caption font-caption px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant border border-outline-variant/40">Real-time DB query</span>
</div>
<div class="flex items-center gap-3">
<label class="relative inline-flex items-center cursor-pointer select-none">
<input checked="" class="sr-only peer" id="availableOnlyToggle" type="checkbox"/>
<div class="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
<span class="ml-2 text-label-sm font-label-sm text-primary">Show Available Only</span>
</label>
<span class="text-outline-variant">|</span>
<button class="text-label-sm font-label-sm text-on-surface-variant hover:text-error transition-colors flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[15px]">restart_alt</span>
<span>Reset Filters</span>
</button>
</div>
</div>
<!-- Main Input Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
<!-- Date Selector -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface-variant mb-1">Select Date</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">calendar_today</span>
<input class="w-full pl-9 pr-3 py-2 text-body-sm font-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" type="date" value="2024-10-24"/>
</div>
</div>
<!-- Start Time Slot -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface-variant mb-1">Start Time</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">schedule</span>
<input class="w-full pl-9 pr-3 py-2 text-body-sm font-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" type="time" value="09:00"/>
</div>
</div>
<!-- End Time Slot -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface-variant mb-1">End Time</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">update</span>
<input class="w-full pl-9 pr-3 py-2 text-body-sm font-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" type="time" value="11:00"/>
</div>
</div>
<!-- Location Filter -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface-variant mb-1">Block / Location</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">location_on</span>
<select class="w-full pl-9 pr-8 py-2 text-body-sm font-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary appearance-none cursor-pointer">
<option value="all">All Blocks (N28 &amp; N28A)</option>
<option value="n28">N28 - Main Faculty Block</option>
<option value="n28a">N28A - Postgraduate &amp; Labs</option>
<option value="auditorium">Dewan &amp; Auditoriums</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
<!-- Venue Type Selector -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface-variant mb-1">Venue Type</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">category</span>
<select class="w-full pl-9 pr-8 py-2 text-body-sm font-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary appearance-none cursor-pointer">
<option value="all">All Venue Types</option>
<option value="lecture">Bilik Kuliah / Lecture Room</option>
<option value="hall">Dewan Kuliah / Hall</option>
<option value="lab">Computer &amp; Network Labs</option>
<option value="meeting">Meeting &amp; Discussion Rooms</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
</div>
<!-- Active Filter Tags & Quick Action Button -->
<div class="flex flex-wrap items-center justify-between gap-2 pt-1">
<div class="flex flex-wrap items-center gap-1.5">
<span class="text-caption font-caption text-on-surface-variant font-medium mr-1">Active filter presets:</span>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-caption font-caption bg-surface-container text-on-surface border border-outline-variant/60">
<span>Slot: 09:00 AM – 11:00 AM</span>
<button class="hover:text-error"><span class="material-symbols-outlined text-[13px]">close</span></button>
</span>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-caption font-caption bg-surface-container text-on-surface border border-outline-variant/60">
<span>Blocks: All Faculty Wings</span>
<button class="hover:text-error"><span class="material-symbols-outlined text-[13px]">close</span></button>
</span>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-caption font-caption bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span>Status: Available Only</span>
<button class="hover:text-error"><span class="material-symbols-outlined text-[13px]">close</span></button>
</span>
</div>
<button class="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-on-secondary rounded-lg text-label-md font-label-md hover:bg-secondary-container active:scale-95 transition-all shadow-sm">
<span class="material-symbols-outlined text-[18px]">search_check</span>
<span>Apply Filter Query</span>
</button>
</div>
</section>
<!-- =========================================================================
         VENUE DIRECTORY TABLE & ACTIONS (Level 0 Embedded Bordered Container)
         ========================================================================= -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/80 shadow-sm overflow-hidden">
<!-- Table Header Action Bar -->
<div class="px-5 py-4 border-b border-outline-variant/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-bright">
<div class="flex items-center gap-2">
<h3 class="text-headline-sm font-headline-sm text-primary">Master Venue List</h3>
<span class="px-2 py-0.5 text-caption font-caption rounded-full bg-surface-container text-on-surface-variant font-medium">10 of 48 shown</span>
</div>
<div class="flex items-center gap-3">
<!-- Quick search within results -->
<div class="relative">
<span class="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-[16px]">filter_list</span>
<input class="w-48 sm:w-56 pl-8 pr-3 py-1.5 text-body-sm font-body-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary" placeholder="Quick search venue..." type="text"/>
</div>
<!-- View Mode Toggle (Grid vs Table) -->
<div class="inline-flex p-0.5 rounded-lg border border-outline-variant bg-surface-container-low">
<button class="px-2 py-1 rounded-md bg-surface-container-lowest text-primary shadow-xs" title="Table View">
<span class="material-symbols-outlined text-[16px] block">view_list</span>
</button>
<button class="px-2 py-1 rounded-md text-on-surface-variant hover:text-primary transition-colors" title="Grid View">
<span class="material-symbols-outlined text-[16px] block">grid_view</span>
</button>
</div>
</div>
</div>
<!-- The Redesigned Table -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low border-b border-outline-variant/70 text-on-surface-variant font-label-sm text-label-sm">
<th class="py-3 px-4 font-semibold" scope="col">
<div class="flex items-center gap-1 cursor-pointer hover:text-primary">
<span>Name</span>
<span class="material-symbols-outlined text-[14px]">unfold_more</span>
</div>
</th>
<th class="py-3 px-4 font-semibold" scope="col">
<div class="flex items-center gap-1 cursor-pointer hover:text-primary">
<span>Location</span>
<span class="material-symbols-outlined text-[14px]">unfold_more</span>
</div>
</th>
<th class="py-3 px-4 text-right font-semibold" scope="col">
<div class="flex items-center justify-end gap-1 cursor-pointer hover:text-primary">
<span>Capacity</span>
<span class="material-symbols-outlined text-[14px]">unfold_more</span>
</div>
</th>
<th class="py-3 px-4 font-semibold" scope="col">Amenities &amp; Equipment</th>
<th class="py-3 px-4 font-semibold" scope="col">Status / Current Session</th>
<th class="py-3 px-4 text-center font-semibold" scope="col">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/30 text-body-sm font-body-sm">
<!-- ROW 1: Bilik Kuliah -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">meeting_room</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Bilik Kuliah (BK1 - BK4)</div>
<div class="text-caption font-caption text-on-surface-variant">General Purpose Teaching Hall</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28, Level 1
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                40 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Projector</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">PA System</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">AC</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Smart Board</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Free until 02:00 PM</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 2: Kejora Hall -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">theater_comedy</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Kejora Hall (Dewan Kejora / DK1)</div>
<div class="text-caption font-caption text-on-surface-variant">Tiered Lecture Auditorium</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Ground Floor
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                200 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Tiered Seating</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Stage</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Dual Projector</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Next: 02:00 PM (Dean Townhall)</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 3: Active Learning Lab -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">hub</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Active Learning Lab</div>
<div class="text-caption font-caption text-on-surface-variant">Interactive Collaborative Studio</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28, Level 3
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                40 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Pod Seating</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Collaborative Screens</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">High-speed LAN</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Free all day</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 4: Lecture Room Type A (Occupied) -->
<tr class="hover:bg-surface-container-low/50 transition-colors group bg-surface-container-low/20">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">co_present</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Lecture Room Type A</div>
<div class="text-caption font-caption text-on-surface-variant">Medium Capacity Lecture Hall</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Level 2
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                60 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Whiteboards</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Dual Displays</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">AC</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
<span class="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mr-1.5"></span> Occupied
                  </span>
<span class="text-[11px] text-on-surface-variant">Until 12:30 PM • SECR1013 (Dr. Farhana)</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="View Schedule">
<span class="material-symbols-outlined text-[16px] block">calendar_today</span>
</button>
</div>
</td>
</tr>
<!-- ROW 5: Lecture Room Type B -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">meeting_room</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Lecture Room Type B</div>
<div class="text-caption font-caption text-on-surface-variant">Standard Flat-floor Classroom</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28, Level 2
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                40 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Projector</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Wi-Fi 6</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Mic System</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Free until 03:00 PM</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 6: Meeting Room -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">groups_3</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Meeting Room / Bilik Mesyuarat</div>
<div class="text-caption font-caption text-on-surface-variant">Faculty Executive Boardroom</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Level 3 (Admin)
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                40 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Hybrid VC</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Conference Mic</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">4K Display</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Requires Dean Approval</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 7: Discussion Room -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">forum</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Discussion Room (Bilik Perbincangan)</div>
<div class="text-caption font-caption text-on-surface-variant">Postgrad &amp; Student Study Pod</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Level 2
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                10 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Discussion Screen</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Glass Board</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Walk-in or Quick Book</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 8: Computer Lab -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">computer</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Computer Lab (Makmal Komputer 1-3)</div>
<div class="text-caption font-caption text-on-surface-variant">General Computing &amp; Programming</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Level 1
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                60 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">60 Workstations</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">GPU Rig</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Central Projector</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Next class at 04:00 PM</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 9: Tutorial Room -->
<tr class="hover:bg-surface-container-low/50 transition-colors group">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">menu_book</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">Tutorial Room (TR 01 - 04)</div>
<div class="text-caption font-caption text-on-surface-variant">Small Group Discussions</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Level 1
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                25 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Movable Desks</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Projector</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Whiteboard</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
<span class="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5"></span> Available
                  </span>
<span class="text-[11px] text-on-surface-variant">Free until 05:00 PM</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Quick Book">
<span class="material-symbols-outlined text-[16px] block">bookmark_add</span>
</button>
</div>
</td>
</tr>
<!-- ROW 10: CCNP Network Lab (Under Maintenance) -->
<tr class="hover:bg-surface-container-low/50 transition-colors group bg-error-container/10">
<td class="py-3.5 px-4">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[20px]">lan</span>
</div>
<div>
<div class="font-semibold text-primary group-hover:text-secondary transition-colors">CCNP Network Lab</div>
<div class="text-caption font-caption text-on-surface-variant">Specialized Cisco Routing Lab</div>
</div>
</div>
</td>
<td class="py-3.5 px-4 font-medium text-on-surface">
<span class="inline-flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline">apartment</span>
                  N28A, Level 4
                </span>
</td>
<td class="py-3.5 px-4 text-right font-semibold text-primary">
                40 <span class="text-caption text-on-surface-variant font-normal">Pax</span>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-wrap gap-1">
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Cisco Racks</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Patch Panels</span>
<span class="px-2 py-0.5 rounded bg-surface-container-low text-caption text-on-surface-variant font-medium">Console Server</span>
</div>
</td>
<td class="py-3.5 px-4">
<div class="flex flex-col gap-0.5">
<span class="inline-flex items-center w-fit px-2 py-0.5 rounded-full text-caption font-semibold bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3]">
<span class="w-1.5 h-1.5 rounded-full bg-[#BE123C] mr-1.5"></span> Under Maintenance
                  </span>
<span class="text-[11px] text-error font-medium">Switch Upgrade (Expected: 28 Oct)</span>
</div>
</td>
<td class="py-3.5 px-4 text-center">
<div class="flex items-center justify-center gap-1.5">
<button class="px-2.5 py-1 text-label-sm font-label-sm rounded-lg bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high transition-all active:scale-95">
                    See Details
                  </button>
<button class="px-2 py-1 text-label-sm font-label-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-all" title="Maintenance Log">
<span class="material-symbols-outlined text-[16px] block text-error">build</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination Footer -->
<div class="px-5 py-3.5 border-t border-outline-variant/60 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-label-sm font-label-sm text-on-surface-variant">
<div>
          Showing <span class="font-semibold text-primary">1</span> to <span class="font-semibold text-primary">10</span> of <span class="font-semibold text-primary">48</span> venues
        </div>
<div class="flex items-center space-x-1">
<button class="p-1.5 rounded-lg border border-outline-variant/80 hover:bg-surface-container disabled:opacity-40 transition-colors" disabled="">
<span class="material-symbols-outlined text-[16px] block">chevron_left</span>
</button>
<button class="w-8 h-8 rounded-lg bg-secondary text-on-secondary font-semibold text-center flex items-center justify-center">1</button>
<button class="w-8 h-8 rounded-lg border border-outline-variant/80 hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center">2</button>
<button class="w-8 h-8 rounded-lg border border-outline-variant/80 hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center">3</button>
<button class="w-8 h-8 rounded-lg border border-outline-variant/80 hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center">4</button>
<button class="w-8 h-8 rounded-lg border border-outline-variant/80 hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center">5</button>
<button class="p-1.5 rounded-lg border border-outline-variant/80 hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[16px] block">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- QUICK LEGEND & CAMPUS POLICIES (Bento Helper Card) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
<div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-3">
<span class="material-symbols-outlined text-secondary text-[24px]">verified</span>
<div>
<h4 class="text-label-md font-label-md font-semibold text-primary">Live Booking Rule</h4>
<p class="text-caption font-caption text-on-surface-variant mt-0.5">Faculty staff reservations for bilik kuliah are auto-approved up to 72 hours in advance. Weekend sessions require Dean clearance.</p>
</div>
</div>
<div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-3">
<span class="material-symbols-outlined text-on-tertiary-container text-[24px]">sensors</span>
<div>
<h4 class="text-label-md font-label-md font-semibold text-primary">Smart Sensor Sync</h4>
<p class="text-caption font-caption text-on-surface-variant mt-0.5">Occupancy states are synchronized automatically via IoT presence sensors installed across blocks N28 and N28A.</p>
</div>
</div>
<div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-3">
<span class="material-symbols-outlined text-outline text-[24px]">support_agent</span>
<div>
<h4 class="text-label-md font-label-md font-semibold text-primary">AV &amp; Lab Support</h4>
<p class="text-caption font-caption text-on-surface-variant mt-0.5">Encountering projector or projector audio faults in Kejora Hall or BK? Dial Extension 3088 for immediate on-site technician dispatch.</p>
</div>
</div>
</div>
</main>
<!-- =========================================================================
       FOOTER (Mandatory System Footer)
       ========================================================================= -->
<footer class="mt-auto border-t border-outline-variant/60 bg-surface-container-lowest py-6 px-4 sm:px-6 lg:px-space-xl text-caption font-caption text-on-surface-variant">
<div class="max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
<div class="flex items-center gap-2">
<span class="font-semibold text-primary">Faculty Venue Portal</span>
<span>•</span>
<span>Faculty of Computing &amp; Informatics Campus Facility System</span>
</div>
<div class="flex flex-wrap items-center gap-6">
<span>Logged in as: <strong class="text-primary font-medium">Alif Izuddin (Admin)</strong></span>
<a class="hover:text-secondary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-secondary transition-colors" href="#">IT Support Helpdesk</a>
<span>Version 3.4.1</span>
</div>
</div>
</footer>
<!-- Light Vanilla Script for Interactive Filter Switch micro-interaction -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.getElementById('availableOnlyToggle');
      if (toggle) {
        toggle.addEventListener('change', (e) => {
          // Micro-interaction visual feedback
          const rows = document.querySelectorAll('tbody tr');
          if (e.target.checked) {
            rows.forEach(r => {
              const hasOccupiedOrMaint = r.textContent.includes('Occupied') || r.textContent.includes('Under Maintenance');
              if (hasOccupiedOrMaint) {
                r.classList.add('opacity-40');
              } else {
                r.classList.remove('opacity-40');
              }
            });
          } else {
            rows.forEach(r => r.classList.remove('opacity-40'));
          }
        });
      }
    });
  </script>
</body></html>