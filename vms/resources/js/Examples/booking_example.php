<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Book a Venue - Faculty Venue Portal</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Plus+Jakarta+Sans:wght@100..900&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "secondary-fixed-dim": "#b4c5ff",
            "outline-variant": "#c5c6cd",
            "on-primary-fixed-variant": "#3c475a",
            "primary-fixed": "#d8e3fb",
            "on-primary-fixed": "#111c2d",
            "on-tertiary-container": "#28a094",
            "background": "#f8f9ff",
            "tertiary": "#001815",
            "surface-container-highest": "#d3e4fe",
            "error-container": "#ffdad6",
            "on-primary-container": "#8590a6",
            "surface-container": "#e5eeff",
            "surface": "#f8f9ff",
            "tertiary-fixed-dim": "#6bd8cb",
            "secondary-container": "#316bf3",
            "inverse-on-surface": "#eaf1ff",
            "on-error-container": "#93000a",
            "on-secondary-container": "#fefcff",
            "on-secondary-fixed": "#00174b",
            "on-surface": "#0b1c30",
            "surface-container-high": "#dce9ff",
            "surface-container-low": "#eff4ff",
            "on-error": "#ffffff",
            "on-surface-variant": "#45474c",
            "on-primary": "#ffffff",
            "tertiary-fixed": "#89f5e7",
            "surface-variant": "#d3e4fe",
            "on-background": "#0b1c30",
            "surface-dim": "#cbdbf5",
            "on-secondary-fixed-variant": "#003ea8",
            "inverse-primary": "#bcc7de",
            "on-tertiary-fixed": "#00201d",
            "on-secondary": "#ffffff",
            "primary-container": "#1e293b",
            "outline": "#75777d",
            "error": "#ba1a1a",
            "surface-tint": "#545f73",
            "secondary-fixed": "#dbe1ff",
            "on-tertiary-fixed-variant": "#005049",
            "tertiary-container": "#002f2a",
            "primary": "#091426",
            "on-tertiary": "#ffffff",
            "primary-fixed-dim": "#bcc7de",
            "inverse-surface": "#213145",
            "surface-bright": "#f8f9ff",
            "secondary": "#0051d5",
            "surface-container-lowest": "#ffffff"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "space-lg": "1.5rem",
            "gutter": "1.25rem",
            "space-xs": "0.25rem",
            "margin-desktop": "2rem",
            "space-sm": "0.5rem",
            "space-md": "1rem",
            "space-xl": "2rem",
            "gutter-desktop": "1.5rem",
            "margin": "1rem"
          },
          "fontFamily": {
            "headline-md": ["Plus Jakarta Sans"],
            "display-lg": ["Plus Jakarta Sans"],
            "label-sm": ["Inter"],
            "headline-lg-mobile": ["Plus Jakarta Sans"],
            "caption": ["Inter"],
            "body-sm": ["Inter"],
            "body-md": ["Inter"],
            "display-md": ["Plus Jakarta Sans"],
            "headline-lg": ["Plus Jakarta Sans"],
            "body-lg": ["Inter"],
            "headline-sm": ["Plus Jakarta Sans"],
            "label-md": ["Inter"]
          },
          "fontSize": {
            "headline-md": ["18px", {"lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
            "display-lg": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.025em", "fontWeight": "700"}],
            "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.025em", "fontWeight": "600"}],
            "headline-lg-mobile": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
            "caption": ["11px", {"lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "500"}],
            "body-sm": ["13px", {"lineHeight": "18px", "fontWeight": "400"}],
            "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
            "display-md": ["30px", {"lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
            "headline-lg": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600"}],
            "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
            "headline-sm": ["16px", {"lineHeight": "24px", "fontWeight": "600"}],
            "label-md": ["13px", {"lineHeight": "18px", "fontWeight": "500"}]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      vertical-align: middle;
      font-size: 20px;
      line-height: 1;
    }
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
  </style>
</head>
<body class="bg-background text-on-surface antialiased min-h-screen flex flex-col font-body-md">
<!-- Top Navigation Bar (Shared Component Anchor) -->
<header class="docked full-width top-0 sticky z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm w-full">
<div class="w-full px-space-xl flex items-center justify-between h-16 max-w-full">
<!-- Left Brand & Identity -->
<div class="flex items-center gap-8">
<a class="flex items-center gap-3 group focus:outline-none" href="#">
<div class="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[22px]" data-weight="fill" style="font-variation-settings: 'FILL' 1;">account_balance</span>
</div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md font-bold text-primary tracking-tight leading-tight">Faculty Venue Portal</span>
<span class="text-caption font-caption text-outline">Faculty of Computing & Informatics</span>
</div>
</a>
<!-- Navigation Links -->
<nav class="hidden xl:flex items-center space-x-1 pt-4">
<a class="text-on-surface-variant font-medium pb-4 px-3 hover:text-on-surface text-label-md font-label-md transition-colors flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]">space_dashboard</span>
<span>Dashboard</span>
</a>
<a class="text-on-surface-variant font-medium pb-4 px-3 hover:text-on-surface text-label-md font-label-md transition-colors flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]">meeting_room</span>
<span>Venues & Halls</span>
</a>
<!-- Active State for Book a Venue -->
<a class="text-secondary font-semibold border-b-2 border-secondary pb-4 px-3 text-label-md font-label-md flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]" data-weight="fill" style="font-variation-settings: 'FILL' 1;">edit_calendar</span>
<span>Book a Venue</span>
</a>
<a class="text-on-surface-variant font-medium pb-4 px-3 hover:text-on-surface text-label-md font-label-md transition-colors flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]">fact_check</span>
<span>Booking Requests</span>
<span class="px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container-high text-secondary">4</span>
</a>
<a class="text-on-surface-variant font-medium pb-4 px-3 hover:text-on-surface text-label-md font-label-md transition-colors flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]">calendar_month</span>
<span>Schedule</span>
</a>
<a class="text-on-surface-variant font-medium pb-4 px-3 hover:text-on-surface text-label-md font-label-md transition-colors flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]">build</span>
<span>Maintenance</span>
</a>
</nav>
</div>
<!-- Right Actions: Search Bar, Notifications, Switch Role, Profile -->
<div class="flex items-center gap-3">
<!-- Search bar on right -->
<div class="hidden md:flex items-center relative">
<span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
<input class="pl-9 pr-14 py-1.5 h-9 bg-surface-container-low text-body-sm font-body-sm text-on-surface rounded-lg border border-outline-variant focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary w-64" placeholder="Search Bilik, Hall, Lecturer" type="text"/>
<kbd class="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-surface-container-lowest text-outline border border-outline-variant rounded">⌘K</kbd>
</div>
<!-- Trailing Icon Action: Notifications -->
<button class="relative p-2 text-on-surface-variant hover:text-secondary rounded-lg hover:bg-surface-container-low transition-colors" title="Notifications">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
</button>
<div class="h-6 w-px bg-outline-variant hidden sm:block"></div>
<!-- Secondary Action: Switch Role -->
<button class="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-outline-variant text-label-sm font-label-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[16px]">sync_alt</span>
<span>Switch Role</span>
</button>
<!-- Profile Chip & Avatar -->
<div class="flex items-center gap-2 pl-1">
<div class="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed text-label-md ring-2 ring-secondary/20 shadow-xs" title="Avatar of Alif Izuddin, Faculty Admin">
            AI
          </div>
<div class="hidden 2xl:flex flex-col text-left">
<span class="text-label-md font-label-md text-on-surface leading-tight">Alif Izuddin</span>
<span class="text-caption font-caption text-outline">Faculty Admin</span>
</div>
</div>
</div>
</div>
</header>
<!-- Sub-Header / Breadcrumb & Hero Canvas -->
<div class="bg-surface-container-lowest border-b border-outline-variant">
<div class="w-full px-space-xl py-space-md flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<!-- Breadcrumbs -->
<nav class="flex items-center gap-1.5 text-label-sm font-label-sm text-outline mb-1.5">
<a class="hover:text-primary transition-colors" href="#">Portal</a>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<a class="hover:text-primary transition-colors" href="#">Venues & Halls</a>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-secondary font-medium">Book a Venue (Reservation Request)</span>
</nav>
<!-- Page Title & Institutional Subtitle -->
<h1 class="text-headline-lg font-headline-lg text-primary tracking-tight">Book a Faculty Venue</h1>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5 max-w-3xl">
          Reserve lecture halls, seminar rooms, and computer laboratories across Blocks N28 & N28A with automated department endorsement routing.
        </p>
</div>
<!-- Secondary Header Utilities -->
<div class="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
<button class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-on-surface rounded-lg text-label-md font-label-md transition-colors shadow-xs">
<span class="material-symbols-outlined text-[18px]">history</span>
<span>View My Booking History</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-secondary rounded-lg text-label-md font-label-md transition-colors">
<span class="material-symbols-outlined text-[18px]">policy</span>
<span>Booking Guidelines</span>
</button>
</div>
</div>
</div>
<!-- Primary Canvas Content Area: Two-Column Split Grid -->
<main class="flex-1 w-full px-space-xl py-space-lg max-w-[1720px] mx-auto">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- LEFT COLUMN: Booking Request Form (8 cols on desktop) -->
<section class="lg:col-span-8 flex flex-col gap-6">
<form class="flex flex-col gap-6" id="venueBookingForm" onsubmit="event.preventDefault();">
<!-- Section 1: Requester Details -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
<div class="flex items-center justify-between pb-4 mb-5 border-b border-surface-container">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">person</span>
</div>
<div>
<h2 class="text-headline-sm font-headline-sm text-primary">1. Requester & Department Profile</h2>
<p class="text-caption font-caption text-outline">Verified academic identity for facility governance & clearance tracking</p>
</div>
</div>
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container-low text-secondary border border-secondary-fixed">
<span class="material-symbols-outlined text-[14px]">verified</span> Faculty Staff Auto-Detected
              </span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<!-- Full Name -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="fullName">
                  Full Name <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">badge</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" id="fullName" name="fullName" required="" type="text" value="Alif Izuddin"/>
</div>
</div>
<!-- Faculty Email -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="email">
                  Faculty Email <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">mail</span>
<input class="w-full pl-9 pr-24 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" id="email" name="email" required="" type="email" value="alif.izuddin@utm.my"/>
<span class="absolute right-2.5 top-2 px-1.5 py-0.5 rounded bg-surface-container text-caption font-caption text-secondary font-medium">@utm.my</span>
</div>
</div>
<!-- Department / Unit Selector -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="department">
                  Department / Academic Unit <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">domain</span>
<select class="w-full pl-9 pr-8 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 appearance-none transition-all" id="department" name="department">
<option selected="" value="se">Software Engineering / Core Computing</option>
<option value="cyber">Cyber Security & Forensics Division</option>
<option value="ai">Artificial Intelligence & Big Data Hub</option>
<option value="postgrad">Postgraduate Studies & Research Center</option>
<option value="admin">Faculty Administrative Affairs</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
<!-- Contact Number -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="phone">
                  Phone / WhatsApp Contact <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">call</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" id="phone" name="phone" placeholder="+60 19-345 6789" required="" type="tel" value="+60 12-884 9201"/>
</div>
</div>
</div>
</div>
<!-- Section 2: Session & Schedule Parameters -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
<div class="flex items-center justify-between pb-4 mb-5 border-b border-surface-container">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">schedule</span>
</div>
<div>
<h2 class="text-headline-sm font-headline-sm text-primary">2. Session & Schedule Parameters</h2>
<p class="text-caption font-caption text-outline">Specify timeline, recurring sessions, and duration boundaries</p>
</div>
</div>
<!-- Duration Pill -->
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-caption font-semibold bg-surface-container text-on-secondary-fixed-variant border border-secondary-fixed">
<span class="material-symbols-outlined text-[15px]">timer</span>
                Total Duration: <strong class="text-secondary font-bold">2.0 Hours</strong>
</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<!-- Booking Date Picker -->
<div class="md:col-span-1">
<div class="flex items-center justify-between mb-1.5">
<label class="text-label-sm font-label-sm text-on-surface" for="bookingDate">
                    Booking Date <span class="text-error">*</span>
</label>
</div>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">calendar_today</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" id="bookingDate" name="bookingDate" required="" type="date" value="2025-04-14"/>
</div>
<!-- Quick Date Presets -->
<div class="flex items-center gap-1.5 mt-2">
<button class="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors" type="button">Today</button>
<button class="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors" type="button">Tomorrow</button>
<button class="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-secondary transition-colors" type="button">Next Mon (14 Apr)</button>
</div>
</div>
<!-- Start Time Slot -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="startTime">
                  Start Time <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">nest_clock_farsight_analog</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" id="startTime" name="startTime" required="" type="time" value="09:00"/>
</div>
<p class="text-caption font-caption text-outline mt-1.5">Class session block 09:00 AM</p>
</div>
<!-- End Time Slot -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="endTime">
                  End Time <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">pace</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" id="endTime" name="endTime" required="" type="time" value="11:00"/>
</div>
<p class="text-caption font-caption text-outline mt-1.5">Release buffer included (+10 mins)</p>
</div>
</div>
<!-- Recurring Reservation Checkbox Toggle -->
<div class="mt-4 pt-4 border-t border-surface-container-high/60 flex items-center justify-between">
<label class="flex items-start gap-3 cursor-pointer">
<input checked="" class="mt-0.5 w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div>
<span class="text-label-md font-label-md text-on-surface font-semibold">Recurring Academic Session</span>
<p class="text-caption font-caption text-on-surface-variant">Repeat weekly on Mondays until end of semester (Week 14 - 15 June 2025)</p>
</div>
</label>
<span class="text-caption font-caption text-secondary font-medium px-2 py-1 bg-surface-container rounded-md hidden sm:inline-block">8 Sessions Total</span>
</div>
</div>
<!-- Section 3: Venue Selection & Capacity -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
<div class="flex items-center justify-between pb-4 mb-5 border-b border-surface-container">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">apartment</span>
</div>
<div>
<h2 class="text-headline-sm font-headline-sm text-primary">3. Venue Selection & Event Details</h2>
<p class="text-caption font-caption text-outline">Target auditorium, expected attendance density, and syllabus reference</p>
</div>
</div>
<!-- Realtime Availability indicator badge -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-caption font-caption bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] font-semibold">
<span class="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span> Available for Selected Slot
              </span>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
<!-- Target Venue Dropdown / Picker -->
<div class="md:col-span-8">
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="venueSelect">
                  Target Venue / Room <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">location_on</span>
<select class="w-full pl-9 pr-9 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 appearance-none font-medium" id="venueSelect" name="venueSelect">
<option selected="" value="dk1">Kejora Hall (DK1) — Max 200 Pax (Block N28A, Tiered Auditorium)</option>
<option value="bk3">Bilik Kuliah 3 (BK3) — Max 60 Pax (Block N28, Seminar Layout)</option>
<option value="allab">Active Learning Lab 2 — Max 40 Pax (Block N28, Pod Computers)</option>
<option value="dk2">Dewan Kuliah 2 (DK2) — Max 150 Pax (Block N28A, Tiered)</option>
<option value="sem1">Seminar Room 1 (Bilik Al-Farabi) — Max 80 Pax (Block N28A, Level 3)</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none text-[18px]">unfold_more</span>
</div>
<div class="flex items-center gap-3 mt-2 text-caption font-caption text-on-surface-variant">
<span>Location: <strong class="text-on-surface">Block N28A, Level 2</strong></span>
<span>•</span>
<span>Audio System: <strong class="text-on-surface">Digital DSP + Dual Mic</strong></span>
<span>•</span>
<span>AC Status: <strong class="text-[#15803D]">Operational</strong></span>
</div>
</div>
<!-- Expected Attendance / Pax -->
<div class="md:col-span-4">
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="expectedPax">
                  Expected Attendance <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">groups</span>
<input class="w-full pl-9 pr-12 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" id="expectedPax" max="200" min="10" name="expectedPax" required="" type="number" value="145"/>
<span class="absolute right-3 top-2 text-caption font-caption text-outline font-semibold">Pax</span>
</div>
<!-- Min-Max capacity indicator -->
<div class="mt-2 flex items-center justify-between text-caption font-caption">
<span class="text-outline">Utilization: <strong>72.5%</strong></span>
<span class="text-secondary font-medium">Max Limit: 200</span>
</div>
</div>
<!-- Purpose / Course Code & Title -->
<div class="md:col-span-12">
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5" for="purposeTitle">
                  Academic Purpose / Course Code & Session Title <span class="text-error">*</span>
</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">menu_book</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" id="purposeTitle" name="purposeTitle" required="" type="text" value="SECJ3543 Mobile App Development - Midterm Project Presentation & Peer Evaluation"/>
</div>
</div>
</div>
</div>
<!-- Section 4: Facilities, Equipment & Comments -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
<div class="flex items-center justify-between pb-4 mb-5 border-b border-surface-container">
<div class="flex items-center gap-2.5">
<div class="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">settings_input_component</span>
</div>
<div>
<h2 class="text-headline-sm font-headline-sm text-primary">4. Logistics, Equipment & Special Requests</h2>
<p class="text-caption font-caption text-outline">Pre-configured AV setup and technical support requisition</p>
</div>
</div>
</div>
<!-- Multi-select equipment requirement tags -->
<div class="mb-5">
<span class="block text-label-sm font-label-sm text-on-surface mb-2.5">AV & Facility Requisites</span>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
<label class="flex items-center gap-2.5 p-2.5 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors has-[:checked]:bg-surface-container has-[:checked]:border-secondary">
<input checked="" class="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">mic</span>
<span class="text-body-sm font-body-sm text-on-surface font-medium">PA System & Lapel Mic</span>
</div>
</label>
<label class="flex items-center gap-2.5 p-2.5 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors has-[:checked]:bg-surface-container has-[:checked]:border-secondary">
<input checked="" class="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">videocam</span>
<span class="text-body-sm font-body-sm text-on-surface font-medium">Hybrid VC / Zoom Rig</span>
</div>
</label>
<label class="flex items-center gap-2.5 p-2.5 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors has-[:checked]:bg-surface-container has-[:checked]:border-secondary">
<input checked="" class="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">wb_iridescent</span>
<span class="text-body-sm font-body-sm text-on-surface font-medium">High-Lumen Projector</span>
</div>
</label>
<label class="flex items-center gap-2.5 p-2.5 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors has-[:checked]:bg-surface-container has-[:checked]:border-secondary">
<input class="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">mode_fan</span>
<span class="text-body-sm font-body-sm text-on-surface font-medium">Aircond Extension (>5PM)</span>
</div>
</label>
<label class="flex items-center gap-2.5 p-2.5 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors has-[:checked]:bg-surface-container has-[:checked]:border-secondary">
<input checked="" class="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">draw</span>
<span class="text-body-sm font-body-sm text-on-surface font-medium">Whiteboard Markers Kit</span>
</div>
</label>
<label class="flex items-center gap-2.5 p-2.5 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors has-[:checked]:bg-surface-container has-[:checked]:border-secondary">
<input class="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox"/>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">podium</span>
<span class="text-body-sm font-body-sm text-on-surface font-medium">Executive Rostrum Table</span>
</div>
</label>
</div>
</div>
<!-- Additional Comments Textarea -->
<div>
<div class="flex items-center justify-between mb-1.5">
<label class="text-label-sm font-label-sm text-on-surface" for="comments">
                  Special Arrangements or Technical Instructions
                </label>
<span class="text-caption font-caption text-outline">Optional • Max 500 chars</span>
</div>
<textarea class="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none" id="comments" name="comments" placeholder="Specify guest lecturer parking entry pass, external jury seating setup, or HDMI adapter requirement..." rows="3">Please verify HDMI connection for external assessor laptops. Presentation starts promptly at 09:15 AM following opening remarks.</textarea>
</div>
</div>
<!-- Bottom Action Bar / Form Submit & Reset -->
<div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
<div class="flex items-center gap-2 text-caption font-caption text-on-surface-variant">
<span class="material-symbols-outlined text-[18px] text-secondary">info</span>
<span>Requests are systematically reviewed by the Department Head within 24 operational hours.</span>
</div>
<div class="flex items-center gap-3 w-full sm:w-auto justify-end">
<button class="px-4 py-2.5 rounded-lg border border-outline-variant text-body-md font-body-md font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors" type="reset">
                Reset Form
              </button>
<button class="px-6 py-2.5 rounded-lg bg-secondary hover:bg-secondary/90 text-on-secondary text-body-md font-body-md font-semibold inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all" type="submit">
<span>Submit Booking Request</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</form>
</section>
<!-- RIGHT COLUMN: Contextual Sidebar & Live Venue Preview (4 cols on desktop) -->
<aside class="lg:col-span-4 flex flex-col gap-6">
<!-- Selected Venue Summary Card -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div class="relative h-44 bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A modern university lecture auditorium with tiered ergonomic seating, high-lumen dual projection screens, acoustic wall paneling in deep navy and warm wood, illuminated by bright daylight and architectural recessed ceiling lighting in a university campus setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbUdSG0aMefo61RSFzR3MJjpjXXy3gVefFkq1RmNwASxRn3q81BhUxI3_lYfrILjuesAYzehThSil-hVsBTstFDLbmY6s20wX5Cuufn8VwUe8tDC7RYXr_Xl8eyo15bkBTt5I_HwKWDdTSGqSvsib3a32GuoKGvcYHRabqfKbZiK6zwZZWxIoijiIdBrS7JMyTmYyHvF5Ogk-fb6EtFbdfOpEKXItdxHmeKmCm_RhDsPTnhy5A3tbL"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div class="absolute top-3 left-3">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-caption bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-bold shadow-xs">
<span class="material-symbols-outlined text-[14px] text-secondary">domain</span>
                Block N28A
              </span>
</div>
<div class="absolute top-3 right-3">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-caption bg-[#F0FDF4]/95 text-[#15803D] border border-[#BBF7D0] font-semibold backdrop-blur-sm shadow-xs">
<span class="material-symbols-outlined text-[14px]">check_circle</span>
                Slot Available
              </span>
</div>
<div class="absolute bottom-3 left-3 right-3 text-on-secondary">
<h3 class="text-headline-md font-headline-md font-bold text-white drop-shadow-sm leading-tight">Kejora Hall (DK1)</h3>
<p class="text-caption font-caption text-surface-container-low font-medium">Main Computing Lecture Theatre • Level 2</p>
</div>
</div>
<div class="p-5 flex flex-col gap-4">
<!-- Quick Specifications Grid -->
<div class="grid grid-cols-2 gap-3 text-body-sm font-body-sm">
<div class="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
<span class="text-caption font-caption text-outline block">Total Seating</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold">200 Pax</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
<span class="text-caption font-caption text-outline block">Layout Type</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold">Tiered Theater</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
<span class="text-caption font-caption text-outline block">A/C Zone</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold">Central HVAC</span>
</div>
<div class="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
<span class="text-caption font-caption text-outline block">Network</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold">UTM-WiFi 6</span>
</div>
</div>
<!-- Capacity Density Meter -->
<div>
<div class="flex items-center justify-between text-caption font-caption mb-1">
<span class="text-on-surface-variant">Slot Occupancy (145 / 200 Pax)</span>
<span class="font-semibold text-secondary">72.5%</span>
</div>
<div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div class="h-full bg-secondary rounded-full" style="width: 72.5%;"></div>
</div>
</div>
<div class="h-px bg-surface-container"></div>
<!-- Booking Time Preview Strip -->
<div class="flex items-center justify-between bg-surface-container-low p-3 rounded-lg border border-surface-container">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-secondary text-[20px]">event_available</span>
<div>
<span class="text-label-sm font-label-sm text-on-surface block font-semibold">Monday, 14 April 2025</span>
<span class="text-caption font-caption text-outline">09:00 AM – 11:00 AM (2 Hours)</span>
</div>
</div>
<a class="text-caption font-caption text-secondary hover:underline font-semibold" href="#">Change</a>
</div>
</div>
</div>
<!-- Approval Workflow Journey Checklist -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
<div class="flex items-center gap-2 mb-4 pb-3 border-b border-surface-container">
<span class="material-symbols-outlined text-secondary">timeline</span>
<h3 class="text-headline-sm font-headline-sm text-primary">Approval Pipeline</h3>
</div>
<div class="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container">
<!-- Step 1 -->
<div class="relative">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] font-bold ring-4 ring-surface-container-lowest">
                1
              </div>
<div>
<span class="text-label-sm font-label-sm text-on-surface font-semibold block">Submit Reservation Form</span>
<p class="text-caption font-caption text-on-surface-variant">Form validated against university course timetable rules.</p>
</div>
</div>
<!-- Step 2 -->
<div class="relative">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center text-[10px] font-bold ring-4 ring-surface-container-lowest">
                2
              </div>
<div>
<span class="text-label-sm font-label-sm text-on-surface font-semibold block">Head of Dept & Facility Review</span>
<p class="text-caption font-caption text-on-surface-variant">Automated notification dispatched for administrative clearance.</p>
</div>
</div>
<!-- Step 3 -->
<div class="relative">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-surface-container text-outline flex items-center justify-center text-[10px] font-bold ring-4 ring-surface-container-lowest">
                3
              </div>
<div>
<span class="text-label-sm font-label-sm text-on-surface font-semibold block">Digital QR Gate Pass Issued</span>
<p class="text-caption font-caption text-on-surface-variant">Scan QR at Block N28A terminal for smart door unlock & AV power.</p>
</div>
</div>
</div>
</div>
<!-- Urgent Faculty Support Callout Card -->
<div class="bg-surface-container-low rounded-xl border border-surface-container-high p-5 flex items-start gap-3.5">
<div class="w-9 h-9 rounded-lg bg-surface-container-highest text-secondary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">support_agent</span>
</div>
<div class="flex-1">
<h4 class="text-label-md font-label-md font-semibold text-primary">Urgent Slot Confirmation?</h4>
<p class="text-caption font-caption text-on-surface-variant mt-0.5 mb-2.5">
              Need same-day emergency access or weekend AV key assignment? Call the Operations Helpdesk directly.
            </p>
<div class="flex items-center gap-2">
<a class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant text-label-sm font-label-sm font-semibold text-primary hover:text-secondary hover:border-secondary transition-colors" href="tel:+6075533088">
<span class="material-symbols-outlined text-[14px]">call</span>
                Ext. 3088 / +60 7-553 3088
              </a>
</div>
</div>
</div>
</aside>
</div>
</main>
<!-- Global Institutional Footer -->
<footer class="mt-auto bg-surface-container-lowest border-t border-outline-variant py-6">
<div class="w-full px-space-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-caption font-caption text-outline">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">school</span>
<span>Faculty of Computing & Informatics, Universiti Teknologi Malaysia</span>
</div>
<div class="flex items-center gap-4">
<a class="hover:text-on-surface transition-colors" href="#">Classroom Policies</a>
<span>•</span>
<a class="hover:text-on-surface transition-colors" href="#">IT Support & Equipment</a>
<span>•</span>
<a class="hover:text-on-surface transition-colors" href="#">Security Office (N28)</a>
</div>
</div>
</footer>
</body></html>