'use client';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrder, sendStatus } from '../../services/orderServices';

function formatCoupon(coupon) {
    if (!coupon || !coupon.code) return null;
    const amount = coupon.type === '%' ? `${coupon.value}%` : `Rs ${coupon.value}`;
    return {
        code: coupon.code,
        amount
    };
}

export default function Order() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['order'],
        queryFn: getOrder,
    });
    console.log(data)

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) => sendStatus({ id, status }),
        onSuccess: () => {
            console.log('status updated successfully');
        },
        onError: (error) => {
            console.error('Error updating status:', error);
        }
    })

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center font-mono text-sm text-slate-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse mr-2" />
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

    function changeStatus(id, status) {
        statusMutation.mutate({ id, status })
        console.log(`Changing status of order ${id} to ${status}`);
    }

    const orders = data?.a || [];

    const statusStyles = {
        delivered: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
        canceled: 'text-red-400 border-red-400/40 bg-red-400/10',
        pending: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    };

    return (
        <div className="p-6 md:p-10 font-mono min-h-screen bg-[#05070d] bg-[radial-gradient(circle_at_15%_0%,rgba(99,102,241,0.08),transparent_45%)]">
            <div className="flex items-baseline justify-between mb-8 max-w-7xl mx-auto">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-400/70 mb-1">Dashboard</p>
                    <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
                        Orders
                    </h1>
                </div>
                <span className="text-xs text-slate-500 border border-slate-800 rounded-full px-3 py-1">
                    {orders.length} total
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="max-w-7xl mx-auto border border-slate-800 rounded-2xl p-14 text-center text-slate-500 text-sm bg-[#0a0e1a]">
                    No orders yet.
                </div>
            ) : (
                <div className="max-w-7xl mx-auto overflow-x-auto border border-slate-800/80 rounded-2xl bg-[#0a0e1a] shadow-[0_0_0_1px_rgba(99,102,241,0.03),0_20px_40px_-20px_rgba(0,0,0,0.6)]">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800/80">
                                <th className="px-5 py-4 font-medium">Order</th>
                                <th className="px-5 py-4 font-medium">Ordered By</th>
                                <th className="px-5 py-4 font-medium">Contact</th>
                                <th className="px-5 py-4 font-medium">Coupon</th>
                                <th className="px-5 py-4 font-medium text-right">Total</th>
                                <th className="px-5 py-4 font-medium">Status</th>
                                <th className="px-5 py-4 font-medium">Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const coupon = formatCoupon(order.coupon);
                                const status = order.status || 'pending';
                                return (
                                    <tr
                                        key={order._id}
                                        className="group relative border-b border-slate-900/80 last:border-b-0 hover:bg-indigo-500/[0.04] transition-colors"
                                    >
                                        <td className="px-5 py-4 align-top relative">
                                            <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-indigo-400 group-hover:shadow-[0_0_8px_2px_rgba(129,140,248,0.6)] transition-all" />
                                            <span className="text-indigo-300">
                                                {order._id.slice(0, 8)}…
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 align-top text-slate-200">
                                            {order.name}
                                        </td>

                                        <td className="px-5 py-4 align-top text-slate-400">
                                            <div>{order.phone}</div>
                                            <div className="text-xs text-slate-500">{order.email}</div>
                                        </td>

                                        <td className="px-5 py-4 align-top">
                                            {coupon ? (
                                                <div className="inline-flex flex-col gap-0.5">
                                                    <span className="text-xs font-medium text-violet-300 border border-violet-400/30 bg-violet-400/10 rounded-md px-2 py-0.5 w-fit tracking-wide">
                                                        {coupon.code}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500 pl-0.5">
                                                        −{coupon.amount}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-700">—</span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4 align-top text-right text-slate-200 tabular-nums">
                                            Rs {order.total}
                                        </td>

                                        <td className="px-5 py-4 align-top">
                                            <div className="flex flex-col gap-1.5">
                                                <span className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border w-fit mb-1 font-medium ${statusStyles[status] || statusStyles.pending}`}>
                                                    {status}
                                                </span>

                                                <div className="flex flex-wrap gap-1.5">
                                                    <button
                                                        disabled={status === 'canceled'}
                                                        className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors ${
                                                            status === 'canceled'
                                                                ? 'text-slate-600 border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50'
                                                                : 'text-amber-400 border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20'
                                                        }`}
                                                        onClick={() => changeStatus(order._id, 'pending')}
                                                    >
                                                        Pending
                                                    </button>
                                                    <button
                                                        disabled={status === 'canceled'}
                                                        className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors ${
                                                            status === 'canceled'
                                                                ? 'text-slate-600 border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50'
                                                                : 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10 hover:bg-emerald-400/20'
                                                        }`}
                                                        onClick={() => changeStatus(order._id, 'delivered')}
                                                    >
                                                        Delivered
                                                    </button>
                                                    <button
                                                        disabled={status === 'canceled'}
                                                        className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border transition-colors ${
                                                            status === 'canceled'
                                                                ? 'text-slate-600 border-slate-700 bg-slate-800/30 cursor-not-allowed opacity-50'
                                                                : 'text-red-400 border-red-400/40 bg-red-400/10 hover:bg-red-400/20'
                                                        }`}
                                                        onClick={() => changeStatus(order._id, 'canceled')}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 align-top">
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
                                                                className="w-9 h-9 object-cover rounded-md border border-slate-800"
                                                            />
                                                        ) : (
                                                            <div className="w-9 h-9 rounded-md bg-slate-800" />
                                                        )}
                                                        <span className="text-slate-300 text-xs">
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}