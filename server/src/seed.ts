import { connectDB, disconnectDB } from "./configs/db";
import env from "./configs/env";
import { initializeData2 } from "./utils/seed2";

/**
 * `pnpm seed`          shows the target database and asks you to re-run with --yes
 * `pnpm seed -- --yes` wipes the demo collections and loads fresh demo data
 */
async function run() {
    const target = new URL(env.MONGODB_URI);
    const dbName = target.pathname.replace("/", "") || "(default)";
    console.log(`Target: ${target.host}/${dbName}`);

    if (!process.argv.includes("--yes")) {
        console.log("This deletes users, customers, leads, tickets, invoices, tasks, products, FAQs and chats.");
        console.log("Re-run with --yes to continue:  pnpm seed -- --yes");
        process.exit(1);
    }

    await connectDB();
    await initializeData2();
    await disconnectDB();
}

run().catch(async (err) => {
    console.error("Seeding failed:", err.message);
    await disconnectDB().catch(() => undefined);
    process.exit(1);
});
