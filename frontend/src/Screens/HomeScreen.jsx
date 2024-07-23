import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useGetproductsQuery } from '../slices/productApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
const HomeScreen = () => {
const {data:products ,isLoading,error}=useGetproductsQuery();

  return (
    <div className='m-3 '>

      {isLoading ? (
        <Loader/>
      ) :error ?  (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
        <h1>Latest products</h1>
        <Row >
                {products.map((product)=>{
                return    <Col key={product._id} sm={12} md={6} xl={3}>
                     <Product product={product}/>
                    </Col>
                })}
        </Row>
        </>
      )}
    
    </div>
  )
}

export default HomeScreen