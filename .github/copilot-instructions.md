# Client White - AI Coding Assistant Instructions

## Architecture Overview
This is a full-stack CMS application with a Next.js 15 frontend and Express.js backend, supporting real-time chat, customer management, and multi-tenant functionality.

### Project Structure
- `client/` - Next.js 15 frontend with App Router, NextAuth v5, Redux Toolkit, and Socket.io client
- `server/` - Express.js backend with MongoDB, Socket.io server, AWS S3, and Google APIs
- Monorepo managed with pnpm workspaces

## Key Development Patterns

### Frontend (client/)
- **App Router Structure**: Uses Next.js 15 App Router with route groups `(auth)` and `(dashboard)`
- **Authentication Flow**: NextAuth v5 with JWT strategy, custom credential provider, and refresh token handling
- **State Management**: Redux Toolkit with feature-based slices (`lib/features/`)
- **Real-time Communication**: Socket.io client with custom hooks (`useSocket.ts`)
- **Component Structure**: 
  - `components/dashboard/` - Feature-specific components
  - `components/layout/` - Layout components with `DefaultLayout` wrapper
  - `components/shared/` - Reusable UI components

### Backend (server/)
- **Express Setup**: Custom Express configuration in `utils/express.ts` with rate limiting, CORS, and compression
- **Socket.io Server**: Real-time events handled in `utils/socket/` with chat and notification events
- **MongoDB Models**: Mongoose models for entities (Customer, Ticket, Task, FAQ, etc.)
- **Authentication**: JWT-based auth with refresh token rotation

### Development Workflow

#### Starting Development
```bash
# Frontend (uses Turbopack)
cd client && pnpm dev

# Backend (with auto-credential generation)
cd server && pnpm dev
```

#### Key Scripts
- Client: `pnpm dev` (Turbopack), `pnpm build`, `pnpm lint`
- Server: `pnpm dev` (auto-generates credentials), `pnpm build`, `pnpm start`
- MSBuild task available for legacy build processes

### Authentication Architecture
- **NextAuth Configuration**: Custom credential provider with server API integration
- **Middleware**: Route protection in `middleware.ts` with session expiry handling
- **Token Management**: Automatic refresh token rotation with error handling
- **Protected Routes**: Dashboard routes require authentication, auth routes redirect if logged in

### Real-time Features
- **Socket Connection**: Managed via `useSocket` hook with user online tracking
- **Chat System**: Live messaging with active user indicators
- **Notifications**: Real-time updates across the application

### Data Layer Patterns
- **Frontend**: SWR for server state, Redux for client state, custom hooks for common patterns
- **Backend**: Mongoose with lean virtuals, pagination utilities, validation schemas with Zod
- **API Structure**: RESTful endpoints under `/api/v1/` with consistent response formats

### UI/UX Patterns
- **Design System**: Mantine components + Tailwind CSS for styling
- **Icons**: React Icons with custom SVG icon organization
- **Layout**: Responsive design with sidebar navigation and portal-based modals
- **Forms**: React Hook Form integration with Zod validation

## Project-Specific Conventions

### File Naming
- Components: PascalCase (`CustomerTable.tsx`)
- Hooks: camelCase with `use` prefix (`useCurrentUser.ts`)
- Utilities: camelCase (`functions.ts`)
- Types: Descriptive interfaces in `types/index.d.ts`

### Import Organization
- External libraries first
- Internal components/hooks
- Types and constants last
- Use `@/` path mapping for client-side imports

### Error Handling
- Frontend: React Error Boundaries + toast notifications
- Backend: Custom error classes with consistent API responses
- Validation: Zod schemas for both client and server validation

## Integration Points
- **AWS S3**: File uploads with presigned URLs
- **Google APIs**: Calendar and email integration
- **MongoDB**: Primary database with Redis for caching
- **Socket.io**: Bidirectional real-time communication
- **NextAuth**: Authentication with custom token management

When working on this codebase:
1. Follow the established Redux slice patterns for state management
2. Use the existing socket event structure for real-time features  
3. Maintain the middleware chain for authentication flows
4. Leverage the shared component library in `components/shared/`
5. Follow the established API response format for backend endpoints