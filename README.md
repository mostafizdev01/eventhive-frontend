🎉 Event Hive — Frontend

A Modern Event Booking Platform Built with Next.js + Tailwind + Shadcn/UI

🚀 Overview

Event Hive is a modern, fast, and user-friendly Event Management Platform where users can explore events, purchase tickets, hosts can create/manage events, and admins can oversee the entire ecosystem.

This repository contains the Frontend built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
The frontend communicates with a Node.js + Express backend via REST API.

🛠️ Tech Stack
Feature	Technology
Framework	Next.js
Language	TypeScript
UI	Tailwind CSS, shadcn/ui, lucide-react
State & Data	Native React + Server Actions
Icon	Lucide React
Auth	JWT (via backend API)
Protected Routes	Next.js Proxy Middleware
Payment	Stripe
Deployment	Vercel (recommended)
🧩 Frontend Features
🔹 Public Pages

🏠 Home Page

🔍 Events Page

📄 Event Details Page

🔎 Search + Filter Page

🔐 Login / Register

🔸 User Dashboard (Attendee)

View joined events

Check payment status (Paid / Unpaid)

View upcoming & past events

Complete payments

🟦 Host Dashboard

Create new events

Edit/Delete events

View who joined the event

Mark offline payments as paid

Check event earnings & sold tickets

🔴 Admin Dashboard

User Management

Host Management

Event Management

Payment & Revenue

Full Monitoring Panel

🔑 Authentication Flow

JWT issued by backend (Node.js + Express)

Stored securely

Middleware-based protected routes using Next.js proxy

Auto redirect on expired token

Role-based routing (Admin / Host / User)

🔗 Environment Variables

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000


(Stripe public key can also go here if needed)

📁 Project Structure
src/
│
├── app/
│   ├── (public pages)
│   ├── events/
│   ├── dashboard/
│   ├── auth/
│   ├── payment/
│
├── components/
│   ├── ui/
│   ├── shared/
│
├── hooks/
├── utils/
└── lib/

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/mostafizdev01/eventhive-frontend

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables
NEXT_PUBLIC_API_URL=http://localhost:5000

4️⃣ Run the project
npm run dev

💳 Stripe Integration

Users can pay for events

Stripe Checkout & client-side confirmation

Payment status updates inside dashboard

🎥 Project Explanation Video



👨‍💻 Author

Mostafiz
GitHub: https://github.com/mostafizdev01/eventhive-frontend

⭐ If you like this project, don’t forget to give a star!