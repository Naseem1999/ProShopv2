import { LinkContainer } from "react-router-bootstrap"
import { Table,Button,Row,Col } from "react-bootstrap"
import { FaEdit,FaTrash } from "react-icons/fa"
import Message from "../../Components/Message"
import Loader from "../../Components/Loader"
import { useCreateProductMutation, useGetproductsQuery ,useDeleteProductMutation} from "../../slices/productApiSlice"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Paginate from "../Paginate"


const ProductListScreen = () => {
    const {pageNumber,}=useParams();
    const {data,isLoading,error,refetch}=useGetproductsQuery({pageNumber});
    const [createProduct,{isLoading:LoadingCreate}]=useCreateProductMutation();
    const [deleteProduct,{isLoading:loadingDelete}]=useDeleteProductMutation();

    const deleteHandler=async(id)=>{
        if(window.confirm("Are you Sure")){
            try {
                await deleteProduct(id);
                toast.success("product deleted");
                refetch();
            } catch (err) {
               toast.error(err?.data?.message ||err.error);
            }
            }
        

    }
    const createProductHandler=async()=>{
        if(window.confirm("Are you sure you want create a new product")){
            try {
                const res=await createProduct();
                console.log(res)
                refetch();
            } catch (err) {
                toast.error(err?.data?.message  || err.error);
            }
        }
    }

  return (
    <div className="container">
        <Row className="align-items-center">
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createProductHandler}>
                <FaEdit/>Create Product
            </Button>
            </Col>
        </Row>
        {LoadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}
        {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
        (
            <>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.products.map((product)=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm mx-2">
                                        <FaEdit/>
                                    </Button>
                                    </LinkContainer>
                                    <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={()=>deleteHandler(product._id)}>
                                        <FaTrash style={{color:'white'}}/>
                                    </Button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Paginate page={data.page} pages={data.pages} isAdmin={true}/>
            </>
        )
        }
    </div>
  )
}

export default ProductListScreen