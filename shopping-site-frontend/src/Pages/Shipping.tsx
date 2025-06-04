import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server, type RootState } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import type { CartItem } from "../types/types";

const Shipping = () => {

      const { user } = useSelector((state: RootState) => state.userReducer);

    const {cartItems} = useSelector((state: RootState) => state.cartReducer);

    const[shippingInfo,setShippingInfo] = useState({ 
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: Number(0),
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Check if any item in the cart exceeds its stock
    const changeHandler = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(saveShippingInfo(shippingInfo));  
        
      try {
          // Collect all productIds from cartItems
          //const items = cartItems.filter((cartItem) => cartItem.photo.replace(/\\/g, "/"));
          const reqdata = JSON.stringify({ items: cartItems, shippingInfo,});
          //(reqdata.replace(/"pincode":\d+/, `"pincode":${JSON.parse(shippingInfo.pincode)}`));
          const { data } = await axios.post(
            `${server}/api/v1/payment/create?id=${user?._id}`,
            reqdata.replace(/\\/g, ""),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          navigate("/pay", {
            state: data.clientSecret,
          });
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      }
    }
    useEffect(() => {
      if (!cartItems || cartItems.length === 0) {
        navigate("/cart");
      }
    }, [cartItems, navigate]);


  return (
    <div className="shipping">
        <button className="back-btn" onClick={()=>navigate("/cart")}>
            <BiArrowBack/>
        </button>
        <form onSubmit={submitHandler}>
            <h1>Shipping Address</h1>
            <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler}/>
            <input required type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler}/>
            <input required type="text" placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler}/>
            <select required name="country" value={shippingInfo.country} onChange={changeHandler}>
                <option value="">Choose Country</option>
                <option value="india">India</option>
            </select>
            <input required type="number" placeholder="Pincode" name="pincode" value={shippingInfo.pincode} onChange={changeHandler}/>
            <button type="submit">Pay Now</button>
        </form>
    </div>
  )
}

export default Shipping