<!DOCTYPE html>

<html class="h-full bg-background" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Faculty Profile &amp; Security Settings | Faculty Venue Portal</title>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts: Plus Jakarta Sans & Inter -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS v3 -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "on-tertiary": "#ffffff",
            "surface-container-highest": "#d3e4fe",
            "tertiary": "#001815",
            "on-surface-variant": "#45474c",
            "error-container": "#ffdad6",
            "secondary": "#0051d5",
            "surface-container-lowest": "#ffffff",
            "inverse-on-surface": "#eaf1ff",
            "on-primary-container": "#8590a6",
            "secondary-fixed-dim": "#b4c5ff",
            "on-surface": "#0b1c30",
            "on-secondary-fixed-variant": "#003ea8",
            "error": "#ba1a1a",
            "on-secondary": "#ffffff",
            "on-error": "#ffffff",
            "primary": "#091426",
            "inverse-primary": "#bcc7de",
            "on-primary-fixed": "#111c2d",
            "surface-bright": "#f8f9ff",
            "primary-fixed-dim": "#bcc7de",
            "secondary-container": "#316bf3",
            "surface-tint": "#545f73",
            "tertiary-fixed-dim": "#6bd8cb",
            "surface": "#f8f9ff",
            "on-primary-fixed-variant": "#3c475a",
            "outline-variant": "#c5c6cd",
            "on-primary": "#ffffff",
            "primary-fixed": "#d8e3fb",
            "on-tertiary-fixed-variant": "#005049",
            "background": "#f8f9ff",
            "surface-container-low": "#eff4ff",
            "surface-container": "#e5eeff",
            "on-tertiary-container": "#28a094",
            "tertiary-fixed": "#89f5e7",
            "tertiary-container": "#002f2a",
            "surface-dim": "#cbdbf5",
            "secondary-fixed": "#dbe1ff",
            "on-error-container": "#93000a",
            "on-secondary-fixed": "#00174b",
            "on-secondary-container": "#fefcff",
            "surface-container-high": "#dce9ff",
            "surface-variant": "#d3e4fe",
            "outline": "#75777d",
            "primary-container": "#1e293b",
            "inverse-surface": "#213145",
            "on-background": "#0b1c30",
            "on-tertiary-fixed": "#00201d"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "margin-desktop": "2rem",
            "margin": "1rem",
            "gutter-desktop": "1.5rem",
            "space-md": "1rem",
            "space-xl": "2rem",
            "space-lg": "1.5rem",
            "space-xs": "0.25rem",
            "gutter": "1.25rem",
            "space-sm": "0.5rem"
          },
          "fontFamily": {
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-lg-mobile": ["Plus Jakarta Sans"],
            "body-sm": ["Inter"],
            "label-sm": ["Inter"],
            "display-md": ["Plus Jakarta Sans"],
            "body-lg": ["Inter"],
            "headline-sm": ["Plus Jakarta Sans"],
            "label-md": ["Inter"],
            "display-lg": ["Plus Jakarta Sans"],
            "body-md": ["Inter"],
            "headline-md": ["Plus Jakarta Sans"],
            "caption": ["Inter"]
          },
          "fontSize": {
            "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600" }],
            "headline-lg-mobile": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
            "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.025em", "fontWeight": "600" }],
            "display-md": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
            "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "label-md": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.025em", "fontWeight": "700" }],
            "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "headline-md": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "caption": ["11px", { "lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "500" }]
          }
        }
      }
    }
  </script>
