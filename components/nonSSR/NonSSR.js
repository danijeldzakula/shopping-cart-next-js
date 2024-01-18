import { Fragment } from "react";
import dynamic from "next/dynamic";

const isClient = typeof window === "undefined";

function NonSSR({ children }) {
  if (!isClient) {
    return <Fragment>{children}</Fragment>;
  } else {
    return null;
  }
}

export default dynamic(() => Promise.resolve(NonSSR), { ssr: false });
