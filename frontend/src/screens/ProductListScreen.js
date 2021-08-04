import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);

  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
      // dispatch(listProducts('',pageNumber));
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    createdProduct,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
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
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>

                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
