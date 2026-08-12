'use client';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrder, sendStatus } from '../../services/orderServices';

export default function Order() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['order'],
        queryFn: getOrder,
    });

const statusMutation = useMutation({
    mutationFn: ({id, status})=> sendStatus({id, status}),
    onSuccess: () => {
        console.log('status updated successfully');
    },
    onError: (error) => {
        console.error('Error updating status:', error);
    }
})

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center font-mono text-slate-500 text-sm">
                Loading orders…
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center font-mono text-sm text-red-400">
                Error fetching orders
            </div>
        );
    }

    function changeStatus(id ,status){
        statusMutation.mutate({id, status})
        console.log(`Changing status of order ${id} to ${status}`);
    }

    const orders = data?.a || [];

    return (
        <div className="p-6 font-mono min-h-screen bg-[#05070d]">
            <h1 className="text-xl font-semibold text-slate-200 mb-6 tracking-tight">
                Orders
            </h1>

            {orders.length === 0 ? (
                <div className="border border-slate-800 rounded-xl p-10 text-center text-slate-500 text-sm bg-[#0a0e1a]">
                    No orders yet.
                </div>
            ) : (
                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#0a0e1a]">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                                <th className="px-4 py-3 font-normal">Order ID</th>
                                <th className="px-4 py-3 font-normal">Ordered By</th>
                                <th className="px-4 py-3 font-normal">Contact</th>
                                <th className="px-4 py-3 font-normal">Status</th>
                                <th className="px-4 py-3 font-normal">Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="group relative border-b border-slate-900 last:border-b-0 hover:bg-indigo-500/[0.04] transition-colors"
                                >
                                    <td className="px-4 py-3 align-top relative">
                                        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-indigo-400 group-hover:shadow-[0_0_8px_2px_rgba(129,140,248,0.6)] transition-all" />
                                        <span className="text-indigo-300">
                                            {order._id.slice(0, 8)}…
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-top text-slate-200">
                                        {order.name}
                                    </td>
                                    <td className="px-4 py-3 align-top text-slate-400">
                                        <div>{order.phone}</div>
                                        <div className="text-xs text-slate-500">{order.email}</div>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <div className="flex flex-col gap-1.5">
                                            <span className={`text-xs uppercase tracking-wide px-2.5 py-1 rounded-full border w-fit mb-1 font-medium ${
                                                order.status === 'delivered'
                                                    ? 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10'
                                                    : order.status === 'canceled'
                                                    ? 'text-red-400 border-red-400/40 bg-red-400/10'
                                                    : 'text-amber-400 border-amber-400/40 bg-amber-400/10'
                                            }`}>
                                                {order.status || 'pending'}
                                            </span>

                                            <button
                                                disabled={order.status === 'canceled'}
                                                className={`text-xs uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors ${
                                                    order.status === 'canceled'
                                                        ? 'text-slate-600 border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50'
                                                        : 'text-amber-400 border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20'
                                                }`}
                                                onClick={()=>changeStatus(order._id, 'pending')}
                                            >
                                                Pending
                                            </button>
                                            <button
                                                disabled={order.status === 'canceled'}
                                                className={`text-xs uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors ${
                                                    order.status === 'canceled'
                                                        ? 'text-slate-600 border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50'
                                                        : 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10 hover:bg-emerald-400/20'
                                                }`}
                                                onClick={()=>changeStatus(order._id, 'delivered')}
                                            >
                                                Delivered
                                            </button>
                                            <button
                                                disabled={order.status === 'canceled'}
                                                className={`text-xs uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors ${
                                                    order.status === 'canceled'
                                                        ? 'text-slate-600 border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50'
                                                        : 'text-red-400 border-red-400/40 bg-red-400/10 hover:bg-red-400/20'
                                                }`}
                                                onClick={()=>changeStatus(order._id, 'canceled')}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <div className="flex flex-col gap-2">
                                            {order.product.map((item) => (
                                                <div
                                                    key={item._id._id}
                                                    className="flex items-center gap-3"
                                                >
                                                    {item._id.picture ? (
                                                        <img
                                                            src={item._id.picture}
                                                            alt={item._id.name}
                                                            className="w-10 h-10 object-cover rounded-md border border-slate-800"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-md bg-slate-800" />
                                                    )}
                                                    <span className="text-slate-300">
                                                        {item._id.name}{" "}
                                                        <span className="text-slate-500">
                                                            x{item.quantity}
                                                        </span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}