<!DOCTYPE html>

<html class="h-full bg-surface" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Faculty Venue Reservations - My Bookings | Universiti Teknologi Malaysia</title>
<!-- Google Fonts & Material Symbols -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS with Forms and Container Queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "surface-container-high": "#dce9ff",
            "inverse-on-surface": "#eaf1ff",
            "surface": "#f8f9ff",
            "tertiary-container": "#002f2a",
            "error-container": "#ffdad6",
            "surface-container-low": "#eff4ff",
            "on-primary-fixed": "#111c2d",
            "on-error": "#ffffff",
            "error": "#ba1a1a",
            "on-background": "#0b1c30",
            "background": "#f8f9ff",
            "on-tertiary-fixed-variant": "#005049",
            "on-surface": "#0b1c30",
            "primary-fixed-dim": "#bcc7de",
            "surface-tint": "#545f73",
            "surface-container-lowest": "#ffffff",
            "surface-container": "#e5eeff",
            "on-primary-container": "#8590a6",
            "tertiary-fixed-dim": "#6bd8cb",
            "tertiary-fixed": "#89f5e7",
            "primary-container": "#1e293b",
            "on-surface-variant": "#45474c",
            "secondary-container": "#316bf3",
            "secondary-fixed": "#dbe1ff",
            "outline": "#75777d",
            "secondary": "#0051d5",
            "on-secondary-fixed": "#00174b",
            "on-error-container": "#93000a",
            "on-primary": "#ffffff",
            "inverse-primary": "#bcc7de",
            "inverse-surface": "#213145",
            "secondary-fixed-dim": "#b4c5ff",
            "surface-dim": "#cbdbf5",
            "on-primary-fixed-variant": "#3c475a",
            "surface-bright": "#f8f9ff",
            "on-tertiary": "#ffffff",
            "tertiary": "#001815",
            "primary-fixed": "#d8e3fb",
            "surface-variant": "#d3e4fe",
            "outline-variant": "#c5c6cd",
            "on-secondary": "#ffffff",
            "surface-container-highest": "#d3e4fe",
            "primary": "#091426",
            "on-secondary-fixed-variant": "#003ea8",
            "on-tertiary-container": "#28a094",
            "on-tertiary-fixed": "#00201d",
            "on-secondary-container": "#fefcff"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "space-xs": "0.25rem",
            "space-md": "1rem",
            "margin-desktop": "2rem",
            "gutter": "1.25rem",
            "space-sm": "0.5rem",
            "space-lg": "1.5rem",
            "margin": "1rem",
            "space-xl": "2rem",
            "gutter-desktop": "1.5rem"
          },
          "fontFamily": {
            "body-md": ["Inter"],
            "headline-lg-mobile": ["Plus Jakarta Sans"],
            "label-md": ["Inter"],
            "headline-sm": ["Plus Jakarta Sans"],
            "label-sm": ["Inter"],
            "body-lg": ["Inter"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "body-sm": ["Inter"],
            "caption": ["Inter"],
            "display-lg": ["Plus Jakarta Sans"],
            "display-md": ["Plus Jakarta Sans"]
          },
          "fontSize": {
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "headline-lg-mobile": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.025em", "fontWeight": "600" }],
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "headline-md": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
            "caption": ["11px", { "lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "500" }],
            "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.025em", "fontWeight": "700" }],
            "display-md": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
  </style>
</head>
<body class="min-h-full flex flex-col font-body-md text-body-md text-on-surface bg-surface antialiased">
<!-- TOP APP BAR (Shared TopNavBar Component) -->
<header class="bg-surface-container-lowest text-primary docked full-width top-0 sticky z-50 border-b border-outline-variant shadow-sm">
<div class="w-full px-space-xl flex items-center justify-between h-16 max-w-full">
<!-- Left Anchor & Navigation Cluster -->
<div class="flex items-center gap-8">
<a class="flex items-center gap-3 group" href="#">
<div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:bg-secondary transition-colors duration-150">
<span class="material-symbols-outlined text-[20px]" data-icon="domain">domain</span>
</div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md font-bold text-primary tracking-tight leading-none">Faculty Venue Portal</span>
<span class="font-caption text-caption text-on-surface-variant mt-0.5">Faculty of Computing &amp; Informatics</span>
</div>
</a>
<!-- Navigation Links -->
<nav class="hidden xl:flex items-center space-x-6 pt-4">
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface transition-colors duration-150" href="#">Dashboard</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface transition-colors duration-150" href="#">Venues &amp; Halls</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface transition-colors duration-150" href="#">Booking Requests</a>
<a class="text-secondary font-semibold border-b-2 border-secondary pb-4" href="#">Schedule</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface transition-colors duration-150" href="#">Maintenance</a>
</nav>
</div>
<!-- Right Trailing Controls & Search -->
<div class="flex items-center gap-4">
<!-- Quick Search with Keyboard Shortcut -->
<div class="relative hidden lg:block w-72">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
<span class="material-symbols-outlined text-[18px]" data-icon="search">search</span>
</div>
<input class="w-full pl-9 pr-12 py-1.5 bg-surface-bright border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="Search venues, slots, courses..." type="text"/>
<div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
<kbd class="px-1.5 py-0.5 bg-surface-container text-on-surface-variant rounded border border-outline-variant font-caption text-[10px] font-semibold tracking-wide">⌘K</kbd>
</div>
</div>
<!-- Notification Icon with Badge -->
<button aria-label="Notifications" class="relative p-2 rounded-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors duration-150">
<span class="material-symbols-outlined text-[22px]" data-icon="notifications">notifications</span>
<span class="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-on-secondary font-caption text-[9px] font-bold ring-2 ring-surface-container-lowest">4</span>
</button>
<div class="h-6 w-px bg-outline-variant"></div>
<!-- Secondary Action: Switch Role -->
<button class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors duration-150">
<span class="material-symbols-outlined text-[16px] text-secondary" data-icon="swap_horiz">swap_horiz</span>
<span>Switch Role</span>
</button>
<!-- User Profile Avatar & Identity -->
<div class="flex items-center gap-3 pl-1">
<div class="relative">
<div class="w-9 h-9 rounded-full ring-2 ring-surface-container-high overflow-hidden bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-semibold">
<span class="text-sm">AI</span>
</div>
<span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest"></span>
</div>
<div class="hidden md:flex flex-col text-left">
<span class="font-label-md text-label-md font-semibold text-primary leading-tight">Dr. Alif Izuddin</span>
<span class="font-caption text-caption text-on-surface-variant">Faculty Admin &amp; Lecturer</span>
</div>
</div>
</div>
</div>
</header>
<!-- MAIN CANVAS -->
<main class="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
<!-- BREADCRUMBS & TOP HERO SECTION -->
<section class="space-y-4">
<nav class="flex items-center gap-2 font-caption text-caption text-on-surface-variant">
<a class="hover:text-secondary transition-colors" href="#">Faculty Portal</a>
<span class="material-symbols-outlined text-[14px] text-outline-variant" data-icon="chevron_right">chevron_right</span>
<a class="hover:text-secondary transition-colors" href="#">Reservations</a>
<span class="material-symbols-outlined text-[14px] text-outline-variant" data-icon="chevron_right">chevron_right</span>
<span class="text-on-surface font-semibold">My Bookings</span>
</nav>
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
<div>
<div class="flex items-center gap-3">
<h1 class="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">My Venue Bookings &amp; Reservations</h1>
<span class="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-secondary font-semibold border border-secondary-fixed">Semester II 2026/2027</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Manage, modify, reschedule, or cancel your scheduled lecture halls, seminar rooms, and lab sessions.</p>
</div>
<div class="flex items-center gap-3 self-start md:self-auto">
<button class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]" data-icon="calendar_month">calendar_month</span>
<span>Export Schedule</span>
</button>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm active:scale-95" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="add_circle">add_circle</span>
<span>+ Book New Venue</span>
</a>
</div>
</div>
</section>
<!-- KEY METRIC CARDS (4-Across Grid) -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Card 1 -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/60 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Bookings</span>
<div class="w-8 h-8 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]" data-icon="event_available">event_available</span>
</div>
</div>
<div class="mt-2 flex items-baseline gap-2">
<span class="font-display-md text-display-md font-bold text-primary">2</span>
<span class="font-label-md text-label-md text-on-surface-variant">Scheduled</span>
</div>
<div class="mt-2 flex items-center gap-1.5 font-caption text-caption text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
<span>1 upcoming session today</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/60 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Past Completed</span>
<div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]" data-icon="task_alt">task_alt</span>
</div>
</div>
<div class="mt-2 flex items-baseline gap-2">
<span class="font-display-md text-display-md font-bold text-primary">14</span>
<span class="font-label-md text-label-md text-on-surface-variant">Sessions</span>
</div>
<div class="mt-2 text-on-surface-variant font-caption text-caption">
<span>100% attendance recorded</span>
</div>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/60 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Approval</span>
<div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]" data-icon="hourglass_top">hourglass_top</span>
</div>
</div>
<div class="mt-2 flex items-baseline gap-2">
<span class="font-display-md text-display-md font-bold text-amber-600">1</span>
<span class="font-label-md text-label-md text-on-surface-variant">Under Review</span>
</div>
<div class="mt-2 text-amber-700 bg-amber-50/70 border border-amber-200 px-2 py-0.5 rounded font-caption text-caption w-fit">
<span>Dept. Dean endorsement</span>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/60 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Allocated Hours</span>
<div class="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]" data-icon="schedule">schedule</span>
</div>
</div>
<div class="mt-2 flex items-baseline gap-2">
<span class="font-display-md text-display-md font-bold text-primary">36.5</span>
<span class="font-label-md text-label-md text-on-surface-variant">Hours Total</span>
</div>
<div class="mt-2 text-on-surface-variant font-caption text-caption">
<span>Within faculty weekly quota (40h max)</span>
</div>
</div>
</section>
<!-- CONTENT GRID (8 / 4 SPLIT) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- LEFT COLUMN: BOOKINGS LIST & FILTERS (Col 8) -->
<div class="lg:col-span-8 space-y-4">
<!-- FILTER & TAB BAR -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 shadow-sm p-4 space-y-3">
<!-- Status Tabs -->
<div class="flex flex-wrap items-center gap-1.5 border-b border-outline-variant pb-3">
<button class="px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold bg-primary text-on-primary shadow-xs">
              All Bookings <span class="ml-1 text-xs px-1.5 py-0.2 bg-white/20 rounded-full">3</span>
