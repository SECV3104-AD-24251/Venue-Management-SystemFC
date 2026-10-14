<!DOCTYPE html>

<html class="h-full bg-background" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Faculty Venue Portal - Administrative Dashboard</title>
<!-- Fonts & Material Symbols Outlined -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration strictly matching design system -->
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "on-background": "#0b1c30",
            "error-container": "#ffdad6",
            "on-secondary-fixed-variant": "#003ea8",
            "secondary-fixed": "#dbe1ff",
            "tertiary-fixed": "#89f5e7",
            "surface-container-highest": "#d3e4fe",
            "on-error": "#ffffff",
            "surface-container": "#e5eeff",
            "on-surface-variant": "#45474c",
            "on-tertiary-container": "#28a094",
            "surface-container-lowest": "#ffffff",
            "inverse-surface": "#213145",
            "tertiary-container": "#002f2a",
            "primary-fixed": "#d8e3fb",
            "secondary-container": "#316bf3",
            "background": "#f8f9ff",
            "secondary-fixed-dim": "#b4c5ff",
            "primary-fixed-dim": "#bcc7de",
            "on-secondary": "#ffffff",
            "on-error-container": "#93000a",
            "outline-variant": "#c5c6cd",
            "outline": "#75777d",
            "surface-tint": "#545f73",
            "on-secondary-container": "#fefcff",
            "on-tertiary": "#ffffff",
            "on-surface": "#0b1c30",
            "primary": "#091426",
            "inverse-primary": "#bcc7de",
            "surface-container-high": "#dce9ff",
            "primary-container": "#1e293b",
            "surface-variant": "#d3e4fe",
            "surface-bright": "#f8f9ff",
            "on-tertiary-fixed-variant": "#005049",
            "error": "#ba1a1a",
            "surface": "#f8f9ff",
            "on-primary-container": "#8590a6",
            "on-secondary-fixed": "#00174b",
            "surface-container-low": "#eff4ff",
            "surface-dim": "#cbdbf5",
            "tertiary": "#001815",
            "inverse-on-surface": "#eaf1ff",
            "on-primary": "#ffffff",
            "on-primary-fixed": "#111c2d",
            "secondary": "#0051d5",
            "on-primary-fixed-variant": "#3c475a",
            "tertiary-fixed-dim": "#6bd8cb",
            "on-tertiary-fixed": "#00201d"
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
            "gutter-desktop": "1.5rem",
            "space-sm": "0.5rem",
            "margin": "1rem",
            "margin-desktop": "2rem",
            "space-md": "1rem",
            "space-xl": "2rem"
          },
          "fontFamily": {
            "body-lg": ["Inter", "sans-serif"],
            "headline-md": ["Plus Jakarta Sans", "sans-serif"],
            "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
            "display-lg": ["Plus Jakarta Sans", "sans-serif"],
            "display-md": ["Plus Jakarta Sans", "sans-serif"],
            "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
            "caption": ["Inter", "sans-serif"],
            "label-sm": ["Inter", "sans-serif"],
            "body-md": ["Inter", "sans-serif"],
            "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
            "label-md": ["Inter", "sans-serif"],
            "body-sm": ["Inter", "sans-serif"]
          },
          "fontSize": {
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-md": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "headline-lg-mobile": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.025em", "fontWeight": "700" }],
            "display-md": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
            "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "caption": ["11px", { "lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "500" }],
            "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.025em", "fontWeight": "600" }],
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    .custom-scroll::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .chart-grid-line {
      stroke: #f1f5f9;
      stroke-dasharray: 4 4;
    }
    .pulse-dot {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.15); }
    }
  </style>
</head>
<body class="min-h-screen bg-background text-on-surface antialiased flex flex-col font-body-md text-body-md">
<!-- TOP BAR NAVIGATION (Shared Component: TopNavBar with JSON Specs) -->
<header class="docked full-width top-0 sticky z-50 bg-surface-container-lowest dark:bg-primary-container border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none">
<div class="w-full px-space-xl flex items-center justify-between h-16 max-w-full">
<!-- Brand & Global Nav Links -->
<div class="flex items-center gap-8">
<!-- Faculty Logo & Name -->
<a class="flex items-center gap-3 group" href="#">
<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-surface-container-lowest shadow-sm">
<span class="material-symbols-outlined text-[24px]" data-icon="domain">domain</span>
</div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md font-bold text-primary dark:text-surface-container-lowest tracking-tight">Faculty Venue Portal</span>
<span class="text-caption font-caption text-on-surface-variant leading-none">Computing &amp; Informatics</span>
</div>
</a>
<!-- Main Desktop Navigation Links -->
<nav class="hidden md:flex items-center gap-6 pt-4">
<!-- Active tab: Dashboard -->
<a class="text-secondary dark:text-secondary-fixed font-semibold border-b-2 border-secondary dark:border-secondary-fixed pb-4 text-label-md font-label-md flex items-center gap-1.5" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="dashboard">dashboard</span>
            Dashboard
          </a>
