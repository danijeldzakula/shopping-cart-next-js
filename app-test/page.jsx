import { Suspense } from "react";
import Fact from "./fact";

export default function Home() {
  return (
    <div>
      test
      <Suspense fallback={<div>Loading...</div>}>
        <Fact />
      </Suspense>
    </div>
  );
}