</head>
<body class="min-h-full flex flex-col font-body-md text-on-surface bg-background antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
<!-- 1. Top Navigation Bar (Shared Component Anchor) -->
<header class="docked full-width top-0 sticky z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
<div class="w-full px-space-xl flex items-center justify-between h-16 max-w-full">
<!-- Left: Logo & Faculty Identity -->
<div class="flex items-center gap-6">
<a class="flex items-center gap-3 active:scale-95 transition-transform duration-100 ease-out" href="#">
<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
<span class="material-symbols-outlined text-[24px]">apartment</span>
</div>
<div>
<div class="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">Faculty Venue Portal</div>
<div class="text-caption font-caption text-on-surface-variant leading-none">Faculty of Computing &amp; Informatics</div>
</div>
</a>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center gap-6 ml-4 pt-4">
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface hover:text-secondary transition-colors duration-150" href="#">Dashboard</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface hover:text-secondary transition-colors duration-150" href="#">Venues &amp; Halls</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface hover:text-secondary transition-colors duration-150 flex items-center gap-1.5" href="#">
            Booking Requests
            <span class="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-caption font-caption bg-secondary-container text-on-secondary-container">4</span>
</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface hover:text-secondary transition-colors duration-150" href="#">Schedule</a>
<a class="text-on-surface-variant font-medium pb-4 hover:text-on-surface hover:text-secondary transition-colors duration-150" href="#">Maintenance</a>
</nav>
</div>
<!-- Right: Search, Actions & Profile -->
<div class="flex items-center gap-3">
<!-- Search Shortcut Input -->
<div class="relative hidden md:block w-64">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">search</span>
<input class="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-14 py-1.5 text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="Search venues, rooms..." type="text"/>
<div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-highest border border-outline-variant text-caption font-caption text-on-surface-variant">
<span>⌘</span><span>K</span>
</div>
</div>
<!-- Trailing Icon Action: Notifications -->
<button class="relative p-2 text-on-surface-variant hover:text-secondary rounded-lg hover:bg-surface-container transition-colors duration-150 active:scale-95" title="Notifications" type="button">
<span class="material-symbols-outlined text-[22px]">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
</button>
<!-- Role Switcher -->
<button class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors duration-150 active:scale-95" type="button">
<span class="material-symbols-outlined text-[18px] text-outline">sync_alt</span>
<span>Switch Role</span>
</button>
<div class="h-6 w-px bg-outline-variant mx-1 hidden sm:block"></div>
<!-- User Profile Pill -->
<div class="flex items-center gap-3 pl-1">
<div class="relative">
<div class="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed font-headline-sm font-bold flex items-center justify-center text-label-md border border-outline-variant">
              AI
            </div>
<span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest"></span>
</div>
<div class="hidden xl:block text-left">
<div class="text-label-md font-label-md text-on-surface font-semibold flex items-center gap-1">
              Dr. Alif Izuddin
              <span class="material-symbols-outlined text-[16px] text-secondary">verified</span>
</div>
<div class="text-caption font-caption text-on-surface-variant">Faculty Admin</div>
</div>
</div>
</div>
</div>
</header>
<!-- Main Content Wrapper -->
<main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
<!-- 2. Breadcrumbs & Header Section -->
<div class="space-y-4">
<nav class="flex items-center gap-2 text-caption font-caption text-on-surface-variant">
<a class="hover:text-secondary transition-colors" href="#">Faculty Portal</a>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<a class="hover:text-secondary transition-colors" href="#">Account Settings</a>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-on-surface font-semibold">User Profile &amp; Security</span>
</nav>
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
<div>
<h1 class="text-display-md font-display-md text-primary tracking-tight">Faculty Profile &amp; Security Settings</h1>
<p class="text-body-md font-body-md text-on-surface-variant mt-1 max-w-3xl">
            Manage your UTM institutional identity credentials, departmental room authorization keys, authentication protocols, and audit logs.
          </p>