<!-- Inactive tabs -->
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors duration-150" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="meeting_room">meeting_room</span>
            Venues &amp; Halls
          </a>
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors duration-150" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="event_upcoming">event_upcoming</span>
            Booking Requests
            <span class="px-1.5 py-0.5 text-[10px] font-semibold bg-secondary text-surface-container-lowest rounded-full">4</span>
</a>
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors duration-150" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="calendar_month">calendar_month</span>
            Schedule
          </a>
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors duration-150" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="build">build</span>
            Maintenance
          </a>
</nav>
</div>
<!-- Trailing Action Cluster: Search bar, Notifications, Avatar & Role Switcher -->
<div class="flex items-center gap-4">
<!-- Integrated Fast Search Input with shortcut hint -->
<div class="hidden lg:flex items-center relative w-72">
<span class="material-symbols-outlined absolute left-3 text-outline text-[18px]" data-icon="search">search</span>
<input class="w-full bg-surface text-on-surface border border-outline-variant rounded-lg pl-9 pr-14 py-1.5 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" placeholder="Search Bilik, Hall, Lecturer..." type="text"/>
<kbd class="absolute right-2 px-1.5 py-0.5 text-[10px] font-semibold text-outline bg-surface-container-high rounded border border-outline-variant select-none">⌘K</kbd>
</div>
<!-- Notification Bell Action with Badge -->
<button class="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary active:scale-95 transition-all" title="Notifications">
<span class="material-symbols-outlined text-[22px]" data-icon="notifications">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
</button>
<div class="h-6 w-px bg-outline-variant hidden sm:block"></div>
<!-- Role Switcher & User Profile (Alif Izuddin) -->
<div class="flex items-center gap-3 pl-1">
<div class="flex items-center gap-2.5">
<div class="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-md ring-2 ring-surface-container-highest overflow-hidden">
<img alt="Avatar of Alif Izuddin, Faculty Admin" class="w-full h-full object-cover" data-alt="Close up professional portrait of Alif Izuddin, a young Malaysian academic faculty administrator wearing a neat dark blue polo shirt in an ultra modern bright technological university office with warm daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlNzs7ZrxE07zf41hRaByr3yJ27S44Q1xN-SZnqAnyBNDOPWznwF_G1fEfIdoZncgE325pFNeYG7mrUo2GsaHvIbea-ez0c9R876xpUMN-SGdvaGX7xx4g2nyIQhe99U8Y40YxgX1Oo7DSLjH9uw-z9JBtyCENZtPVWzsBpvNcVm4BkyOVlVzhHFi7364NehQS1YiXP3LWJczfOksZVsOgJ-QqoCE92L86ygwtfh7eT6bU7-5-6qxE"/>
</div>
<div class="hidden xl:flex flex-col text-left">
<span class="text-label-md font-label-md font-semibold text-on-surface leading-snug">Alif Izuddin</span>
<span class="text-caption font-caption text-on-surface-variant">Faculty Admin</span>
</div>
</div>
<!-- Secondary Action: Role Switcher Dropdown button -->
<button class="hidden sm:flex items-center gap-1 px-2.5 py-1 text-label-sm font-label-sm font-medium border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface transition-colors active:scale-95">
<span>Switch Role</span>
<span class="material-symbols-outlined text-[16px] text-outline" data-icon="arrow_drop_down">arrow_drop_down</span>
</button>
</div>
</div>
</div>
</header>
<!-- MAIN CANVAS CONTAINER -->
<main class="flex-1 w-full max-w-[1600px] mx-auto px-margin md:px-margin-desktop py-6 flex flex-col gap-6">
<!-- WELCOME BANNER & ACTION HEADER (Enhanced from original greeting card) -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
<div class="flex items-start gap-4">
<div class="p-3 bg-secondary/10 rounded-xl text-secondary">
<span class="material-symbols-outlined text-[28px]" data-icon="waving_hand">waving_hand</span>
</div>
<div>
<div class="flex items-center gap-3">
<h1 class="text-headline-lg font-headline-lg text-primary tracking-tight">Welcome Back, Alif Izuddin !</h1>
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-caption font-caption bg-surface-container-low text-secondary border border-secondary-fixed font-semibold">
<span class="w-2 h-2 rounded-full bg-secondary"></span> Semester 2 (2024/2025)
            </span>
