<!DOCTYPE html>

<html class="h-full" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Faculty Venue Management Portal - Sign In</title>
<!-- Google Fonts: Inter & Plus Jakarta Sans -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS with Forms and Container Queries Plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Design System Tailwind Configuration verbatim -->
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "on-background": "#0b1c30",
            "surface-container-low": "#eff4ff",
            "secondary-fixed": "#dbe1ff",
            "error-container": "#ffdad6",
            "outline-variant": "#c5c6cd",
            "on-primary": "#ffffff",
            "tertiary-container": "#002f2a",
            "surface-variant": "#d3e4fe",
            "surface-container-lowest": "#ffffff",
            "on-error": "#ffffff",
            "secondary": "#0051d5",
            "surface-container-highest": "#d3e4fe",
            "surface-tint": "#545f73",
            "primary-fixed-dim": "#bcc7de",
            "primary-container": "#1e293b",
            "on-tertiary": "#ffffff",
            "secondary-fixed-dim": "#b4c5ff",
            "inverse-primary": "#bcc7de",
            "background": "#f8f9ff",
            "on-tertiary-fixed": "#00201d",
            "surface-bright": "#f8f9ff",
            "on-primary-container": "#8590a6",
            "on-secondary-fixed": "#00174b",
            "on-secondary-fixed-variant": "#003ea8",
            "on-surface-variant": "#45474c",
            "outline": "#75777d",
            "on-tertiary-container": "#28a094",
            "on-primary-fixed-variant": "#3c475a",
            "on-primary-fixed": "#111c2d",
            "primary": "#091426",
            "inverse-surface": "#213145",
            "on-surface": "#0b1c30",
            "inverse-on-surface": "#eaf1ff",
            "surface-container": "#e5eeff",
            "on-error-container": "#93000a",
            "surface-container-high": "#dce9ff",
            "surface-dim": "#cbdbf5",
            "error": "#ba1a1a",
            "on-secondary-container": "#fefcff",
            "on-secondary": "#ffffff",
            "tertiary-fixed-dim": "#6bd8cb",
            "on-tertiary-fixed-variant": "#005049",
            "tertiary-fixed": "#89f5e7",
            "surface": "#f8f9ff",
            "secondary-container": "#316bf3",
            "primary-fixed": "#d8e3fb",
            "tertiary": "#001815"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "margin": "1rem",
            "gutter": "1.25rem",
            "space-sm": "0.5rem",
            "space-lg": "1.5rem",
            "space-xs": "0.25rem",
            "space-xl": "2rem",
            "margin-desktop": "2rem",
            "space-md": "1rem",
            "gutter-desktop": "1.5rem"
          },
          "fontFamily": {
            "caption": [
              "Inter"
            ],
            "headline-sm": [
              "Plus Jakarta Sans"
            ],
            "headline-lg-mobile": [
              "Plus Jakarta Sans"
            ],
            "display-lg": [
              "Plus Jakarta Sans"
            ],
            "label-md": [
              "Inter"
            ],
            "display-md": [
              "Plus Jakarta Sans"
            ],
            "body-sm": [
              "Inter"
            ],
            "body-lg": [
              "Inter"
            ],
            "label-sm": [
              "Inter"
            ],
            "headline-md": [
              "Plus Jakarta Sans"
            ],
            "headline-lg": [
              "Plus Jakarta Sans"
            ],
            "body-md": [
              "Inter"
            ]
          },
          "fontSize": {
            "caption": [
              "11px",
              {
                "lineHeight": "14px",
                "letterSpacing": "0.03em",
                "fontWeight": "500"
              }
            ],
            "headline-sm": [
              "16px",
              {
                "lineHeight": "24px",
                "fontWeight": "600"
              }
            ],
            "headline-lg-mobile": [
              "20px",
              {
                "lineHeight": "28px",
                "letterSpacing": "-0.01em",
                "fontWeight": "600"
              }
            ],
            "display-lg": [
              "36px",
              {
                "lineHeight": "44px",
                "letterSpacing": "-0.025em",
                "fontWeight": "700"
              }
            ],
            "label-md": [
              "13px",
              {
                "lineHeight": "18px",
                "fontWeight": "500"
              }
            ],
            "display-md": [
              "30px",
              {
                "lineHeight": "38px",
                "letterSpacing": "-0.02em",
                "fontWeight": "600"
              }
            ],
            "body-sm": [
              "13px",
              {
                "lineHeight": "18px",
                "fontWeight": "400"
              }
            ],
            "body-lg": [
              "16px",
              {
                "lineHeight": "24px",
                "fontWeight": "400"
              }
            ],
            "label-sm": [
              "12px",
              {
                "lineHeight": "16px",
                "letterSpacing": "0.025em",
                "fontWeight": "600"
              }
            ],
            "headline-md": [
              "18px",
              {
                "lineHeight": "26px",
                "letterSpacing": "-0.01em",
                "fontWeight": "600"
              }
            ],
            "headline-lg": [
              "24px",
              {
                "lineHeight": "32px",
                "letterSpacing": "-0.015em",
                "fontWeight": "600"
              }
            ],
            "body-md": [
              "14px",
              {
                "lineHeight": "20px",
                "fontWeight": "400"
              }
            ]
          }
        },
      },
    }
  </script>
