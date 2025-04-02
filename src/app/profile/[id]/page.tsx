import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProfileClient from "./page.client";
import { getQueryClient } from "@/utils/getQueryClient";
import { getUserData } from "@/utils/services";
import { Suspense } from "react";
import { Spinner } from "@/app/components/Spinner";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["user", id],
    queryFn: () => getUserData(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner />}>
        <ProfileClient />
      </Suspense>
    </HydrationBoundary>
  );
}
