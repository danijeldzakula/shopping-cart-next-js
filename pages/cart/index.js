import React from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  removeCartItem,
  getCartCount,
  getSubTotal,
  calculateTax,
  getTotalAmount,
  getCartProducts,
} from "@/store/reducers/cartSlice";
import { formatPrice } from "@/utils/helpers";
import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(calculateTax());
    dispatch(getTotalAmount());
    dispatch(getCartProducts());
  };

  const handleIncrement = (id) => {
    dispatch(increment(id));
    handleDispatch();
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
    handleDispatch();
  };

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
    handleDispatch();
  };

  useIsomorphicLayoutEffect(() => {}, [dispatch]);

  return (
    <Layout title="Cart">
      <article>
        <section className="section section__cart">
          <div className="container">
            <div className="row">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => {
                  return (
                    <div className="items" key={item.id}>
                      <Link href={`/products/${item.id}`}>
                        <div className="left">
                          <Image
                            className="img"
                            loader={false}
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                          />
                          <h3>{item.name}</h3>
                        </div>
                      </Link>

                      <div className="actions">
                        <div className="counter">
                          <button
                            onClick={() => handleIncrement(item.id)}
                            type="button"
                            className="btn"
                          >
                            <span className="text">+</span>
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            onClick={() => handleDecrement(item.id)}
                            type="button"
                            className="btn"
                          >
                            <span className="text">-</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          type="button"
                          className="btn"
                        >
                          <span className="text">Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-items">
                  <p>No items in your cart!</p>
                  <Link href="/products">Back to shop</Link>
                </div>
              )}
            </div>

            {cartItems && cartItems.length > 0 && (
              <div>
                <p>Sub: {formatPrice(cart.subAmount)}</p>
                <p>Tax: {formatPrice(cart.tax)}</p>
                <p>Total: {formatPrice(cart.totalAmount)}</p>
              </div>
            )}
          </div>
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
