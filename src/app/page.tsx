import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { FeedClient } from "./page.client";
import { getFeedData, getUserData } from "../utils/services";
import { getQueryClient } from "../utils/getQueryClient";
import { Suspense } from "react";
import { Spinner } from "./components/Spinner";

export default function Home() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["feed"],
    queryFn: () => getFeedData("2"),
  });
  queryClient.prefetchQuery({
    queryKey: ["user", "2"],
    queryFn: () => getUserData("2"),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner />}>
        <FeedClient />
      </Suspense>
    </HydrationBoundary>
  );
}
