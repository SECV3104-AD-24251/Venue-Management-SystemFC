# Venue Management System (VMS)

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF7043?logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8.2%2B-777BB4?logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Inertia](https://img.shields.io/badge/Inertia.js-Laravel-4E5BC4)

## Overview

The **Venue Management System (VMS)** is a full-stack web application built to support venue
operations for a faculty computing department. The system digitises the end-to-end lifecycle of
physical learning venues, including venue discovery, booking requests, approval workflows, maintenance
scheduling, class scheduling, and operational reporting.

The application serves three user roles with dedicated workflows:

- **Admin** — monitors maintenance activity, reviews and approves/rejects booking requests, and
  manages the venue catalogue.
- **Lecturer** — browses available venues, checks availability, submits booking requests, and reviews
  class schedules.
- **Staff** — handles maintenance requests and generates venue operational reports.

All authenticated users share a dashboard with aggregated metrics and notifications.

## Core Features

### Authentication & Role-Based Access Control
- Secure registration, login, email verification, and password reset flows.
- Three roles (`admin`, `lecturer`, `staff`) enforced via Laravel middleware and spatie permission packages.
- Role-specific navigation and permissions.

### Venue Management
- Venue directory with name, location, capacity, status, image and informational fields.
- Admin-only venue create / update / delete operations.
- Venue availability checks and classroom suggestions based on capacity and equipment requirements.

### Booking Management
- Lecturers submit booking requests (venue, date, time range, capacity, comments).
- Automatic conflict detection against existing bookings.
- Admin approval / rejection workflow with notifications and rejection reasons.

### Maintenance Management
- Maintenance scheduling per venue (date, time, description).
- Status workflow: `scheduled → in-progress → completed` (with completion timestamp).
- Maintenance reports (PDF via DomPDF) and admin maintenance monitor dashboard.

### Scheduling & Reporting
- Class schedule creation with conflict checks against venues, bookings and maintenance.
- Venue reports: most used venues, most maintained venues, maintenance completion rates, and venue
  utilisation hours.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 11 (PHP 8.2+), Eloquent ORM, Sanctum |
| Frontend | Inertia.js + React 18 (TypeScript), Tailwind CSS |
| Database | SQLite (development) |
| RBAC | spatie/laravel-permission |
| Reporting | barryvdh/laravel-dompdf |
| Real-time / Queue | Pusher (laravel-echo, pusher-php-server), database queue |
| Testing | PestPHP, Laravel Pint |
| Build tooling | Vite, TypeScript |

## Getting Started

```bash
# from the project root (repository root containing the `vms/` folder)
cd vms

# Backend setup
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

# Frontend setup
npm install
npm run dev

# Or run the full stack (server + queue + vite)
composer dev
```

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `password` |
| Lecturer | `lecturer@example.com` | `password` |
| Staff | `staff@example.com` | `password` |

## Screenshots

Placeholder images for each major page. Replace the files in `docs/images/` with real captures.

### Public

#### Welcome page

- ![Welcome page — hero section](docs/images/welcome-1.png)
- ![Welcome page — features and call to action](docs/images/welcome-2.png)

### Authentication

#### Login page

- ![Login page — authentication view 1](docs/images/login-1.png)
- ![Login page — authentication view 2](docs/images/login-2.png)

#### Registration page

- ![Registration page — registration view 1](docs/images/register-1.png)
- ![Registration page — registration view 2](docs/images/register-2.png)

### Lecturer Pages

#### Dashboard

- ![Lecturer dashboard — metrics and greeting](docs/images/dashboard-1.png)
- ![Lecturer dashboard — availability and recent activity](docs/images/dashboard-2.png)

#### Venue browsing

- ![Venue directory view 1](docs/images/venues-1.png)
- ![Venue details view 2](docs/images/venues-2.png)

#### Booking flow

- ![Booking request form](docs/images/booking-1.png)
- ![Booking availability check / suggestions](docs/images/booking-2.png)

#### My bookings

- ![My bookings — list view](docs/images/viewbooking-1.png)
- ![My bookings — detail view](docs/images/viewbooking-2.png)

#### Class schedule

- ![Class schedule view 1](docs/images/classschedule-1.png)
- ![Class schedule view 2](docs/images/classschedule-2.png)

### Staff Pages

#### Maintenance

- ![Maintenance list view 1](docs/images/maintenance-1.png)
- ![Maintenance create view 2](docs/images/maintenance-2.png)

#### Venue reports

- ![Venue reports — view 1](docs/images/venue-reports-1.png)
- ![Venue reports — view 2](docs/images/venue-reports-2.png)

### Admin Pages

#### Manage bookings

- ![Admin bookings — list view 1](docs/images/admin-bookings-1.png)
- ![Admin bookings — approve/reject view 2](docs/images/admin-bookings-2.png)

#### Manage venues

- ![Admin venues — list view 1](docs/images/admin-venues-1.png)
- ![Admin venues — create/edit view 2](docs/images/admin-venues-2.png)

#### Maintenance monitor

- ![Maintenance monitor — overview view 1](docs/images/admin-monitor-1.png)
- ![Maintenance monitor — status update view 2](docs/images/admin-monitor-2.png)

## Project Structure

```text
vms/
├── app/
│   ├── Http/Controllers/   # Feature controllers
│   ├── Models/              # Eloquent models (User, Venue, Booking, Maintenance, Schedule)
│   ├── Policies/            # Authorization policies
│   └── Notifications/       # Booking status notifications
├── database/
│   ├── migrations/
│   └── seeders/
├── docs/images/             # Screenshot placeholders
├── resources/js/
│   ├── Components/
│   ├── Layouts/
│   ├── Pages/
│   └── app.tsx
├── resources/views/         # Blade + PDF report views
├── routes/
├── tests/
└── vite.config.js
```

## License

This project is open-sourced software licensed under the MIT license.
