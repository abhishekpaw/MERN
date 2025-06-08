import { useState, type ChangeEvent, type FormEvent } from "react"
import AdminSidebar from "../../components/AdminSidebar"
import { useSelector } from "react-redux";
import { useNewProductMutation } from "../../redux/api/productAPI";
import type { UserReducerInitialState } from "../../types/reducer-types";
import { reponseToast } from "../../utils/feature";
import { useNavigate } from "react-router-dom";
import { useFileHandler } from "6pp";

const NewProduct = () => {
    const { user} = useSelector((state: { userReducer: UserReducerInitialState}) => state.userReducer);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [name,setName] = useState<string>("");
    const [price,setPrice] = useState<number>();
    const [stock,setStock] = useState<number>();
    const [category,setCategory] = useState<string>("");
    const [description,setDescription] = useState<string>("");


    const [newProduct] = useNewProductMutation();
    const navigate = useNavigate();

    const photos = useFileHandler("multiple",10,5);

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
          if (!name || !price || !stock || !category || stock < 0) return;

          if (!photos.file || photos.file.length === 0) return;

          const formData = new FormData();

          formData.set("name", name);
          formData.set("description", description);
          formData.set("price", price.toString());
          formData.set("stock", stock.toString());
          //formData.set("photo",photo);
          formData.set("category", category);

          photos.file.forEach((file) => {
            formData.append("photos", file);
          });
          const res = await newProduct({ id: user?._id!, formData });

          reponseToast(res, navigate, "/admin/product");
        } catch (error) {
            console.error("Error creating product:", error);
            setIsLoading(false);
        }finally {
            setIsLoading(false);
        }

    }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop,camera etc."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                accept="image/*"
                multiple
                onChange={photos.changeHandler}
              />
            </div>

            {photos.error && <p className="error">{photos.error}</p>}
            {photos.preview &&
              photos.preview.map((img, i) => (
                <img key={i} src={img} alt={`Preview ${i + 1}`} />
              ))}
            <button disabled={isLoading} type="submit">
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
}

export default NewProduct