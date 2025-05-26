import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function ProductDetail() {
  // TODO product_id should come from the url as query string
  // const product_id = 1;
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
            console.log("Product Detail");
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
  },[]); // To call it on mount

  if (loading) return <p>Loading...</p>

  if (err) return <p>Error: {err.message}</p>

  return (
    <div>
      <h2>Product Detail</h2>
      
        <div>
          <label>Title:</label>
          {input?.title}
        </div>

        <div>
          <label>Category:</label>
          {input?.category}
        </div>

        <div>
          <label>Price:</label>
          ${input?.price}
        </div>

        <div>
          <label>DiscountPercentage:</label>
          {input?.discountPercentage}
        </div>

        <div>
          <label>Rating:</label>
          {input?.rating}
        </div>

        <div>
          <label>Stock:</label>
          {input?.stock}
        </div>
        
      
    </div>
  )
}

export default ProductDetail