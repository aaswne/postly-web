"use client";

import { useRouter } from "next/navigation";

export default function NotCompletedPage() {
  const router = useRouter();

  return (
    <div className="wip-container">
      <div className="wip-card">
        <h1>🚧 Work in Progress</h1>
        <p>This page is not completed yet. Please come back later.</p>

        <div className="wip-buttons">
          <button onClick={() => router.push("/")}>Go Home</button>
          <button onClick={() => router.back()}>Go Back</button>
        </div>
      </div>
    </div>
  );
}