import { Row,Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { useGetproductsQuery } from '../slices/productApiSlice'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from './Paginate'
import ProductCarousel from '../Components/ProductCarousel'
const HomeScreen = () => {
  const {pageNumber,keyword}=useParams();
const {data ,isLoading,error}=useGetproductsQuery({keyword,pageNumber});

  return (

    <div className='m-3 '>
      {!keyword ? <ProductCarousel/> : (
        <Link to='/' className='btn btn-light mb-4'>
           Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader/>
      ) :error ?  (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
        <h1>Latest products</h1>
        <Row >
                {data.products.map((product)=>{
                return    <Col key={product._id} sm={12} md={6} xl={3}>
                     <Product product={product}/>
                    </Col>
                })}
        </Row>
        <Paginate page={data.page} pages={data.pages} keyword={keyword ? keyword : ''}/>
        </>
      )}
    
    </div>
  )
}

export default HomeScreen