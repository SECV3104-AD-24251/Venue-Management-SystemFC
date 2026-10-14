<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Venue Maintenance &amp; Service Records - Faculty Venue Portal</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS with Forms and Container Queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Config verbatim -->
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "tertiary-fixed-dim": "#6bd8cb",
            "surface-bright": "#f8f9ff",
            "on-error-container": "#93000a",
            "inverse-surface": "#213145",
            "on-primary-fixed-variant": "#3c475a",
            "surface-container-lowest": "#ffffff",
            "secondary": "#0051d5",
            "on-secondary": "#ffffff",
            "primary": "#091426",
            "on-tertiary-fixed-variant": "#005049",
            "tertiary": "#001815",
            "on-tertiary-fixed": "#00201d",
            "on-tertiary": "#ffffff",
            "secondary-container": "#316bf3",
            "on-secondary-fixed": "#00174b",
            "error": "#ba1a1a",
            "surface-variant": "#d3e4fe",
            "on-surface": "#0b1c30",
            "inverse-primary": "#bcc7de",
            "outline": "#75777d",
            "surface-container-low": "#eff4ff",
            "primary-container": "#1e293b",
            "primary-fixed": "#d8e3fb",
            "on-secondary-container": "#fefcff",
            "surface-container-high": "#dce9ff",
            "on-secondary-fixed-variant": "#003ea8",
            "surface-dim": "#cbdbf5",
            "outline-variant": "#c5c6cd",
            "background": "#f8f9ff",
            "on-surface-variant": "#45474c",
            "secondary-fixed-dim": "#b4c5ff",
            "error-container": "#ffdad6",
            "on-primary": "#ffffff",
            "on-background": "#0b1c30",
            "tertiary-container": "#002f2a",
            "inverse-on-surface": "#eaf1ff",
            "on-tertiary-container": "#28a094",
            "secondary-fixed": "#dbe1ff",
            "surface-container": "#e5eeff",
            "surface": "#f8f9ff",
            "surface-container-highest": "#d3e4fe",
            "on-primary-fixed": "#111c2d",
            "on-primary-container": "#8590a6",
            "surface-tint": "#545f73",
            "tertiary-fixed": "#89f5e7",
            "on-error": "#ffffff",
            "primary-fixed-dim": "#bcc7de"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "margin-desktop": "2rem",
            "space-lg": "1.5rem",
            "space-md": "1rem",
            "margin": "1rem",
            "gutter": "1.25rem",
            "space-xl": "2rem",
            "gutter-desktop": "1.5rem",
            "space-xs": "0.25rem",
            "space-sm": "0.5rem"
          },
          "fontFamily": {
            "body-sm": ["Inter"],
            "label-sm": ["Inter"],
            "headline-md": ["Plus Jakarta Sans"],
            "caption": ["Inter"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-sm": ["Plus Jakarta Sans"],
            "body-md": ["Inter"],
            "headline-lg-mobile": ["Plus Jakarta Sans"],
            "label-md": ["Inter"],
            "body-lg": ["Inter"],
            "display-md": ["Plus Jakarta Sans"],
            "display-lg": ["Plus Jakarta Sans"]
          },
          "fontSize": {
            "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
            "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.025em", "fontWeight": "600" }],
            "headline-md": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "caption": ["11px", { "lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "500" }],
            "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "headline-lg-mobile": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "display-md": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
            "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.025em", "fontWeight": "700" }]
          }
        }
      }
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      vertical-align: middle;
      font-size: 1.25rem;
      line-height: 1;
    }
    .custom-scroll::-webkit-scrollbar {
      height: 6px;
      width: 6px;
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
<body class="bg-background text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md selection:bg-secondary-fixed selection:text-on-secondary-fixed">
<!-- TOP APP BAR (Shared Components: TopNavBar) -->
<header class="bg-surface-container-lowest dark:bg-primary-container text-primary dark:text-inverse-primary docked full-width top-0 sticky z-50 border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none">
<div class="w-full px-space-xl flex items-center justify-between h-16 max-w-full">
<!-- Left: Logo & Institutional Brand -->
<div class="flex items-center gap-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-surface-bright" data-icon="domain" data-weight="fill" style="font-variation-settings: 'FILL' 1;">domain</span>
</div>
<div>
<div class="text-headline-md font-headline-md font-bold text-primary dark:text-surface-container-lowest tracking-tight leading-none">
              Faculty Venue Portal
            </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span>Faculty of Computing &amp; Informatics</span>
<span class="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
<span class="text-secondary font-medium">Ops Terminal</span>
</div>
</div>
</div>
<!-- Global Navigation Items -->
<nav class="hidden xl:flex items-center gap-7 pt-4 ml-4">
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface flex items-center gap-1.5 text-label-md font-label-md hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-150 active:scale-95 transition-transform duration-100 ease-out" href="#">
<span class="material-symbols-outlined text-lg" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface flex items-center gap-1.5 text-label-md font-label-md hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-150 active:scale-95 transition-transform duration-100 ease-out" href="#">
<span class="material-symbols-outlined text-lg" data-icon="meeting_room">meeting_room</span>
<span>Venues &amp; Halls</span>
</a>
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface flex items-center gap-1.5 text-label-md font-label-md hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-150 active:scale-95 transition-transform duration-100 ease-out" href="#">
<span class="material-symbols-outlined text-lg" data-icon="pending_actions">pending_actions</span>
<span>Booking Requests</span>
<span class="px-1.5 py-0.2 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold">4</span>
</a>
<a class="text-on-surface-variant dark:text-outline-variant font-medium pb-4 hover:text-on-surface dark:hover:text-inverse-on-surface flex items-center gap-1.5 text-label-md font-label-md hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-150 active:scale-95 transition-transform duration-100 ease-out" href="#">
<span class="material-symbols-outlined text-lg" data-icon="calendar_month">calendar_month</span>
<span>Schedule</span>
</a>
<!-- Active Nav Tab: Maintenance -->
<a class="text-secondary dark:text-secondary-fixed font-semibold border-b-2 border-secondary dark:border-secondary-fixed pb-4 flex items-center gap-1.5 text-label-md font-label-md active:scale-95 transition-transform duration-100 ease-out" href="#">
<span class="material-symbols-outlined text-lg" data-icon="build" data-weight="fill" style="font-variation-settings: 'FILL' 1;">build</span>
<span>Maintenance</span>
</a>
</nav>
</div>
<!-- Right Actions: Search bar on right + notifications + Switch Role + User Profile -->
<div class="flex items-center gap-3.5">
<!-- Search bar on right -->
<div class="relative hidden lg:flex items-center">
<span class="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none" data-icon="search">search</span>
<input class="pl-9 pr-8 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary w-56 transition-all" placeholder="Search venue or ticket..." type="text"/>
<kbd class="absolute right-2 px-1.5 py-0.5 text-[10px] bg-surface-container-lowest text-outline font-medium rounded border border-outline-variant">⌘K</kbd>
</div>
<!-- Trailing action: Notifications -->
<button aria-label="Notifications" class="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
</button>
<div class="h-6 w-[1px] bg-outline-variant hidden sm:block"></div>
<!-- Trailing Secondary Action: Switch Role -->
<button class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant text-label-md font-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all active:scale-95">
<span class="material-symbols-outlined text-base" data-icon="swap_horiz">swap_horiz</span>
<span>Switch Role</span>
</button>
<!-- User Profile Pill -->
<div class="flex items-center gap-2.5 pl-1.5">
<div class="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-headline-sm text-sm font-bold ring-2 ring-surface-container-lowest shadow-sm">
            AI
          </div>
<div class="hidden 2xl:block text-left leading-tight">
<p class="text-label-md font-label-md text-on-surface font-semibold">Dr. Alif Izuddin</p>
<p class="text-caption font-caption text-on-surface-variant">Faculty Staff &amp; Admin</p>
</div>
</div>
</div>
</div>
</header>
<!-- MAIN CANVAS -->
<main class="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-space-xl py-6 space-y-6">
<!-- BREADCRUMB & HEADER -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-surface-container-high/60">
<div>
<nav class="flex items-center gap-2 text-caption font-caption text-on-surface-variant mb-1.5">
<a class="hover:text-secondary flex items-center gap-1" href="#">
<span class="material-symbols-outlined text-sm" data-icon="home">home</span>
<span>Faculty Portal</span>
</a>
<span class="material-symbols-outlined text-xs text-outline-variant" data-icon="chevron_right">chevron_right</span>
<span>Maintenance &amp; Operations</span>
<span class="material-symbols-outlined text-xs text-outline-variant" data-icon="chevron_right">chevron_right</span>
<span class="text-secondary font-semibold">Manage Maintenance Records</span>
</nav>
<div class="flex items-center gap-3">
<h1 class="text-headline-lg font-headline-lg text-primary tracking-tight">Venue Maintenance &amp; Service Records</h1>
<span class="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-caption font-caption bg-surface-container text-on-surface-variant font-medium border border-outline-variant/60">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Semester 1, 2026/2027
          </span>
</div>
<p class="text-body-md font-body-md text-on-surface-variant mt-1 max-w-3xl">
          Monitor facility maintenance tickets, inspect resolution statuses, assign technicians, and generate certified audit reports.
        </p>
</div>
<!-- Action Buttons Cluster -->
<div class="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
<!-- Quick Action: Export CSV -->
<button class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-label-md font-label-md shadow-sm active:scale-95">
<span class="material-symbols-outlined text-base" data-icon="file_download">file_download</span>
<span>Export CSV / Excel</span>
</button>
<!-- Secondary CTA: Generate Master Report -->
<button class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-secondary text-secondary hover:bg-surface-container-low transition-all text-label-md font-label-md shadow-sm active:scale-95 font-semibold">
<span class="material-symbols-outlined text-base" data-icon="picture_as_pdf">picture_as_pdf</span>
<span>Generate Master Report</span>
</button>
<!-- Primary CTA: Add Maintenance / Log New Job -->
<button class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all text-label-md font-label-md font-semibold shadow-sm active:scale-95">
<span class="material-symbols-outlined text-lg" data-icon="add_circle">add_circle</span>
<span>+ Add Maintenance / Log New Job</span>
</button>
</div>
</div>
<!-- KEY METRIC CARDS / KPI ROW (4-across) -->
<section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<!-- Card 1: Active Work Orders -->
<div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant">Active Work Orders</span>
<div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
<span class="material-symbols-outlined text-lg" data-icon="engineering">engineering</span>
</div>
</div>
<div class="mt-3">
<div class="text-display-md font-display-md text-primary">3 Active</div>
<div class="flex items-center gap-2 mt-1">
<span class="inline-flex items-center px-2 py-0.5 rounded text-caption font-caption bg-amber-50 text-amber-800 border border-amber-200 font-medium">
              1 In Progress
            </span>
<span class="text-caption font-caption text-on-surface-variant">2 Scheduled</span>
</div>
</div>
</div>
<!-- Card 2: Completed This Month -->
<div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant">Completed This Month</span>
<div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
<span class="material-symbols-outlined text-lg" data-icon="task_alt">task_alt</span>
</div>
</div>
<div class="mt-3">
<div class="text-display-md font-display-md text-primary">18 Jobs</div>
<div class="flex items-center gap-1.5 mt-1">
<span class="material-symbols-outlined text-emerald-600 text-sm" data-icon="trending_up">trending_up</span>
<span class="text-caption font-caption text-emerald-700 font-semibold">98% resolved on time</span>
<span class="text-caption font-caption text-on-surface-variant">• Target: 95%</span>
</div>
</div>
</div>
<!-- Card 3: Avg Resolution Time -->
<div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant">Avg Resolution Time</span>
<div class="w-8 h-8 rounded-lg bg-blue-50 text-secondary border border-blue-200 flex items-center justify-center">
<span class="material-symbols-outlined text-lg" data-icon="schedule">schedule</span>
</div>
</div>
<div class="mt-3">
<div class="text-display-md font-display-md text-primary">3.2 Hours</div>
<div class="flex items-center gap-1.5 mt-1">
<span class="inline-flex items-center px-2 py-0.5 rounded text-caption font-caption bg-blue-50 text-secondary border border-blue-200 font-medium">
              Benchmark &lt; 4.0h
            </span>
<span class="text-caption font-caption text-on-surface-variant">-18m vs last month</span>
</div>
</div>
</div>
<!-- Card 4: Equipment Audited -->
<div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface-variant">Equipment Audited</span>
<div class="w-8 h-8 rounded-lg bg-surface-container text-primary border border-outline-variant/60 flex items-center justify-center">
<span class="material-symbols-outlined text-lg" data-icon="inventory_2">inventory_2</span>
</div>
</div>
<div class="mt-3">
<div class="text-display-md font-display-md text-primary">42 Units</div>
<div class="flex items-center gap-1 mt-1 text-caption font-caption text-on-surface-variant truncate">
<span>Air-con, Projectors, Cisco Switches</span>
</div>
</div>
</div>
</section>
<!-- MAIN INTERACTIVE MANAGEMENT CONTAINER -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/80 shadow-sm overflow-hidden">
<!-- FILTER TABS BAR -->
<div class="px-5 pt-4 border-b border-outline-variant/60 flex flex-wrap items-center justify-between gap-3 bg-surface-bright">
<div class="flex items-center gap-1 sm:gap-2 overflow-x-auto custom-scroll -mb-[1px]">
<button class="px-4 py-2.5 text-label-md font-label-md border-b-2 border-secondary text-secondary font-semibold flex items-center gap-2 whitespace-nowrap">
<span>All Maintenance</span>
<span class="px-2 py-0.5 rounded-full text-caption font-caption bg-secondary/10 text-secondary font-bold">21</span>
</button>
<button class="px-4 py-2.5 text-label-md font-label-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium flex items-center gap-2 whitespace-nowrap transition-colors">
<span>Scheduled</span>
<span class="px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container text-on-surface-variant">1</span>
</button>
<button class="px-4 py-2.5 text-label-md font-label-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium flex items-center gap-2 whitespace-nowrap transition-colors">
<span>In Progress</span>
<span class="px-2 py-0.5 rounded-full text-caption font-caption bg-blue-100 text-blue-800 font-semibold">2</span>
</button>
<button class="px-4 py-2.5 text-label-md font-label-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium flex items-center gap-2 whitespace-nowrap transition-colors">
<span>Completed</span>
<span class="px-2 py-0.5 rounded-full text-caption font-caption bg-emerald-100 text-emerald-800 font-semibold">16</span>
</button>
<button class="px-4 py-2.5 text-label-md font-label-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium flex items-center gap-2 whitespace-nowrap transition-colors">
<span>Report Pending</span>
<span class="px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container text-on-surface-variant">2</span>
</button>
</div>
<div class="text-caption font-caption text-on-surface-variant pb-2.5 hidden sm:flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
<span>Live sync active: Block N28 Facilities</span>
</div>
</div>
<!-- FILTER CONTROLS TOOLBAR -->
<div class="p-4 bg-surface-container-lowest border-b border-outline-variant/60 flex flex-wrap items-center justify-between gap-3">
<div class="flex flex-wrap items-center gap-2.5 flex-1 min-w-[300px]">
<!-- Search input -->
<div class="relative flex-1 min-w-[240px] max-w-md">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg pointer-events-none" data-icon="search">search</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all" placeholder="Search by venue name, issue description, ticket ID..." type="text" value=""/>
</div>
<!-- Venue selector dropdown -->
<div class="relative min-w-[190px]">
<select class="w-full appearance-none pl-3 pr-8 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all">
<option selected="">All Venues (BK, DK, Labs)</option>
<option>Active Learning Lab</option>
<option>Bilik Kuliah (BK1 - BK12)</option>
<option>Kejora Hall (DK1 Auditorium)</option>
<option>Advanced Robotics Lab</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-base pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
<!-- Date range picker -->
<div class="relative min-w-[180px]">
<div class="flex items-center pl-3 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface-variant cursor-pointer hover:border-outline">
<span class="material-symbols-outlined text-base mr-2 text-outline" data-icon="date_range">date_range</span>
<span class="text-on-surface">Oct 2026 (Semester)</span>
</div>
</div>
<!-- Status filter dropdown -->
<div class="relative min-w-[150px]">
<select class="w-full appearance-none pl-3 pr-8 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all">
<option selected="">All Statuses</option>
<option>Scheduled</option>
<option>In Progress</option>
<option>Completed</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-base pointer-events-none" data-icon="tune">tune</span>
</div>
</div>
<!-- Toolbar Right Actions -->
<div class="flex items-center gap-2">
<button class="px-3 py-2 rounded-lg text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-container flex items-center gap-1 transition-colors">
<span class="material-symbols-outlined text-base" data-icon="filter_alt_off">filter_alt_off</span>
<span>Clear Filters</span>
</button>
<div class="h-5 w-[1px] bg-outline-variant"></div>
<button class="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors" title="Reload List">
<span class="material-symbols-outlined text-base" data-icon="refresh">refresh</span>
</button>
</div>
</div>
<!-- HIGH-FIDELITY ENTERPRISE DATA TABLE -->
<div class="overflow-x-auto custom-scroll">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-bright border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider select-none">
<th class="py-3 px-5 font-semibold text-left" scope="col">Venue &amp; Ticket ID</th>
<th class="py-3 px-5 font-semibold text-left" scope="col">Issue Description &amp; Scope</th>
<th class="py-3 px-5 font-semibold text-left" scope="col">Scheduled / Logged Date</th>
<th class="py-3 px-5 font-semibold text-left" scope="col">Assigned Technician</th>
<th class="py-3 px-4 font-semibold text-center" scope="col">Status</th>
<th class="py-3 px-4 font-semibold text-center" scope="col">Action</th>
<th class="py-3 px-5 font-semibold text-right" scope="col">Audit &amp; Report</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/40 bg-surface-container-lowest">
<!-- ROW 1 (Scheduled - Matches active learning lab switch repair in screenshot) -->
<tr class="hover:bg-surface-bright/70 transition-colors group">
<!-- Col 1: Venue & Ticket -->
<td class="py-4 px-5 align-top">
<div class="flex items-start gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mt-0.5 flex-shrink-0 border border-outline-variant/60">
<span class="material-symbols-outlined text-base" data-icon="computer">computer</span>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                      Active Learning Lab
                    </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-xs" data-icon="location_on">location_on</span>
<span>Block N28, Level 3 (N28-03-04)</span>
</div>
<span class="inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-surface-container text-on-surface-variant border border-outline-variant/60">
                      #MNT-2026-088
                    </span>
</div>
</div>
</td>
<!-- Col 2: Issue Description & Category -->
<td class="py-4 px-5 align-top">
<div class="max-w-md">
<div class="text-body-md font-body-md font-semibold text-primary">
                    Switch Repair
                  </div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    Core Cisco 48-port switch port intermittent failure affecting Student Stations #12 through #24.
                  </p>
<div class="flex items-center gap-2 mt-2">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-caption bg-blue-50 text-secondary border border-blue-200">
<span class="material-symbols-outlined text-xs" data-icon="lan">lan</span>
                      Network &amp; Wi-Fi
                    </span>
<span class="text-caption font-caption text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Priority: Normal
                    </span>
</div>
</div>
</td>
<!-- Col 3: Scheduled Date & Time -->
<td class="py-4 px-5 align-top">
<div class="text-body-md font-body-md font-semibold text-primary font-mono">
                  2026-10-22
                </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
<span class="material-symbols-outlined text-xs text-amber-600" data-icon="event">event</span>
<span>Scheduled for 09:30 AM</span>
</div>
<div class="text-[11px] text-outline mt-1">Est. downtime: 45 mins</div>
</td>
<!-- Col 4: Assigned Technician -->
<td class="py-4 px-5 align-top">
<div class="flex items-center gap-2">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs">
                    SD
                  </div>
<div>
<div class="text-label-md font-label-md text-on-surface font-medium leading-none">
                      En. Salleh Daud
                    </div>
<div class="text-caption font-caption text-on-surface-variant mt-0.5">
                      Network Operations
                    </div>
</div>
</div>
</td>
<!-- Col 5: Status Badge -->
<td class="py-4 px-4 align-top text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold bg-amber-50 text-amber-800 border border-amber-200">
<span class="material-symbols-outlined text-xs" data-icon="schedule">schedule</span>
<span>Scheduled</span>
</span>
</td>
<!-- Col 6: Quick Action / Status Update -->
<td class="py-4 px-4 align-top text-center">
<div class="relative inline-block text-left">
<button class="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-body-sm font-body-sm font-medium text-on-surface shadow-sm active:scale-95 transition-all">
<span>Manage</span>
<span class="material-symbols-outlined text-base" data-icon="more_vert">more_vert</span>
</button>
</div>
</td>
<!-- Col 7: Report Generation & Download -->
<td class="py-4 px-5 align-top text-right">
<button class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container text-outline hover:text-on-surface border border-outline-variant/80 text-label-sm font-label-sm font-medium cursor-not-allowed shadow-none" disabled="" title="Report available once technician closes the ticket">
<span class="material-symbols-outlined text-base" data-icon="pending">pending</span>
<span>Report Pending</span>
</button>
<div class="text-[11px] text-outline mt-1">Awaiting completion</div>
</td>
</tr>
<!-- ROW 2 (Completed - Active Learning Lab switch repair) -->
<tr class="hover:bg-surface-bright/70 transition-colors group">
<!-- Col 1: Venue & Ticket -->
<td class="py-4 px-5 align-top">
<div class="flex items-start gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mt-0.5 flex-shrink-0 border border-outline-variant/60">
<span class="material-symbols-outlined text-base" data-icon="computer">computer</span>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                      Active Learning Lab
                    </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-xs" data-icon="location_on">location_on</span>
<span>Block N28, Level 3 (N28-03-04)</span>
</div>
<span class="inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-surface-container text-on-surface-variant border border-outline-variant/60">
                      #MNT-2026-084
                    </span>
</div>
</div>
</td>
<!-- Col 2: Issue Description & Category -->
<td class="py-4 px-5 align-top">
<div class="max-w-md">
<div class="text-body-md font-body-md font-semibold text-primary">
                    Switch Repair
                  </div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    Secondary switch cabinet re-cabling, RJ45 crimping testing, and VLAN 12 routing verification.
                  </p>
<div class="flex items-center gap-2 mt-2">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-caption bg-blue-50 text-secondary border border-blue-200">
<span class="material-symbols-outlined text-xs" data-icon="lan">lan</span>
                      Network &amp; Wi-Fi
                    </span>
<span class="text-caption font-caption text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
<span class="material-symbols-outlined text-xs" data-icon="check">check</span>
                      Verified
                    </span>
</div>
</div>
</td>
<!-- Col 3: Scheduled Date & Time -->
<td class="py-4 px-5 align-top">
<div class="text-body-md font-body-md font-semibold text-primary font-mono">
                  2026-10-14
                </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
<span class="material-symbols-outlined text-xs text-emerald-600" data-icon="check_circle">check_circle</span>
<span>Resolved at 04:15 PM</span>
</div>
<div class="text-[11px] text-outline mt-1">Duration: 1h 45m</div>
</td>
<!-- Col 4: Assigned Technician -->
<td class="py-4 px-5 align-top">
<div class="flex items-center gap-2">
<div class="w-7 h-7 rounded-full bg-blue-100 text-secondary flex items-center justify-center font-bold text-xs">
                    RD
                  </div>
<div>
<div class="text-label-md font-label-md text-on-surface font-medium leading-none">
                      En. Razak Daud
                    </div>
<div class="text-caption font-caption text-on-surface-variant mt-0.5">
                      AV &amp; Facilities Unit
                    </div>
</div>
</div>
</td>
<!-- Col 5: Status Badge -->
<td class="py-4 px-4 align-top text-center">
<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
<span class="material-symbols-outlined text-xs" data-icon="check_circle" data-weight="fill" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span>Completed</span>
</span>
</td>
<!-- Col 6: Quick Action / Status Update -->
<td class="py-4 px-4 align-top text-center">
<button class="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-body-sm font-body-sm font-medium text-on-surface shadow-sm active:scale-95 transition-all">
<span class="material-symbols-outlined text-base" data-icon="visibility">visibility</span>
<span>View Log</span>
</button>
</td>
<!-- Col 7: Report Generation & Download -->
<td class="py-4 px-5 align-top text-right">
<button class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-on-primary text-label-sm font-label-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all">
<span class="material-symbols-outlined text-base" data-icon="description">description</span>
<span>Generate Report</span>
</button>
<div class="text-[11px] text-emerald-700 font-medium mt-1">PDF Certified Ready</div>
</td>
</tr>
<!-- ROW 3 (Completed - Bilik Kuliah BK1 switch repair) -->
<tr class="hover:bg-surface-bright/70 transition-colors group">
<!-- Col 1: Venue & Ticket -->
<td class="py-4 px-5 align-top">
<div class="flex items-start gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mt-0.5 flex-shrink-0 border border-outline-variant/60">
<span class="material-symbols-outlined text-base" data-icon="school">school</span>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                      Bilik Kuliah (BK 01)
                    </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-xs" data-icon="location_on">location_on</span>
<span>Block N28, Level 1 (N28-01-10)</span>
</div>
<span class="inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-surface-container text-on-surface-variant border border-outline-variant/60">
                      #MNT-2026-081
                    </span>
</div>
</div>
</td>
<!-- Col 2: Issue Description & Category -->
<td class="py-4 px-5 align-top">
<div class="max-w-md">
<div class="text-body-md font-body-md font-semibold text-primary">
                    Switch Repair &amp; Wall Patching
                  </div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    Wall ethernet socket faceplate replacement and lecturer podium network uplink termination.
                  </p>
<div class="flex items-center gap-2 mt-2">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-caption bg-blue-50 text-secondary border border-blue-200">
<span class="material-symbols-outlined text-xs" data-icon="lan">lan</span>
                      Network &amp; Wi-Fi
                    </span>
<span class="text-caption font-caption text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant/60">
                      Lecturer Station
                    </span>
</div>
</div>
</td>
<!-- Col 3: Scheduled Date & Time -->
<td class="py-4 px-5 align-top">
<div class="text-body-md font-body-md font-semibold text-primary font-mono">
                  2026-10-14
                </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
<span class="material-symbols-outlined text-xs text-emerald-600" data-icon="check_circle">check_circle</span>
<span>Resolved at 11:30 AM</span>
</div>
<div class="text-[11px] text-outline mt-1">Duration: 55m</div>
</td>
<!-- Col 4: Assigned Technician -->
<td class="py-4 px-5 align-top">
<div class="flex items-center gap-2">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs">
                    SD
                  </div>
<div>
<div class="text-label-md font-label-md text-on-surface font-medium leading-none">
                      En. Salleh Daud
                    </div>
<div class="text-caption font-caption text-on-surface-variant mt-0.5">
                      Network Operations
                    </div>
</div>
</div>
</td>
<!-- Col 5: Status Badge -->
<td class="py-4 px-4 align-top text-center">
<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
<span class="material-symbols-outlined text-xs" data-icon="check_circle" data-weight="fill" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span>Completed</span>
</span>
</td>
<!-- Col 6: Quick Action / Status Update -->
<td class="py-4 px-4 align-top text-center">
<button class="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-body-sm font-body-sm font-medium text-on-surface shadow-sm active:scale-95 transition-all">
<span class="material-symbols-outlined text-base" data-icon="visibility">visibility</span>
<span>View Log</span>
</button>
</td>
<!-- Col 7: Report Generation & Download -->
<td class="py-4 px-5 align-top text-right">
<button class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-on-primary text-label-sm font-label-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all">
<span class="material-symbols-outlined text-base" data-icon="description">description</span>
<span>Generate Report</span>
</button>
<div class="text-[11px] text-emerald-700 font-medium mt-1">PDF Certified Ready</div>
</td>
</tr>
<!-- ROW 4 (Additional contextual record: In Progress - Kejora Hall DK1) -->
<tr class="hover:bg-surface-bright/70 transition-colors group">
<td class="py-4 px-5 align-top">
<div class="flex items-start gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mt-0.5 flex-shrink-0 border border-outline-variant/60">
<span class="material-symbols-outlined text-base" data-icon="theater_comedy">theater_comedy</span>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                      Dewan Kejora (DK 1)
                    </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-xs" data-icon="location_on">location_on</span>
<span>Auditorium Complex, Ground Floor</span>
</div>
<span class="inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-surface-container text-on-surface-variant border border-outline-variant/60">
                      #MNT-2026-079
                    </span>
</div>
</div>
</td>
<td class="py-4 px-5 align-top">
<div class="max-w-md">
<div class="text-body-md font-body-md font-semibold text-primary">
                    Air-Con &amp; Projector Servicing
                  </div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    Blower motor filter cleaning, refrigerant top-up &amp; 10k-lumen laser projector optical alignment.
                  </p>
<div class="flex items-center gap-2 mt-2">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-caption bg-amber-50 text-amber-800 border border-amber-200">
<span class="material-symbols-outlined text-xs" data-icon="hvac">hvac</span>
                      Climate &amp; AV
                    </span>
<span class="text-caption font-caption text-secondary bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Routine Bi-Monthly
                    </span>
</div>
</div>
</td>
<td class="py-4 px-5 align-top">
<div class="text-body-md font-body-md font-semibold text-primary font-mono">
                  2026-10-14
                </div>
<div class="text-caption font-caption text-on-surface-variant flex items-center gap-1 mt-0.5">
<span class="material-symbols-outlined text-xs text-blue-600 animate-spin" data-icon="sync">sync</span>
<span class="text-secondary font-medium">Technician on-site</span>
</div>
<div class="text-[11px] text-outline mt-1">Started: 02:00 PM</div>
</td>
<td class="py-4 px-5 align-top">
<div class="flex items-center gap-2">
<div class="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    MF
                  </div>
<div>
<div class="text-label-md font-label-md text-on-surface font-medium leading-none">
                      En. Megat Fikri
                    </div>
<div class="text-caption font-caption text-on-surface-variant mt-0.5">
                      HVAC &amp; Electrical Ops
                    </div>
</div>
</div>
</td>
<td class="py-4 px-4 align-top text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold bg-blue-50 text-secondary border border-blue-200">
<span class="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
<span>In Progress</span>
</span>
</td>
<td class="py-4 px-4 align-top text-center">
<button class="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-body-sm font-body-sm font-medium text-on-surface shadow-sm active:scale-95 transition-all">
<span>Update</span>
<span class="material-symbols-outlined text-base" data-icon="edit">edit</span>
</button>
</td>
<td class="py-4 px-5 align-top text-right">
<button class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant text-label-sm font-label-sm font-medium transition-all active:scale-95">
<span class="material-symbols-outlined text-base" data-icon="edit_note">edit_note</span>
<span>Draft Report</span>
</button>
<div class="text-[11px] text-outline mt-1">Autosaved 14m ago</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- PAGINATION & SUMMARY FOOTER -->
<div class="px-5 py-3.5 bg-surface-bright border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
<div class="text-body-sm font-body-sm text-on-surface-variant">
          Showing <span class="font-semibold text-primary">1</span> to <span class="font-semibold text-primary">4</span> of <span class="font-semibold text-primary">21</span> maintenance records
        </div>
<div class="flex items-center gap-1.5">
<button class="px-2.5 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container disabled:opacity-50 text-body-sm font-body-sm flex items-center gap-1" disabled="">
<span class="material-symbols-outlined text-base" data-icon="chevron_left">chevron_left</span>
<span>Previous</span>
</button>
<button class="w-8 h-8 rounded-lg bg-primary text-on-primary font-semibold text-label-md font-label-md flex items-center justify-center">
            1
          </button>
<button class="w-8 h-8 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container font-medium text-label-md font-label-md flex items-center justify-center transition-colors">
            2
          </button>
<button class="w-8 h-8 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container font-medium text-label-md font-label-md flex items-center justify-center transition-colors">
            3
          </button>
<button class="px-2.5 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container text-body-sm font-body-sm flex items-center gap-1 transition-colors">
<span>Next</span>
<span class="material-symbols-outlined text-base" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- SUPPORTING INFO CARDS (Bento Grid: SLAs, Compliance & Helpdesk) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
<!-- Card 1: Maintenance Protocol & SLAs -->
<div class="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center gap-2 text-primary font-headline-sm text-headline-sm font-semibold">
<span class="material-symbols-outlined text-secondary" data-icon="timer">timer</span>
<span>Maintenance Protocol &amp; SLAs</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2">
            Priority-based resolution thresholds mandated by UTM Faculty Academic Operations:
          </p>
<ul class="mt-3 space-y-2 text-body-sm font-body-sm">
<li class="flex items-center justify-between py-1 border-b border-surface-container">
<span class="text-on-surface">Urgent (Exam &amp; Lecture halls)</span>
<span class="font-semibold text-error">&lt; 2 Hours</span>
</li>
<li class="flex items-center justify-between py-1 border-b border-surface-container">
<span class="text-on-surface">Standard (Lab PC &amp; switches)</span>
<span class="font-semibold text-amber-700">&lt; 8 Hours</span>
</li>
<li class="flex items-center justify-between py-1">
<span class="text-on-surface">Preventive (Air-con servicing)</span>
<span class="font-semibold text-emerald-700">Scheduled 48h</span>
</li>
</ul>
</div>
<div class="mt-4 pt-3 border-t border-surface-container flex items-center justify-between">
<a class="text-label-sm font-label-sm text-secondary hover:underline flex items-center gap-1" href="#">
<span>View Faculty SLA Handbook</span>
<span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
<!-- Card 2: Automated Report Compliance -->
<div class="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center gap-2 text-primary font-headline-sm text-headline-sm font-semibold">
<span class="material-symbols-outlined text-emerald-600" data-icon="verified_user">verified_user</span>
<span>Automated ISO Compliance</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2">
            Every generated maintenance certificate includes cryptographic hash stamps and technician sign-offs conforming to ISO 9001:2015 Educational Facilities standard.
          </p>
<div class="mt-3 p-3 rounded-lg bg-surface-bright border border-outline-variant/60 flex items-center gap-3">
<span class="material-symbols-outlined text-secondary text-2xl" data-icon="qr_code_2">qr_code_2</span>
<div class="text-caption font-caption text-on-surface-variant leading-tight">
<div class="font-semibold text-primary">QR Verification Active</div>
<span>Enables instant validation during university physical audits</span>
</div>
</div>
</div>
<div class="mt-4 pt-3 border-t border-surface-container flex items-center justify-between">
<span class="text-caption font-caption text-on-surface-variant">Last Audit: Oct 02, 2026</span>
<span class="inline-flex items-center gap-1 text-label-sm font-label-sm text-emerald-700 font-semibold">
<span class="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Passed
          </span>
</div>
</div>
<!-- Card 3: Facilities Operations Desk -->
<div class="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center gap-2 text-primary font-headline-sm text-headline-sm font-semibold">
<span class="material-symbols-outlined text-secondary" data-icon="headset_mic">headset_mic</span>
<span>Facilities Operations Desk</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2">
            Need urgent assistance or an immediate on-site technician dispatch for an ongoing lecture?
          </p>
<div class="mt-3 space-y-2">
<div class="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low border border-outline-variant/40">
<span class="material-symbols-outlined text-secondary" data-icon="call">call</span>
<div>
<div class="text-caption font-caption text-outline">Direct Intercom</div>
<div class="text-body-md font-body-md font-semibold text-primary">Ext. #3088 / #3089</div>
</div>
</div>
<div class="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low border border-outline-variant/40">
<span class="material-symbols-outlined text-amber-600" data-icon="person_pin">person_pin</span>
<div>
<div class="text-caption font-caption text-outline">Lead Technician On-Duty</div>
<div class="text-body-sm font-body-sm font-semibold text-primary">En. Razak Daud (+6012-789 2311)</div>
</div>
</div>
</div>
</div>
<div class="mt-4 pt-3 border-t border-surface-container flex items-center justify-between">
<button class="w-full py-1.5 px-3 rounded-lg border border-outline-variant text-label-sm font-label-sm text-primary font-semibold hover:bg-surface-container transition-all flex items-center justify-center gap-1.5">
<span class="material-symbols-outlined text-base" data-icon="chat">chat</span>
<span>Broadcast Tech Alert</span>
</button>
</div>
</div>
</div>
</main>
<!-- PORTAL FOOTER -->
<footer class="mt-12 bg-surface-container-lowest border-t border-outline-variant py-6 text-on-surface-variant text-caption font-caption">
<div class="max-w-[1600px] mx-auto px-4 md:px-space-xl flex flex-col md:flex-row items-center justify-between gap-4">
<div class="flex items-center gap-3">
<span class="font-semibold text-primary">Faculty Venue Portal</span>
<span>•</span>
<span>Faculty of Computing &amp; Informatics, Universiti Teknologi Malaysia</span>
<span>•</span>
<span class="text-outline">System Version 4.8.2-Enterprise (Build 2026.10)</span>
</div>
<div class="flex items-center gap-5">
<a class="hover:text-secondary transition-colors" href="#">Safety Protocols</a>
<a class="hover:text-secondary transition-colors" href="#">IT Helpdesk</a>
<a class="hover:text-secondary transition-colors" href="#">Maintenance Policy</a>
<a class="hover:text-secondary transition-colors" href="#">Campus Map</a>
</div>
</div>
</footer>
</body></html>