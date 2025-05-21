import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar"
import type { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom";

const img = "/src/assets/NIKE+QUEST+6.png";

const orderItems: OrderItemType[] = [
    {
      name: "Nike Shoes",
      photo: img,
      price: 2000,
      quantity: 4,
      _id: "asadasd"
    }
]

const TransactionManagement = () => {

  const[order,setOrder] = useState<OrderType>({
    name: "Abhishek Pawar",
    address: "Vaibhav Nagar Malegaon Road",
    city: "Nanded",
    country: "India",
    state: "Maharashtra",
    pincode: 431605,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "sasdghashjd",

  });

  const {
    name,
    address,
    city,
    country,
    state,
    pincode,
    subtotal,
    discount,
    shippingCharges,
    tax,
    total,
    status,
  } = order;

  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section style={{padding:"2rem"}}>
          <h2>Order Items</h2>
          {order.orderItems.map((i) => (
            <ProductCard name={i.name} photo={i.photo} _id={i._id} quantity={i.quantity} price={i.price}/>
          ))}
        </section>
        <article className="shipping-info-card">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>Address: {`${address},${city},${state},${country},${pincode}`}</p>

          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span className={status==="Delivered"?"purple":status==="Shipped"?"green":"red"}>{status}</span>
          </p>

          <button onClick={updateHandler}>Process Status</button>
        </article>
      </main>
      </div>
  )
}

const ProductCard = ({ name , photo, price,quantity, _id}: OrderItemType) =>{
  return (
    <div className="transaction-product-card">
      <img src={photo} alt={name} />
      <Link to={`/product/${_id}`}>{name}</Link>
      <span>
        ${price} X {quantity} = ${price * quantity}
      </span>
    </div>
  );
}

export default TransactionManagement