# RSVP.io - Project Plan

## 🎯 Project Overview

**Vision:** Create a modern RSVP management platform that rivals Eventbrite, focused on weddings and general event RSVPs.

**Target MVP:** Web application with mobile apps (iOS/Android) to follow

**Positioning:** Better UX, simpler workflow, focused on personal events (weddings, parties, gatherings)

---

## 📱 Platform Strategy

### Phase 1: Web Application (MVP)
- Next.js full-stack web app
- Mobile-responsive design
- PWA capabilities

### Phase 2: Mobile Apps (Future)
- React Native (iOS & Android)
- Shared component library from web
- Native features (push notifications, calendar integration)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Context / Zustand (if needed)

### Backend
- **Framework:** Next.js API Routes
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js v5 (Auth.js)
- **File Upload:** Uploadthing or S3

### Development Environment
- **Containerization:** Docker (Hybrid Approach)
  - PostgreSQL in Docker container
  - Redis in Docker container (for sessions/caching)
  - Next.js runs locally (faster hot reload)
  - docker-compose orchestrates infrastructure
- **Package Manager:** pnpm (fast, efficient)
- **Version Control:** Git + GitHub

### Infrastructure
- **Hosting:** Vercel (Frontend) or Railway (Full-stack)
- **Database:** Neon, Supabase, or Railway PostgreSQL
- **Email:** Resend or SendGrid
- **Analytics:** Vercel Analytics or PostHog

### Development Tools
- **Linting:** ESLint + Prettier
- **Testing:** Jest + React Testing Library (future)
- **API Testing:** Postman/Thunder Client

---

## 📊 Data Model

### Core Entities

#### User
```
- id (UUID)
- email (unique)
- name
- passwordHash
- avatar (optional)
- createdAt
- updatedAt
```

#### Event
```
- id (UUID)
- userId (creator)
- title
- description
- eventType (wedding, birthday, corporate, etc.)
- date
- time
- timezone
- location (address, venue name)
- capacity (max guests)
- isPublic (boolean)
- slug (unique URL)
- coverImage (optional)
- customFields (JSON - dietary restrictions, plus-ones, etc.)
- status (draft, published, closed)
- createdAt
- updatedAt
```

#### RSVP
```
- id (UUID)
- eventId
- guestId
- status (pending, confirmed, declined, maybe)
- responseDate
- notes
- customResponses (JSON - answers to custom questions)
- createdAt
- updatedAt
```

#### Guest
```
- id (UUID)
- eventId
- name
- email
- phone (optional)
- plusOnes (number)
- invitationSent (boolean)
- invitationSentAt
- createdAt
- updatedAt
```

---

## 🎨 Key Features (MVP)

### 1. Authentication & User Management
- [ ] Email/password registration & login
- [ ] OAuth (Google, optional: Facebook)
- [ ] Password reset flow
- [ ] User profile management

### 2. Event Creation & Management
- [ ] Create new event (wizard or single form)
- [ ] Edit event details
- [ ] Delete event
- [ ] Duplicate event (template)
- [ ] Event settings (privacy, capacity, custom fields)
- [ ] Upload event cover image

### 3. Guest Management
- [ ] Add guests manually (one-by-one or bulk import CSV)
- [ ] Edit guest information
- [ ] Remove guests
- [ ] Track invitation status
- [ ] Send invitation emails
- [ ] Resend invitations

### 4. RSVP System
- [ ] Public event page with RSVP form
- [ ] Custom RSVP questions (dietary restrictions, song requests, etc.)
- [ ] Guest RSVP submission (no login required)
- [ ] RSVP confirmation email
- [ ] RSVP modification/cancellation

