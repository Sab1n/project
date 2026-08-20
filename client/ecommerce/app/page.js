'use client'

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { getProduct } from "./services/productServices"

export default function Homepage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['homepageproduct'],
    queryFn: getProduct
  })

  const products = data?.a || data || []
  console.log(products)

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shop the Latest Collection
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-xl">
              Quality products, unbeatable prices, and fast delivery — everything you need in one place.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <Link
                href="/shop"
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Shop Now
              </Link>
              <Link
                href="./product"
                className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
              >
                Browse All Products
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="aspect-square bg-gray-800 rounded-2xl flex items-center justify-center">
              <span className="text-gray-500">Hero Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-gray-900">Free Shipping</h3>
            <p className="text-sm text-gray-500 mt-1">On orders over Rs 5000</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Easy Returns</h3>
            <p className="text-sm text-gray-500 mt-1">30-day return policy</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Secure Checkout</h3>
            <p className="text-sm text-gray-500 mt-1">100% protected payments</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link href="./product" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            View all →
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded mt-3 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500 py-10">
            Failed to load products. Please try again later.
          </p>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products available right now.
          </p>
        )}

        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products?.slice(0, 8).map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="group"
              >
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  {product.picture ? (
                    <img
                      src={product.picture}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Rs {product.sellingPrice}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      

    </div>
  )
}