</button>
<button class="px-3 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
              Upcoming &amp; Active <span class="ml-1 text-xs px-1.5 py-0.2 bg-secondary/10 text-secondary font-semibold rounded-full">2</span>
</button>
<button class="px-3 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
              Pending Endorsement <span class="ml-1 text-xs px-1.5 py-0.2 bg-amber-100 text-amber-800 font-semibold rounded-full">1</span>
</button>
<button class="px-3 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
              Past History (14)
            </button>
<button class="px-3 py-1.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
              Cancelled
            </button>
</div>
<!-- Search Inputs & Filters Toolbar -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-2.5 pt-1">
<div class="md:col-span-6 relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
<span class="material-symbols-outlined text-[18px]" data-icon="search">search</span>
</div>
<input class="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" placeholder="Search by venue name, code (SECJ3543), ID..." type="text"/>
</div>
<div class="md:col-span-3">
<select class="w-full py-2 px-3 bg-surface border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
<option selected="">All Campus Blocks</option>
<option>Block N28 (Computing)</option>
<option>Block N28A (Auditoriums)</option>
<option>Menara Razak UTM</option>
</select>
</div>
<div class="md:col-span-3">
<select class="w-full py-2 px-3 bg-surface border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
<option selected="">Sort: Closest Date</option>
<option>Date: Latest First</option>
<option>Venue Capacity</option>
<option>Duration Length</option>
</select>
</div>
</div>
</div>
<!-- DETAILED BOOKING CARDS -->
<div class="space-y-3.5">
<!-- RECORD 1: Today / Imminent Session (Lecture Room Type A) -->
<article class="bg-surface-container-lowest rounded-xl border-2 border-secondary/40 shadow-sm hover:shadow-md transition-all overflow-hidden relative">
<div class="absolute top-0 left-0 bottom-0 w-1.5 bg-secondary"></div>
<div class="p-5 pl-6 space-y-4">
<!-- Top Row: Badge & Identification -->
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2.5 flex-wrap">
<span class="font-caption text-caption font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    #BK-2026-1014-01
                  </span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-emerald-50 text-emerald-800 border border-emerald-300">
