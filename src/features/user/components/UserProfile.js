import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserAsync } from "../../auth/authSlice";
import { updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { selectUserInfo } from "../userSlice";
const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newAddress, setNewAddress] = useState(false);
  const handleNewAddress = () =>{
    setNewAddress(!newAddress)
    setSelectedEditIndex(-1)
  }
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const handleEditForm = (e, index) => {
    setSelectedEditIndex(index);
    const address = user.address[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, address: [...user.address] }; // for shallow copy issue;
    newUser.address.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, address: [...user.address] }; // for shallow copy issue;
    newUser.address.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  return (
    <>
      {/* {!orders.length && <Navigate to="/" />} */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border shadow-lg  mt-6">
        <h2 className="text-4xl font-bold mx-auto max-w-7xl py-4 sm:px-0 lg:px-0">
          Name: {user.name ? user.name : "New User"}
        </h2>
        <p className="pb-4 text-red-900 text-2xl font-bold">
          Email: {user.email}
        </p>

        <div className="border-b border-gray-900/10 pb-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Your Address
            </h2>
          </div>
          <div className="py-8">
            <button
              onClick={handleNewAddress}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>
            {newAddress && (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      ...user,
                      address: [...user.address, data],
                    })
                  );
                  reset();
                })}
                className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white px-5 py-4"
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-3xl font-semibold leading-7 text-gray-900 pt-2">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 border-b">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <span className="text-red-500 text-base">
                              *{errors.name.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email required",
                              pattern: {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                message: "email not valid",
                              },
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <span className="text-red-500 text-base">
                              *{errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone Number required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.phone && (
                            <span className="text-red-500 text-base">
                              *{errors.phone.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "Street address is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.street && (
                            <span className="text-red-500 text-base">
                              *{errors.street.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <span className="text-red-500 text-base">
                              *{errors.city.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state/province is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && (
                            <span className="text-red-500 text-base">
                              *{errors.state.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode")}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="divide-y divide-gray-100">
            {user.address &&
              user.address.map((address, index) => (
                <div key={index}>
                  <div className="py-4 border-t">
                    <div className="py-4">
                      {selectedEditIndex === index && (
                        <form
                          noValidate
                          onSubmit={handleSubmit((data) => {
                            handleEdit(data, index);
                            reset();
                          })}
                          className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white px-5 py-12"
                        >
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <h2 className="text-3xl font-semibold leading-7 text-gray-900 pt-4">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600 border-b">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Full name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("name", {
                                        required: "name is required",
                                      })}
                                      id="name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.name && (
                                      <span className="text-red-500 text-base">
                                        *{errors.name.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="email"
                                      {...register("email", {
                                        required: "email required",
                                        pattern: {
                                          value:
                                            /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                          message: "email not valid",
                                        },
                                      })}
                                      type="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && (
                                      <span className="text-red-500 text-base">
                                        *{errors.email.message}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="phone"
                                      {...register("phone", {
                                        required: "phone Number required",
                                      })}
                                      type="tel"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.phone && (
                                      <span className="text-red-500 text-base">
                                        *{errors.phone.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="street"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Street address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("street", {
                                        required: "Street address is required",
                                      })}
                                      id="street"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.street && (
                                      <span className="text-red-500 text-base">
                                        *{errors.street.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    City
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("city", {
                                        required: "city is required",
                                      })}
                                      id="city"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.city && (
                                      <span className="text-red-500 text-base">
                                        *{errors.city.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="state"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    State / Province
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("state", {
                                        required: "state/province is required",
                                      })}
                                      id="state"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.state && (
                                      <span className="text-red-500 text-base">
                                        *{errors.state.message}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="pinCode"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      {...register("pinCode")}
                                      id="pinCode"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                onClick={() => setSelectedEditIndex(-1)}
                                type="button"
                                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit Address
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  <div
                    key={index}
                    className="md:flex justify-between gap-x-6 py-5 border border-gray-100 p-4 rounded-md mt-2"
                  >
                    <div className="flex gap-x-4 items-start">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {address.email}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          {address.state}
                        </p>
                      </div>
                    </div>
                    <div className="md:text-end">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 pt-3">
                      <button
                        type="button"
                        onClick={(e) => handleEditForm(e, index)}
                        className="rounded-md bg-[#2596be] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1b8bb4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Remove Address
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* recommended Address end */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
