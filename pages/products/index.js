import React from "react";
import axios from "axios";
import Layout from "@/layouts/Layout";
import Card from "@/components/card/Card";
import { products_url } from "@/utils/constants";

export default function Products(props) {
  const { data } = props;

  return (
    <Layout title="Products">
      <article style={{ overflow: "hidden" }}>
        <section className="section section__products">
          <div className="container">
            <div className="left"></div>

            <div className="right">
              <div className="row">
                {data.map((product) => {
                  return <Card key={product.id} data={product} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let data = [];

  try {
    await axios.get(products_url).then((res) => {
      console.log("testttt");
      if (res.status === 200) {
        data = res.data;
      }
    });
  } catch (err) {
    console.error(
      "Fetch data of products error (products/index.js):",
      err.message
    );
  }

  return {
    props: {
      data,
    },
  };
}
