import Link from "next/link";
import Layout from "@/layouts/Layout";

export default function NotFoundError() {
  return (
    <Layout title="Not Found Error">
      <article style={{ display: "grid", justifyItems: "center" }}>
        <h1>Not Found Error</h1>
        <Link href="/">Back to home</Link>
      </article>
    </Layout>
  );
}
export async function getStaticProps({ locale }) {
  const delay = (s) => new Promise((resolve) => setTimeout(resolve, s));
  await delay(400);

  return {
    props: {},
  };
}
