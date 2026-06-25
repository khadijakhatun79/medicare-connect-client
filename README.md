# 🏥 MediCare Connect – Hospital Appointment & Healthcare Management System

## 📌 Project Overview

MediCare Connect is a modern healthcare management platform that connects patients, doctors, and administrators through a centralized digital healthcare ecosystem.

The platform simplifies appointment booking, doctor schedule management, patient consultation, online payments, and healthcare record management.

Patients can search for doctors, book appointments, make secure payments, manage reviews, and access healthcare services efficiently. Doctors can manage schedules, appointments, prescriptions, and patient consultations, while administrators can monitor and manage the entire system.

---


# 🚀 Features

## Authentication & Security

* Email & Password Authentication
* Google Login
* JWT Authentication
* HttpOnly Cookie Authentication
* Protected Routes
* Role-Based Authorization
* Secure API Endpoints
* Persistent Login After Refresh

---

## Patient Features

### Dashboard Overview

* Upcoming Appointments
* Appointment History
* Total Payments
* Favorite Doctors

### My Profile

* Update Personal Information
* Manage Profile

### Appointment Management

* View Appointment Details
* Reschedule Appointment
* Cancel Appointment

### Payment History

* View Paid Appointments
* Transaction Records

### Reviews Management

* Add Review
* Update Review
* Delete Review

---

## Doctor Features

### Dashboard Overview

* Total Patients
* Today's Appointments
* Reviews Received

### Schedule Management

* Add Schedule
* Update Schedule
* Remove Schedule

### Appointment Requests

* Accept Appointment
* Reject Appointment
* Mark Appointment Completed

### Prescription Management

* Create Prescription
* Update Prescription

### Profile Management

* Update Qualifications
* Update Experience
* Update Consultation Fee
* Update Available Slots

---

## Admin Features

### Dashboard Overview

* System Statistics
* Analytics Visualization

### Manage Users

* View Users
* Suspend Users
* Delete Users

### Manage Doctors

* Verify Doctor
* Reject Verification
* Cancel Verification

### Manage Appointments

* Monitor Appointment Status
* View All Appointments

### Payment Management

* View Payment Records

### Analytics

* Total Patients
* Total Doctors
* Total Appointments
* Total Reviews
* Doctor Performance Reports

---

## Home Page Features

### Hero Section

* Healthcare Themed Banner
* Call To Action Button

### Featured Doctors

* Dynamic Doctor Listing

### Medical Specializations

* Cardiology
* Neurology
* Orthopedics
* Pediatrics
* Dermatology

### Platform Statistics

* Total Doctors
* Total Patients
* Total Appointments
* Total Reviews

### Patient Success Stories

* Dynamic Testimonials

### Why Choose MediCare Connect

* Healthcare Benefits
* Platform Advantages

### Framer Motion Animation

* Hero Section Animation
* Featured Doctors Animation

---

# 🎯 Challenge Requirements Implemented

## Advanced Doctor Search

Search doctors by:

* Doctor Name
* Specialization

---

## Sorting Functionality

Sort doctors by:

* Consultation Fee
* Experience
* Highest Rating

---

## Pagination

Implemented on:

* Find Doctors Page

---

## JWT Verification

* Backend Token Verification
* Role-Based Authorization
* Protected API Routes

---

## Stripe Payment Integration

* Secure Online Payment
* Payment Status Storage
* Transaction History

---

# 📊 Analytics

Implemented using Recharts.

### Charts

* Bar Chart
* Pie Chart
* Line Chart
* Area Chart

---

# 📱 Responsive Design

Fully Responsive For:

* Mobile Devices
* Tablets
* Laptops
* Desktop Devices

---

# 🛠️ Technology Stack

## Frontend

* Next.js
* React.js
* Tailwind CSS
* HeroUI
* Framer Motion
* Recharts
* SWR
* React Hook Form

---

## Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe
* Cookie Parser
* CORS

---

## Authentication

* Better Auth / Firebase Authentication
* JWT Authorization

---

# 🗄️ Database Collections

### Users

* name
* email
* role
* photo
* phone
* gender
* createdAt
* status

### Doctors

* doctorName
* specialization
* qualifications
* experience
* consultationFee
* hospitalName
* profileImage
* availableDays
* availableSlots
* verificationStatus

### Appointments

* patientId
* doctorId
* appointmentDate
* appointmentTime
* appointmentStatus
* symptoms
* paymentStatus

### Reviews

* patientId
* doctorId
* rating
* reviewText
* createdAt

### Payments

* appointmentId
* patientId
* doctorId
* amount
* transactionId
* paymentDate

### Prescriptions

* doctorId
* patientId
* appointmentId
* diagnosis
* medications
* notes
* createdAt

---

# ⚙️ Environment Variables

## Client

env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

## Server

env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLIENT_URL=

---

# 📥 Installation

## Clone Repository

git clone <repository-url>

## Install Dependencies

npm install

## Start Development Server

npm run dev

---

# ✨ Optional Features

* Dark/Light Theme Toggle
* Doctor Availability Calendar
* Email Appointment Reminder
* Card/Table Layout Switch

---

# 📄 License

This project was developed for educational and assessment purposes.

---

