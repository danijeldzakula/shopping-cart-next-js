import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Layout from "@/layouts/Layout";
import { single_product_url } from "@/utils/constants";
import { formatPrice } from "@/utils/helpers";
import { useRouter } from "next/router";

export default function Product(props) {
  const router = useRouter();
  const { data } = props;
  const { image } = data;

  if (!data) {
    return (
      <Layout title="Single Product">
        <article>
          <section className="section section__product">
            <div className="container">
              <Link href="/products" className="btn-back">
                Back
              </Link>
              <h4
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                This product is not available!
              </h4>
            </div>
          </section>
        </article>
      </Layout>
    );
  }

  return (
    <Layout title="Single Product">
      <article>
        <section className="section section__product">
          <div className="container">
            <button
              className="btn btn-back"
              type="button"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>

          <div className="container">
            <div className="left">
              <figure className="figure">
                <Image
                  loader={false}
                  src={image}
                  alt={data.name}
                  width={600}
                  height={400}
                />
              </figure>
            </div>
            <div className="right">
              <div className="row">
                <h2>{data.name}</h2>
                <h5>{data.description}</h5>
                <p>{formatPrice(data.price)}</p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let data = {};

  try {
    await axios.get(single_product_url + query.id).then((res) => {
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