<span class="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
<span>Confirmed · In-Progress Today</span>
</span>
<span class="text-caption font-caption text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-emerald-600" data-icon="verified">verified</span>
                    Auto-Approved (Active Academic Staff)
                  </span>
</div>
<div class="flex items-center gap-1">
<button class="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors" title="Print reservation pass">
<span class="material-symbols-outlined text-[18px]" data-icon="print">print</span>
</button>
<button class="p-1.5 rounded hover:bg-surface-container text-on-surface-variant transition-colors" title="Download QR Pass">
<span class="material-symbols-outlined text-[18px]" data-icon="qr_code_2">qr_code_2</span>
</button>
</div>
</div>
<!-- Main Details Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
<div class="md:col-span-7 space-y-1">
<h3 class="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
<span>Lecture Room Type A (BK1)</span>
</h3>
<div class="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="pin_drop">pin_drop</span>
<span>Block N28A, Level 2, Room BK1-04</span>
</div>
<div class="pt-1 text-body-sm font-body-sm text-primary font-medium flex items-center gap-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold font-caption text-caption">SECJ1013</span>
<span>Programming Technique I – Practical Lab Briefing</span>
</div>
</div>
<div class="md:col-span-5 bg-surface-bright rounded-lg p-3 border border-outline-variant/60 space-y-1.5">
<div class="flex items-center justify-between text-caption font-caption text-on-surface-variant">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-secondary" data-icon="calendar_today">calendar_today</span>
<span>Today, 14 Oct 2026</span>
</span>
<span class="font-semibold text-primary">1h 24m slot</span>
</div>
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">12:26 PM – 01:50 PM</span>
</div>
<div class="flex items-center justify-between text-caption font-caption text-on-surface-variant pt-1 border-t border-outline-variant/50">
<span>Target Pax: <strong>50 Pax</strong></span>
<span>Capacity: 60 Hall</span>
</div>
</div>
</div>
<!-- Action Bar & Requisites -->
<div class="pt-3 border-t border-outline-variant/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div class="flex items-center gap-2 text-caption font-caption text-on-surface-variant flex-wrap">
<span class="font-medium text-primary">Key Amenities:</span>
<span class="px-2 py-0.5 bg-surface-container rounded text-on-surface">Interactive Whiteboard</span>
<span class="px-2 py-0.5 bg-surface-container rounded text-on-surface">HDMI Dual-Screen</span>
<span class="px-2 py-0.5 bg-surface-container rounded text-on-surface">AC Unit Auto-Timed</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="edit">edit</span>
<span>Modify Slot</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px]" data-icon="cancel">cancel</span>
<span>Cancel</span>
</button>
<button class="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary/90 transition-all flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]" data-icon="key">key</span>
<span>Unlock Door PIN</span>
</button>
</div>
</div>
</div>
</article>
<!-- RECORD 2: Upcoming Next Week (Kejora Hall) -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all overflow-hidden relative">
<div class="p-5 space-y-4">
<!-- Top Row: Identification & Status -->
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2.5 flex-wrap">
<span class="font-caption text-caption font-semibold px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant border border-outline-variant">
                    #BK-2026-1020-04
                  </span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-blue-50 text-blue-800 border border-blue-200">
