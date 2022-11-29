import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { GobalState } from "../../../GobalState";
import Loading from "../loading/Loading"
import { useNavigate,useParams } from "react-router-dom";
const CreateProduct = () => {
    const state = useContext(GobalState);
    const [token] = state.token;
    const [categories] = state.CategoryApi.categories;
    const [callback, setCallback] = state.ProductsApi.callback;
    const data = {
        product_id:"",
        title:"",
        price:"",
        description:"Mô tả sản phẩm",
        contact:"Nội dung sản phẩm",
        category:"",
        _id:""
    };
    const [product,setProduct] = useState(data);
    const onChangeInput = (e) =>{
        const {name,value} = e.target;
        setProduct({...product,[name]:value})
    };
    const [loading,setLoading] = useState(false);
    const [images,setImage] = useState(false);
    const upload =  {
        display:images ? "block":"none"
    };
    const [isAdmin] = state.UserApi.isAdmin;
    const updateInput = async (e) =>{
        e.preventDefault();
        try {
            !isAdmin && alert("You're not an admin");
            const file = e.target.files[0];
            if(!file){
                return alert("File not exist")
            }
            if(file.size>1024*1024){
                return alert("Size too large") 
            }
            if(file.type !== "image/jpeg" && file.type !== "image/png"){
                return alert("File format is incorrect")
            }
            let formData = new FormData();
            formData.append("file",file);
            setLoading(true)
            const res = await axios.post("/api/upload",formData,{
                headers: {
                    "Content-Type" : "multipart/form-data",
                    Authorization:  token},
            })
            setImage(res.data)
            setLoading(false);
        }catch(error){
            alert(error.response.data.msg);
        }
    };
    const navigate = useNavigate();
    const param=useParams();
    const [products] =state.ProductsApi.products;
    const [edit,setEdit] = useState(false);
    useEffect(() => {
        if(param.id){
            setEdit(true)
            products.forEach((item)=>{
                if(item._id===param.id){
                    setProduct(item);
                    setImage(item.images)
                }
            })
        }else{
            setEdit(false);
            setProduct(data);
            setImage(false);
        }
    },[param.id,products]);
    const deleteInput = async () =>{
       try {
            !isAdmin && alert("You're not an admin");
            setLoading(true)
                await axios.post("/api/destroy",{public_id : images.public_id},{
                    headers: {
                        Authorization:  token},
                })
                setCallback(!callback);
                setLoading(false);
                setImage(false);
        } catch (error) {
            alert(error.response.data.msg);
       }
    };
    const onSubmitProduct = async (e) =>{
        e.preventDefault();
        try {
            !isAdmin && alert("You're not an admin");  
            if(!images){
                return alert("No image upload")
            }  
            if(edit){
                await axios.put(`/api/product/${product._id}`, {...product,images}, {headers: {Authorization: token}}) 
            }else{
                await axios.post("/api/product", {...product,images}, {headers: {Authorization: token}})
            setImage(false);
            }
           
            setImage(false);
            setProduct(data);
            setCallback(!callback);
            navigate("/");
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    return (
            <div className="create__product">
                <div className="upload">
                    <input type="file" onChange={updateInput} />
                    {loading?( <div className="loading" ><Loading/></div>) : 
                    (<>
                    <img style={upload} src={images?images.url:""}
                    // Nếu image == false thì sẽ ra ""
                    //Nếu image bằng true thì sẽ ra đường dẫn
                    alt="" />
                    <span style={upload} onClick={deleteInput} >X</span>
                    </>)}
                </div>
            <form onSubmit={onSubmitProduct}>
                <div className="row">
                    <lable >
                        Product ID
                        <input type="text" value={product.product_id}
                        name="product_id"
                        onChange={onChangeInput}
                        disabled={edit}
                        />
                    </lable>
                </div>
                <div className="row">
                    <lable >
                        Title
                        <input type="text" value={product.title}
                        name="title"
                        onChange={onChangeInput}
                        />
                    </lable>
                </div>
                <div className="row">
                    <lable >
                        Price
                        <input type="number" value={product.price}
                        name="price"
                        onChange={onChangeInput}
                        />
                    </lable>
                </div>
                <div className="row">
                    <lable >
                        Description
                        <textarea name="description" 
                        value={product.description}
                        onChange={onChangeInput}
                        ></textarea>
                    </lable>
                </div>
                <div className="row">
                    <lable >
                        Contact
                        <textarea name="contact" 
                        value={product.contact}
                        onChange={onChangeInput}
                        ></textarea>
                    </lable>
                </div>
                <div className="row">
                    <lable >
                        Category
                        <select
                            name="categories" 
                            value={product.categories}
                            onChange={onChangeInput}>
                        <option value="">Select a category</option>
                            {categories.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </lable>
                </div>
                <button>{edit ? "Upload":"Create"}</button>
            </form>
        </div>
    )
};

export default CreateProduct;


