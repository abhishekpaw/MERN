import { FaPlus } from "react-icons/fa6";

type ProdcutProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
}

const server = "asgdahs";

const ProductCard = ({productId,photo,name,price,stock,handler}:ProdcutProps) => {
  return (
    <div className="productcard">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={() => handler()}><FaPlus/></button>
      </div>
    </div>
    
  );
};

export default ProductCard