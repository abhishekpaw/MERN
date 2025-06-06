import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import type { CartItem } from "../types/types";

const Home = () => {

  const {data,isLoading,isError} = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
      if(cartItem.stock < 1) return toast.error("Out Of Stock");
      dispatch(addToCart(cartItem));
      toast.success("Added to Cart");
  }

  if (isError) toast.error("Cannot Fetch the Products.");

  return (
    <div className="home">
      <section></section>

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
              photo={i.photo}
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