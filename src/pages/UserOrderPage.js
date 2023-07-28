import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

const UserOrderPage = () => {
  return (
    <Navbar>
        <h2 className="text-3xl mx-auto max-w-7xl py-2 sm:px-0 lg:px-0">
            My Orders
          </h2>
        <UserOrders/>
    </Navbar>
  )
}

export default UserOrderPage