<style>
    /* Architectural subtle grid pattern */
    .bg-academic-grid {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(9, 20, 38, 0.035) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(9, 20, 38, 0.035) 1px, transparent 1px);
    }
    
    /* Level 3 Elevation Shadow for Institutional Card */
    .shadow-academic-card {
      box-shadow: 0 20px 35px -8px rgba(15, 23, 42, 0.12), 0 10px 15px -5px rgba(15, 23, 42, 0.06);
    }

    /* Tab notch contour inspired by the reference graphic */
    .notch-curve-staff {
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
  </style>
</head>
<body class="bg-background text-on-surface antialiased min-h-full flex flex-col justify-between selection:bg-secondary-fixed selection:text-on-secondary-fixed bg-academic-grid">
<!-- Top Minimal Utility Header -->
<header class="w-full px-space-md lg:px-space-xl py-space-sm flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md sticky top-0 z-40">
<div class="flex items-center gap-space-sm">
<div class="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
<span class="material-symbols-outlined text-[20px]" data-icon="domain">domain</span>
</div>
<div>
<span class="font-headline-sm text-headline-sm text-primary tracking-tight block leading-tight">Faculty Venue Portal</span>
<span class="font-caption text-caption text-on-surface-variant block">Faculty of Computing &amp; Informatics · UTM</span>
</div>
</div>
<div class="flex items-center gap-space-md">
<div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/40">
<span class="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span>
<span class="font-caption text-caption text-on-surface font-semibold">Campus Term 2024/2025 Live</span>
</div>
<a class="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors duration-150" href="#helpdesk">
<span class="material-symbols-outlined text-[18px]" data-icon="help_outline">help_outline</span>
<span class="hidden sm:inline">IT Support Desk</span>
</a>
</div>
</header>
<!-- Main Hero Card Workspace -->
<main class="flex-1 flex items-center justify-center p-space-md sm:p-space-lg lg:p-space-xl">
<div class="w-full max-w-[1040px] bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-academic-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
<!-- LEFT PANEL: Architectural Brand & Campus Identity (Inspired by Reference Left Wave/Tab) -->
<div class="lg:col-span-5 relative bg-primary-container text-on-primary p-space-lg lg:p-space-xl flex flex-col justify-between overflow-hidden">
<!-- Subtle layered geometric / architectural backdrop accents -->
<div class="absolute inset-0 pointer-events-none opacity-20">
<div class="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
<div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary-container blur-2xl"></div>
<div class="absolute inset-0" style="background-image: radial-gradient(#d3e4fe 1px, transparent 1px); background-size: 20px 20px; opacity: 0.25;"></div>
</div>
<!-- Upper Left: Institutional Badge -->
<div class="relative z-10">
<div class="flex items-center gap-2 text-on-primary-container text-label-sm font-label-sm uppercase tracking-wider mb-2">
<span class="material-symbols-outlined text-[16px] text-secondary-fixed" data-icon="verified_user">verified_user</span>
<span>Academic Security Framework</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-white font-bold leading-tight">
            Centralized Venue &amp; Lecture Hall Allocation
          </h1>
<p class="font-body-md text-body-md text-on-primary-container mt-2">
            Unified scheduling system for auditoriums, high-performance computing labs, and smart seminar suites.
          </p>
</div>
<!-- Middle Left: Interactive Layered Role Selection Tabs (Direct UX Evolution of the Reference Tab Switch) -->
<div class="relative z-10 my-6">
<div class="text-caption font-caption text-secondary-fixed mb-2 uppercase tracking-wider">Select Access Role</div>
<div class="bg-surface-container-highest/10 p-1 rounded-xl border border-white/10 flex flex-col gap-2">
<!-- Active Tab: Staff / Lecturer -->
<button class="w-full flex items-center justify-between px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold shadow-sm transition-all duration-150 text-left" id="roleStaffBtn" onclick="switchRole('staff')" type="button">
<div class="flex items-center gap-3">
<span class="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="badge">badge</span>
</span>
<div>
<div class="text-primary font-semibold">Faculty Staff / Lecturer</div>
<div class="text-on-surface-variant font-caption text-caption">Admin access &amp; instant booking</div>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]" data-icon="check_circle" data-weight="fill">check_circle</span>
</button>
<!-- Inactive Tab: Student / Research Scholar -->
<button class="w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-white/80 hover:bg-white/5 font-label-md text-label-md transition-all duration-150 text-left" id="roleStudentBtn" onclick="switchRole('student')" type="button">
<div class="flex items-center gap-3">
<span class="w-8 h-8 rounded-lg bg-white/10 text-white/80 flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]" data-icon="school">school</span>
</span>
<div>
<div class="text-white font-medium">Student / Society Rep</div>
<div class="text-white/60 font-caption text-caption">Study pod &amp; room reservation</div>
</div>
</div>
<span class="material-symbols-outlined text-transparent text-[20px] transition-colors" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
<!-- Lower Left: Verification & Campus Data Footprint -->
<div class="relative z-10 pt-4 border-t border-white/10 text-on-primary-container">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" data-icon="lock">lock</span>
<span class="font-caption text-caption text-white/90">UTM-ID SSO Protocol v4.2</span>
</div>
<span class="px-2 py-0.5 rounded text-caption font-caption bg-white/10 text-white/90">256-bit SSL</span>
</div>
<div class="mt-2 text-[11px] text-white/60 font-caption">
            Encountering reservation conflicts? Dial Ext. <span class="text-white font-medium">38491 / 38492</span> (Faculty Logistics Office).
          </div>
