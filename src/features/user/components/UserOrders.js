import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { Navigate } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserOrderAsync(user.id));
    } else {
      <Navigate to="/login" />;
    }
  }, [dispatch, user]);
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-500";
      case "dispatched":
        return "bg-yellow-700";
      case "delivered":
        return "bg-green-700";
      case "cancelled":
        return "bg-red-600";
      default:
        return "bg-purple-500";
    }
  };
  return (
    <>
      {/* {!orders.length && <Navigate to="/" />} */}
      {orders?.map((order) => (
        <div key={order.id}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border shadow-lg  mt-6">
            <h2 className="text-4xl font-bold mx-auto max-w-7xl py-4 sm:px-0 lg:px-0">
              My Order # {order.id}
            </h2>
            <p className="pb-4 text-red-900 text-2xl font-bold">
              Order Status:{" "}
              <span
                className={`px-2.5 capitalize py-1 ${chooseColor(
                  order.status
                )} text-white rounded-lg`}
              >
                {order.status}
              </span>
            </p>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order?.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">$ {discountedPrice(item)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-2 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qnty {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex py-2 justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {order?.totalAmount}</p>
              </div>
              <div className="flex py-2 justify-between text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order?.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address</p>
              <div className="pt-1.5">
                <ul role="list" className="divide-y divide-gray-100">
                  {/* {order?.selectedAddress &&
                      order?.selectedAddress.map((address, index) => ( */}
                  <li
                    // key={index}
                    className="md:flex justify-between gap-x-6 py-2 border border-gray-200 p-2 rounded-sm"
                  >
                    <div className="flex gap-x-4 items-start">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order?.selectedAddress?.name}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {order?.selectedAddress?.email}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {order?.selectedAddress?.street}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {order?.selectedAddress?.pinCode}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {order?.selectedAddress?.state}
                        </p>
                      </div>
                    </div>
                    <div className="md:text-end">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Phone: {order?.selectedAddress?.phone}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        {order?.selectedAddress?.city}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserOrders;