</div>
<p class="text-body-md font-body-md text-on-surface-variant mt-1">
            Faculty of Computing &amp; Informatics venue schedules, room utilization, and pending lecturer reservations.
          </p>
</div>
</div>
<!-- Action Buttons -->
<div class="flex items-center flex-wrap gap-2.5 self-start md:self-auto">
<button class="flex items-center gap-2 px-3.5 py-2 text-label-md font-label-md font-medium text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-lg hover:bg-surface-container-low hover:text-on-surface active:scale-95 transition-all">
<span class="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
<span>Today, 24 Oct 2024</span>
</button>
<button class="flex items-center gap-2 px-3.5 py-2 text-label-md font-label-md font-medium text-on-surface-variant bg-surface-container-lowest border border-outline-variant rounded-lg hover:bg-surface-container-low hover:text-on-surface active:scale-95 transition-all">
<span class="material-symbols-outlined text-[18px]" data-icon="file_download">file_download</span>
<span>Export Utilization</span>
</button>
<button class="flex items-center gap-2 px-4 py-2 text-label-md font-label-md font-semibold text-on-primary bg-primary rounded-lg shadow hover:bg-primary-container active:scale-95 transition-all">
<span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
<span>Book Venue</span>
</button>
</div>
</div>
<!-- 4 CORE KPI METRIC CARDS (Direct redesign of Total Rooms, Total Bookings, Most Booked Venue, Available Venues) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Metric 1: Total Rooms -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-5 shadow-sm hover:shadow transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Total Rooms</span>
<div class="w-9 h-9 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="meeting_room">meeting_room</span>
</div>
</div>
<div class="mt-3 flex items-baseline gap-2">
<span class="text-display-md font-display-md text-primary">48</span>
<span class="text-caption font-caption text-on-surface-variant font-medium">Halls &amp; Labs</span>
</div>
<div class="mt-3 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">10 Lecture Halls (DK)</span>
<span class="text-secondary font-medium">38 Bilik Kuliah</span>
</div>
</div>
<!-- Metric 2: Total Bookings -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-5 shadow-sm hover:shadow transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Total Bookings</span>
<div class="w-9 h-9 rounded-lg bg-secondary-fixed/50 text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="event_available">event_available</span>
</div>
</div>
<div class="mt-3 flex items-baseline gap-2">
<span class="text-display-md font-display-md text-primary">24</span>
<span class="inline-flex items-center text-label-sm font-label-sm text-on-tertiary-container font-semibold bg-tertiary-fixed/30 px-1.5 py-0.5 rounded">
            +18% this week
          </span>
</div>
<div class="mt-3 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">Confirmed today</span>
<span class="text-primary font-semibold">18 Slots active</span>
</div>
</div>
<!-- Metric 3: Most Booked Venue -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-5 shadow-sm hover:shadow transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Most Booked Venue</span>
<div class="w-9 h-9 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="star">star</span>
</div>
</div>
<div class="mt-3">
<div class="text-headline-md font-headline-md font-bold text-primary truncate" title="Bilik Kuliah 3 (BK3)">Bilik Kuliah 3</div>
<p class="text-caption font-caption text-on-surface-variant mt-0.5">86% weekly occupancy rate</p>
</div>
<div class="mt-3 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">Capacity: 60 Pax</span>
<span class="text-secondary font-medium">DK1 runner-up</span>
</div>
</div>
<!-- Metric 4: Available Venues -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-5 shadow-sm hover:shadow transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Available Venues</span>
<div class="w-9 h-9 rounded-lg bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
</div>
</div>
<div class="mt-3 flex items-baseline gap-2">
<span class="text-display-md font-display-md text-primary">14</span>
<div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-caption font-caption font-semibold">
<span class="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span>
            Ready for use
          </div>
