import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { Skeleton } from "../../components/loader";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/api/orderAPI";
import type { OrderItemType } from "../../types";
import type { UserReducerInitialState } from "../../types/reducer-types";
import type { Order } from "../../types/types";
import { reponseToast } from "../../utils/feature";
import { server } from "../../redux/store";

const defaultdata: Order = {
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pincode: Number(0),
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems:[],
  _id: "sasdghashjd",
  user: {
    name: "",
    _id: ""
  },
};

const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError, error } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pincode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultdata;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async() => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    reponseToast(res,navigate,"/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    reponseToast(res, navigate, "/admin/transaction");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section style={{ padding: "2rem" }}>
              <h2>Order Items</h2>
              {orderItems.map((i) => (
                <ProductCard
                  name={i.name}
                  photo={`${server}/${i.photo}`}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>
            <article className="shipping-info-card">
              <button className="order-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address: {`${address},${city},${state},${country},${pincode}`}
              </p>

              <h5>Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>

              <button onClick={updateHandler}>Process Status</button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

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