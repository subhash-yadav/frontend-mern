import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../app/constants";

function ProductGrid({ products }) {
    return (
      <>
        {/* Product grid start*/}
        <div className="lg:col-span-3">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id}>
                    <Link to={`/product-detail/${product.id}`} key={product.id}>
                      <div className="group relative border border-1 border-gray-200 p-2 rounded-md">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between items-center gap-4">
                          <div>
                            <div className="text-sm text-gray-700 ">
                              <h3 href={product.thumbnail}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 "
                                />
                                {product.title}
                              </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 flex justify-start gap-3 items-center">
                              <StarIcon className="w-6 h-6" /> {product.rating}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              <span className=" line-through text-gray-400">
                                $ {product.price}
                              </span>{" "}
                              - <span>{product.discountPercentage}%</span>
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                            $
                            {
                              discountedPrice(product)
                            }
                          </p>
                          </div>
                        </div>
                        {product.deleted && (
                          <p className="text-red-500 text-sm">product deleted</p>
                        )}
                      </div>
                    </Link>
                    <div>
                      <Link
                        to={`/admin/product-form/edit/${product.id}`}
                        className="border block w-full cursor-pointer text-center rounded bg-teal-800 text-white text-xl py-1 mt-1 hover:bg-teal-600 hover:duration-300 ease-in-out"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Product grid end*/}
      </>
    );
  }
  export default ProductGrid