import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import AdminSidebar from "../../components/AdminSidebar"
import { useSelector } from "react-redux";
import type { UserReducerInitialState } from "../../types/reducer-types";
import { useNavigate, useParams, type NavigateFunction } from "react-router-dom";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../redux/api/productAPI";
import { server } from "../../redux/store";
import { Skeleton } from "../../components/loader";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { MessageResponse } from "../../types/api-types";
import { reponseToast } from "../../utils/feature";
import { FaTrash } from "react-icons/fa6";

const img = "/src/assets/NIKE+QUEST+6.png";

const ProductManagement = () => {

        const { user } = useSelector(
          (state: { userReducer: UserReducerInitialState }) => state.userReducer
        );

        const params = useParams();
        const navigate = useNavigate();
        
        const { data,isLoading} = useProductDetailsQuery(params.id!);
        const {price,photo,name,stock,category} = data?.product || {_id:"",photo:"", category:"",name:"",stock:0,price:0};


        const [nameUpdate, setNameUpdate] = useState<string>(name);
        const [priceUpdate, setPriceUpdate] = useState<number>(price);
        const [stockUpdate, setStockUpdate] = useState<number>(stock);
        const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
        const [photoUpdate, setPhotoUpdate] = useState<string>("");
        const [photoFile, setPhotoFile] = useState<File>();

        const[updateProduct] = useUpdateProductMutation();
        const[deleteProduct] = useDeleteProductMutation();

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if(typeof reader.result === "string") 
                  setPhotoUpdate(reader.result);
                  setPhotoFile(file);
            };
        }
    };

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData();

      if (nameUpdate) formData.set("name", nameUpdate);
      if (priceUpdate) formData.set("price", priceUpdate.toString());
      if (stockUpdate !== undefined)
        formData.set("stock", stockUpdate.toString());
      if (photoFile) formData.set("photo", photoFile);
      if (categoryUpdate) formData.set("category", categoryUpdate);

      const res = await updateProduct({
        formData,
        userId: user?._id!,
        productId: data?.product._id!,
      })

      reponseToast(res,navigate,"/admin/product");
      
    };

    const deleteHandler = async() => {

      const res = await deleteProduct({
        userId: user?._id!,
        productId: data?.product._id!,
      })

      reponseToast(res,navigate,"/admin/product");
      
    };

    useEffect(() => {
      if(data){
        setNameUpdate(data.product.name);
        setPriceUpdate(data.product.price);
        setStockUpdate(data.product.stock);
        setCategoryUpdate(data.product.category);
        //setPhotoUpdate(data.product.photo);

      }
    },[data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20}/>
        ) : (
          <>
            <section>
              <strong>ID - {data?.product._id}</strong>
              <img src={`${server}/${photo}`} alt="product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red">Not Available</span>
              )}
              <h2>₹{price}</h2>
            </section>
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
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="Category"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photoUpdate && <img src={photoUpdate} alt="New Image" />}

                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
}

export default ProductManagement

