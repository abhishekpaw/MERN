import { useFileHandler } from "6pp";
import { useEffect, useState, type FormEvent } from "react";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { Skeleton } from "../../components/loader";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../redux/api/productAPI";
import type { UserReducerInitialState } from "../../types/reducer-types";
import { reponseToast } from "../../utils/feature";


const ProductManagement = () => {

        const { user } = useSelector(
          (state: { userReducer: UserReducerInitialState }) => state.userReducer
        );

        const params = useParams();
        const navigate = useNavigate();
        
        const { data,isLoading,isError} = useProductDetailsQuery(params.id!);
        const {price,photos,name,stock,category,description} = data?.product || {photos:[], category:"",name:"",stock:0,price:0, description:""};

        const [btnloading, setBtnLoading] = useState<boolean>(false);
        const [nameUpdate, setNameUpdate] = useState<string>(name);
        const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
        const [priceUpdate, setPriceUpdate] = useState<number>(price);
        const [stockUpdate, setStockUpdate] = useState<number>(stock);
        const [categoryUpdate, setCategoryUpdate] = useState<string>(category);


        const[updateProduct] = useUpdateProductMutation();
        const[deleteProduct] = useDeleteProductMutation();

        const photosFile = useFileHandler("multiple", 10, 5);
    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setBtnLoading(true);

      try {
        const formData = new FormData();

        if (nameUpdate) formData.set("name", nameUpdate);
        if (descriptionUpdate) formData.set("description", descriptionUpdate);
        if (priceUpdate) formData.set("price", priceUpdate.toString());
        if (stockUpdate !== undefined)
          formData.set("stock", stockUpdate.toString());
        if (photosFile.file && photosFile.file.length > 0) {
          photosFile.file.forEach((file) => {
            formData.append("photos", file);
          });
        }
        if (categoryUpdate) formData.set("category", categoryUpdate);

        const res = await updateProduct({
          formData,
          userId: user?._id!,
          productId: data?.product._id!,
        });

        reponseToast(res, navigate, "/admin/product");
      } catch (error) {
        console.error("Error updating product:", error);
        setBtnLoading(false);
      } finally {
        setBtnLoading(false);
      }
      
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
        setDescriptionUpdate(data.product.description);
        //setPhotoUpdate(data.product.photo);

      }
    },[data]);

    if(isError) return <Navigate to={"/404"}/>;

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
              <img src={photos?.[0]?.url} alt="product" />
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
                  <label>Description</label>
                  <textarea
                    placeholder="Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
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
                  <label>Photos</label>
                  <input type="file" accept="image/*" multiple onChange={photosFile.changeHandler} />
                </div>

                {photosFile.error && (
                  <p className="error">{photosFile.error}</p>
                )}
                
                {photosFile.preview && <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
                  {photosFile.preview.map((img, i) => (
                  <img
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                    key={i}
                    src={img}
                    alt="New Image"/>
                ))}</div>}


                <button disabled={btnloading} type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
}

export default ProductManagement

