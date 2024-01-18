import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  calculateTax,
  getTotalAmount,
} from "@/store/reducers/cartSlice";
import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import styles from "./card.module.css";

export default function Card(props) {
  const { data } = props;

  const dispatch = useDispatch();

  let newProduct = {
    id: "",
    name: "",
    price: "",
    image: "",
  };

  const addToCart = (item) => {
    newProduct = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    };

    dispatch(addCartProduct(newProduct));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(calculateTax());
    dispatch(getTotalAmount());
  };

  useIsomorphicLayoutEffect(() => {}, [dispatch]);

  return (
    <article className="card">
      <Link className="card-link" href={"/products/" + data.id}>
        <figure className="card-figure">
          <Image
            loader={false}
            src={data.image}
            alt={data.name}
            width={400}
            height={400}
          />
        </figure>
        <footer className="card-footer">
          <div className="left">
            <h4>{data.name}</h4>
            <p>{formatPrice(data.price)}</p>
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              addToCart(data);
            }}
            type="button"
            className="btn btn-add-cart"
          >
            <span>Add to cart</span>
          </button>
        </footer>
      </Link>
    </article>
  );
}

/*
<article className="card">
  <Link className="card-link" href={"/products/" + data.id}>
    <figure className="card-figure">
      <Image
        loader={false}
        src={data.image}
        alt={data.name}
        width={400}
        height={400}
      />
    </figure>
    <footer className="card-footer">
      <div className="left">
        <h4>{data.name}</h4>
        <p>{formatPrice(data.price)}</p>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          addToCart(data);
        }}
        type="button"
        className="btn btn-add-cart"
      >
        <span>Add to cart</span>
      </button>
    </footer>
  </Link>
</article>
*/
