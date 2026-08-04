'use client'


const stats = [
    {
      label: "Revenue (30d)",
      value: "$84,219",
      delta: "+12.4%",
      trend: "up",
    },
    {
      label: "Orders",
      value: "1,284",
      delta: "+6.1%",
      trend: "up",
    },
    {
      label: "Avg. order value",
      value: "$65.60",
      delta: "-1.8%",
      trend: "down",
    },
    {
      label: "Refund rate",
      value: "2.1%",
      delta: "+0.4%",
      trend: "down",
    },
  ];
  
  const orders = [
    {
      id: "#8821",
      customer: "Priya Nair",
      items: 3,
      total: "$142.00",
      status: "Fulfilled",
      date: "Jul 15",
    },
    {
      id: "#8820",
      customer: "Owen Clark",
      items: 1,
      total: "$38.50",
      status: "Processing",
      date: "Jul 15",
    },
    {
      id: "#8819",
      customer: "Lin Zhao",
      items: 5,
      total: "$291.20",
      status: "Fulfilled",
      date: "Jul 14",
    },
    {
      id: "#8818",
      customer: "Ahmed Farouk",
      items: 2,
      total: "$76.00",
      status: "Cancelled",
      date: "Jul 14",
    },
    {
      id: "#8817",
      customer: "Grace Kim",
      items: 4,
      total: "$210.75",
      status: "Processing",
      date: "Jul 13",
    },
    {
      id: "#8816",
      customer: "Marco Silva",
      items: 1,
      total: "$52.00",
      status: "Fulfilled",
      date: "Jul 13",
    },
  ];
  
  const lowStock = [
    { name: "Ceramic Pour-Over Kettle", sku: "KTL-014", left: 3 },
    { name: "Linen Weekender Bag", sku: "BAG-092", left: 5 },
    { name: "Oak Cutting Board, Small", sku: "CBD-003", left: 2 },
    { name: "Recycled Wool Throw", sku: "THW-071", left: 6 },
  ];
  
  const statusStyles = {
    Fulfilled: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Processing: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  
  export default function Page() {

 

    return (
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-[#1E2333] border border-white/[0.06] p-5"
            >
              <p className="text-[12.5px] text-slate-400 font-medium">
                {s.label}
              </p>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-semibold text-slate-100">
                  {s.value}
                </span>
                <span
                  className={`font-mono text-[12px] font-medium ${
                    s.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
  
        <div className="grid grid-cols-3 gap-5">
          {/* Orders table */}
          <div className="col-span-2 rounded-xl bg-[#1E2333] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h2 className="text-[13.5px] font-semibold text-slate-100">
                Recent orders
              </h2>
              <a
                href="#"
                className="text-[12.5px] font-medium text-indigo-400 hover:text-indigo-300"
              >
                View all
              </a>
            </div>
  
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    Order
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    Customer
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    Items
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="group border-t border-white/[0.05] border-l-2 border-l-transparent hover:border-l-indigo-500 hover:bg-indigo-500/[0.04] hover:shadow-[inset_0_0_20px_rgba(99,102,241,0.06)] transition-all duration-150"
                  >
                    <td className="px-5 py-3 font-mono text-[12.5px] text-slate-300">
                      {o.id}
                    </td>
                    <td className="px-3 py-3 text-[13px] text-slate-200">
                      {o.customer}
                    </td>
                    <td className="px-3 py-3 font-mono text-[12.5px] text-slate-400">
                      {o.items}
                    </td>
                    <td className="px-3 py-3 font-mono text-[12.5px] text-slate-200">
                      {o.total}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                          statusStyles[o.status]
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button className="rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 text-[11px] font-medium hover:bg-indigo-500/20">
                          View
                        </button>
                        <button className="rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium hover:bg-emerald-500/20">
                          Fulfill
                        </button>
                        <button className="rounded-md bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 text-[11px] font-medium hover:bg-red-500/20">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Low stock panel */}
          <div className="rounded-xl bg-[#1E2333] border border-white/[0.06] overflow-hidden h-fit">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h2 className="text-[13.5px] font-semibold text-slate-100">
                Low stock
              </h2>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5">
                {lowStock.length} items
              </span>
            </div>
  
            <ul>
              {lowStock.map((p) => (
                <li
                  key={p.sku}
                  className="group flex items-center justify-between gap-3 px-5 py-3 border-t border-white/[0.05] border-l-2 border-l-transparent hover:border-l-amber-500 hover:bg-amber-500/[0.04] transition-all duration-150"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] text-slate-200 truncate">
                      {p.name}
                    </p>
                    <p className="font-mono text-[11px] text-slate-500">
                      {p.sku}
                    </p>
                  </div>
                  <span className="font-mono text-[12.5px] font-semibold text-amber-400 shrink-0">
                    {p.left} left
                  </span>
                </li>
              ))}
            </ul>
  
            <div className="px-5 py-3 border-t border-white/[0.05]">
              <a
                href="#"
                className="text-[12.5px] font-medium text-indigo-400 hover:text-indigo-300"
              >
                Manage inventory →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }