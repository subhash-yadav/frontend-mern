import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrder,
  updateOrderAsync,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
const AdminOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrder);

  const [sort, setSort] = useState({});
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const [page, setPage] = useState(1);
  const handlePage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
    //Server will filter the deleted products
  }, [dispatch, page, sort]);

  const handleShow = (order) => {};
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-100 text-purple-800";
      case "dispatched":
        return "bg-yellow-200 text-yellow-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-auto">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="h-5 w-5 inline ml-2" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5 inline ml-2" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th><th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      TotalAmount
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="h-5 w-5 inline ml-2" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5 inline ml-2" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order?.items.map((item, i) => (
                          <div key={i} className="flex items-center my-2">
                            <div className="mr-2">
                              <img
                                alt={item.product.title}
                                className="w-10 h-10 rounded-full object-cover"
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - $
                              {discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <p>${order.totalAmount}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-1 rounded">
                          <p>
                            <strong>{order.selectedAddress.name}</strong>
                          </p>
                          <p>{order.selectedAddress.email}</p>
                          <p>{order.selectedAddress.phone}</p>
                          <p>{order.selectedAddress.city}</p>
                          <p>{order.selectedAddress.street}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <strong
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-sm`}
                          >
                            {order.status}
                          </strong>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-between">
                          <div className="w-6 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon onClick={() => handleShow(order)} />
                          </div>
                          <div className="w-6 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon onClick={() => handleEdit(order)} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>
    </div>
  );
};

export default AdminOrder;
