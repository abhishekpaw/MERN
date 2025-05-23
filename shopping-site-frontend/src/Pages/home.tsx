import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler = () => {
  }

  return (
    <div className="home">
      <section>

      </section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        <ProductCard productId="aasdhgh" photo="https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/71jbq-5PP-L._SX425_.jpg" name="HP Pavilion Laptop" price={15000} stock={150} handler={addToCartHandler} />
      </main>
    </div>
  );
}

export default Home