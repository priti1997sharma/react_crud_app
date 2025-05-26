import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

function DeleteProduct() {
    const navigate = useNavigate();
    const {id: product_id} = useParams(); // { id : 1}

    const [input, setInput] = useState({
      title: '',
      category: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
    })
  
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState('')


    useEffect( () => {
        const getProductDetail = async (event) => {
          try {      
            
            const response = await axios.get(
              `https://dummyjson.com/products/${product_id}`
            )
              
              if(response.status === 200){
                // Go to the detail page
                console.log(" Delete Product");
              }
              console.log(response);
              setInput((obj) => {
                console.log(obj);
                return {
                  ...obj,            
                  ...response.data
                }
          
              })
              
            
          } catch (err) {
            console.log({err});
            setErr(err)
          } finally {
            setLoading(false)
          }
        }
        getProductDetail();
      },[]);
  
    const handleChange = (e) => {
      setInput((obj) => {
        console.log(obj);
        return {
          ...obj,
          [e.target.name] :e.target.value
        }
  
      })
    }
    
    const handleSubmit = async (event) => {
      try {      
        event.preventDefault();
        const body = {
          title: input.title,
          category: input.category,
          price: input.price,
          discountPercentage: input.discountPercentage,
          rating: input.rating,
          stock: input.stock,
        };
        const response = await axios.delete(
            `https://dummyjson.com/products/${product_id}`,
          )
          
        
          
          if(response.status === 200 && response.data.id){
            // Go to the detail page
            console.log("Product is Deleted Successfully");
            // Goto Detail page.
            // navigate("/ProductDetail/" + response.data.id);
            navigate("/");
  
          }
          console.log(response);
        
      } catch (err) {
        console.log({err});
        setErr(err)
      } finally {
        setLoading(false)
      }
    }
  
    if (loading) return <p>Loading...</p>
  
    if (err) return <p>Error: {err.message}</p>
  
    return (
      <div>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="input" name="title" value={input?.title} onChange={handleChange} />
          </div>
  
          <div>
            <label>Category:</label>
            <input
              type="input"
              name="category"
              value={input?.category}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <label>Price:</label>
            <input type="number" name="price" value={input?.price} onChange={handleChange} />
          </div>
  
          <div>
            <label>DiscountPercentage:</label>
            <input
              type="number"
              name="discountPercentage"
              value={input?.discountPercentage}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <label>Rating:</label>
            <input type="number" 
            name="rating" 
            value={input?.rating} 
            onChange={handleChange} />
          </div>
  
          <div>
            <label>Stock:</label>
            <input type="number" 
            name="stock" 
            value={input?.stock} 
            onChange={handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default DeleteProduct