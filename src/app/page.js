"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Top, Main } from "./Components";

console.log("999");

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Top />
      <Main />
    </main>
  );
}
