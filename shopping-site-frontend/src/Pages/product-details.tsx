import { Navigate, useParams } from "react-router-dom"
import { useProductDetailsQuery } from "../redux/api/productAPI"
import { Skeleton } from "../components/loader";
import { MyntraCarousel, Slider, type CarouselButtonType } from "6pp";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import RatingsComponent from "../components/ratings";
import toast from "react-hot-toast";
import type { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const ProductDetails = () => {

        const dispatch = useDispatch();

    const params = useParams();
    const{isLoading,isError,error,data} = useProductDetailsQuery(params.id!);

    const[carouselOpen,setCarouselOpen] = useState(false);
          const[quantity,setQuantity] = useState(0);  

      const incrementQuantity = () => {
        if(data?.product?.stock === quantity){
          return toast.error(`${data?.product?.stock} is the maximum stock available`);
        }
        setQuantity((prev) => prev + 1);
      };

      const decrementQuantity = () => {
        setQuantity((prev) => prev - 1);
        if (quantity <= 0) {
          setQuantity(0);
        }
      };

            const addToCartHandler = (cartItem: CartItem) => {
            if(cartItem.stock < 1) return toast.error("Out Of Stock");
            if (quantity <= 0) {
                return toast.error("Please select a quantity greater than 0");
            }
            dispatch(addToCart(cartItem));
            toast.success("Added to Cart");
        }

        if(isError) {
          return <Navigate to="/404" />
        }

  return (
    <div className="product-details">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main>
            <section>
              <Slider
                showThumbnails
                showNav={false}
                onClick={() => setCarouselOpen(true)}
                images={data?.product?.photos.map((i) => i.url) || []}
              />
              {carouselOpen && (
                <MyntraCarousel
                  NextButton={NextButton}
                  PrevButton={PrevButton}
                  setIsOpen={setCarouselOpen}
                  images={data?.product?.photos.map((i) => i.url) || []}
                />
              )}
            </section>
            <section>
              <code>{data?.product?.category}</code>              
              <h1>{data?.product?.name}</h1>
              <RatingsComponent value={data?.product?.ratings || 0} />
              <h3>₹{data?.product?.price}</h3>
              <article>
                <div>
                  <button onClick={decrementQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={incrementQuantity}>+</button>
                </div>
                <button
                  onClick={() =>
                    addToCartHandler({
                      productId: data?.product?._id!,
                      name: data?.product?.name!,
                      price: data?.product?.price!,
                      stock: data?.product?.stock!,
                      quantity,
                      photo: data?.product?.photos[0].url!,
                    })
                  }
                >
                  Add To Cart
                </button>
              </article>
              <p>{data?.product?.description}</p>
            </section>
          </main>
        </>
      )}
    </div>
  );
}


const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "1px solid #f1f1f1",
        height: "80vh",
      }}
    >
      <section style={{ width: "100%", height: "100%" }}>
        <Skeleton
          width="100%"
          containerHeight="100%"
          height="100%"
          length={1}
        />
      </section>
      <section
        style={{
          width: "100%",
          //border: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="100%" length={3} />
        <Skeleton width="100%" length={4} />
        <Skeleton width="100%" length={4} />
      </section>
    </div>
  );
}

const NextButton:CarouselButtonType = ({onClick}) => (
  <button onClick={onClick} className="caraousel-btn">
    <FaArrowCircleRight/>
  </button>
)

const PrevButton:CarouselButtonType = ({onClick}) => (
  <button onClick={onClick} className="caraousel-btn">
        <FaArrowCircleLeft/>
  </button>
)

export default ProductDetails