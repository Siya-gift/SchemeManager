import React from 'react'
import { useState } from 'react';

function Expenses({ toggleState, toggleMobileState, formattedDate, openCalender }) {

    const expenses = [
        {
            id: 1,
            date: "2026-04-16",
            month: "June",
            category: "Other",
            description: "Tent",
            amount: 1000
        },
        {
            id: 2,
            date: "2026-05-16",
            month: "May",
            category: "Sound System & Choir",
            description: "Sound System",
            amount: 500
        },
        {
            id: 3,
            date: "2026-06-16",
            month: "April",
            category: "Livestock / Slaughter",
            description: "2 Cows",
            amount: 20000
        },
    ]


    const [logExpense, setLogExpense] = useState(false);
    const [txtListState, setTxtListState] = useState(false);

    const [newExpenses, setExpenses] = useState(() => expenses);

    const [newExpenseDesc, setNewExpenseDesc] = useState("");
    const [newExpenseType, setNewExpenseType] = useState("Expense (Outflow)");
    const [newExpenseCat, setNewExpenseCat] = useState("Other");
    const [newExpenseDate, setNewExpenseDate] = useState(new Date().toISOString().split('T')[0]);
    const [newExpenseAmount, setNewExpenseAmount] = useState("");

    const scrollOnList = (event) => {
        const position = event.currentTarget.scrollTop;
        if (position > 0) {
            setTxtListState(true);
        } else {
            setTxtListState(false);
        }
    };

    const saveExpense = () => {
        if (!newExpenseDesc.trim() || !newExpenseType.trim() || !newExpenseCat.trim() || !newExpenseDate.trim() || newExpenseAmount <= 0) return;

        const expenseToAdd = {
            id: newExpenses.length + 1,
            description: newExpenseDesc.trim(),
            type: newExpenseType.trim(),
            category: newExpenseCat.trim(),
            date: newExpenseDate.trim(),
            month: new Date(newExpenseDate).toLocaleString('default', { month: 'long' }),
            amount: newExpenseAmount
        };

        setExpenses((prev) => [...prev, expenseToAdd]);
        setNewExpenseDesc("");
        setNewExpenseDate(new Date().toISOString().split('T')[0]);
        setNewExpenseAmount("");
        setLogExpense(false);
    };

    const handleExpenseDescInputChange = (e) => {
        setNewExpenseDesc(e.target.value);
    };
    const handleExpenseTypeInputChange = (e) => {
        setNewExpenseType(e.target.value);
    };
    const handleExpenseCatInputChange = (e) => {
        setNewExpenseCat(e.target.value);
    };
    const handleExpenseDateInputChange = (e) => {
        setNewExpenseDate(e.target.value);
    };
    const handleExpenseAmountInputChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setNewExpenseAmount(value);
        }
    };

    return (
        <div className={`dashboard w-full min-h-screen p-4 
        md:p-8 ${toggleMobileState === 3 ? "block" : "hidden"}
         ${toggleState === 3 ? "md:block" : "md:hidden"}
        `}>

            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
                    Expenses
                </h1>
                <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white mt-4 md:mt-0'>
                    <h5 className='text-white/50 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
                        Filter by date:
                    </h5>
                    <h3 className='text-light cursor-pointer hover:text-white/80 uppercase text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
                        {formattedDate}
                    </h3>
                    <span className='cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]'
                        onClick={openCalender}>
                        <i className="fa-solid fa-calendar-days"></i>
                    </span>
                </div>
            </div>

            <div className='okrContainer flex flex-wrap gap-4 w-full transition-all duration-300'>
                <div className='bg-[linear-gradient(135deg,#4f46e5_0%,#3730a3_100%)] shadow-[0_5px_15px_rgba(79,70,229,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span className='ml-2'>Spent This Month</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R 1 000,00</h1>
                    <h3 className='text-white/75 text-sm'>1 transaction</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#10b981_0%,#065f46_100%)] shadow-[0_5px_15px_rgba(16,185,129,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-calendar-check"></i>
                        <span className='ml-2'>Spent This Year</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R 1 000,00</h1>
                    <h3 className='text-white/75 text-sm'>1 transaction</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#f59e0b_0%,#b45309_100%)] shadow-[0_5px_15px_rgba(245,158,11,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-star"></i>
                        <span className='ml-2'>Top Category</span>
                    </h3>
                    <h1 className='text-xl font-bold'>Other</h1>
                    <h3 className='text-white/75 text-sm'>R 1,000 (100%)</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#06b6d4_0%,#0369a1_100%)] shadow-[0_5px_15px_rgba(6,182,212,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-hand-holding-dollar"></i>
                        <span className='ml-2'>Refunds & Credits</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R 0,00</h1>
                    <h3 className='text-white/75 text-sm'>0 transaction</h3>
                </div>
            </div>

            <div className='flex flex-col p-3 glass mt-6 rounded-xl gap-4 text-white w-full'>
                <h3>
                    <i className="fa-solid fa-chart-pie"></i>
                    <span className='ml-2'>Spending Breakdown by Category</span>
                </h3>
                <div className='w-full h-3 bg-gray-200 rounded-xl'></div>

                <ul className='flex flex-wrap gap-2'>
                    <li className='flex items-center gap-2 text-sm p-2 border border-white/20 rounded-xl
                    hover:-translate-y-1 transition-transform duration-300 cursor-pointer'>
                        <span className='w-3 h-3 bg-gray-200 rounded-full inline-block'></span>
                        <span>Other - R 1,000 (100%)</span>
                    </li>
                </ul>
            </div>

            <div className='flex justify-between align-center mt-6 w-full flex-wrap gap-4'>
                <h1 className='text-lg text-white'>Scheme Expenses</h1>
                <div className='flex flex-wrap gap-3'>
                    <select className='border border-white/50 rounded-xl p-2 text-white focus:outline-2 outline-white'>
                        <option className="bg-white text-gray-900">All Expenses (Year)</option>
                        <option className="bg-white text-gray-900">January</option>
                        <option className="bg-white text-gray-900">February</option>
                        <option className="bg-white text-gray-900">March</option>
                        <option className="bg-white text-gray-900">April</option>
                        <option className="bg-white text-gray-900">May</option>
                        <option className="bg-white text-gray-900">June</option>
                        <option className="bg-white text-gray-900">July</option>
                        <option className="bg-white text-gray-900">August</option>
                        <option className="bg-white text-gray-900">September</option>
                        <option className="bg-white text-gray-900">October</option>
                        <option className="bg-white text-gray-900">November</option>
                        <option className="bg-white text-gray-900">December</option>
                    </select>
                    <select className='border border-white/50 rounded-xl p-2 text-white focus:outline-2 outline-white'>
                        <option className="bg-white text-gray-900">All Categories</option>
                        <option className="bg-white text-gray-900">Refunds / Credits Only</option>
                        <option className="bg-white text-gray-900">Coffin & Casket</option>
                        <option className="bg-white text-gray-900">Catering & Groceries</option>
                        <option className="bg-white text-gray-900">Tent & Rentals</option>
                        <option className="bg-white text-gray-900">Hearse & Transport</option>
                        <option className="bg-white text-gray-900">Flowers & Decor</option>
                        <option className="bg-white text-gray-900">Grave Site & Digging</option>
                        <option className="bg-white text-gray-900">Death Certificate & Admin</option>
                        <option className="bg-white text-gray-900">Sound System & Choir</option>
                        <option className="bg-white text-gray-900">Livestock / Slaughter</option>
                        <option className="bg-white text-gray-900">Family Payout</option>
                        <option className="bg-white text-gray-900">Other</option>
                    </select>
                    <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl focus:outline-2 
                    outline-white cursor-pointer transition-colors duration-300' onClick={() => setLogExpense(true)}>
                        Log Expense
                    </button>
                </div>
            </div>

            {/* Desktop view */}
            <div className='mt-6 hidden md:block h-90 overflow-y-auto pr-2' onScroll={scrollOnList}>
                <table className='w-full text-left text-sm text-white'>
                    <thead className={`sticky top-0 ${txtListState ? "bg-white/98 [&_tr]:text-black/70" : "text-white"} text-md`}>
                        <tr>
                            <th className='p-3 sticky top-0 z-10 rounded-tl-xl'>Date</th>
                            <th className='p-3 sticky top-0 z-10'>Month</th>
                            <th className='p-3 sticky top-0 z-10'>Category</th>
                            <th className='p-3 sticky top-0 z-10'>Description</th>
                            <th className='p-3 sticky top-0 z-10'>Amount</th>
                            <th className='p-3 sticky top-0 z-10 text-right rounded-tr-xl'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newExpenses.map(expense => (
                            <tr className='border-b border-b-white/75 cursor-pointer hover:bg-white/10 transition-colors'
                                key={expense.id}>
                                <td className='p-3'>{expense.date}</td>
                                <td className='p-3'>{expense.month}</td>
                                <td className='p-3'>{expense.category}</td>
                                <td className='p-3'>{expense.description}</td>
                                <td className='p-3'>R {expense.amount.toLocaleString()}</td>
                                <td className='p-3 flex justify-end'>
                                    <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                        <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </span>
                                        <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr className='border-b border-b-white/75 font-bold'>
                            <td colSpan="100%" className='p-3'>
                                <div className='flex justify-between items-center w-full'>
                                    <span className="text-white-900">Total for Period (Net):</span>
                                    <span className="text-xs uppercase tracking-wider text-white-400">R 1 000,00</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* mobile view */}
            <div className="block md:hidden space-y-4">
                <ul className="space-y-4 p-3 bg-white rounded-xl mt-3 text-sm h-120 overflow-y-auto">
                    {newExpenses.map(expense => (
                        <li key={expense.id}>
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold text-gray-900">Date</span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{expense.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Month</span>
                                    <span className="text-gray-900 font-medium">
                                        {expense.month}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Category</span>
                                    <span className="text-gray-900 font-medium border border-gray-300 rounded-full px-2 py-1 text-xs">
                                        {expense.category}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Description</span>
                                    <span className="text-gray-900 font-medium">
                                        {expense.description}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Amount</span>
                                    <span className="text-red-900 font-medium">
                                        - R {expense.amount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Action</span>
                                    <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                        <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </span>
                                        <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'>
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}

                    <li>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-900">Total for Period (Net):</span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">R 1 000,00</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            {/* footer */}
            <div className='footer md:col-span-3 flex flex-col sm:flex-row 
            justify-center items-center py-5 px-6 glass text-white mt-3'>
                <p>All rights reserved &copy; 2026 </p>
            </div>


            {logExpense &&
                <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
                bg-black/50 h-screen w-screen'>
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                    w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
                        <div className='flex justify-between align-center w-full text-white mb-4'>
                            <h1 className='text-2xl'>Log Expense</h1>
                            <p className='font-bold text-2xl cursor-pointer' onClick={() => setLogExpense(false)}>&times;</p>
                        </div>


                        <div className='mb-2 text-xs'>
                            <h4 className='text-white/85'>Description</h4>
                            <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                            focus:outline-white text-white' required placeholder='e.g. KFC for AGM Meeting' type='text'
                                onChange={handleExpenseDescInputChange} value={newExpenseDesc}
                            />
                        </div>
                        <div className='flex justify-between gap-4 mb-2'>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Type</h4>
                                <select className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required onChange={handleExpenseTypeInputChange} value={newExpenseType}>
                                    <option value={"Expense (Outflow)"} className="bg-white text-gray-900">Expense (Outflow)</option>
                                    <option value={"Refund / Credit (Inflow)"} className="bg-white text-gray-900">Refund / Credit (Inflow)</option>
                                </select>
                            </div>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Category</h4>
                                <select className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required onChange={handleExpenseCatInputChange} value={newExpenseCat}>
                                    <option value={"Other"} className="bg-white text-gray-900">Other</option>
                                    <option value={"Refunds / Credits Only"} className="bg-white text-gray-900">Refunds / Credits Only</option>
                                    <option value={"Coffin & Casket"} className="bg-white text-gray-900">Coffin & Casket</option>
                                    <option value={"Catering & Groceries"} className="bg-white text-gray-900">Catering & Groceries</option>
                                    <option value={"Tent & Rentals"} className="bg-white text-gray-900">Tent & Rentals</option>
                                    <option value={"Hearse & Transport"} className="bg-white text-gray-900">Hearse & Transport</option>
                                    <option value={"Flowers & Decor"} className="bg-white text-gray-900">Flowers & Decor</option>
                                    <option value={"Grave Site & Digging"} className="bg-white text-gray-900">Grave Site & Digging</option>
                                    <option value={"Death Certificate & Admin"} className="bg-white text-gray-900">Death Certificate & Admin</option>
                                    <option value={"Sound System & Choir"} className="bg-white text-gray-900">Sound System & Choir</option>
                                    <option value={"Livestock / Slaughter"} className="bg-white text-gray-900">Livestock / Slaughter</option>
                                    <option value={"Family Payout"} className="bg-white text-gray-900">Family Payout</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex justify-between gap-4 mb-2'>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Date</h4>
                                <input
                                    className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white focus:outline-white text-white'
                                    required
                                    value={new Date(newExpenseDate).toISOString().split('T')[0]}
                                    type='date'
                                    onChange={handleExpenseDateInputChange}
                                />
                            </div>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Amount (R)</h4>
                                <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required placeholder='R 0.00' type='number'
                                    onChange={handleExpenseAmountInputChange} value={newExpenseAmount} />
                            </div>
                        </div>

                        <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
                        hover:bg-white/30' onClick={() => saveExpense()}>
                            Save
                        </button>

                    </div>
                </div>
            }
        </div>

    )
}

export default Expenses