</div>
<div class="mt-3 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-body-sm font-body-sm">
<span class="text-on-surface-variant">Next slot frees up</span>
<span class="text-on-surface font-medium">12:30 PM (BK 2)</span>
</div>
</div>
</div>
<!-- MAIN DASHBOARD CONTENT (8 / 4 Asymmetric Grid Split) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- LEFT COLUMN (8 cols): Analytics Chart & Booking Table -->
<div class="lg:col-span-8 flex flex-col gap-6">
<!-- CARD 1: Statistics & Venue Utilization Graph (Redesign of image's curve graph) -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-6 shadow-sm">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
<div>
<div class="flex items-center gap-2">
<h2 class="text-headline-md font-headline-md text-primary">Venue Booking Trends &amp; Peak Hours</h2>
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary text-caption font-caption font-semibold">Live Analytics</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Faculty Room Booking Frequency vs Time Slot (08:00 AM - 06:00 PM)</p>
</div>
<!-- Filters Toggle -->
<div class="flex items-center p-1 bg-surface-container-low rounded-lg border border-outline-variant/50 self-start sm:self-auto">
<button class="px-3 py-1 rounded-md text-label-sm font-label-sm font-semibold bg-surface-container-lowest text-primary shadow-xs">Today</button>
<button class="px-3 py-1 rounded-md text-label-sm font-label-sm font-medium text-on-surface-variant hover:text-on-surface">Weekly</button>
<button class="px-3 py-1 rounded-md text-label-sm font-label-sm font-medium text-on-surface-variant hover:text-on-surface">Monthly</button>
</div>
</div>
<!-- Interactive SVG Curve Chart based closely on the original chart nodes (1 to 10 points) -->
<div class="mt-6 w-full">
<div class="relative h-64 w-full">
<svg class="w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 700 240">
<defs>
<lineargradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#0051d5" stop-opacity="0.22"></stop>
<stop offset="100%" stop-color="#0051d5" stop-opacity="0.0"></stop>
</lineargradient>
</defs>
<!-- Grid Horizontal Lines & Y-axis labels -->
<line class="chart-grid-line" stroke-width="1" x1="30" x2="690" y1="20" y2="20"></line>
<text class="text-[11px] fill-on-surface-variant font-mono" x="5" y="24">16</text>
<line class="chart-grid-line" stroke-width="1" x1="30" x2="690" y1="70" y2="70"></line>
<text class="text-[11px] fill-on-surface-variant font-mono" x="5" y="74">12</text>
<line class="chart-grid-line" stroke-width="1" x1="30" x2="690" y1="120" y2="120"></line>
<text class="text-[11px] fill-on-surface-variant font-mono" x="5" y="124">8</text>
<line class="chart-grid-line" stroke-width="1" x1="30" x2="690" y1="170" y2="170"></line>
<text class="text-[11px] fill-on-surface-variant font-mono" x="5" y="174">4</text>
<line stroke="#cbd5e1" stroke-width="1.5" x1="30" x2="690" y1="215" y2="215"></line>
<text class="text-[11px] fill-on-surface-variant font-mono" x="5" y="218">0</text>
<!-- Area fill below path -->
<path d="M 40,165 C 80,120 100,75 120,72 C 150,70 170,135 190,135 C 230,135 250,28 290,28 C 340,28 410,85 470,85 C 530,85 580,165 650,195 L 650,215 L 40,215 Z" fill="url(#curveGradient)"></path>
<!-- The smooth trend curve matching user's image curve -->
<path d="M 40,165 C 80,120 100,75 120,72 C 150,70 170,135 190,135 C 230,135 250,28 290,28 C 340,28 410,85 470,85 C 530,85 580,165 650,195" fill="none" stroke="#0051d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
<!-- Data Plot Nodes with Tooltip Rings -->
<!-- Point 1 (08:00 AM) -->
<circle cx="40" cy="165" fill="#ffffff" r="5" stroke="#0051d5" stroke-width="2.5"></circle>
<!-- Point 2 (10:00 AM) -->
<circle cx="120" cy="72" fill="#ffffff" r="5" stroke="#0051d5" stroke-width="2.5"></circle>
<!-- Point 3 (11:00 AM) -->
<circle cx="190" cy="135" fill="#ffffff" r="5" stroke="#0051d5" stroke-width="2.5"></circle>
<!-- Point 5 Peak (02:00 PM) -->
<circle cx="290" cy="28" fill="#0051d5" r="6" stroke="#ffffff" stroke-width="2.5"></circle>
<!-- Point 8 (04:00 PM) -->
<circle cx="470" cy="85" fill="#ffffff" r="5" stroke="#0051d5" stroke-width="2.5"></circle>
<!-- Point 10 (06:00 PM) -->
<circle cx="650" cy="195" fill="#ffffff" r="5" stroke="#0051d5" stroke-width="2.5"></circle>
</svg>
</div>
<!-- X-Axis Labels (Time slots / Intervals 1 - 10) -->
<div class="flex justify-between text-caption font-caption text-on-surface-variant font-medium pt-2 border-t border-outline-variant/30 px-2">
<span>08:00 AM (1)</span>
<span>09:00 AM (2)</span>
<span>10:00 AM (3)</span>
<span>11:00 AM (4)</span>
<span class="font-bold text-secondary">02:00 PM (5 - Peak)</span>
<span>03:00 PM (6)</span>
<span>04:00 PM (7)</span>
<span>05:00 PM (8)</span>
<span>06:00 PM (10)</span>
</div>
</div>
<!-- Chart Metric Insights Bar -->
<div class="mt-4 pt-4 border-t border-outline-variant/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
<div class="bg-surface rounded-lg p-3 border border-outline-variant/40">
<span class="text-caption font-caption text-on-surface-variant uppercase font-semibold">Peak Utilization</span>
<p class="text-headline-sm font-headline-sm text-primary font-bold mt-0.5">15 Active Venues</p>
<span class="text-caption font-caption text-secondary">Between 2:00 PM - 3:30 PM</span>
</div>
<div class="bg-surface rounded-lg p-3 border border-outline-variant/40">
<span class="text-caption font-caption text-on-surface-variant uppercase font-semibold">Average Duration</span>
<p class="text-headline-sm font-headline-sm text-primary font-bold mt-0.5">1 hr 45 mins</p>
<span class="text-caption font-caption text-on-surface-variant">Lecture standard block</span>
</div>
<div class="bg-surface rounded-lg p-3 border border-outline-variant/40">
<span class="text-caption font-caption text-on-surface-variant uppercase font-semibold">Turnaround Window</span>
<p class="text-headline-sm font-headline-sm text-primary font-bold mt-0.5">15 Minutes</p>
<span class="text-caption font-caption text-tertiary font-medium">Standard sanitize &amp; prep</span>
</div>
</div>
</div>
<!-- CARD 2: Recent Booking Requests & Venue Activity (Expanded from "Latest Activity" in original) -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 shadow-sm overflow-hidden">
<div class="p-6 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div>
<div class="flex items-center gap-2">
<h2 class="text-headline-md font-headline-md text-primary">Booking Requests &amp; Recent Activity</h2>
<span class="px-2 py-0.5 rounded-full text-caption font-caption bg-amber-100 text-amber-800 font-semibold border border-amber-200">2 Pending Action</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">Review, endorse or modify faculty room allocations in real-time.</p>
</div>
<a class="text-label-md font-label-md text-secondary font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto" href="#">
              View All Bookings
              <span class="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</a>
</div>
<!-- Structured Data Table -->
<div class="overflow-x-auto custom-scroll">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low border-b border-outline-variant/60 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
<th class="py-3 px-5">Venue Details</th>
<th class="py-3 px-5">Requested By</th>
<th class="py-3 px-5">Purpose / Course</th>
<th class="py-3 px-5">Time Slot</th>
<th class="py-3 px-5">Status</th>
<th class="py-3 px-5 text-right">Administrative Action</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/30 text-body-md font-body-md">
<!-- Row 1: Bilik Kuliah 2 -->
<tr class="hover:bg-surface transition-colors">
<td class="py-3.5 px-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-caption">
                        BK2
                      </div>
<div>
<div class="font-semibold text-primary">Bilik Kuliah 2</div>
<span class="text-caption font-caption text-on-surface-variant">Level 1, Block B • 45 Pax</span>
</div>
</div>
</td>
<td class="py-3.5 px-5">
<div class="font-medium text-on-surface">Dr. Norazah Ahmad</div>
<span class="text-caption font-caption text-on-surface-variant">Dept of Software Eng.</span>
</td>
<td class="py-3.5 px-5">
<span class="text-on-surface font-medium">SECJ3543 Mobile App</span>
<div class="text-caption font-caption text-on-surface-variant">Midterm Evaluation</div>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<div class="text-on-surface font-semibold text-body-sm">10:00 - 12:00 PM</div>
<span class="text-caption font-caption text-on-surface-variant">Today</span>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-caption font-caption font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed
                    </span>
</td>
<td class="py-3.5 px-5 text-right whitespace-nowrap">
<button class="px-2.5 py-1 text-label-sm font-label-sm text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors">
                      Details
                    </button>
</td>
</tr>
<!-- Row 2: Dewan Kuliah 1 (DK1) -->
<tr class="hover:bg-surface transition-colors">
<td class="py-3.5 px-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary font-bold text-caption">
                        DK1
                      </div>
<div>
<div class="font-semibold text-primary">Dewan Kuliah 1</div>
<span class="text-caption font-caption text-on-surface-variant">Main Auditorium • 220 Pax</span>
</div>
</div>
</td>
<td class="py-3.5 px-5">
<div class="font-medium text-on-surface">Prof. Ir. Ts. Kamaludin</div>
<span class="text-caption font-caption text-on-surface-variant">Dean's Office</span>
</td>
<td class="py-3.5 px-5">
<span class="text-on-surface font-medium">Faculty Townhall 2024</span>
<div class="text-caption font-caption text-on-surface-variant">Keynote &amp; Awards</div>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<div class="text-on-surface font-semibold text-body-sm">02:00 - 05:00 PM</div>
<span class="text-caption font-caption text-on-surface-variant">Today</span>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-caption font-caption font-semibold bg-amber-50 text-amber-800 border border-amber-200">
<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending Review
                    </span>
</td>
<td class="py-3.5 px-5 text-right whitespace-nowrap">
<div class="flex items-center justify-end gap-1.5">
<button class="px-2.5 py-1 bg-secondary text-on-secondary rounded text-label-sm font-label-sm font-semibold hover:bg-secondary-container transition-colors shadow-xs active:scale-95">
                        Approve
                      </button>
<button class="px-2 py-1 text-on-surface-variant hover:text-error hover:bg-error-container/40 rounded transition-colors" title="Decline">
<span class="material-symbols-outlined text-[18px]" data-icon="close">close</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: Makmal AI & Data Science -->
<tr class="hover:bg-surface transition-colors">
<td class="py-3.5 px-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-caption">
                        LAB
                      </div>
<div>
<div class="font-semibold text-primary">Makmal AI (Lab 4)</div>
<span class="text-caption font-caption text-on-surface-variant">Level 3, Block C • 35 Pax</span>
</div>
</div>
</td>
<td class="py-3.5 px-5">
<div class="font-medium text-on-surface">Ts. Dr. Aiman Hakimi</div>
<span class="text-caption font-caption text-on-surface-variant">AI &amp; Robotics Lab</span>
</td>
<td class="py-3.5 px-5">
<span class="text-on-surface font-medium">Hands-on PyTorch Workshop</span>
<div class="text-caption font-caption text-on-surface-variant">Postgrad Seminar</div>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<div class="text-on-surface font-semibold text-body-sm">03:30 - 05:30 PM</div>
<span class="text-caption font-caption text-on-surface-variant">Tomorrow</span>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-caption font-caption font-semibold bg-blue-50 text-blue-800 border border-blue-200">
<span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Confirmed
                    </span>
</td>
<td class="py-3.5 px-5 text-right whitespace-nowrap">
<button class="px-2.5 py-1 text-label-sm font-label-sm text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors">
                      Details
                    </button>
</td>
</tr>
<!-- Row 4: Bilik Seminar Al-Khawarizmi -->
<tr class="hover:bg-surface transition-colors">
<td class="py-3.5 px-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-caption">
                        SEM
                      </div>
<div>
<div class="font-semibold text-primary">Bilik Seminar 1</div>
<span class="text-caption font-caption text-on-surface-variant">Level 2, Admin Wing • 50 Pax</span>
</div>
</div>
</td>
<td class="py-3.5 px-5">
<div class="font-medium text-on-surface">Puan Siti Nurhaliza</div>
<span class="text-caption font-caption text-on-surface-variant">Academic Office</span>
</td>
<td class="py-3.5 px-5">
<span class="text-on-surface font-medium">Curriculum Review Panel</span>
<div class="text-caption font-caption text-on-surface-variant">External Stakeholders</div>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<div class="text-on-surface font-semibold text-body-sm">09:00 - 01:00 PM</div>
<span class="text-caption font-caption text-on-surface-variant">26 Oct 2024</span>
</td>
<td class="py-3.5 px-5 whitespace-nowrap">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-caption font-caption font-semibold bg-amber-50 text-amber-800 border border-amber-200">
<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending Review
                    </span>
</td>
<td class="py-3.5 px-5 text-right whitespace-nowrap">
<div class="flex items-center justify-end gap-1.5">
<button class="px-2.5 py-1 bg-secondary text-on-secondary rounded text-label-sm font-label-sm font-semibold hover:bg-secondary-container transition-colors shadow-xs active:scale-95">
                        Approve
                      </button>
<button class="px-2 py-1 text-on-surface-variant hover:text-error hover:bg-error-container/40 rounded transition-colors" title="Decline">
<span class="material-symbols-outlined text-[18px]" data-icon="close">close</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="px-6 py-3 bg-surface border-t border-outline-variant/40 flex items-center justify-between">
<span class="text-caption font-caption text-on-surface-variant">Showing 4 of 24 total reservations today</span>
<div class="flex items-center gap-1">
<button class="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container" disabled="">
<span class="material-symbols-outlined text-[20px]" data-icon="chevron_left">chevron_left</span>
</button>
<span class="text-label-sm font-label-sm font-semibold text-primary px-2">Page 1</span>
<button class="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container">
<span class="material-symbols-outlined text-[20px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
<!-- RIGHT COLUMN (4 cols): Venues Under Maintenance & Live Active Sessions -->
<div class="lg:col-span-4 flex flex-col gap-6">
<!-- CARD 3: Venues Under Maintenance (Redesign of "Venues Under Maintenance" box from original) -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-6 shadow-sm">
<div class="flex items-center justify-between pb-4 border-b border-outline-variant/40">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-rose-50 text-error flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="construction">construction</span>
</div>
<h2 class="text-headline-md font-headline-md text-primary">Venues Under Maintenance</h2>
</div>
<button class="text-label-sm font-label-sm text-secondary font-semibold hover:underline flex items-center gap-0.5">
<span>Report</span>
<span class="material-symbols-outlined text-[14px]" data-icon="add_circle">add_circle</span>
</button>
</div>
<!-- Maintenance Items or Clean Alert State -->
<div class="mt-4 flex flex-col gap-3">
<!-- Alert Item 1 -->
<div class="p-3.5 rounded-lg border border-rose-200 bg-rose-50/50 flex items-start gap-3">
<span class="material-symbols-outlined text-error text-[20px] mt-0.5" data-icon="warning">warning</span>
<div class="flex-1">
<div class="flex items-center justify-between">
<span class="text-label-md font-label-md font-semibold text-primary">Bilik Kuliah 4 (BK4)</span>
<span class="text-caption font-caption text-error font-semibold bg-rose-100 px-2 py-0.5 rounded">In Progress</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-1">
                  Air conditioner compressor replacement &amp; ceiling projector calibration.
                </p>
<div class="mt-2 flex items-center justify-between text-caption font-caption text-on-surface-variant">
<span>Tech: En. Razak (Facility Team)</span>
<span class="font-semibold text-primary">ETA: 04:30 PM Today</span>
</div>
</div>
</div>
<!-- Scheduled Maintenance Notice -->
<div class="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 flex items-start gap-3">
<span class="material-symbols-outlined text-amber-700 text-[20px] mt-0.5" data-icon="schedule">schedule</span>
<div class="flex-1">
<div class="flex items-center justify-between">
<span class="text-label-md font-label-md font-semibold text-primary">Dewan Kuliah 2 (DK2)</span>
<span class="text-caption font-caption text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded">Scheduled</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-1">
                  Routine audio system testing &amp; acoustic dampening inspection.
                </p>
<div class="mt-2 flex items-center justify-between text-caption font-caption text-on-surface-variant">
<span>Duration: 1.5 Hours</span>
<span class="font-semibold text-primary">Tomorrow 08:00 AM</span>
</div>
</div>
</div>
<!-- Operational Status Affirmation (incorporating original message smoothly) -->
<div class="mt-1 p-3 rounded-lg bg-surface border border-outline-variant/50 text-center">
<span class="text-caption font-caption text-on-surface-variant flex items-center justify-center gap-1.5 font-medium">
<span class="material-symbols-outlined text-[16px] text-emerald-600" data-icon="verified">verified</span>
                All remaining 46 lecture halls and tutorial rooms are 100% operational.
              </span>
</div>
</div>
</div>
<!-- CARD 4: Today's Live Ongoing Venue Sessions (Timeline Preview) -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-6 shadow-sm">
<div class="flex items-center justify-between pb-4 border-b border-outline-variant/40">
<div>
<h2 class="text-headline-md font-headline-md text-primary">Ongoing Venue Sessions</h2>
<p class="text-caption font-caption text-on-surface-variant mt-0.5">Real-time room occupancy</p>
</div>
<div class="flex items-center gap-1.5 text-caption font-caption font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
<span class="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span>
              Live Tracking
            </div>
</div>
<!-- Timeline Session List -->
<div class="mt-4 flex flex-col gap-3.5">
<!-- Ongoing Item 1 -->
<div class="p-3 rounded-lg border border-outline-variant/50 bg-surface flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span class="text-label-md font-label-md font-bold text-primary">Dewan Kuliah 1 (DK1)</span>
</div>
<span class="text-caption font-caption font-semibold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                  Ends in 25 min
                </span>
</div>
<div class="text-body-sm font-body-sm text-on-surface font-medium">SECJ1013 Programming Technique I</div>
<div class="flex items-center justify-between text-caption font-caption text-on-surface-variant">
<span>Lecturer: Dr. Mahadi</span>
<span>10:00 AM - 12:00 PM</span>
</div>
<!-- Progress Bar -->
<div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 78%;"></div>
</div>
</div>
<!-- Ongoing Item 2 -->
<div class="p-3 rounded-lg border border-outline-variant/50 bg-surface flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span class="text-label-md font-label-md font-bold text-primary">Bilik Kuliah 1 (BK1)</span>
</div>
<span class="text-caption font-caption font-semibold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                  Ends in 50 min
                </span>
</div>
<div class="text-body-sm font-body-sm text-on-surface font-medium">SCSR2043 Operating Systems</div>
<div class="flex items-center justify-between text-caption font-caption text-on-surface-variant">
<span>Lecturer: Ts. Hafiz</span>
<span>10:30 AM - 12:30 PM</span>
</div>
<!-- Progress Bar -->
<div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 52%;"></div>
</div>
</div>
<!-- Upcoming Item 3 -->
<div class="p-3 rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest flex items-center justify-between">
<div>
<div class="text-label-md font-label-md font-semibold text-on-surface">Makmal Siber (Cybersecurity)</div>
<span class="text-caption font-caption text-on-surface-variant">Starts at 12:00 PM • Network Penetration Test</span>
</div>
<span class="text-caption font-caption font-semibold text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                Next in 30m
              </span>
</div>
</div>
<!-- Quick Action Link -->
<div class="mt-4 pt-3 border-t border-outline-variant/40 text-center">
<a class="text-label-sm font-label-sm font-semibold text-secondary hover:text-secondary-container transition-colors inline-flex items-center gap-1" href="#">
              Open Master Floor Schedule View
              <span class="material-symbols-outlined text-[16px]" data-icon="open_in_new">open_in_new</span>
</a>
</div>
</div>
</div>
</div>
</main>
<!-- FOOTER -->
<footer class="mt-auto border-t border-outline-variant/60 bg-surface-container-lowest py-5 text-on-surface-variant text-body-sm font-body-sm">
<div class="max-w-[1600px] mx-auto px-margin md:px-margin-desktop flex flex-col sm:flex-row items-center justify-between gap-3 text-caption font-caption">
<div class="flex items-center gap-2">
<span class="font-semibold text-primary">Faculty Venue Portal</span>
<span>•</span>
<span>Faculty of Computing &amp; Informatics Campus Facility System</span>
</div>
<div class="flex items-center gap-6 text-on-surface-variant">
<span>Logged in as: <strong class="text-on-surface">Alif Izuddin (Admin)</strong></span>
<a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-primary transition-colors" href="#">IT Support Helpdesk</a>
</div>
</div>
</footer>
</body></html>