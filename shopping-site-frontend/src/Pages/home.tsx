import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import type { CartItem } from "../types/types";
import { useEffect, useRef, useState } from "react";
import "../styles/home.scss";

const Home = () => {

  const {data,isLoading,isError} = useLatestProductsQuery("");
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
      if(cartItem.stock < 1) return toast.error("Out Of Stock");
      dispatch(addToCart(cartItem));
      toast.success("Added to Cart");
  }

  if (isError) toast.error("Cannot Fetch the Products.");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="home">
      <section ref={sectionRef}
      className={`hero-section ${isVisible ? "show" : ""}`}>
        <div className="hero-content">
          <h1>Welcome to MERN Ecommerce</h1>
          <p>Discover amazing products at the best prices.</p>
        </div>
      </section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              photos={i.photos}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default Home