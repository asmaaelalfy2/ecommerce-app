import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAllOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.orderListAll);

  //   const { loading, error, users } = userList;
  const { userInfo } = useSelector((state) => state.userLogin);
  //   const { success: successDeleted } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, listAllOrders]);

  //   const deleteHandler = (id) => {
  //     // console.log('delete');
  //     if (window.confirm(`Are U Sure?${userInfo.name}`)) {
  //       dispatch(deleteUser(id));
  //     }
  //   };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isPaid ? (
                    order.isPaid.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.isDelivered
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>{order.totalPrice}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}/`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
