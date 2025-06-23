import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${params.productId}`,
        newProduct
      );
    },
  });

  const fetchProduct = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${params.productId}`
    ).then((res) => res.json());
    return response;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: fetchProduct,
    staleTime: 10000, // 10 seconds
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin" size={48} color="gray" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (mutation.isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin" size={48} color="gray" />
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold text-red-500">
        Error: {mutation.error.message}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center py-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
          onClick={() => {
            mutation.mutate({ title: "Update Product" });
          }}
        >
          Update Product
        </button>
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
          {/* Product Image Section */}
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="max-h-96 object-contain rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            />
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product?.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product?.description}
            </p>

            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold text-indigo-700">
                ${product?.price.toFixed(2)}
              </span>
              {product?.discountPercentage > 0 && (
                <>
                  <span className="ml-4 text-xl text-red-500 line-through">
                    $
                    {(
                      product?.price /
                      (1 - product?.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="ml-3 text-xl text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                    {product?.discountPercentage}% off
                  </span>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">Brand:</span>
                <span className="text-gray-600">{product?.brand}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Category:
                </span>
                <span className="text-gray-600">{product?.category}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Rating:
                </span>
                <span className="text-yellow-500 font-bold">
                  {product?.rating}
                </span>
                <span className="text-gray-500 ml-1">
                  ({product?.reviews.length} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Availability:
                </span>
                <span
                  className={`font-bold ${
                    product?.availabilityStatus === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product?.availabilityStatus}
                </span>
                <span className="ml-1 text-gray-600">
                  ({product?.stock} in stock)
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Shipping:
                </span>
                <span className="text-gray-600">
                  {product?.shippingInformation}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                  Warranty:
                </span>
                <span className="text-gray-600">
                  {product?.warrantyInformation}
                </span>
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