</div>
<div class="flex items-center gap-3 shrink-0">
<button class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors shadow-sm active:scale-95" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">badge</span>
<span>View Public Faculty Card</span>
</button>
<button class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors shadow-sm active:scale-95" type="button">
<span class="material-symbols-outlined text-[18px] text-outline">download</span>
<span>Download My Audit Log</span>
</button>
</div>
</div>
</div>
<!-- 3. Executive Account Overview Bar / KPI Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Card 1 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-start justify-between">
<div class="space-y-1">
<span class="text-label-sm font-label-sm text-on-surface-variant">Account Status</span>
<div class="text-headline-sm font-headline-sm text-primary font-bold">Active &amp; Verified</div>
<div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-caption font-caption border border-emerald-200">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
<span>UTM SSO Linked</span>
</div>
</div>
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">verified_user</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-start justify-between">
<div class="space-y-1">
<span class="text-label-sm font-label-sm text-on-surface-variant">Assigned Role</span>
<div class="text-headline-sm font-headline-sm text-primary font-bold">Faculty Admin</div>
<div class="inline-flex items-center gap-1 text-caption font-caption text-secondary font-medium">
<span class="material-symbols-outlined text-[14px]">key</span>
<span>Full Venue Override</span>
</div>
</div>
<div class="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span class="material-symbols-outlined text-[20px]">admin_panel_settings</span>
</div>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-start justify-between">
<div class="space-y-1">
<span class="text-label-sm font-label-sm text-on-surface-variant">Weekly Allocation Quota</span>
<div class="text-headline-sm font-headline-sm text-primary font-bold">36.5 / 40.0 hrs</div>
<div class="w-36 bg-surface-container rounded-full h-1.5 mt-1 overflow-hidden">
<div class="bg-secondary h-1.5 rounded-full" style="width: 91.25%"></div>
</div>
</div>
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">event_seat</span>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-start justify-between">
<div class="space-y-1">
<span class="text-label-sm font-label-sm text-on-surface-variant">Security Posture</span>
<div class="text-headline-sm font-headline-sm text-primary font-bold">Strong (MFA Active)</div>
<div class="text-caption font-caption text-on-surface-variant">
            Changed 14 days ago
          </div>
</div>
<div class="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
<span class="material-symbols-outlined text-[20px]">security</span>
</div>
</div>
</div>
<!-- 4. Main Settings Grid (2 Column Enterprise Layout) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- Left Column (8 cols): Profile Info & Password -->
<div class="lg:col-span-8 space-y-6">
<!-- SECTION 1: Profile Information -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div class="p-6 border-b border-outline-variant flex items-center justify-between">
<div>
<h2 class="text-headline-md font-headline-md text-primary">Profile Information</h2>
<p class="text-body-sm font-body-sm text-on-surface-variant">Update your institutional identity, academic designations, and faculty contact reachability.</p>
</div>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container text-secondary text-caption font-caption font-semibold">
<span class="material-symbols-outlined text-[14px]">school</span>
              Academic Staff
            </span>
</div>
<form class="p-6 space-y-6" onsubmit="event.preventDefault();">
<!-- Avatar Subsection -->
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-outline-variant">
<div class="relative group">
<div class="w-20 h-20 rounded-2xl bg-primary text-on-primary font-display-md flex items-center justify-center text-headline-lg font-bold shadow-sm ring-4 ring-surface-container">
                  AI
                </div>
<div class="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full p-1 border-2 border-surface-container-lowest shadow-sm">
<span class="material-symbols-outlined text-[14px] block">verified</span>
</div>
</div>
<div class="space-y-2 flex-1">
<div class="flex items-center gap-2">
<h3 class="text-headline-sm font-headline-sm text-primary">Institutional Portrait</h3>
<span class="text-caption font-caption text-on-surface-variant">Synced with UTM LDAP</span>
</div>
<p class="text-caption font-caption text-on-surface-variant leading-relaxed">
                  Recommended size: 400x400px. JPG, PNG or WebP under 2MB. Your official portrait is displayed on venue booking logs and hall reservation registers.
                </p>
<div class="flex items-center gap-2 pt-1">
<button class="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container-low transition-colors shadow-sm active:scale-95" type="button">
                    Change Avatar
                  </button>
<button class="px-3 py-1.5 rounded-lg text-label-md font-label-md text-error hover:bg-error-container hover:text-on-error-container transition-colors active:scale-95" type="button">
                    Remove
                  </button>