### 5. Dashboard & Analytics
- [ ] Event dashboard (overview of all user's events)
- [ ] Single event dashboard:
  - Total guests invited
  - RSVPs received (confirmed/declined/pending)
  - Attendance percentage
  - Recent RSVP activity
- [ ] Guest list view with filters (status, search)
- [ ] Export guest list (CSV, PDF)

### 6. Notifications
- [ ] Email invitations to guests
- [ ] RSVP confirmation emails
- [ ] Event creator notifications (new RSVP received)
- [ ] Event reminders (1 week, 1 day before)

---

## 🗺 Development Roadmap

### Sprint 0: Development Environment Setup (Week 1 - Part 1)
**Goal:** Get local development environment ready

- [ ] Set up Docker hybrid environment
  - [ ] Create docker-compose.yml (PostgreSQL + Redis)
  - [ ] Configure database with appropriate volumes
  - [ ] Set up Redis for session storage
  - [ ] Create .env.example file
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Configure ESLint & Prettier
- [ ] Initialize Prisma ORM
- [ ] Create README with setup instructions

**Deliverable:** Fully functional local development environment

---

### Sprint 1: Authentication System (Week 1 - Part 2)
**Goal:** Working authentication

- [ ] Implement NextAuth.js v5
  - Email/password authentication
  - OAuth providers (Google)
- [ ] Create User schema in Prisma
- [ ] Run initial database migrations
- [ ] Create basic layout (header, footer, navigation)
- [ ] Build auth pages (login, register, forgot password)
- [ ] Test authentication flow

**Deliverable:** Working authentication system

---

### Sprint 2: Event Creation & Core Schema (Week 2)
**Goal:** Users can create and manage events

- [ ] Design and implement complete database schema (all entities)
- [ ] Run Prisma migrations
- [ ] Build event creation form
  - Basic details (title, date, location)
  - Advanced settings (capacity, privacy)
  - Image upload
- [ ] Create event dashboard (list all user events)
- [ ] Build event detail page (owner view)
- [ ] Implement edit/delete event functionality

**Deliverable:** Full event CRUD operations

---

### Sprint 3: Guest Management (Week 3)
**Goal:** Event owners can manage their guest lists

- [ ] Build guest management interface
- [ ] Add guest form (single)
- [ ] Bulk import guests (CSV upload)
- [ ] Edit/remove guests
- [ ] Guest list table with search/filter
- [ ] Mark guests as "invited"

**Deliverable:** Complete guest management system

---

### Sprint 4: Public RSVP Flow (Week 4)
**Goal:** Guests can RSVP to events

- [ ] Create public event page (accessible via slug)
- [ ] Build RSVP form
  - Guest information
  - RSVP status (attending/not attending)
  - Custom fields (dietary restrictions, etc.)
  - Plus-ones support
- [ ] Handle RSVP submission
- [ ] RSVP confirmation page
- [ ] Allow guests to modify their RSVP
- [ ] Store RSVP data in database

**Deliverable:** Working public RSVP flow

---

### Sprint 5: Email Notifications (Week 5)
**Goal:** Automated email communications

- [ ] Set up email service (Resend/SendGrid)
- [ ] Design email templates
  - Invitation email
  - RSVP confirmation
  - New RSVP notification (to event owner)
- [ ] Implement send invitation functionality
- [ ] Send RSVP confirmations automatically
- [ ] Notify event owners of new RSVPs
- [ ] Test email delivery

**Deliverable:** Automated email system

---

### Sprint 6: Analytics Dashboard (Week 6)
**Goal:** Event owners get insights

- [ ] Build event analytics dashboard
  - Total invitations sent
  - RSVP breakdown (confirmed/declined/pending)
  - Attendance rate
  - Response rate over time (chart)
- [ ] Add filters and date ranges
- [ ] Implement guest list export (CSV)
- [ ] Create printable guest list (PDF)
- [ ] Recent activity feed

**Deliverable:** Analytics & reporting

---

### Sprint 7: UI/UX Polish & Responsive Design (Week 7)
**Goal:** Beautiful, mobile-friendly experience

- [ ] Refine all pages for mobile/tablet/desktop
- [ ] Add loading states and error handling
- [ ] Implement toast notifications
- [ ] Add empty states (no events, no guests, etc.)
- [ ] Accessibility audit (keyboard navigation, ARIA labels)
- [ ] Performance optimization (image optimization, code splitting)
- [ ] Dark mode (optional)

**Deliverable:** Polished, responsive UI

---

### Sprint 8: Testing & Deployment (Week 8)
**Goal:** Production-ready MVP

- [ ] Write critical tests (auth, RSVP submission, event creation)
- [ ] Cross-browser testing
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Create production Dockerfile (if self-hosting)
- [ ] Deploy to production (Vercel/Railway)
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up error monitoring (Sentry)
- [ ] Create user documentation
- [ ] Perform security audit

**Deliverable:** Live MVP at production URL

---

## 🐳 Docker Development Setup

### Local Development (Hybrid Approach)
```yaml
# docker-compose.yml runs:
- PostgreSQL 16
- Redis 7
- pgAdmin (optional, for database GUI)

# Running locally:
- Next.js dev server (npm run dev)
```

### Commands
```bash
# Start infrastructure
docker-compose up -d

# Stop infrastructure
docker-compose down

# View logs
docker-compose logs -f

# Reset database
docker-compose down -v && docker-compose up -d
```

### Environment Variables
```env
# Database (connects to Docker PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/rsvpio"

# Redis (connects to Docker Redis)
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Email
RESEND_API_KEY="..."
```

---

## 🚀 Post-MVP Features (Future Phases)

### Phase 2: Enhanced Features
- [ ] QR code check-in at events
- [ ] SMS notifications (Twilio)
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Multi-language support
- [ ] Event themes/templates
- [ ] Seating chart management
- [ ] Gift registry integration
- [ ] Payment/ticketing (for paid events)

### Phase 3: Mobile Apps
- [ ] React Native app setup
- [ ] iOS app development
- [ ] Android app development
- [ ] Push notifications
- [ ] Offline mode
- [ ] App store submissions

### Phase 4: Advanced Analytics
- [ ] Advanced reporting
- [ ] Custom reports
- [ ] Data visualization
- [ ] Export to multiple formats
- [ ] Integration with analytics tools

### Phase 5: Collaboration & Teams
- [ ] Multi-user event management
- [ ] Team roles and permissions
- [ ] Comments and notes on guests
- [ ] Activity log

---

## 📋 Success Metrics

### MVP Success Criteria
- Users can create an event in < 5 minutes
- Guests can RSVP in < 2 minutes
- 95%+ email delivery rate
- Mobile responsive on all core features
- < 2s page load time
- Zero critical security vulnerabilities

### User Metrics (Post-Launch)
- Monthly Active Users (MAU)
- Events created per month
- RSVPs submitted per month
- User retention rate
- Net Promoter Score (NPS)

---

## 🔒 Security Considerations

- [ ] HTTPS everywhere
- [ ] Password hashing (bcrypt)
- [ ] CSRF protection
- [ ] Rate limiting on auth endpoints
- [ ] SQL injection prevention (Prisma parameterized queries)
- [ ] XSS protection
- [ ] Secure session management
- [ ] Environment variables for secrets
- [ ] Regular dependency updates
- [ ] GDPR compliance (data export, deletion)

---

## 📝 Notes & Decisions

### Architectural Decisions
- **Why Next.js?** Full-stack framework, great DX, easy deployment, SEO benefits
- **Why PostgreSQL?** Relational data fits our model, powerful queries, wide support
- **Why Prisma?** Type-safe, great migrations, excellent DX
- **Why NextAuth?** Industry standard, supports many providers, secure
- **Why Docker hybrid?** Consistent infrastructure, fast Next.js hot reload
- **Why Redis?** Fast session storage, caching for future features

### Open Questions
- Do we need real-time features? (WebSockets for live RSVP updates)
- Should we support multi-language from MVP?
- Payment gateway for future ticketing?
- Self-hosting vs managed services?

---

## 🤝 Contributing

This is a solo project initially. Future contributors welcome!

---

**Last Updated:** October 28, 2025
**Version:** 1.0 (MVP Planning)
