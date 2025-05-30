import { FaPlus } from "react-icons/fa6";
import { server } from "../redux/store";
import type { CartItem } from "../types/types";

type ProdcutProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
}



const ProductCard = ({productId,photo,name,price,stock,handler}:ProdcutProps) => {
  return (
    <div className="productcard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={() => handler({productId,price,name,photo,stock,quantity: 1})}><FaPlus/></button>
      </div>
    </div>
    
  );
};

export default ProductCard