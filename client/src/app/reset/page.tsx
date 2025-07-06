import { Suspense } from "react";
import ResetPage from "./ResetPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPage />
    </Suspense>
  );
}