</div>
</div>
<!-- RIGHT PANEL: Authentication Form (Direct Reference Alignment: Avatar at top, Floating fields, SSO below) -->
<div class="lg:col-span-7 bg-surface-container-lowest p-space-lg lg:p-space-xl flex flex-col justify-between">
<div>
<!-- Top Avatar Icon Header (Direct Reference element, refined with brand tokens) -->
<div class="flex flex-col items-center justify-center text-center mb-6">
<div class="relative w-16 h-16 rounded-full bg-surface-container-low border border-outline-variant/50 flex items-center justify-center text-secondary shadow-sm mb-3 group">
<div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[28px]" data-icon="account_circle" data-weight="fill">account_circle</span>
</div>
<span class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#15803D] border-2 border-white" title="Directory Gateway Online"></span>
</div>
<h2 class="font-headline-lg text-headline-lg text-primary font-bold" id="portalFormTitle">Faculty Sign In</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-0.5" id="portalFormSubtitle">
              Authenticate using your institutional active directory account
            </p>
</div>
<!-- Credential Input Form -->
<form class="space-y-space-md max-w-md mx-auto" onsubmit="handleLoginSubmit(event)">
<!-- Email Field (Underline + icon motif modernized to crisp bordered institutional input) -->
<div>
<label class="block font-label-md text-label-md text-on-surface font-semibold mb-1.5 flex items-center justify-between" for="facultyEmail">
<span>Institutional Email</span>
<span class="font-caption text-caption text-on-surface-variant font-normal" id="domainHint">@utm.my address</span>
</label>
<div class="relative rounded-lg shadow-sm">
<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant">
<span class="material-symbols-outlined text-[20px]" data-icon="person">person</span>
</div>
<input class="block w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest pl-10 pr-3 py-2.5 text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition duration-150" id="facultyEmail" name="email" placeholder="alif.izuddin@utm.my" required="" type="email"/>
</div>
</div>
<!-- Password Field with Show/Hide toggle -->
<div>
<div class="flex items-center justify-between mb-1.5">
<label class="block font-label-md text-label-md text-on-surface font-semibold" for="facultyPassword">
                  Password
                </label>
