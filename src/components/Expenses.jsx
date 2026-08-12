import React from 'react'
import { useState } from 'react';

function Expenses({
    toggleState,
    toggleMobileState,
    formattedDate,
    openCalender,
    newExpenses,
    setExpenses,
    selectedMonth,
    setSelectedMonth,
    selectedCat,
    setSelectedCat,
    filteredExpenses,
    setPayments,
    totalSpentThisMonth,
    totalTransactionsThisMonth,
    totalSpentThisYear,
    totalTransactionsThisYear,
    topCategory, topCategoryAmount,
    topCategoryPercentage,
    totalSpentForRefundsAndCredits,
    totalTransactionsForRefundsAndCredits,
    financialData,
    netDifference,
    selectedSchemeName

}) {


    const [logExpense, setLogExpense] = useState(false);
    const [isDeleteExpense, setIsDeleteExpense] = useState(false);
    const [isEditExpense, setEditExpense] = useState(false);
    const [txtListState, setTxtListState] = useState(false);

    const [newExpenseDesc, setNewExpenseDesc] = useState("");
    const [newExpenseType, setNewExpenseType] = useState("Expense (Outflow)");
    const [newExpenseCat, setNewExpenseCat] = useState("Other");
    const [newExpenseDate, setNewExpenseDate] = useState(new Date().toISOString().split('T')[0]);
    const [newExpenseAmount, setNewExpenseAmount] = useState("");

    const [indexOfExpense, setIndexOfExpense] = useState(null)
    const [editExpenseDesc, setEditExpenseDesc] = useState(null)
    const [editExpenseType, setEditExpenseType] = useState(null)
    const [editExpenseCat, setEditExpenseCat] = useState(null)
    const [editExpenseDate, setEditExpenseDate] = useState(null)
    const [editExpenseAmount, setEditExpenseAmount] = useState(null)



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
            amount: newExpenseAmount,
            schemeName: selectedSchemeName
        };

        //setting the paid amount this month
        setPayments((prevPayments) => [...prevPayments, expenseToAdd]);

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





    const totalColor = financialData.moneyIn > financialData.moneyOut ? "text-green-400" : "text-red-400";


    const grandTotal = newExpenses.reduce((total, expense) => total + Number(expense.amount), 0);

    const deleteExpense = (id) => {
        setIsDeleteExpense(true)
        setIndexOfExpense(id)
    }

    const removeExpense = () => {
        setExpenses((prev) => prev.filter(expense => expense.id !== indexOfExpense));
        setIsDeleteExpense(false);
    }

    const handleExpenseEditDesc = (e) => {
        setEditExpenseDesc(e.target.value);
    };
    const handleExpenseEditType = (e) => {
        setEditExpenseType(e.target.value);
    };
    const handleExpenseEditCat = (e) => {
        setEditExpenseCat(e.target.value);
    };
    const handleExpenseEditDate = (e) => {
        setEditExpenseDate(e.target.value);
    };
    const handleExpenseEditAmount = (e) => {
        setEditExpenseAmount(e.target.value);
    };

    const editExpense = (desc, type, cat, date, amount) => {
        setEditExpense(true)
        setEditExpenseDesc(desc)
        setEditExpenseType(type)
        setEditExpenseCat(cat)
        setEditExpenseDate(date)
        setEditExpenseAmount(amount)
    }


    // 1. Calculate the grand total of all expenses (to calculate the 100% scale)
    const grandTotalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // 2. Group the expenses by category and sum up their amounts
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
        const cat = expense.category;

        // If we haven't seen this category yet, initialize it at 0
        if (!acc[cat]) {
            acc[cat] = 0;
        }

        // Add the current expense amount to its category total
        acc[cat] += expense.amount;

        return acc;
    }, {}); // Starts with an empty object {}

    // 3. Convert that object back into an array so we can map over it in the UI
    const aggregatedExpenses = Object.entries(categoryTotals).map(([category, totalAmount]) => {
        // Calculate the percentage safely (prevent dividing by zero)
        const percentage = grandTotalExpense > 0 ? Math.round((totalAmount / grandTotalExpense) * 100) : 0;

        return {
            category,
            amount: totalAmount,
            percentage
        };
    });

    const colorPalette = [
        'bg-[#FFD700]',
        'bg-green-500',
        'bg-blue-500',
        'bg-teal-500',
        'bg-orange-600',
        'bg-yellow-500',
        'bg-pink-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-cyan-500',
        'bg-rose-500',
        'bg-emerald-500',
        'bg-slate-500',
        'bg-black/20'

    ];

    return (
        <div className={`dashboard w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 3 ? "block" : "hidden"}
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
                    <h1 className='text-xl font-bold'>R {totalSpentThisMonth.toLocaleString()}</h1>
                    <h3 className='text-white/75 text-sm'>{totalTransactionsThisMonth} transaction</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#10b981_0%,#065f46_100%)] shadow-[0_5px_15px_rgba(16,185,129,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-calendar-check"></i>
                        <span className='ml-2'>Spent This Year</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R {totalSpentThisYear.toLocaleString()}</h1>
                    <h3 className='text-white/75 text-sm'>{totalTransactionsThisYear} transaction</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#f59e0b_0%,#b45309_100%)] shadow-[0_5px_15px_rgba(245,158,11,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-star"></i>
                        <span className='ml-2'>Top Category</span>
                    </h3>
                    <h1 className='text-xl font-bold'>{topCategory}</h1>
                    <h3 className='text-white/75 text-sm'>R {topCategoryAmount.toLocaleString()} ({topCategoryPercentage}%)</h3>
                </div>
                <div className='bg-[linear-gradient(135deg,#06b6d4_0%,#0369a1_100%)] shadow-[0_5px_15px_rgba(6,182,212,0.2)] cursor-pointer
                text-white p-3 rounded-xl flex flex-col gap-2 w-full md:w-60 hover:-translate-y-1 transition-translate duration-300'>
                    <h3 className='text-white/75 text-sm'>
                        <i className="fa-solid fa-hand-holding-dollar"></i>
                        <span className='ml-2'>Refunds & Credits</span>
                    </h3>
                    <h1 className='text-xl font-bold'>R {totalSpentForRefundsAndCredits.toLocaleString()}</h1>
                    <h3 className='text-white/75 text-sm'>{totalTransactionsForRefundsAndCredits} transaction</h3>
                </div>
            </div>

            {/* Breakdown */}
            <div className='flex flex-col p-3 glass mt-6 rounded-xl gap-4 text-white w-full'>
                <h3>
                    <i className="fa-solid fa-chart-pie"></i>
                    <span className='ml-2'>Spending Breakdown by Category</span>
                </h3>
                <div className="w-full h-3 bg-gray-200 rounded-xl flex overflow-hidden">
                    {aggregatedExpenses.map((expense, index) => {
                        const colorClass = colorPalette[index % colorPalette.length];
                        return (
                            <div
                                key={expense.category}
                                className={`h-full ${colorClass}`}
                                style={{ width: `${expense.percentage}%` }}
                                title={`${expense.category} (${expense.percentage}%)`}
                            ></div>
                        )
                    })}
                </div>



                <ul className='flex flex-wrap gap-2'>
                    {aggregatedExpenses.map((expense, index) => {
                        const colorClass = colorPalette[index % colorPalette.length];
                        return (
                            <li
                                key={expense.category}
                                className='flex items-center gap-2 text-sm p-2 border border-white/20 rounded-xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer'
                            >
                                <span className={`w-3 h-3 ${colorClass} rounded-full inline-block`}></span>
                                <span>
                                    {/* Use .toLocaleString() to add commas to thousands automatically */}
                                    {expense.category} - R {expense.amount.toLocaleString()} ({expense.percentage}%)
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className='flex justify-between align-center mt-6 w-full flex-wrap gap-4'>
                <h1 className='text-lg text-white'>Scheme Expenses</h1>
                <div className='flex flex-wrap gap-3'>
                    <select className='border border-white/50 rounded-xl p-2 text-white focus:outline-2 outline-white'
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value={"All Expenses (Year)"} className="bg-white text-gray-900">All Expenses (Year)</option>
                        <option value={"January"} className="bg-white text-gray-900">January</option>
                        <option value={"February"} className="bg-white text-gray-900">February</option>
                        <option value={"March"} className="bg-white text-gray-900">March</option>
                        <option value={"April"} className="bg-white text-gray-900">April</option>
                        <option value={"May"} className="bg-white text-gray-900">May</option>
                        <option value={"June"} className="bg-white text-gray-900">June</option>
                        <option value={"July"} className="bg-white text-gray-900">July</option>
                        <option value={"August"} className="bg-white text-gray-900">August</option>
                        <option value={"September"} className="bg-white text-gray-900">September</option>
                        <option value={"October"} className="bg-white text-gray-900">October</option>
                        <option value={"November"} className="bg-white text-gray-900">November</option>
                        <option value={"December"} className="bg-white text-gray-900">December</option>
                    </select>
                    <select className='border border-white/50 rounded-xl p-2 text-white focus:outline-2 outline-white'
                        value={selectedCat}
                        onChange={(e) => setSelectedCat(e.target.value)}
                    >
                        <option value={"All Categories"} className="bg-white text-gray-900">All Categories</option>
                        <option value={"Refunds / Credits Only"} className="bg-white text-gray-900">Refunds / Credits Only</option>
                        <option value={"Member Payouts & Dividends"} className="bg-white text-gray-900">Member Payouts & Dividends</option>
                        <option value={"Claims & Benefits (e.g. Burial, Medical)"} className="bg-white text-gray-900">Claims & Benefits (e.g. Burial, Medical)</option>
                        <option value={"Investments & Savings"} className="bg-white text-gray-900">Investments & Savings</option>
                        <option value={"Loans Issued & Emergency"} className="bg-white text-gray-900">Loans Issued & Emergency</option>
                        <option value={"Bulk Groceries & Goods Purchasing"} className="bg-white text-gray-900">Bulk Groceries & Goods Purchasing</option>
                        <option value={"Catering & Refreshments"} className="bg-white text-gray-900">Catering & Refreshments</option>
                        <option value={"Events, Venue & Equipment Hire"} className="bg-white text-gray-900">Events, Venue & Equipment Hire</option>
                        <option value={"Transport & Logistics"} className="bg-white text-gray-900">Transport & Logistics</option>
                        <option value={"Bank & Transaction Fees"} className="bg-white text-gray-900">Bank & Transaction Fees</option>
                        <option value={"Administration & Stationery"} className="bg-white text-gray-900">Administration & Stationery</option>
                        <option value={"Legal, Compliance & Professional Fees"} className="bg-white text-gray-900">Legal, Compliance & Professional Fees</option>
                        <option value={"General Operational Expenses"} className="bg-white text-gray-900">General Operational Expenses</option>
                        <option value={"Other"} className="bg-white text-gray-900">Other</option>
                    </select>
                    <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl focus:outline-2 
                    outline-white cursor-pointer transition-colors duration-300 text-md' onClick={() => setLogExpense(true)}>
                        <i className="fa-solid fa-circle-minus"></i><span className="ml-2">Log Expense</span>
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
                        {
                            filteredExpenses.map(expense => (
                                <tr className='border-b border-b-white/75 cursor-pointer hover:bg-white/10 transition-colors'
                                    key={expense.id}>
                                    <td className='p-3'>{expense.date}</td>
                                    <td className='p-3'>{expense.month}</td>
                                    <td className='p-3'>{expense.category}</td>
                                    <td className='p-3'>{expense.description}</td>
                                    <td className={`p-3 ${expense.type === "Refund / Credit (Inflow)" ? 'text-green-400' : 'text-red-400'}`}>R {expense.amount.toLocaleString()}</td>
                                    <td className='p-3 flex justify-end'>
                                        <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                            <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'
                                                onClick={() => editExpense(expense.description, expense.type, expense.category, expense.date, expense.amount)}>
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </span>
                                            <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'
                                                onClick={() => deleteExpense(expense.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        {filteredExpenses.length === 0 && (
                            <tr>
                                {/* Changed colSpan to 6 to account for your action buttons column */}
                                <td colSpan="6" className="p-8 text-center text-white/50">
                                    No recorded expenses found
                                    {selectedMonth !== "All Expenses (Year)" && ` for ${selectedMonth}`}
                                    {selectedCat !== "All Categories" && ` under ${selectedCat}`}
                                    {selectedMonth === "All Expenses (Year)" && selectedCat === "All Categories" && " for this year"}
                                    .
                                </td>
                            </tr>
                        )}

                        <tr className='border-b border-b-white/75 font-bold'>
                            <td colSpan="100%" className='p-3'>
                                <div className='flex justify-between items-center w-full'>
                                    <span className="text-white-900">Total for Period (Net):</span>
                                    <span className={`text-xs uppercase tracking-wider text-white-400 ${netDifference === 0 ? 'text-gray-400' : totalColor}`}>
                                        R {financialData.moneyIn > financialData.moneyOut ? '+' : ''} {netDifference.toLocaleString()}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* mobile view */}
            <div className="block md:hidden space-y-4 mb-6">
                <ul className="space-y-4 p-3 bg-white rounded-xl mt-3 text-sm h-120 overflow-y-auto">
                    {filteredExpenses.map(expense => (
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
                                    <span className={`font-medium ${expense.type === "Refund / Credit (Inflow)" ? 'text-green-400' : 'text-red-400'}`}>
                                        R {expense.amount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Action</span>
                                    <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                                        <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'
                                            onClick={() => editExpense(expense.description, expense.type, expense.category, expense.date, expense.amount)}>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </span>
                                        <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'
                                            onClick={() => deleteExpense(expense.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {filteredExpenses.length === 0 && (
                        <li>
                            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                                <p className="text-center text-gray-500">No recorded expenses found for
                                    {selectedMonth !== "All Expenses (Year)" && ` for ${selectedMonth}`}
                                    {selectedCat !== "All Categories" && ` under ${selectedCat}`}
                                    {selectedMonth === "All Expenses (Year)" && selectedCat === "All Categories" && " for this year"}
                                    .
                                </p>
                            </div>
                        </li>
                    )}

                    <li>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md text-gray-600 space-y-2 mb-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-900">Total for Period (Net):</span>
                                <span className={`"text-xs font-semibold uppercase tracking-wider ${netDifference === 0 ? 'text-gray-400' : totalColor}`}>
                                    R {financialData.moneyIn > financialData.moneyOut ? '+' : ''} {netDifference.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            {/* footer */}
            <div className='footer md:col-span-3 flex grow flex-col sm:flex-row 
            justify-center items-center py-5 px-6 glass text-white mt-auto'>
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
                                    <option value={"Member Payouts & Dividends"} className="bg-white text-gray-900">Member Payouts & Dividends</option>
                                    <option value={"Claims & Benefits (e.g. Burial, Medical)"} className="bg-white text-gray-900">Claims & Benefits (e.g. Burial, Medical)</option>
                                    <option value={"Investments & Savings"} className="bg-white text-gray-900">Investments & Savings</option>
                                    <option value={"Loans Issued & Emergency"} className="bg-white text-gray-900">Loans Issued & Emergency</option>
                                    <option value={"Bulk Groceries & Goods Purchasing"} className="bg-white text-gray-900">Bulk Groceries & Goods Purchasing</option>
                                    <option value={"Catering & Refreshments"} className="bg-white text-gray-900">Catering & Refreshments</option>
                                    <option value={"Events, Venue & Equipment Hire"} className="bg-white text-gray-900">Events, Venue & Equipment Hire</option>
                                    <option value={"Transport & Logistics"} className="bg-white text-gray-900">Transport & Logistics</option>
                                    <option value={"Bank & Transaction Fees"} className="bg-white text-gray-900">Bank & Transaction Fees</option>
                                    <option value={"Administration & Stationery"} className="bg-white text-gray-900">Administration & Stationery</option>
                                    <option value={"Legal, Compliance & Professional Fees"} className="bg-white text-gray-900">Legal, Compliance & Professional Fees</option>
                                    <option value={"General Operational Expenses"} className="bg-white text-gray-900">General Operational Expenses</option>
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

            {isDeleteExpense &&
                <div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
                bg-black/50 h-screen w-screen z-100'>
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                    w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
                        <h1 className='text-white text-2xl mb-4'>Delete Transaction?</h1>

                        <h1 className='text-white/90 text-md'>Are you sure you want to remove this record?</h1>
                        <div className='flex justify-between align-center gap-4'>
                            <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
                            hover:bg-white/30' onClick={() => { setIsDeleteExpense(false) }}>
                                No
                            </button>
                            <button className='w-full py-3 rounded-xl text-white mt-6 bg-red-500 cursor-pointer
                             hover:bg-red-400' onClick={() => { removeExpense() }}>
                                Yes
                            </button>
                        </div>

                    </div>
                </div>
            }

            {isEditExpense &&
                <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
                bg-black/50 h-screen w-screen'>
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                    w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
                        <div className='flex justify-between align-center w-full text-white mb-4'>
                            <h1 className='text-2xl'>Log Expense</h1>
                            <p className='font-bold text-2xl cursor-pointer' onClick={() => setEditExpense(false)}>&times;</p>
                        </div>


                        <div className='mb-2 text-xs'>
                            <h4 className='text-white/85'>Description</h4>
                            <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                            focus:outline-white text-white' required placeholder='e.g. KFC for AGM Meeting' type='text'
                                onChange={handleExpenseEditDesc} value={editExpenseDesc}
                            />
                        </div>
                        <div className='flex justify-between gap-4 mb-2'>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Type</h4>
                                <select className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required onChange={handleExpenseEditType} value={editExpenseType}>
                                    <option value={"Expense (Outflow)"} className="bg-white text-gray-900">Expense (Outflow)</option>
                                    <option value={"Refund / Credit (Inflow)"} className="bg-white text-gray-900">Refund / Credit (Inflow)</option>
                                </select>
                            </div>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Category</h4>
                                <select className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required onChange={handleExpenseEditCat} value={editExpenseCat}>
                                    <option value={"Other"} className="bg-white text-gray-900">Other</option>
                                    <option value={"Refunds / Credits Only"} className="bg-white text-gray-900">Refunds / Credits Only</option>
                                    <option value={"Member Payouts & Dividends"} className="bg-white text-gray-900">Member Payouts & Dividends</option>
                                    <option value={"Claims & Benefits (e.g. Burial, Medical)"} className="bg-white text-gray-900">Claims & Benefits (e.g. Burial, Medical)</option>
                                    <option value={"Investments & Savings"} className="bg-white text-gray-900">Investments & Savings</option>
                                    <option value={"Loans Issued & Emergency"} className="bg-white text-gray-900">Loans Issued & Emergency</option>
                                    <option value={"Bulk Groceries & Goods Purchasing"} className="bg-white text-gray-900">Bulk Groceries & Goods Purchasing</option>
                                    <option value={"Catering & Refreshments"} className="bg-white text-gray-900">Catering & Refreshments</option>
                                    <option value={"Events, Venue & Equipment Hire"} className="bg-white text-gray-900">Events, Venue & Equipment Hire</option>
                                    <option value={"Transport & Logistics"} className="bg-white text-gray-900">Transport & Logistics</option>
                                    <option value={"Bank & Transaction Fees"} className="bg-white text-gray-900">Bank & Transaction Fees</option>
                                    <option value={"Administration & Stationery"} className="bg-white text-gray-900">Administration & Stationery</option>
                                    <option value={"Legal, Compliance & Professional Fees"} className="bg-white text-gray-900">Legal, Compliance & Professional Fees</option>
                                    <option value={"General Operational Expenses"} className="bg-white text-gray-900">General Operational Expenses</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex justify-between gap-4 mb-2'>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Date</h4>
                                <input
                                    className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white focus:outline-white text-white'
                                    required
                                    value={new Date(editExpenseDate).toISOString().split('T')[0]}
                                    type='date'
                                    onChange={handleExpenseEditDate}
                                />
                            </div>
                            <div className='text-xs w-full'>
                                <h4 className='text-white/85'>Amount (R)</h4>
                                <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
                                focus:outline-white text-white' required placeholder='R 0.00' type='number'
                                    onChange={handleExpenseEditAmount} value={editExpenseAmount} />
                            </div>
                        </div>

                        <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
                        hover:bg-white/30' onClick={() => setEditExpense(false)}>
                            Save
                        </button>

                    </div>
                </div>
            }
        </div>

    )
}

export default Expenses