<span class="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span>
<span>Confirmed · Upcoming in 6 Days</span>
</span>
<span class="text-caption font-caption text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-outline" data-icon="assignment_turned_in">assignment_turned_in</span>
                    Approved by Facilities Office (Pn. Salmah)
                  </span>
</div>
<div class="flex items-center gap-1">
<span class="text-caption font-caption text-on-surface-variant bg-surface px-2 py-0.5 rounded border border-outline-variant">
                    Hall Key Issued at Guardhouse
                  </span>
</div>
</div>
<!-- Main Details Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
<div class="md:col-span-7 space-y-1">
<h3 class="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
<span>Kejora Hall (Dewan Kejora / DK1)</span>
</h3>
<div class="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="apartment">apartment</span>
<span>Block N28A, Ground Floor, Central Concourse</span>
</div>
<div class="pt-1 text-body-sm font-body-sm text-primary font-medium flex items-center gap-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold font-caption text-caption">SECJ3543</span>
<span>Mobile App Development – Midterm Project Presentation</span>
</div>
</div>
<div class="md:col-span-5 bg-surface-bright rounded-lg p-3 border border-outline-variant/60 space-y-1.5">
<div class="flex items-center justify-between text-caption font-caption text-on-surface-variant">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-secondary" data-icon="event">event</span>
<span>Tuesday, 20 Oct 2026</span>
</span>
<span class="font-semibold text-primary">3h 00m session</span>
</div>
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">02:30 PM – 05:30 PM</span>
</div>
<div class="flex items-center justify-between text-caption font-caption text-on-surface-variant pt-1 border-t border-outline-variant/50">
<span>Capacity Allocated: <strong>30 Pax (Registered)</strong></span>
<span>Max Hall: 150 Pax</span>
</div>
</div>
</div>
<!-- Action Bar & Requisites -->
<div class="pt-3 border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div class="flex items-center gap-2 text-caption font-caption text-on-surface-variant flex-wrap">
<span class="font-medium text-primary">Requested Logistics:</span>
<span class="px-2 py-0.5 bg-surface rounded text-on-surface border border-outline-variant/60">PA System &amp; 2 Wireless Mics</span>
<span class="px-2 py-0.5 bg-surface rounded text-on-surface border border-outline-variant/60">Dual Ceiling Projectors</span>
<span class="px-2 py-0.5 bg-surface rounded text-on-surface border border-outline-variant/60">Hybrid VC Camera</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="edit_calendar">edit_calendar</span>
<span>Modify Slot</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px]" data-icon="delete">delete</span>
<span>Cancel</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px] text-secondary" data-icon="badge">badge</span>
<span>Permit PDF</span>
</button>
</div>
</div>
</div>
</article>
<!-- RECORD 3: Pending Endorsement (Active Learning Lab) -->
<article class="bg-surface-container-lowest rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all overflow-hidden relative">
<div class="p-5 space-y-4">
<!-- Top Row: Identification & Status -->
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2.5 flex-wrap">
<span class="font-caption text-caption font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    #BK-2026-1024-09
                  </span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-amber-50 text-amber-800 border border-amber-300">
