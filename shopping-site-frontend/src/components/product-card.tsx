import { FaPlus } from "react-icons/fa6";
import { server } from "../redux/store";
import type { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { FaExpandAlt } from "react-icons/fa";

type ProdcutProps = {
  productId: string;
  photos: { public_id: string; url: string }[];
  name: string; 
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};



const ProductCard = ({productId,photos,name,price,stock,handler}:ProdcutProps) => {
  console.log(photos?.[0]?.url);
  return (
    <div className="productcard">
      <img src={photos?.[0]?.url} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={() => handler({productId,price,name,photo:photos[0].url,stock,quantity: 1})}><FaPlus/></button>
        <Link to={`/product/${productId}`}><FaExpandAlt/></Link>
      </div>
    </div>
    
  );
};

export default ProductCard