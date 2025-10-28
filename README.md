<div id="user-content-toc" align="center">
	<ul align="left">
		<summary>
			<h1 style="display: inline-block; font-size: 2.2em; color: #2c3e50;">📝 Client Link — Fullstack CRM (Next.js + Express) 📝</h1>
		</summary>
	</ul>
</div>

| 🚀 What's Used in this App? | 🛠️ How to Run? | 👤 Author |
|---|---|---|
| - Next.js 15 (App Router)
- React + TypeScript
- NextAuth v5 (JWT)
- Redux Toolkit
- SWR
- Tailwind CSS + Mantine
- Socket.io (real-time chat)
- Express.js (API server)
- MongoDB (Mongoose)
- Redis (cache / presence)
- AWS S3 (file uploads via presigned URLs)
- Google APIs (optional integrations)
- WhatsApp API + Webhooks (two-way messaging, auto ticket/lead creation)
- Gmail API (send/read/create emails for company inboxes, automated workflows)
| After cloning the project (root):

1. Install dependencies (pnpm recommended):

```bash
pnpm install
```

2. Start both apps (in separate terminals):

```bash
# Terminal 1 - server
cd server
pnpm install
pnpm dev

# Terminal 2 - client
cd client
pnpm install
pnpm dev
```

3. Configure environment variables (see `.env.example` files in `client/` and `server/`).
4. Open the frontend at http://localhost:3000 and the backend API (default port shown in `server` README or logs).
| - [Ali Durul](https://github.com/AliDurul) — <https://www.linkedin.com/in/ali-durul/> |

## 🌟 What is Client Link CRM?

Client Link is a modern, multi-tenant CRM and helpdesk platform built for teams who need customer management, ticketing, invoicing, and real-time chat. It pairs a Next.js 15 frontend (App Router) with an Express API backend and MongoDB for persistence. The project includes authentication, role-based access, socket-powered real-time features, and integrations for file uploads and external APIs.

## ⚙️ Key Features

- Multi-tenant customer management
- Real-time chat and presence (Socket.io)
- Ticketing and task management
- Product & invoice management
- FAQ, notes and knowledge base
- File uploads via AWS S3 (presigned URLs)
- Authentication using NextAuth with refresh/token rotation
- Server-side APIs with Express and Mongoose models
- Redis for caching and presence
- Tailwind + Mantine UI components for a responsive design
 - WhatsApp integration: inbound messages are received via webhooks and processed by the server so messages sent to the company's WhatsApp number can be handled directly inside Client Link (automatically create tickets or leads and route messages to agents). No external platform is required to respond — everything is managed from the CRM.
 - Gmail integration: the platform integrates with the Gmail API so the company can send, read and create emails from inside Client Link. Email-based leads or tickets can be automatically created and assigned to agents, and outgoing emails are sent on behalf of the configured company account.

## Project Structure (high level)

- client/ — Next.js 15 app (App Router)
	- app/ — route groups `(auth)`, `(dashboard)` and pages
	- components/ — shared and dashboard-specific components
	- lib/ — Redux slices, API helpers, sockets
	- hooks/ — custom React hooks (useSocket, useCurrentUser, etc.)
- server/ — Express.js API
	- src/controllers, models, routes, services
	- utils/ — socket handlers, AWS, auth helpers

## Environment Variables (examples)

Create `.env` in both `client/` and `server/` and add the required vars. Typical variables used by this project include:

Server (`server/.env`)

```
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=your-bucket
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

Client (`client/.env`)

```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_SENTRY_DSN=  # optional
```

Adjust names/values based on your deployment and secrets management.

## Scripts

- Root scripts may use pnpm workspaces. Common commands inside each package:

Client:

```bash
pnpm dev      # start Next.js dev server (client)
pnpm build
pnpm start
pnpm lint
```

Server:

```bash
pnpm dev      # start Express dev server (nodemon / ts-node)
pnpm build
pnpm start
pnpm lint
```

## Architecture Notes

- Authentication: NextAuth v5 with a custom credentials provider and refresh token rotation handled by the server.
- State: Redux Toolkit for client-side state + SWR for server-state fetching where appropriate.
- Real-time: Socket.io server in `server/utils/socket` and a `useSocket` hook on the client to manage presence, chat events, and notifications.
- Storage: MongoDB with Mongoose models; file uploads use presigned S3 URLs for direct-to-S3 uploads.
- Validation: Zod schemas for input validation on APIs and on the client in forms.

## WhatsApp & Gmail Integration (details)

- WhatsApp API & Webhooks
	- The server exposes webhook endpoints to receive incoming WhatsApp messages. Incoming messages can trigger automated flows such as creating a new ticket or lead, assigning to an agent, or sending an auto-reply.
	- Outbound messages to WhatsApp are sent via the configured provider's API from the server so agents can reply from the CRM UI without leaving the platform.

- Gmail API
	- The platform connects to Gmail via OAuth to allow sending, receiving and managing emails for company accounts.
	- Email messages can be converted into tickets or leads automatically based on configurable rules and assigned to agents.
	- Replies sent from the CRM use the Gmail API so all mail is sent/received through the company mailbox (preserving threads and headers where possible).

## Development Tips

- Use the provided UI components in `components/shared` when adding pages to keep consistent styling.
- Add new socket events in `server/utils/socket` and mirror event names in `client/lib/sockets` to avoid mismatches.
- Reuse Redux slices pattern from `lib/features/` for new domain features.

## Deployment

- You can deploy the `client/` to Vercel or another static/SSR host supporting Next.js. Ensure `NEXT_PUBLIC_API_URL` points to your server URL in production.
- Deploy the server to any Node-friendly host (Heroku, Fly.io, AWS ECS, etc.) and set environment variables accordingly.
- Use managed MongoDB (Atlas) and Redis for production. Use IAM or secure secrets for AWS credentials.

## Contributing

Contributions are welcome. Please open issues or PRs. Follow the project's linting and commit message conventions.

## Contact & Links

- GitHub: https://github.com/AliDurul
- LinkedIn: https://www.linkedin.com/in/ali-durul/

---

If you'd like, I can also add a `client/.env.example` and `server/.env.example` with the variables above, or wire CI/CD deployment docs for Vercel + a Node host.
