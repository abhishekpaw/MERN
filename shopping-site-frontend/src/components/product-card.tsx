import { FaPlus } from "react-icons/fa6";
import { server } from "../redux/store";

type ProdcutProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
}



const ProductCard = ({productId,photo,name,price,stock,handler}:ProdcutProps) => {
  return (
    <div className="productcard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={() => handler()}><FaPlus/></button>
      </div>
    </div>
    
  );
};

export default ProductCard