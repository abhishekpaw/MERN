import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

type cartItemProps = {
    cartItem: any;
};

const CartItem = ({cartItem}:cartItemProps) => {

    const{photo,productId,name,price,quantity,stock} = cartItem;


  return (
    <div className="cart-item">
        <img src={photo} alt={name}/>
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>₹{price}</span>
        </article>

        <div>
            <button>-</button>
            <p>{quantity}</p>
            <button>+</button>
        </div>

        <div>
            <FaTrash/>
        </div>
    </div>
  )
}

export default CartItem