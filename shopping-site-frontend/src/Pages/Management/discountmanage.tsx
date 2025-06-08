import { useEffect, useState, type FormEvent } from "react";
import AdminSidebar from "../../components/AdminSidebar"
import { Skeleton } from "../../components/loader"
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { server } from "../../redux/store";
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../types/reducer-types";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useFetchData, useInputValidation } from "6pp";
import type { AllDiscountResponse, SingleDiscountResponse } from "../../types/api-types";

const DiscountManagement = () => {

    const[btnLoading, setIsBtnLoading] = useState<boolean>(false);

    const { user } = useSelector(
      (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    const {id} = useParams();

    const {data, error, loading:isLoading} = useFetchData<SingleDiscountResponse>({
          url: `${server}/api/v1/payment/coupon/${id}?id=${user?._id}`,"key": "all-coupons",  
            dependencyProps: [user?._id!,id!],
        });

    const [code,setCode] = useState("");
    const [amount,setAmount] = useState(0);

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {

        e.preventDefault(); 
        // Handle form submission logic here
        setIsBtnLoading(true);
        try {
            const {data} = await axios.put(`${server}/api/v1/payment/coupon/${id}?id=${user?._id}`,{
                code,
                amount,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );

            if(data.success) {
                setAmount(0);
                setCode("");
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }finally {
            setIsBtnLoading(false);
        }
    }

    useEffect(()=>{
        if(data){
            setCode(data.coupons[0].code);
            setAmount(data.coupons[0].amount);
        }
    },[data]);

    const deleteHandler = () => {
        // Handle delete logic here
    }   
  return (
     <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20}/>
        ) : (<>
                    <article>
                      <button className="product-delete-btn" onClick={deleteHandler}>
                        <FaTrash/>
                      </button>
                      <form onSubmit={submitHandler}>
                        <h2>Manage</h2>
                        <div>
                          <label>Name</label>
                          <input
                            type="text"
                            placeholder="Coupon Code"
                            value={code}
                            onChange={(e)=> setCode(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Amount</label>
                          <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                          />
                        </div>        
                        <button disabled={btnLoading} type="submit">Update</button>
                      </form>
                    </article>
        </>)}
      </main>
        </div>
  )
}

export default DiscountManagement