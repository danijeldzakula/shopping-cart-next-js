import Layout from "@/layouts/Layout";
import Canvas from "./canvas/Canvas";

export default function Home() {
  return (
    <Layout title="Home">
      <article style={{ overflow: "hidden" }}>
        <section className="section section__hero">
          <Canvas />
        </section>
      </article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