</div>
</div>
</div>
<!-- Form Fields Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
<!-- Full Name -->
<div class="sm:col-span-2">
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Official Full Name</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" type="text" value="Dr. Alif Izuddin Bin Ahmad"/>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">badge</span>
</div>
<p class="mt-1 text-caption font-caption text-on-surface-variant">Must reflect official university registrar documentation.</p>
</div>
<!-- Institutional Email -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Institutional Email Address</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" type="email" value="alif.izuddin@utm.my"/>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 text-[20px]" title="Institutional domain verified">check_circle</span>
</div>
<div class="flex items-center gap-1.5 mt-1 text-caption font-caption text-emerald-700">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span>Primary faculty communications gateway</span>
</div>
</div>
<!-- Staff ID (Matric) -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Staff Matriculation ID</label>
<div class="relative">
<input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface-variant cursor-not-allowed" readonly="" type="text" value="FCI-STF-8841"/>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" title="Locked by Faculty Registry">lock</span>
</div>
<p class="mt-1 text-caption font-caption text-on-surface-variant">Institutional attribute managed by UTM Human Resources.</p>
</div>
<!-- Department -->
<div class="sm:col-span-2">
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Department / Faculty Unit</label>
<select class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
<option selected="">Department of Software Engineering &amp; Information Systems</option>
<option>Department of Artificial Intelligence &amp; Robotics</option>
<option>Department of Cyber Security &amp; Networking</option>
<option>Center of Postgraduate &amp; Research Computing</option>
</select>
</div>
<!-- Office Location -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Office / Room Location</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" type="text" value="Block N28A, Level 3, Room 314"/>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">meeting_room</span>
</div>
</div>
<!-- Extension Phone -->
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Extension Intercom / Direct Line</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" type="text" value="+60 7-553 3088 / Ext. 3088"/>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">call</span>
</div>
</div>
</div>
<!-- Profile Actions -->
<div class="pt-4 border-t border-outline-variant flex items-center justify-between">
<span class="text-caption font-caption text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-emerald-600">cloud_done</span>
                Auto-saved draft available
              </span>
<button class="px-5 py-2.5 rounded-lg bg-primary hover:bg-slate-800 text-on-primary text-label-md font-label-md font-semibold transition-colors duration-150 shadow-sm active:scale-95 flex items-center gap-2" type="submit">
<span>Save Profile Changes</span>
<span class="material-symbols-outlined text-[18px]">check</span>
</button>
</div>
</form>
</div>
<!-- SECTION 2: Update Password & Credentials -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div class="p-6 border-b border-outline-variant flex items-center justify-between">
<div>
<h2 class="text-headline-md font-headline-md text-primary">Update Password &amp; Security Credentials</h2>
<p class="text-body-sm font-body-sm text-on-surface-variant">Ensure your institutional account uses a strong, unique password to prevent unauthorized venue bookings.</p>
</div>
<span class="material-symbols-outlined text-outline text-[24px]">lock_reset</span>
</div>
<form class="p-6 space-y-5" onsubmit="event.preventDefault();">
<!-- Current Password -->
<div>
<div class="flex items-center justify-between mb-1.5">
<label class="text-label-sm font-label-sm text-on-surface">Current Password</label>
<a class="text-caption font-caption text-secondary hover:underline" href="#">Forgot current password?</a>
</div>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" type="password" value="••••••••••••••••"/>
<button class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" type="button">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<!-- New Password & Confirmation Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">New Password</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Enter new strong password" type="password"/>
<button class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" type="button">
<span class="material-symbols-outlined text-[20px]">visibility_off</span>
</button>
</div>
</div>
<div>
<label class="block text-label-sm font-label-sm text-on-surface mb-1.5">Confirm New Password</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Repeat new password" type="password"/>
<button class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" type="button">
<span class="material-symbols-outlined text-[20px]">visibility_off</span>
</button>
</div>
</div>
</div>
<!-- Password Requirements & Strength Meter -->
<div class="p-4 rounded-lg bg-surface-container-low border border-outline-variant space-y-3">
<div class="flex items-center justify-between">
<span class="text-label-sm font-label-sm text-on-surface font-semibold">Institutional Password Complexity Rule</span>
<span class="text-caption font-caption text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">Meets ISO/IEC 27001 Standards</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-caption font-caption text-on-surface-variant">
<div class="flex items-center gap-1.5 text-emerald-700">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span>Minimum 12 characters</span>
</div>
<div class="flex items-center gap-1.5 text-emerald-700">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span>Uppercase &amp; special symbol</span>
</div>
<div class="flex items-center gap-1.5 text-emerald-700">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span>No dictionary or matric matches</span>
</div>
</div>
</div>
<!-- Two-Factor Authentication (2FA) Status Callout -->
<div class="flex items-center justify-between p-4 rounded-lg border border-outline-variant bg-surface-container-lowest">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
<span class="material-symbols-outlined text-[22px]">phonelink_lock</span>
</div>
<div>
<div class="text-label-md font-label-md font-semibold text-primary">Two-Factor Authentication (UTM Authenticator)</div>
<div class="text-caption font-caption text-on-surface-variant">Required for Auditorium reservations and keycard electronic overrides.</div>
</div>
</div>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-caption font-caption font-semibold border border-emerald-200">
<span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                Active
              </span>
