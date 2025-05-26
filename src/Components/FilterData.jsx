import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function SearchTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const itemsPerPage = 10
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const skip = (pageCount - 1) * itemsPerPage
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${searchTerm}&skip=${skip}&limit=${itemsPerPage}`
        )

        setData(response.data.products)
        setTotal(response.data.total)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pageCount, itemsPerPage, searchTerm])

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageCount(newPage)
    }
  }

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductDelete = async (product_id) => {
    const response = await axios.delete(
      `https://dummyjson.com/products/${product_id}`,
      
    )
    if(response.status === 200){
    console.log("Product is Deleted Successfully");
    console.log(response)  
    navigate("/");
  }
}
 

  return (
    <>
      <div>
        <h2>Products Table</h2>

        <input
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"></input>

        <button onClick={() => navigate('/CreateProduct')}>Add Product</button>

        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount Percentage</th>
              <th>Rating</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.discountPercentage}%</td>
                  <td>{product.rating}</td>
                  <td>{product.stock}</td>
                  <td><Link to={"/ProductDetail/" + product.id} target="_blank">Detail</Link></td>
                  <td><Link to={"/UpdateProduct/" + product.id}>Edit</Link></td>

                 <td><button onClick={()=>{handleProductDelete(product.id)}}>Delete</button></td> 
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4"> No results found</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={() => handlePageChange(pageCount - 1)}
          disabled={pageCount === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={pageCount === page}>
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(pageCount + 1)}
          disabled={pageCount === totalPages}>
          Next
        </button>
      </div>
    </>
  )
}

export default SearchTable