<span class="material-symbols-outlined text-[14px]" data-icon="pending">pending</span>
<span>Pending Endorsement</span>
</span>
<span class="text-caption font-caption text-amber-700 flex items-center gap-1">
<span class="material-symbols-outlined text-[15px]" data-icon="info">info</span>
                    Awaiting Deputy Dean (Academic) Approval
                  </span>
</div>
<div class="flex items-center gap-1 text-caption font-caption text-on-surface-variant">
<span>Submitted: 12 Oct 2026, 09:15 AM</span>
</div>
</div>
<!-- Main Details Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
<div class="md:col-span-7 space-y-1">
<h3 class="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
<span>Active Learning Lab (Makmal AL1)</span>
</h3>
<div class="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="location_on">location_on</span>
<span>Block N28, Level 3, Wing B</span>
</div>
<div class="pt-1 text-body-sm font-body-sm text-primary font-medium flex items-center gap-2">
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold font-caption text-caption">FACULTY-EVT</span>
<span>Faculty Industrial Advisory Panel (IAP) Tech Workshop</span>
</div>
</div>
<div class="md:col-span-5 bg-amber-50/40 rounded-lg p-3 border border-amber-200/60 space-y-1.5">
<div class="flex items-center justify-between text-caption font-caption text-amber-800">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[15px]" data-icon="event">event</span>
<span>Saturday, 24 Oct 2026</span>
</span>
<span class="font-semibold text-amber-900">2h 00m session</span>
</div>
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm font-bold text-amber-900 tracking-tight">09:00 AM – 11:00 AM</span>
</div>
<div class="flex items-center justify-between text-caption font-caption text-amber-800 pt-1 border-t border-amber-200/60">
<span>Special Weekend Request</span>
<span>Capacity: 40 Pax</span>
</div>
</div>
</div>
<!-- Action Bar & Requisites -->
<div class="pt-3 border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div class="flex items-center gap-2 text-caption font-caption text-amber-800 flex-wrap">
<span class="material-symbols-outlined text-[16px]" data-icon="lock_clock">lock_clock</span>
<span>Weekend air-conditioning clearance pending security endorsement.</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="edit">edit</span>
<span>Edit Submission</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-rose-700 font-label-sm text-label-sm font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px]" data-icon="undo">undo</span>
<span>Withdraw Request</span>
</button>
</div>
</div>
</div>
</article>
</div>
<!-- PAGINATION & SUMMARY -->
<div class="flex items-center justify-between py-2 px-1 text-body-sm font-body-sm text-on-surface-variant">
<div>Showing <strong>3</strong> of <strong>17</strong> total faculty reservations</div>
<div class="flex items-center gap-2">
<button class="p-1.5 rounded border border-outline-variant bg-surface-container-lowest text-outline-variant cursor-not-allowed">
<span class="material-symbols-outlined text-[16px]" data-icon="chevron_left">chevron_left</span>
</button>
<span class="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold">1</span>
<button class="px-3 py-1 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container font-label-sm text-label-sm transition-colors">2</button>
<button class="p-1.5 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface transition-colors">
<span class="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- RIGHT COLUMN: QUICK UTILITY & CONTEXT DRAWER (Col 4) -->
<aside class="lg:col-span-4 space-y-4">
<!-- IMMEDIATE IMMINENT BOOKING WIDGET -->
<div class="bg-primary text-on-primary rounded-xl p-5 shadow-lg relative overflow-hidden">
<div class="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary text-on-secondary font-semibold">
              Starts In 24 Minutes
            </span>