</div>
<!-- Password Actions -->
<div class="pt-4 border-t border-outline-variant flex items-center justify-end gap-3">
<button class="px-4 py-2.5 rounded-lg border border-outline-variant text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors" type="button">
                Cancel
              </button>
<button class="px-5 py-2.5 rounded-lg bg-primary hover:bg-slate-800 text-on-primary text-label-md font-label-md font-semibold transition-colors duration-150 shadow-sm active:scale-95 flex items-center gap-2" type="submit">
<span>Update Password</span>
<span class="material-symbols-outlined text-[18px]">vpn_key</span>
</button>
</div>
</form>
</div>
</div>
<!-- Right Column (4 cols): Notification Preferences & Danger Zone -->
<div class="lg:col-span-4 space-y-6">
<!-- SECTION 3: Notification Preferences -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div class="p-5 border-b border-outline-variant">
<h2 class="text-headline-sm font-headline-sm text-primary">Notification Preferences</h2>
<p class="text-body-sm font-body-sm text-on-surface-variant">Automated venue alerts and dispatch digests.</p>
</div>
<div class="p-5 space-y-4 divide-y divide-outline-variant">
<!-- Toggle 1 -->
<div class="flex items-start justify-between gap-3 pt-3 first:pt-0">
<div class="space-y-0.5">
<div class="text-label-md font-label-md text-on-surface font-semibold">Booking Approvals &amp; Rejections</div>
<div class="text-caption font-caption text-on-surface-variant">Receive real-time push and email whenever a lecture hall request is decided.</div>
</div>
<input checked="" class="mt-1 h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
</div>
<!-- Toggle 2 -->
<div class="flex items-start justify-between gap-3 pt-4">
<div class="space-y-0.5">
<div class="text-label-md font-label-md text-on-surface font-semibold">Maintenance &amp; Lockout Notices</div>
<div class="text-caption font-caption text-on-surface-variant">Immediate alert if an assigned venue undergoes emergency AV or HVAC repair.</div>
</div>
<input checked="" class="mt-1 h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
</div>
<!-- Toggle 3 -->
<div class="flex items-start justify-between gap-3 pt-4">
<div class="space-y-0.5">
<div class="text-label-md font-label-md text-on-surface font-semibold">Weekly Schedule Digest</div>
<div class="text-caption font-caption text-on-surface-variant">Sent every Monday 07:00 AM with consolidated seminar bookings.</div>
</div>
<input class="mt-1 h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
</div>
<!-- Toggle 4 -->
<div class="flex items-start justify-between gap-3 pt-4">
<div class="space-y-0.5">
<div class="text-label-md font-label-md text-on-surface font-semibold">SMS Security Overrides</div>
<div class="text-caption font-caption text-on-surface-variant">Dispatch OTP to registered phone during after-hours weekend access.</div>
</div>
<input checked="" class="mt-1 h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
</div>
</div>
<div class="p-4 bg-surface-container-low border-t border-outline-variant">
<button class="w-full py-2 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors shadow-sm" type="button">
              Save Notification Matrix
            </button>
