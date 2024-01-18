"use client";
import { use } from "react";

async function fakeDelay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function getData() {
  console.log("fetching");
  const res = await fetch("http://localhost:3000/api/all-products");
  await fakeDelay(750);
  let data = await res.data;
  return data;
}

let cachedPromise;
function getFact() {
  if (!cachedPromise) {
    cachedPromise = getData();
  }
  return cachedPromise;
}

export default function Fact() {
  const products = use(getFact());
  return <div suppressHydrationWarning={true}></div>;
}
