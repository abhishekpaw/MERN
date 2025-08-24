import { useEffect, useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { Skeleton } from "../../components/loader";
import {
    useNewDiscountMutation,
    useSinglediscountQuery
} from "../../redux/api/discountAPI";
import type { UserReducerInitialState } from "../../types/reducer-types";
import { responseToast } from "../../utils/feature";

const NewDiscount = () => {

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useSinglediscountQuery({
    id: id!,
    userId: user?._id!,
  });

  const { code, amount } = data?.coupon || { code: "", amount: 0 };
  const [amountUpdate, setAmountUpdate] = useState<number>(amount);
  const [codeUpdate, setCodeUpdate] = useState<string>(code);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const [newDiscount] = useNewDiscountMutation();


  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsBtnLoading(true);
    try {
      const payload = {
        code: codeUpdate.trim(),
        amount: amountUpdate,
      };

      const res = await newDiscount({
        formData: payload,
        userId: user?._id!,
      });
      responseToast(res, navigate, "/admin/discount");
    } catch (error) {
      console.log(error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  useEffect(() => {
    if (data?.coupon) {
      setCodeUpdate(data.coupon.code);
      setAmountUpdate(data.coupon.amount);
    }
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <article>
              <form onSubmit={submitHandler}>
                <h2>New Discount</h2>
                <div>
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={codeUpdate}
                    onChange={(e) => setCodeUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Amount</label>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amountUpdate}
                    onChange={(e) => setAmountUpdate(Number(e.target.value))}
                  />
                </div>
                <button disabled={isBtnLoading} type="submit">
                  {isBtnLoading ? "Creating..." : "Create"}
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default NewDiscount;