</div>
</div>
<!-- Academic Authority Card -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm space-y-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[22px]">policy</span>
</div>
<div>
<div class="text-label-md font-label-md font-semibold text-primary">Authorized Room Allocations</div>
<div class="text-caption font-caption text-on-surface-variant">Faculty of Computing &amp; Informatics</div>
</div>
</div>
<ul class="space-y-2 text-caption font-caption text-on-surface">
<li class="flex items-center justify-between py-1.5 border-b border-outline-variant">
<span class="font-medium">Auditorium FCI 1 (Capacity 300)</span>
<span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Level 4 Tier</span>
</li>
<li class="flex items-center justify-between py-1.5 border-b border-outline-variant">
<span class="font-medium">Seminar Hall Gamma (Capacity 120)</span>
<span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Level 4 Tier</span>
</li>
<li class="flex items-center justify-between py-1.5">
<span class="font-medium">Software Lab 03 &amp; 04 (Capacity 80)</span>
<span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Direct Key</span>
</li>
</ul>
<button class="w-full text-center text-label-sm font-label-sm text-secondary hover:underline pt-1" type="button">
            Request Additional Venue Keys →
          </button>
</div>
<!-- SECTION 4: Danger Zone / Account Termination & Archival -->
<div class="bg-surface-container-lowest border-2 border-red-200 rounded-xl shadow-sm overflow-hidden">
<div class="p-5 bg-red-50/50 border-b border-red-100 flex items-center justify-between">
<div>
<h2 class="text-headline-sm font-headline-sm text-red-950 flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-error">warning</span>
                Danger Zone
              </h2>
<p class="text-body-sm font-body-sm text-red-800">Deactivate or Terminate Account</p>
</div>
</div>
<div class="p-5 space-y-4">
<p class="text-caption font-caption text-on-surface-variant leading-relaxed">
              Once your account is terminated, all scheduled venue bookings, maintenance requests, and administrative permissions will be revoked or reassigned to the department head. Academic audit logs will be archived in accordance with UTM ISO 9001 governance.
            </p>
<div class="space-y-2 pt-2">
<button class="w-full py-2.5 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors shadow-sm text-center" type="button">
                Transfer Venue Ownership
              </button>
<button class="w-full py-2.5 px-3 rounded-lg bg-error hover:bg-red-700 text-on-error text-label-md font-label-md font-semibold transition-colors duration-150 shadow-sm active:scale-95 flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined text-[18px]">person_off</span>
<span>Request Account Deactivation</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- 5. Standardized System Footer -->
<footer class="mt-auto border-t border-outline-variant bg-surface-container-lowest text-on-surface-variant">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
<div class="flex items-center gap-3">
<div class="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">domain</span>
</div>
<div class="text-caption font-caption">
<span class="font-semibold text-primary">Faculty Venue Portal</span> © 2025 Universiti Teknologi Malaysia. All rights reserved.
        </div>
</div>
<div class="flex flex-wrap items-center gap-6 text-caption font-caption">
<span class="flex items-center gap-1 text-emerald-700">
<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          All Systems Operational
        </span>
<span class="text-outline-variant">|</span>
<a class="hover:text-secondary transition-colors" href="#">Privacy Governance</a>
<a class="hover:text-secondary transition-colors" href="#">Venue Allocation Rules</a>
<a class="hover:text-secondary transition-colors" href="#">ISO/IEC 27001 Certified</a>
<span class="text-outline-variant">|</span>
<span class="text-outline">Build v4.8.2-Enterprise</span>
</div>
</div>
</footer>
</body></html>