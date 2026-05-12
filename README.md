# VeroScribe Health (Patient Booking System)

A lightweight healthcare appointment booking application built with React, TypeScript, and Tailwind CSS. The application allows patients to request appointments with physicians, track appointment statuses, and provides an admin dashboard for managing bookings.

## Features

- Patient appointment booking flow
- Physician and appointment slot selection
- Appointment status tracking
- Admin dashboard for managing requests
- Persistent booking state using localStorage
- Responsive modern UI built with Tailwind CSS

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/amishanotaney2003/veroscribe-health-booking.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will run locally at:

```bash
http://localhost:5173
```

---

## What I Built

The project includes three main user flows:

### Patient Booking Flow
- Patients can:
  - Select a physician
  - Choose from available appointment slots
  - Enter their personal details
  - Submit a booking request
- New bookings are automatically created with a **Pending** status.

### My Appointments View
- Patients can search for their appointments using their email address.
- Patients can:
  - View appointment details
  - Track appointment status
  - Cancel appointments

### Admin Dashboard
- Admins can:
  - View all upcoming appointment requests
  - Filter bookings by status
  - Confirm, cancel, or revert bookings to pending
  - View booking summary metrics

---

## Key Technical & Product Decisions

### React + TypeScript
I chose React with TypeScript to create a strongly typed and maintainable frontend architecture. Shared booking models and status types improve consistency across the application.

### Tailwind CSS
Tailwind CSS was used for rapid UI development and consistent styling. The UI was designed to feel modern, clean, and easy to navigate.

### Lightweight Local Storage Persistence
Instead of using a backend database, bookings are stored using `localStorage` to keep the project lightweight while still demonstrating persistent state management and user flows.

### Separated User Experiences
The application separates:
- Patient booking
- Patient appointment tracking
- Admin booking management

This creates clearer workflows and better mirrors how real healthcare systems are structured.

### Booking Protection Logic
Appointment slots that are already booked are automatically hidden from future patients to prevent duplicate bookings.

### Reusable Components
Shared components such as `StatusBadge` and reusable storage utilities were created to improve maintainability and reduce repeated logic.

---

## What I Would Improve With More Time

### Backend Integration
I would replace `localStorage` with a real backend and database (e.g. Node.js + PostgreSQL or Firebase) to support:
- Persistent multi-user data
- Secure data storage
- Real-time synchronization

### Authentication & Authorization
I would implement:
- Patient login/accounts
- Role-based admin access
- Protected routes

### Real Scheduling Features
Additional scheduling functionality could include:
- Calendar-based date selection
- Physician availability management
- Email/SMS confirmations
- Rescheduling support

### Improved Validation & Accessibility
I would further enhance:
- Form validation
- Error handling
- Keyboard accessibility
- Screen reader support

### Responsive & Mobile Enhancements
The UI is responsive, but additional optimization for mobile workflows and tablet usage would improve the overall experience.

### Automated Testing
I would add:
- Unit tests
- Integration tests
- End-to-end testing for booking flows

---

## Tech Stack

- React
- TypeScript
- React Router
- Tailwind CSS
- Vite
- LocalStorage API
