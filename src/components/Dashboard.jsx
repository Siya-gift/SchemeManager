import React, { useState, useMemo } from 'react'
import Overlayer from './Overlayer'


function Dashboard({
    toggleState,
    toggleMobileState,
    overlayer,
    openCalender,
    formattedDate,
    schemes,
    setSchemes,
    schemeSelected,
    schemeSelectedState,
    setSchemeSelectedState,
    totalSpentThisMonth,
    activeTab,
    openExpenseTab,
    toggleTabMobile,
    financialData,
    netDifference,
    totalSchemeYearlyContribution,
    totalSchemeMonthlyContribution,
    yearlyTarget,
    monthlyTarget,
    totalCash,
    totalEFT,
    totalOther,
    members,
    selectedSchemeName,
    getMemberStatus,
    filteredMembers,
    membersBehindStatus,
    getMemberArrears,
    LatestTransactions,
    handleConfirmPayment
}) {

    const [isAddSchemeModal, setAddSchemeModal] = useState(false);
    const [logDetailsModal, setLogDetailsModal] = useState(false);

    const [YearMonthFilter, setYearMonthFilter] = useState(1)


    const switchYearMonthFilter = (periodSelected) => {
        setYearMonthFilter(periodSelected)
    }

    // Numbers helper
    const formatShorthand = (num) => {
        return new Intl.NumberFormat('en-ZA', {
            notation: 'compact',
            maximumFractionDigits: 1,
        }).format(num).toLowerCase(); // remove .toLowerCase() if you prefer '2K' over '2k'
    };

    //form input
    const [newScheme, setNewScheme] = useState('');
    const [newSchemeAmount, setNewSchemeAmount] = useState('');
    const [newSchemeStartingBal, setNewSchemeStartingBal] = useState('');
    const [newSchemeDate, setNewSchemeDate] = useState(new Date().getMonth());
    const [newSchemeYear, setNewSchemeYear] = useState(new Date().getFullYear());

    // Input handler functions
    const handleSchemeNameInputChange = (e) => setNewScheme(e.target.value);
    const handleSchemeAmountInputChange = (e) => setNewSchemeAmount(e.target.value);
    const handleSchemeStartingBalInputChange = (e) => setNewSchemeStartingBal(e.target.value);
    const handleSchemeDateInputChange = (e) => setNewSchemeDate(e.target.value);
    const handleSchemeYearInputChange = (e) => setNewSchemeYear(e.target.value);

    const saveScheme = () => {

        if (!newScheme.trim()) return;
        if (!newSchemeAmount) return;

        const schemeToAdd = {
            scheme: newScheme.trim(),
            monthlyContribution: newSchemeAmount,
            startingBal: newSchemeStartingBal,
            date: newSchemeDate
        }

        setSchemes((prev) => [...prev, schemeToAdd]);
        schemeSelected(schemes.length, newScheme);
        setNewScheme("");
        setNewSchemeAmount("");


        setAddSchemeModal(false);
    };

    const openExpensePage = () => {
        activeTab(3)
        toggleTabMobile(3)
    }

    const progressPercentage = YearMonthFilter === 1 ? (totalSchemeYearlyContribution / yearlyTarget) * 100 : (totalSchemeMonthlyContribution / monthlyTarget) * 100;
    const TotalCollectionsMinusMonthlyExpenses = filteredMembers.reduce((sum, member) => sum + member.totPaid, 0) - (financialData.moneyOut) + (financialData.moneyIn);
    const activeScheme = schemes.find(
        s => s.scheme === selectedSchemeName
    );

    const membersInArrears = activeScheme
        ? members.filter(member => {
            if (member.schemeName !== selectedSchemeName) {
                return false;
            }

            return getMemberStatus(member, activeScheme) === "Arrears";
        })
        : [];

    const LatestTransactionsForSelectedScheme = () => LatestTransactions.filter(transaction => transaction.transactionScheme.toLowerCase() === selectedSchemeName.toLowerCase());


    const [logDetailsMemberName, setLogDetailsMemberName] = useState();
    const [logDetailsOccuredPeriod, setLogDetailsOccuredPeriod] = useState();
    const [logDetailsDate, setLogDetailsDate] = useState();
    const [logDetailsDescription, setLogDetailsDescription] = useState();
    const [logDetailsAmount, setLogDetailsAmount] = useState();
    const [logDetailsMethod, setLogDetailsMethod] = useState();
    const [logDetailsJoinedDate, setLogDetailsJoinedDate] = useState();

    const logDetails = (occuredPeriod, memberName, date, description, amount, method, joinedDate) => {
        setLogDetailsModal(true);
        setLogDetailsMemberName(memberName);
        setLogDetailsDate(date);
        setLogDetailsDescription(description);
        setLogDetailsAmount(amount);
        setLogDetailsMethod(method);
        setLogDetailsOccuredPeriod(occuredPeriod);
        setLogDetailsJoinedDate(joinedDate);
    }

    const computedMembers = useMemo(() => {
        const today = new Date();
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);

        const arrearsThreshold = activeScheme ? activeScheme.monthlyContribution * 3 : 0;

        return membersInArrears.map((member) => {
            const arrearsValue = getMemberArrears(member, activeScheme);

            const latestPaymentDate = member.transactions?.length
                ? new Date(Math.max(...member.transactions.map(t => new Date(t.date).getTime())))
                : null;

            const paidLastThreeMonths = member.transactions
                ?.filter(t => {
                    const transactionDate = new Date(t.date);
                    return transactionDate >= threeMonthsAgo && transactionDate <= today;
                })
                .reduce((total, t) => total + Number(t.amount || 0), 0) || 0;

            // FIX: A member is at risk if they haven't paid for 3 months OR if their total payments are still under the 3-month threshold
            const noPaymentForThreeMonths = !latestPaymentDate || latestPaymentDate <= threeMonthsAgo;
            const belowThreeMonthThreshold = paidLastThreeMonths < arrearsThreshold;

            // A member is at risk purely because they owe 3 months or more of debt
            const isRisk = arrearsValue >= arrearsThreshold;


            return {
                ...member,
                arrearsValue,
                isRisk
            };
        });
    }, [membersInArrears, activeScheme]);


    const startingBalance = schemes.filter((s) => s.scheme === selectedSchemeName)[0]?.startingBal;
    const asOfDate = new Date(schemes.filter((s) => s.scheme === selectedSchemeName)[0]?.date);

    return (
        <div className={`dashboard w-full min-h-screen p-4 md:p-5
        /* Mobile Logic: Only hide if mobile state isn't 1 */
        ${toggleMobileState === 1 ? "block" : "hidden"} 
            
        /* Desktop Logic: On md+ screens, toggle based on desktop state */
        ${toggleState === 1 ? "md:block" : "md:hidden"}
        `}>

            <Overlayer />

            <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
                    Dashboard
                </h1>
                <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white mt-4 md:mt-0'>
                    <h5 className='text-white/50 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
                        Filter by date:
                    </h5>
                    <h3 className='text-light cursor-pointer hover:text-white/80 uppercase text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
                        {formattedDate}
                    </h3>
                    <span className='cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]'
                        onClick={openCalender}
                    >
                        <i className="fa-solid fa-calendar-days"></i>
                    </span>
                </div>
            </div>


            {/* Tabs Scrollable on mobile */}
            <ul className='tabs glass-scroll flex gap-2 max-w-svw md:max-w-[70vw] overflow-x-auto pb-4 no-scrollbar'>
                {schemes.map((scheme, idx) => (
                    <li key={idx} className={`tab hover:bg-white/45 cursor-pointer 
                    text-white glass rounded-2xl px-4 py-1.5 font-bold 
                    text-sm whitespace-nowrap transition-all
                    ${schemeSelectedState === idx ? "bg-white/45" : ""}`}
                        onClick={() => schemeSelected(idx, scheme.scheme)}
                    >{scheme.scheme}</li>
                ))}


                <li className='group flex items-center tab hover:bg-white/20 cursor-pointer 
                text-white glass rounded-2xl px-4 py-1.5 font-bold text-sm transition-all mr-35'
                    onClick={() => setAddSchemeModal(true)}>
                    <span><i className="fa-solid fa-plus"></i></span>
                    <span className='max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs
                     group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 
                     ease-in-out whitespace-nowrap'>
                        Create Scheme
                    </span>
                </li>
            </ul>
            {/* Container */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 '>

                {/* Card 1: Total Collections (Spans 1 col) */}
                {/* Card 1: Allow it to be wider if needed */}

                <div className='glass p-6 text-white flex flex-col justify-between min-h-50 md:col-span-2 lg:col-span-1 h-full w-full overflow-hidden'>
                    <h2 className='text-[clamp(1rem,4vw,1.25rem)] flex items-start gap-3 leading-tight'>
                        <i className="fa-solid fa-wallet mt-1"></i>
                        <span>Savings </span>
                        <div className='text-white/50 text-sm text-center' title='Total collections(YTD) Minus Monthly Expenses'>
                            <i className="fa-solid fa-circle-info"></i>
                        </div>
                    </h2>

                    <div className='mt-4'>
                        <h1 className="text-[clamp(1.25rem,5vw,2.5rem)] w-full font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                            {(TotalCollectionsMinusMonthlyExpenses + (schemes.find((s) => s.scheme === selectedSchemeName)?.startingBal || 0)).toLocaleString('en-ZA', {
                                currency: "ZAR",
                                style: "currency"
                            })}
                        </h1>


                        <h3 className={`text-[clamp(0.7rem,2vw,0.9rem)] my-3 font-2 opacity-80 ${!startingBalance ? 'invisible' : ''}`}>
                            <i className="fa-solid fa-flag-checkered mr-1"></i>
                            Starting Balance: {
                                (startingBalance ?? 0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })
                            } <br />
                            {asOfDate.toLocaleDateString('en-ZA', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </h3>

                        <hr className='mb-2 mt-3 border-white/25' />

                        <div className='flex justify-between items-center w-full whitespace-nowrap' onClick={() => openExpensePage()}>
                            <h4 className='text-xs sm:text-sm lg:text-xs text-white/70 mt-2 cursor-pointer hover:text-white transition-all'>
                                Spent This Month <span className='ml-1'>&rarr;</span>
                            </h4>
                            <h4 className='text-xs sm:text-sm lg:text-xs text-white/70 font-bold mt-2 cursor-pointer hover:text-white transition-all'>
                                {((totalSpentThisMonth || 0).toLocaleString('en-ZA', {
                                    currency: "ZAR",
                                    style: "currency"
                                }))}
                            </h4>
                        </div>
                    </div>
                </div>


                {/* Card 2: Yearly Target (Spans 2 cols on large screens) ...*/}
                <div className='glass p-6 text-white md:col-span-2 flex flex-col justify-between min-h-50'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                        <h2 className='text-xl flex items-center gap-3'>
                            <i className="fa-solid fa-piggy-bank"></i>
                            Total Collected This {YearMonthFilter === 1 ? "Year" : "Month"}
                        </h2>
                        <ul className='YearMonthFilter border flex items-center text-xs overflow-hidden rounded'>
                            <li className={`${YearMonthFilter === 1 ? "bg-white/40" : ""} px-3 py-1.5 cursor-pointer w-full hover:bg-white/60`}
                                onClick={() => switchYearMonthFilter(1)}
                            >YEAR</li>
                            <li className='w-px h-4 bg-white/50'></li>
                            <li className={`${YearMonthFilter === 2 ? "bg-white/40" : ""} px-3 py-1.5 cursor-pointer hover:bg-white/60`}
                                onClick={() => switchYearMonthFilter(2)}
                            >MONTH</li>
                        </ul>
                    </div>

                    <h1 className='text-[clamp(1.25rem,5vw,2.5rem)] w-full font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis mb-4 mt-4 md:mt-0'>
                        {YearMonthFilter === 1 ? totalSchemeYearlyContribution.toLocaleString('en-ZA', {
                            currency: "ZAR",
                            style: "currency"
                        }) : totalSchemeMonthlyContribution.toLocaleString('en-ZA', {
                            currency: "ZAR",
                            style: "currency"
                        })}
                    </h1>

                    <div className='space-y-4'>
                        <ul className='flex flex-wrap gap-4 text-xs opacity-80'>
                            <li><i className="fa-solid fa-money-bill-wave mr-2"></i>Cash: R{YearMonthFilter === 1 ? formatShorthand(totalCash.yearly) : formatShorthand(totalCash.monthly)}</li>
                            <li><i className="fa-solid fa-building-columns mr-2"></i>EFT: R{YearMonthFilter === 1 ? formatShorthand(totalEFT.yearly) : formatShorthand(totalEFT.monthly)}</li>
                            <li><i className="fa-solid fa-wallet mr-2"></i>Other: R{YearMonthFilter === 1 ? formatShorthand(totalOther.yearly) : formatShorthand(totalOther.monthly)}</li>
                        </ul>
                        <div className='w-full h-2 bg-white/20 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-white transition-all duration-300'
                                style={{ width: `${Math.min(100, progressPercentage)}%` }}
                            ></div>
                        </div>
                        <h5 className='text-xs font-bold'>Target: {YearMonthFilter === 1 ? yearlyTarget.toLocaleString() : monthlyTarget.toLocaleString()}</h5>
                    </div>
                </div>

                {/* Card 3: Latest Transactions */}
                <div className='glass p-6 text-white h-90 flex flex-col'>
                    <h2 className='text-xl font-semibold mb-6 flex items-center gap-3 shrink-0'>
                        <i className="fa-solid fa-clock-rotate-left"></i> Latest Transactions
                    </h2>

                    {/* flex-1 inside h-90 ensures the list fills the remaining card height */}
                    <div className='flex-1 overflow-hidden'>
                        <ul className='glass-scroll text-md h-full overflow-auto pr-2'>
                            {
                                LatestTransactionsForSelectedScheme().length === 0 ?
                                    (
                                        <div className="text-center text-white/50 py-10 w-full h-full flex justify-center items-center flex-col gap-2">
                                            <div className='text-6xl'><i className="fa-solid fa-clock-rotate-left "></i></div>
                                            <p>No transactions <br /> available</p>
                                        </div>
                                    ) :
                                    LatestTransactionsForSelectedScheme().map((item, i) => (
                                        <li key={i} className='flex  items-center 
                                        border-b border-white/10 py-3 
                                        min-w-87.5 w-fit whitespace-nowrap
                                        hover:bg-white/10 transition-all cursor-pointer px-2 rounded-lg'
                                            onClick={() => logDetails(item.occuredPeriod, item.memberName, item.date, item.description, item.amount, item.method, item.joinedDate)}>
                                            <span className='opacity-70 w-32 shrink-0'>{item.date}</span>

                                            <span className='font-medium w-30 truncate'>{item.description}</span>
                                            <span className='font-bold tabular-nums truncate max-w-25 text-right ml-3'>
                                                {typeof item.amount === 'number' && !isNaN(item.amount)
                                                    ? item.amount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })
                                                    : (item.amount || item.memberName || 'N/A')
                                                }
                                            </span>
                                        </li>


                                    ))
                            }
                        </ul>
                    </div>
                </div>


                {/* Card 4: Arrears */}
                <div className='glass p-6 text-white h-90 0verflow-hidden flex flex-col'>
                    <h2 className='text-xl font-semibold mb-6 flex items-start gap-3'>
                        <i className='fa-solid fa-triangle-exclamation text-yellow-400'></i>
                        <span>Members Behind on Payment</span>
                    </h2>
                    <ul className="glass-scroll text-md h-full overflow-y-auto">
                        {computedMembers.length === 0 ? (
                            <div className="text-center text-white/50 py-10 w-full h-full flex justify-center items-center flex-col gap-2">
                                <div className="text-6xl">
                                    <i className="fa-solid fa-coins"></i>
                                </div>
                                <p>No members behind on <br /> payment</p>
                            </div>
                        ) : (
                            computedMembers.map((member) => (
                                <li
                                    key={member.id || member.memberName}
                                    className="flex justify-around items-center border-b border-white/10 py-4 mr-2 hover:bg-white/10 transition-all cursor-pointer px-2 rounded-lg"
                                >
                                    <span className="text-white">
                                        {member.isRisk ? (
                                            <div className="flex flex-row gap-2 items-center">
                                                <p className="bg-red-300 text-red-900 p-1 rounded-md text-xs font-semibold">
                                                    Risk
                                                </p>
                                                <p>{member.memberName}</p>
                                            </div>
                                        ) : (
                                            member.memberName
                                        )}
                                    </span>

                                    <span className="text-red-500 font-bold block">
                                        {member.arrearsValue.toLocaleString("en-ZA", {
                                            currency: "ZAR",
                                            style: "currency"
                                        })}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Card 5: Helpful tips to navigate seemlessly */}
                <div className='glass glass-scroll p-6 text-white h-90 max-h-140 overflow-y-auto line-clamp-6 flex flex-col'>
                    <h2 className='text-xl font-semibold mb-6 flex items-center gap-3'>
                        <i className="fa-solid fa-lightbulb"></i> Helpful Tips
                    </h2>
                    <div className='flex-1 overflow-hidden'>
                        <ul className='glass-scroll text-md h-full overflow-y-auto'>
                            <li className='flex gap-3'><p>*</p>
                                <p>Create new Scheme using the plus sign.</p>
                            </li>
                            <li className='flex gap-3'><p>*</p>
                                <p>Change the Month & Year to look at past
                                    or future payment records.</p>
                            </li>
                            <li className='flex gap-3'><p>*</p>
                                <p>Click on a member's name to see their
                                    full payment history.</p>
                            </li>
                            <li className='flex gap-3'><p>*</p>
                                <p>Click on any entry in the Activity
                                    History to see exactly what details were changed.</p>
                            </li>
                            <li className='flex gap-3'><p>*</p>
                                <p>Use the PDF Statement or Scheme Summary
                                    buttons to generate professional reports for sharing.</p>
                            </li>
                            <li className='flex gap-3'><p>*</p>
                                <p>Check the Insights tab to see which members
                                    may need a reminder to pay.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer flex grow flex-col sm:flex-row justify-center items-center py-5 px-6 glass text-white'>
                <p>All rights reserved &copy; 2026 </p>
            </div>

            {isAddSchemeModal && (
                <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 h-screen w-screen'>
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">

                        {/* Header */}
                        <div className='flex justify-between align-center w-full text-white mb-4'>
                            <h1 className='text-2xl'>New Scheme</h1>
                            <p className='font-bold text-2xl cursor-pointer' onClick={() => setAddSchemeModal(false)}>&times;</p>
                        </div>

                        {/* Scheme Name Input */}
                        <div className='mb-2 text-xs'>
                            <h4 className='text-white/85'>Scheme Name</h4>
                            <input
                                className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white focus:outline-white text-white'
                                required
                                placeholder={`e.g. Social Club ${new Date().getFullYear()}`}
                                type='text'
                                onChange={handleSchemeNameInputChange}
                                value={newScheme}
                            />
                        </div>

                        {/* Default Contribution Input */}
                        <div className='mb-2 text-xs'>
                            <h4 className='text-white/85'>Default Monthly Contribution</h4>
                            <input
                                className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white focus:outline-white text-white '
                                required
                                type='number'
                                placeholder='R 0.00'
                                onChange={handleSchemeAmountInputChange}
                                value={newSchemeAmount}
                            />
                            <p className='text-white/60 text-[9px] w-full mt-3 mb-6'>
                                This is the default amount you expect from each member every month.
                            </p>
                        </div>

                        {/* Starting Balance Section */}
                        <div className="mb-3">
                            <label className="block text-xs font-bold uppercase text-white/60 mb-1">
                                Starting Balance (Optional)
                            </label>
                            <div className="flex mb-2">
                                <span className="flex items-center px-3 bg-white/60 border border-r-0 border-gray-300 rounded-l-lg text-white">
                                    <i className="fas fa-coins"></i>
                                </span>
                                <input
                                    type="number"
                                    id="editSchemeStartingBalance"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-r-lg text-white focus:outline-none focus:border-white"
                                    placeholder="R 0.00"
                                    onChange={handleSchemeStartingBalInputChange}
                                    value={newSchemeStartingBal}
                                />
                            </div>

                            {/* Date Selection Dropdowns */}
                            <div className="flex">
                                <span className="flex items-center px-3 bg-white/60 border border-r-0 border-gray-300 rounded-l-lg text-sm text-white">
                                    As Of
                                </span>

                                {/* Month Select */}
                                <select
                                    id="editSchemeSBMonth"
                                    onChange={handleSchemeDateInputChange}
                                    value={newSchemeDate}
                                    className="flex-1 bg-transparent px-3 py-2 text-white text-xs border border-white/60 focus:outline-none focus:border-white scheme-dark"
                                >
                                    {[
                                        "January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"
                                    ].map((month, index) => (
                                        <option key={index} value={index} className="text-black">
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                {/* Year Select */}
                                <select
                                    id="editSchemeSBYear"
                                    onChange={handleSchemeYearInputChange}
                                    value={newSchemeYear}
                                    className="w-25 bg-transparent px-3 py-2 text-white border border-l-0 border-white/60 rounded-r-lg text-xs focus:outline-none focus:border-white scheme-dark"
                                >
                                    {Array.from({ length: 2027 - 2006 + 1 }, (_, index) => 2006 + index).map((year) => (
                                        <option key={year} value={year} className="text-black">
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <small className="block mt-2 text-[9px] text-white/60 leading-normal">
                                If you have existing funds from before using this app, enter the total
                                here and select the month/year it applies to.
                            </small>

                            {/* Save Button */}
                            <button
                                className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer hover:bg-white/30'
                                onClick={saveScheme}
                            >
                                Save
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {logDetailsModal && (
                <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 h-screen w-screen'>
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
                        <div className='flex justify-between align-center w-full text-white'>
                            <h1 className='text-2xl'>Log Details</h1>
                            <p className='font-bold text-2xl cursor-pointer' onClick={() => setLogDetailsModal(false)}>&times;</p>
                        </div>

                        <div className='Username  bg-white/20 border border-white rounded-2xl mt-6 mb-3 p-3'>
                            <div className='w-full flex justify-between mb-3'>
                                <div className='flex flex-col'>
                                    <h2 className='text-md text-white/80'>{logDetailsMemberName}</h2>
                                    <p className='text-xs text-white/70'><span className='font-bold'>Description:</span> {logDetailsDescription}</p>
                                    <p className='text-xs text-white/70'>
                                        <span className='font-bold'>Amount: </span>
                                        {(() => {
                                            if (!logDetailsAmount) return "None";

                                            const cleanedAmount = String(logDetailsAmount).replace(/[^0-9.-]/g, '');
                                            const num = Number(cleanedAmount);

                                            if (!isNaN(num) && cleanedAmount !== '') {
                                                return logDetailsAmount;
                                            }

                                            return "None";
                                        })()}
                                    </p>
                                    <p className='text-xs text-white/70'><span className='font-bold'>joinedDate:</span> {new Date(logDetailsJoinedDate).toLocaleDateString('en-ZA', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</p>

                                </div>
                                <p className='text-xs text-white/70 text-right'>{logDetailsOccuredPeriod}</p>
                            </div>
                            <table className='w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-500 rounded-xl'>
                                <tr>
                                    <th className='bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 p-3 rounded-tl-xl'><td>Property</td></th>
                                    <th className='bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 p-3'><td>Old Value</td></th>
                                    <th className='bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 p-3 rounded-tr-xl'><td>New Value</td></th>
                                </tr>
                                <tbody>
                                    <td>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Amount</td></tr>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Date</td></tr>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Method</td></tr>
                                    </td>
                                    <td>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>None</td></tr>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>None</td></tr>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>None</td></tr>
                                    </td>
                                    <td>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>
                                            {(() => {
                                                if (!logDetailsAmount) return "None";

                                                const cleanedAmount = String(logDetailsAmount).replace(/[^0-9.-]/g, '');
                                                const num = Number(cleanedAmount);

                                                if (!isNaN(num) && cleanedAmount !== '') {
                                                    return logDetailsAmount;
                                                }

                                                return "None";
                                            })()}
                                        </td></tr>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>{new Date(logDetailsOccuredPeriod).toLocaleDateString('en-ZA', { timeZone: 'Africa/Johannesburg', day: 'numeric', month: 'long', year: 'numeric' })}</td></tr>
                                        <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>{logDetailsMethod === "" ? "None" : logDetailsMethod}</td></tr>
                                    </td>
                                </tbody>
                            </table>


                            {/* <h2 className='p-2 text-white'>Sam</h2>
                            <p className='p-2 text-white'>Description: {logDetailsDescription}</p>
                            <p className='p-2 text-white'>Amount: ${logDetailsAmount}</p>
                            <p className='p-2 text-white'>Date: {logDetailsDate}</p> */}
                        </div>





                        <button
                            className='w-full py-3 rounded-xl text-white mt-2 bg-white/40 cursor-pointer hover:bg-white/30'
                            onClick={() => setLogDetailsModal(false)} >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard