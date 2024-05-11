"use client";
import { Top, Main, Bottom } from "./Components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Top />
      <Main />
      <Bottom />
    </main>
  );
}
