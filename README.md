# RSVP.io

Modern RSVP management platform for weddings and events

## Project Structure

```
rsvp.io/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (dashboard)/   # Dashboard routes (authenticated)
│   │   ├── (public)/      # Public routes
│   │   └── api/           # API routes
│   │       └── auth/      # Authentication endpoints
│   ├── components/        # React components
│   │   ├── ui/           # UI components (shadcn/ui)
│   │   ├── forms/        # Form components
│   │   └── dashboard/    # Dashboard-specific components
│   ├── lib/              # Utility libraries
│   │   ├── api/          # API utilities
│   │   ├── utils/        # Helper functions
│   │   └── validations/  # Zod schemas
│   └── types/            # TypeScript type definitions
└── docker-compose.yml     # Docker configuration for local development
```

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Docker)
- **Cache:** Redis (Docker)
- **Authentication:** NextAuth.js v5
- **Email:** Resend
- **UI Components:** shadcn/ui, Radix UI

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/David-S409/rsvp.io.git
cd rsvp.io
```

2. Install dependencies
```bash
npm install
```

3. Copy environment variables
```bash
cp .env.example .env
```

4. Start Docker containers (PostgreSQL + Redis)
```bash
npm run docker:up
```

5. Generate Prisma client
```bash
npm run db:generate
```

6. Push database schema
```bash
npm run db:push
```

7. Start development server
```bash
npm run dev
```

Visit http://localhost:3000

## Development Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers
- `npm run docker:reset` - Reset Docker containers and volumes
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations

## Docker Services

- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379
- **pgAdmin:** localhost:5050 (optional GUI for database)

## Project Planning

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed development roadmap and feature specifications.

## License

ISC
