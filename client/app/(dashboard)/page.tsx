
import TopPageNavigation from "@/components/shared/TopPageNavigation";
import OverviewMain from "@/components/dashboard/owerview/OverviewMain";
import { getDashboardStats } from "@/lib/features/dashboard/dashboardAction";
import { Suspense } from "react";
import OverviewSkeleton from "@/components/dashboard/owerview/OverviewSkeleton";

export const metadata = {
  title: "Client Link Dashboard",
  description: "Client Link Dashboard",
};

export default async function Home() {
  const overviewPromise = getDashboardStats();

  return (
    <>
      <TopPageNavigation />
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewMain overviewPromise={overviewPromise} />
      </Suspense>
    </>
  );
}
