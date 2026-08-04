"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addProduct, getProduct } from "../../services/productServices";

export default function AddProduct() {

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    desc: z.string().min(6, { message: "Description is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    costPrice: z.number().min(0, { message: "Cost price must be at least 0" }),
    sellingPrice: z.number().min(0, { message: "Selling price must be at least 0" }),
    stock: z.number().min(1, { message: "Stock should be more than 0" }),
    discount: z.number().min(0).max(100, { message: "Discount must be between 0 and 100" }).optional(),
    picture: z.custom((value) => {
                if (typeof window === 'undefined' || !(value instanceof FileList)) {
                    return false;
                }
                const files = Array.from(value);
                if (files.length === 0) {
                    return false;
                }
                const file = files[0];
                return (
                    file.size <= 5 * 1024 * 1024 && 
                    ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) 
                );
            }, { message: 'Please upload a valid picture (JPEG, PNG, GIF) less than 5MB' })
  })

  const {register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {discount: 0}
  });


  const {data,isLoading,isError} = useQuery({
    queryKey:['product'],
    queryFn:getProduct
  })
  console.log('get bata ako products hai',data)
  console.log(typeof data)

  const productMutation = useMutation({
    mutationFn: (data) => addProduct(data),
    onSuccess: (data) => {
      console.log('Product added successfully',data);
      reset()
    },
    onError: (error) =>{
      console.error('Error adding product', error)
    }
  })

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function onSubmit(data) {
    const cleanData = {...data,
     slug: slugify(data.slug)
    }
    productMutation.mutate(cleanData)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-200 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-indigo-400/70">
            Inventory / New Entry
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            Add Product
          </h2>
        </div>

        <form
          action={handleSubmit(onSubmit)}
          className="rounded-xl border border-white/[0.06] bg-[#1E2333] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Name
              </label>
              <input type="text"
                placeholder="Enter Product's Name"
                {...register('name')}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.name && <span className="mt-1.5 block text-xs text-red-400">{errors.name.message}</span>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Description
              </label>
              <input type="text"
                placeholder="Enter  Product's Description"
                {...register('desc')}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.desc && <span className="mt-1.5 block text-xs text-red-400">{errors.desc.message}</span>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Slug
              </label>
              <input type="text"
                placeholder="Enter Product's Slug"
                {...register('slug')}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 font-['JetBrains_Mono'] text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.slug && <span className="mt-1.5 block text-xs text-red-400">{errors.slug.message}</span>}
            </div>

            <div>
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Cost Price
              </label>
              <input type="number"
                placeholder="Enter Product's Cost Price"
                {...register('costPrice',{valueAsNumber:true})}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 font-['JetBrains_Mono'] text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.costPrice && <span className="mt-1.5 block text-xs text-red-400">{errors.costPrice.message}</span>}
            </div>

            <div>
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Selling Price
              </label>
              <input type="number"
                placeholder="Enter Product's Selling Price"
                {...register('sellingPrice',{valueAsNumber:true})}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 font-['JetBrains_Mono'] text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.sellingPrice && <span className="mt-1.5 block text-xs text-red-400">{errors.sellingPrice.message}</span>}
            </div>

            <div>
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Discount %
              </label>
              <input type="number"
                placeholder="Enter Product's Discount Price"
                {...register('discount',{valueAsNumber:true})}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 font-['JetBrains_Mono'] text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.discount && <span className="mt-1.5 block text-xs text-red-400">{errors.discount.message}</span>}
            </div>

            <div>
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Stock
              </label>
              <input type="number"
                placeholder="Enter Product's Stock"
                {...register('stock',{valueAsNumber:true})}
                className="w-full rounded-lg border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 font-['JetBrains_Mono'] text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.discount && <span className="mt-1.5 block text-xs text-red-400">{errors.discount.message}</span>}
            </div>

            <div>
              <label className="mb-1.5 block font-['JetBrains_Mono'] text-xs text-slate-400">
                Picture
              </label>
              <input type="file"
                accept='image/*'
                {...register('picture')}
                className="w-full rounded-lg border border-dashed border-white/[0.12] bg-[#0D1117] px-3.5 py-2.5 text-sm text-slate-400 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-indigo-500/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-indigo-300 hover:file:bg-indigo-500/25 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.picture && <span className="mt-1.5 block text-xs text-red-400">{errors.picture.message}</span>}
            </div>

            
          </div>

          <button type="submit"
            disabled={productMutation.isPending}
            className="mt-7 w-full rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_-6px_rgba(99,102,241,0.6)] transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8">
            {productMutation.isPending ? 'Adding…' : 'Add Product'}
          </button>
        </form>

        <div className="mt-10">
          {isLoading && (
            <p className="font-['JetBrains_Mono'] text-xs text-slate-500">Loading products…</p>
          )}
          {isError && (
            <p className="font-['JetBrains_Mono'] text-xs text-red-400">Failed to load products.</p>
          )}

          <div className="flex flex-col gap-3">
            {data?.a?.map((item)=>(
              <div
                key={item.slug ?? item.name}
                className="group flex items-center gap-4 rounded-lg border border-white/[0.06] border-l-2 border-l-transparent bg-[#1E2333] p-4 transition hover:border-l-indigo-400 hover:shadow-[-8px_0_20px_-12px_rgba(99,102,241,0.5)]"
              >
                <img src={item.picture} className="h-14 w-14 flex-shrink-0 rounded-md object-cover ring-1 ring-white/[0.08]" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate text-sm font-medium text-slate-100">{item.name}</span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-slate-500">by {item.admin.name}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-400">{item.desc}</p>
                </div>

                <div className="flex flex-shrink-0 items-center gap-4 font-['JetBrains_Mono'] text-xs">
                  <div className="text-right">
                    <div className="text-slate-500">cost</div>
                    <div className="text-slate-200">{item.costPrice}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500">price</div>
                    <div className="text-slate-200">{item.sellingPrice}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500">discount</div>
                    <div className="text-emerald-400">{item.sellingPrice * (item.discount/100)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500">stock</div>
                    <div className="text-emerald-400">{item.stock}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}