<span class="material-symbols-outlined text-secondary-fixed text-[20px]" data-icon="sensors">sensors</span>
</div>
<div class="mt-3">
<span class="font-caption text-caption text-slate-300">Next Scheduled Venue:</span>
<h4 class="font-headline-md text-headline-md font-bold text-white mt-0.5">Lecture Room Type A (BK1)</h4>
<p class="font-body-sm text-body-sm text-slate-300 mt-1">Block N28A, Level 2 · SECJ1013</p>
</div>
<div class="mt-4 p-3 rounded-lg bg-white/10 border border-white/10 flex items-center justify-between">
<div>
<span class="block font-caption text-caption text-slate-300">Room Door PIN:</span>
<span class="font-mono text-xl font-bold tracking-widest text-emerald-400">#7842*</span>
</div>
<div class="text-right">
<span class="block font-caption text-caption text-slate-300">Auto Unlock:</span>
<span class="font-label-sm text-label-sm text-white font-medium">12:15 PM</span>
</div>
</div>
<div class="mt-4 flex gap-2">
<button class="flex-1 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md font-semibold transition-all shadow text-center">
              One-Touch Check In
            </button>
<button class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors" title="View Directions on Campus Map">
<span class="material-symbols-outlined text-[20px]" data-icon="map">map</span>
</button>
</div>
</div>
<!-- QUICK BOOKING POLICIES CARD -->
<div class="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm space-y-3">
<div class="flex items-center gap-2 text-primary font-headline-sm text-headline-sm font-bold">
<span class="material-symbols-outlined text-secondary text-[20px]" data-icon="policy">policy</span>
<span>Modification &amp; Rules</span>
</div>
<ul class="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5" data-icon="check">check</span>
<span><strong>Free Cancellation:</strong> Can cancel or reschedule up to 2 hours prior with no quota penalty.</span>
</li>
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5" data-icon="check">check</span>
<span><strong>Auto-Release:</strong> Slots not checked-in within 20 mins are automatically released to waitlist.</span>
</li>
<li class="flex items-start gap-2">
<span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5" data-icon="warning">warning</span>
<span><strong>After-Hours AC:</strong> Requests after 6:00 PM require Department Dean endorsement.</span>
</li>
</ul>
<div class="pt-2 border-t border-outline-variant/60">
<a class="font-label-md text-label-md text-secondary hover:underline flex items-center justify-between" href="#">
<span>Read complete UTM venue guidelines</span>
<span class="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
<!-- NEED FACILITY ASSISTANCE -->
<div class="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm space-y-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[22px]" data-icon="support_agent">support_agent</span>
</div>
<div>
<h5 class="font-headline-sm text-headline-sm font-bold text-primary">Venue Support Helpdesk</h5>
<p class="font-caption text-caption text-on-surface-variant">Block N28 Facilities Management Unit</p>
</div>
</div>
<div class="p-3 bg-surface rounded-lg border border-outline-variant/60 space-y-1">
<div class="flex justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">On-Duty Technician:</span>
<span class="font-medium text-primary">En. Razak (AV &amp; Keys)</span>
</div>
<div class="flex justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">Office Intercom:</span>
<span class="font-mono font-semibold text-secondary">Ext. 3088 / 3122</span>
</div>
<div class="flex justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">Emergency Mobile:</span>
<span class="font-mono text-on-surface">+60 19-752 9011</span>
</div>
</div>
<button class="w-full py-2 px-3 rounded-lg border border-outline-variant hover:bg-surface-container text-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="chat">chat</span>
<span>Report Venue Malfunction</span>
</button>
</div>
</aside>
</div>
</main>
<!-- ENTERPRISE ACADEMIC FOOTER -->
<footer class="mt-auto bg-surface-container-lowest border-t border-outline-variant py-8">
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col md:flex-row items-center justify-between gap-4">
<div class="flex items-center gap-3">
<div class="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
            UTM
          </div>
<div>
<p class="font-label-md text-label-md font-bold text-primary">Faculty of Computing &amp; Informatics, Universiti Teknologi Malaysia</p>
<p class="font-caption text-caption text-on-surface-variant">Integrated Campus Resource Management System · v4.8.2-Enterprise</p>
</div>
</div>
<div class="flex items-center space-x-6 font-caption text-caption text-on-surface-variant">
<a class="hover:text-secondary transition-colors" href="#">Campus Map</a>
<a class="hover:text-secondary transition-colors" href="#">Emergency Protocol</a>
<a class="hover:text-secondary transition-colors" href="#">IT Service Status</a>
<a class="hover:text-secondary transition-colors" href="#">Security Centre (PKU)</a>
</div>
</div>
</div>
</footer>
</body></html>