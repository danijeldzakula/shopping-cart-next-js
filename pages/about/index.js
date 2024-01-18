import React, { useRef, useState } from "react";
import Layout from "@/layouts/Layout";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";

export default function About() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const [hasRendered, setHasRendered] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setHasRendered(true);
  }, []);

  const article = useRef(null);
  useIsomorphicLayoutEffect(() => {
    if (hasRendered) {
      const sections = gsap.utils.toArray(".section");
    }
  }, [hasRendered, article]);

  return (
    <Layout title="About">
      <article ref={article} id="article" className="article">
        <section className="section"></section>
        <section className="section"></section>
        <section className="section"></section>
        <section className="section"></section>
        <section className="section"></section>
      </article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
