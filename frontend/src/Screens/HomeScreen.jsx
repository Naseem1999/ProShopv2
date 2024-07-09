import React ,{useState,useEffect} from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    const fetchProducts=async()=>{
      const {data}=await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  },[])
  return (
    <div className='m-3'>
    <h1>Latest products</h1>
    <Row >
            {products.map((product)=>{
            return    <Col key={product._id} sm={12} md={6} xl={3}>
                 <Product product={product}/>
                </Col>
            })}
    </Row>
    </div>
  )
}

export default HomeScreen