<a class="font-label-sm text-label-sm text-secondary hover:underline transition-all" href="#reset">
                  Forgot Password?
                </a>
</div>
<div class="relative rounded-lg shadow-sm">
<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant">
<span class="material-symbols-outlined text-[20px]" data-icon="lock">lock</span>
</div>
<input class="block w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest pl-10 pr-10 py-2.5 text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition duration-150" id="facultyPassword" name="password" placeholder="••••••••••••" required="" type="password"/>
<button aria-label="Toggle password visibility" class="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface-variant hover:text-on-surface" onclick="togglePasswordVisibility()" type="button">
<span class="material-symbols-outlined text-[20px]" data-icon="visibility" id="pwdEyeIcon">visibility</span>
</button>
</div>
</div>
<!-- Remember Session Checkbox -->
<div class="flex items-center justify-between pt-1">
<label class="flex items-center gap-2 cursor-pointer select-none">
<input checked="" class="w-4 h-4 rounded text-secondary focus:ring-secondary/30 border-outline-variant/80" type="checkbox"/>
<span class="font-body-sm text-body-sm text-on-surface-variant">Keep me authenticated for 14 days</span>
</label>
<span class="font-caption text-caption text-on-surface-variant/80 bg-surface-container-low px-2 py-0.5 rounded">UTM Identity v2</span>
</div>
<!-- Primary Submission CTA Button (Prominent, High-Conversion Style Guidance) -->
<button class="w-full mt-2 py-3 px-4 rounded-lg bg-primary hover:bg-[#1e293b] text-on-primary font-headline-sm text-headline-sm font-semibold shadow-sm hover:shadow active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2" type="submit">
<span>Sign In to Portal</span>
<span class="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</form>
</div>
<!-- SSO Section (Corresponds directly to "Or Login With" footer bar in reference) -->
<div class="mt-8 pt-6 border-t border-outline-variant/30 max-w-md mx-auto w-full">
<div class="relative flex items-center justify-center mb-4">
<span class="bg-surface-container-lowest px-3 font-caption text-caption text-on-surface-variant uppercase tracking-wider">
              Or authenticate with institutional SSO
            </span>
</div>
<div class="grid grid-cols-2 gap-3">
<!-- Google UTM Workspace SSO -->
<button class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-outline-variant/60 hover:bg-surface-container-low text-on-surface font-label-md text-label-md font-medium transition-colors duration-150" onclick="triggerSSO('Google Workspace')" type="button">
<!-- Google G Icon via clean SVG -->
<svg aria-hidden="true" class="w-4 h-4" viewbox="0 0 24 24">
<path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"></path>
<path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.35 24 12 24z" fill="#34A853"></path>
<path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
<path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
</svg>
<span>UTM Google ID</span>
</button>
<!-- UTM Active Directory / MyCard ID -->
<button class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-outline-variant/60 hover:bg-surface-container-low text-on-surface font-label-md text-label-md font-medium transition-colors duration-150" onclick="triggerSSO('UTMID Active Directory')" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary" data-icon="key">key</span>
<span>UTMID Directory</span>
</button>
</div>
<div class="mt-4 text-center">
<p class="font-caption text-caption text-on-surface-variant">
              Visiting lecturer or external speaker? 
              <a class="text-secondary font-medium hover:underline" href="#request-guest">Request Temporary Pass</a>
