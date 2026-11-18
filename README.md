<div id="user-content-toc" align="center">
    <ul align="left">
        <summary>
            <h1 style="display: inline-block; font-size: 2.5em; color: #2c3e50;">Client White — Fullstack CRM (Next.js + Express)</h1>
        </summary>
    </ul>
</div>
<table style="width:100%; border-collapse: collapse; text-align: left;">
    <thead>
        <tr>
            <th style="padding: 10px; background-color: #3498db; color: white;">🚀 What's Used in this App?</th>
            <th style="padding: 10px; background-color: #3498db; color: white;">🛠️ How to Run?</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; background-color: #ecf0f1;">
                <ul>
					<li>Next.js 15 (App Router)</li>
					<li>React + TypeScript</li>
					<li>NextAuth v5 (JWT)</li>
					<li>Redux Toolkit</li>
					<li>SWR</li>
					<li>Tailwind CSS + Mantine</li>
					<li>Socket.io (real-time chat)</li>
					<li>Express.js (API server)</li>
					<li>MongoDB (Mongoose)</li>
					<li>Redis (cache / presence)</li>
					<li>AWS S3 (file uploads via presigned URLs)</li>
					<li>Google APIs (optional integrations)</li>
					<li>WhatsApp API + Webhooks (two-way messaging, auto ticket/lead creation)</li>
					<li>Gmail API (send/read/create emails for company inboxes, automated workflows)</li>
                </ul>
            </td>
            <td style="padding: 10px; background-color: #ecf0f1;">
                <h4>After cloning the project:</h4>
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
            </td>
        </tr>
        <tr>
            <td colspan="3" style="padding: 10px; background-color: #ecf0f1;">
                <h2>🌟What is Client White CRM?</h2>
                <p>Client White is a modern, multi-tenant CRM and helpdesk platform built for teams who need customer management, ticketing, invoicing, and real-time chat. It pairs a Next.js 15 frontend (App Router) with an Express API backend and MongoDB for persistence. The project includes authentication, role-based access, socket-powered real-time features, and integrations for file uploads and external APIs.
</p>
                <h2>⚙️ Features</h2>
               <ul>
					<li>👥 Multi-tenant customer management</li>
					<li>💬 Real-time chat and presence (Socket.io)</li>
					<li>🎫 Ticketing and task management</li>
					<li>🧾 Product &amp; invoice management</li>
					<li>📚 FAQ, notes and knowledge base</li>
					<li>📁 File uploads via AWS S3 (presigned URLs)</li>
					<li>🔒 Authentication using NextAuth with refresh/token rotation</li>
					<li>🧩 Server-side APIs with Express and Mongoose models</li>
					<li>⚡ Redis for caching and presence</li>
					<li>🎨 Tailwind + Mantine UI components for a responsive design</li>
					<li>📲 WhatsApp integration: inbound messages are received via webhooks and processed by the server so messages sent to the company's WhatsApp number can be handled directly inside Client White (automatically create tickets or leads and route messages to agents). No external platform is required to respond — everything is managed from the CRM.</li>
					<li>✉️ Gmail integration: the platform integrates with the Gmail API so the company can send, read and create emails from inside Client White. Email-based leads or tickets can be automatically created and assigned to agents, and outgoing emails are sent on behalf of the configured company account.</li>
				</ul>
               <h2>📎 Project Resources</h2>
                <ul>
                    <li>🌐 <a href="https://client-link.vercel.app/" target="_blank">Live Demo</a></li>
                </ul>
                <h2>💬 Feedback and Collaboration</h2>
                <p>I highly value your feedback and suggestions! If you have any questions, comments, or ideas for improvement, feel free to reach out. I am always open to collaborating on new and exciting projects.</p>
                <p>Thank you for visiting my project. I hope you enjoy exploring it, and I look forward to connecting with you!</p>
            </td>
        </tr>		
    </tbody>
</table>

## Project Structure (high level)

- client/ — Next.js 15 app (App Router)
	- app/ — route groups `(auth)`, `(dashboard)` and pages
	- components/ — shared and dashboard-specific components
	- lib/ — Redux slices, API helpers, sockets
	- hooks/ — custom React hooks (useSocket, useCurrentUser, etc.)
- server/ — Express.js API
	- src/controllers, models, routes, services
	- utils/ — socket handlers, AWS, auth helpers


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