</p>
</div>
</div>
</div>
</div>
</main>
<!-- Campus Footer & Institutional Compliance -->
<footer class="w-full py-4 px-space-md border-t border-outline-variant/30 text-center font-caption text-caption text-on-surface-variant bg-surface-container-lowest/60">
<div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
<div>
        © 2025 Universiti Teknologi Malaysia. Faculty of Computing &amp; Informatics. All rights reserved.
      </div>
<div class="flex items-center gap-4 text-on-surface-variant/80">
<a class="hover:text-primary transition-colors" href="#compliance">ISO/IEC 27001 Certified</a>
<span>·</span>
<a class="hover:text-primary transition-colors" href="#privacy">Privacy Governance</a>
<span>·</span>
<a class="hover:text-primary transition-colors" href="#terms">Venue Allocation Rules</a>
</div>
</div>
</footer>
<!-- Micro-interactions Script -->
<script>
    let activeRole = 'staff';

    function switchRole(role) {
      activeRole = role;
      const staffBtn = document.getElementById('roleStaffBtn');
      const studentBtn = document.getElementById('roleStudentBtn');
      const title = document.getElementById('portalFormTitle');
      const subtitle = document.getElementById('portalFormSubtitle');
      const domainHint = document.getElementById('domainHint');
      const emailInput = document.getElementById('facultyEmail');

      if (role === 'staff') {
        staffBtn.className = 'w-full flex items-center justify-between px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold shadow-sm transition-all duration-150 text-left';
        staffBtn.querySelector('[data-icon="check_circle"]').classList.remove('hidden');
        
        studentBtn.className = 'w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-white/80 hover:bg-white/5 font-label-md text-label-md transition-all duration-150 text-left';
        studentBtn.querySelector('[data-icon="arrow_forward"]').classList.add('text-transparent');
        studentBtn.querySelector('[data-icon="arrow_forward"]').classList.remove('text-white');

        title.innerText = 'Faculty Sign In';
        subtitle.innerText = 'Authenticate using your institutional active directory account';
        domainHint.innerText = '@utm.my address';
        emailInput.placeholder = 'alif.izuddin@utm.my';
      } else {
        studentBtn.className = 'w-full flex items-center justify-between px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold shadow-sm transition-all duration-150 text-left';
        studentBtn.querySelector('[data-icon="arrow_forward"]').classList.remove('text-transparent');
        studentBtn.querySelector('[data-icon="arrow_forward"]').classList.add('text-secondary');

        staffBtn.className = 'w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-white/80 hover:bg-white/5 font-label-md text-label-md transition-all duration-150 text-left';
        staffBtn.querySelector('[data-icon="check_circle"]').classList.add('hidden');

        title.innerText = 'Student Representative Sign In';
        subtitle.innerText = 'Log in with matriculation credentials to request laboratory or seminar venues';
        domainHint.innerText = '@graduate.utm.my';
        emailInput.placeholder = 'student.rep@graduate.utm.my';
      }
    }

    function togglePasswordVisibility() {
      const pwdInput = document.getElementById('facultyPassword');
      const eyeIcon = document.getElementById('pwdEyeIcon');
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.textContent = 'visibility_off';
      } else {
        pwdInput.type = 'password';
        eyeIcon.textContent = 'visibility';
      }
    }

    function triggerSSO(provider) {
      alert('Redirecting to UTM Central Authentication Service via ' + provider + '...');
    }

    function handleLoginSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('facultyEmail').value;
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">
          <span class="material-symbols-outlined text-[18px]">progress_activity</span>
        </span>
        <span>Authenticating...</span>
      `;

      setTimeout(() => {
        alert('Authentication successful for: ' + email + ' (' + activeRole.toUpperCase() + ' Portal Access)');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }, 900);
    }
  </script>
</body></html>