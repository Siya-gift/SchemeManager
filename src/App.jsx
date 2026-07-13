import './App.css'
import { useEffect, useState, useRef, useMemo } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Draggable } from "gsap/Draggable";
import crustBg from './images/bg.png'


//tabs
import Profile from './components/Profile.jsx'
import Dashboard from './components/Dashboard.jsx'
import Overlayer from './components/Overlayer.jsx'
import SchemeMembers from './components/SchemeMembers.jsx'
import Expenses from './components/Expenses.jsx'
import Insights from './components/Insights.jsx'
import ActivityHistory from './components/ActivityHistory.jsx'
import Settings from './components/Settings.jsx'

//components
import SideBar from './components/SideBar.jsx'
import MobileNav from './components/MobileNav.jsx'
import MobileMenu from './components/MobileMenu.jsx'


// gsap
gsap.registerPlugin(Draggable)


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [calenderState, setCalenderState] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const openCalender = () => setCalenderState(!calenderState);
  const [overlayer, setOverlayer] = useState(false)

  const [toggleState, setToggleState] = useState(1);
  const [toggleMobileState, settoggleMobileState] = useState(1);

  const [value, onChange] = useState(new Date());
  const formattedDate = value.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCalenderState(false);
  }, [value]);

  //props declared
  const [schemeSelectedState, setSchemeSelectedState] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("All Expenses (Year)");
  const [selectedCat, setSelectedCat] = useState("All Categories");

  //schemes
  const allSchemes = [
    {
      scheme: "clubs",
      monthlyContribution: 500.00,
      startingBal: 2000,
      date: "2020-09-01"
    },
    {
      scheme: "Section 2 Society",
      monthlyContribution: 2200.00,
      startingBal: 2000,
      date: "2020-09-01"
    },
    {
      scheme: "Billioniare Dream",
      monthlyContribution: 10050.00,
      startingBal: 2000,
      date: "2020-09-01"
    }
  ]
  const expenses = [
    {
      id: 1,
      date: "2026-03-16",
      month: "March",
      category: "Refunds / Credits Only",
      description: "Money Refund",
      amount: 32500,
      type: "Refund / Credit (Inflow)",
      schemeName: "Section 2 Society"
    },
    {
      id: 2,
      date: "2026-04-16",
      month: "April",
      category: "Other",
      description: "Tent",
      amount: 1000,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society"
    },
    {
      id: 3,
      date: "2026-05-16",
      month: "May",
      category: "Events, Venue & Equipment Hire",
      description: "Sound System",
      amount: 500,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society"
    },
    {
      id: 4,
      date: "2026-06-16",
      month: "June",
      category: "Catering & Refreshments",
      description: "2 Cows",
      amount: 20000,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society"
    },

    {
      id: 5,
      date: "2026-06-20",
      month: "June",
      category: "Catering & Refreshments",
      description: "12 Chickens",
      amount: 15000,
      type: "Expense (Outflow)",
      schemeName: "clubs"
    },
    {
      id: 6,
      date: "2026-06-26",
      month: "June",
      category: "Bulk Groceries & Goods Purchasing",
      description: "12 Chickens and Groceries",
      amount: 5430,
      type: "Expense (Outflow)",
      schemeName: "clubs"
    },
    {
      id: 7,
      date: "2026-07-26",
      month: "June",
      category: "Bulk Groceries & Goods Purchasing",
      description: "12 Chickens and Groceries",
      amount: 2230,
      type: "Expense (Outflow)",
      schemeName: "clubs"
    }
  ]

  const allMembers = [
    {
      id: 1,
      memberName: "Sam",
      totPaid: 500.00,
      status: "Paid",
      schemeName: "clubs",
      paymentDate: "2026-07-16",
      transactions: [
        { amount: 500, method: "Cash", date: "2026-07-16" }
      ]
    },
    {
      id: 2,
      memberName: "John",
      totPaid: 1120.00,
      status: "Ahead",
      schemeName: "Section 2 Society",
      paymentDate: "2026-03-16",
      transactions: [
        { amount: 1120, method: "Cash", date: "2026-03-16" }
      ]
    },
    {
      id: 3,
      memberName: "Vivian",
      totPaid: 0.00,
      status: "Arrears",
      schemeName: "Section 2 Society",
      paymentDate: "2026-03-16",
      transactions: [
        { amount: 0, method: "Cash", date: "2026-03-16" }
      ]
    },
    {
      id: 4,
      memberName: "Paul",
      totPaid: 500.00,
      status: "Paid",
      schemeName: "Section 2 Society",
      paymentDate: "2026-03-16",
      transactions: [
        { amount: 500, method: "Cash", date: "2026-03-16" }
      ]
    }
  ]

  // Add setAccordionData and wrap the array in useState
  const [accordionData, setAccordionData] = useState([
    {
      userName: "Sam",
      year: "2026",
      yearHistory: [
        { date: "2026-01-26", amount: "8000.00", details: "Cash" },
        { date: "2026-02-26", amount: "10000.00", details: "Other" },
        { date: "2026-03-26", amount: "7500.00", details: "Cash" }
      ]
    },
    {
      userName: "john",
      year: "2025",
      yearHistory: [
        { date: "2025-11-20", amount: "10000.10", details: "EFT" },
        { date: "2025-12-15", amount: "9999.50", details: "EFT" }
      ]
    },
    {
      userName: "John",
      year: "2024",
      yearHistory: [
        { date: "2024-08-15", amount: "20500.00", details: "Other" }
      ]
    }
  ]);


  const [schemes, setSchemes] = useState(() => allSchemes);
  const [newExpenses, setExpenses] = useState(() => expenses);
  // Initialize with the first scheme's name or an empty string if no schemes exist
  const [selectedSchemeName, setSelectedSchemeName] = useState(schemes[0]?.scheme || "");
  const [members, setMembers] = useState(() => allMembers);

  const [searchState, setSearchState] = useState("");
  const [payingMember, setPayingMember] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [isAddMember, setIsAddMember] = useState(false);


  const filteredExpenses = newExpenses.filter((expense) => {
    const monthQuery = selectedMonth.toLowerCase().trim();
    const catQuery = selectedCat.toLowerCase().trim();
    const schemeNameQuery = selectedSchemeName;

    const matchesMonth = monthQuery === "all expenses (year)" || expense.month.toLowerCase().includes(monthQuery);
    const matchesCategory = catQuery === "all categories" || expense.category.toLowerCase().includes(catQuery);
    const matchesSchemeName = expense.schemeName === schemeNameQuery;

    return matchesMonth && matchesCategory && matchesSchemeName;
  });

  const filteredMembers = members.filter((member) => {
    return (
      member.schemeName === selectedSchemeName &&
      member.memberName.toLowerCase().includes(searchState.toLowerCase())
    );
  });


  const schemeSelected = (idx, schemeName) => {
    setSchemeSelectedState(idx);
    setSelectedSchemeName(schemeName);
  }

  //OKRs
  const [payments, setPayments] = useState(filteredExpenses);
  const {
    totalSpentThisMonth,
    totalTransactionsThisMonth,
    totalSpentThisYear,
    totalTransactionsThisYear,
    topCategory,
    topCategoryAmount,
    topCategoryPercentage,
    totalSpentForRefundsAndCredits,
    totalTransactionsForRefundsAndCredits,
  } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Helper function to safely convert amounts to numbers (prevents string concatenation bugs like "10" + "20" = "1020")
    // Assuming your object has an 'amount' property. If it's named something else, change 'payment.amount' below.
    const getAmount = (val) => {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    // --- 1. SEPARATE REFUNDS/CREDITS VS REGULAR EXPENSES ---
    const refundPayments = filteredExpenses.filter((payment) => {
      const type = payment.type ? payment.type.trim().toLowerCase() : "";
      return type === "refund / credit (inflow)";
    });

    const regularPayments = filteredExpenses.filter((payment) => {
      const type = payment.type ? payment.type.trim().toLowerCase() : "";
      return type !== "refund / credit (inflow)";
    });

    // --- 2. CALCULATE REFUNDS/CREDITS ---
    const totalTransactionsForRefundsAndCredits = refundPayments.length;
    const totalSpentForRefundsAndCredits = refundPayments.reduce(
      (sum, payment) => sum + getAmount(payment.amount),
      0
    );

    // --- 3. CALCULATE MONTH & YEAR TOTALS (Using regularPayments) ---
    const thisMonthPayments = regularPayments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getFullYear() === currentYear && paymentDate.getMonth() === currentMonth;
    });

    const totalTransactionsThisMonth = thisMonthPayments.length;
    const totalSpentThisMonth = thisMonthPayments.reduce(
      (sum, payment) => sum + getAmount(payment.amount),
      0
    );

    const thisYearPayments = regularPayments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getFullYear() === currentYear;
    });

    const totalTransactionsThisYear = thisYearPayments.length;
    const totalSpentThisYear = thisYearPayments.reduce(
      (sum, payment) => sum + getAmount(payment.amount),
      0
    );

    // --- 4. CALCULATE TOP CATEGORY (Occurrences, Amounts, and Percentages) ---
    // We group both 'count' and 'amount' into a single object per category
    const categoryStats = regularPayments.reduce((acc, payment) => {
      const category = payment.category ? payment.category.trim() : "Unknown";
      const amount = getAmount(payment.amount);

      if (!acc[category]) {
        acc[category] = { count: 0, amount: 0 };
      }

      acc[category].count += 1;
      acc[category].amount += amount;

      return acc;
    }, {});

    // Set safe defaults in case there is no data
    let topCategory = "No Data";
    let topCategoryAmount = 0;
    let topCategoryPercentage = 0;

    const categories = Object.keys(categoryStats);

    // The safeguard we discussed: only run reduce if categories exist!
    if (categories.length > 0) {
      // Find the top category based on occurrences (count)
      topCategory = categories.reduce((a, b) =>
        categoryStats[a].count > categoryStats[b].count ? a : b
      );

      topCategoryAmount = categoryStats[topCategory].amount;

      // Calculate total spent across all regular payments to find the percentage
      const totalRegularSpent = regularPayments.reduce((sum, payment) => sum + getAmount(payment.amount), 0);

      if (totalRegularSpent > 0) {
        // Calculate percentage and round to 2 decimal places
        topCategoryPercentage = Number(((topCategoryAmount / totalRegularSpent) * 100).toFixed(2));
      }
    }

    // --- 5. RETURN ALL CALCULATED VALUES ---
    return {
      totalSpentThisMonth,
      totalTransactionsThisMonth,
      totalSpentThisYear,
      totalTransactionsThisYear,
      topCategory,
      topCategoryAmount,
      topCategoryPercentage,
      totalSpentForRefundsAndCredits,
      totalTransactionsForRefundsAndCredits,
    };
  }, [filteredExpenses]);

  let activeTab = (idx) => {
    setToggleState(idx)
  }
  let toggleTabMobile = (idx) => {
    settoggleMobileState(idx)
  }

  const financialData = filteredExpenses.reduce((acc, expense) => {
    const type = expense.type ? expense.type.toLowerCase().trim() : "";
    const amount = Number(expense.amount) || 0;

    if (type === "refund / credit (inflow)") {
      acc.moneyIn += amount;
    } else {
      acc.moneyOut += amount;
    }

    return acc;
  }, { moneyIn: 0, moneyOut: 0 });
  const netDifference = financialData.moneyIn - financialData.moneyOut;

  const handleConfirmPayment = (amount, method, date) => {
    const numericAmount = parseFloat(amount);
    const paymentYear = date.split('-')[0]; // Extracts "YYYY" from "YYYY-MM-DD"

    // 1. Update the main Members table (Total Paid)
    setMembers(prevMembers =>
      prevMembers.map(m =>
        m.memberName === payingMember
          ? {
            ...m,
            totPaid: m.totPaid + numericAmount,
            transactions: [...(m.transactions || []), { amount: numericAmount, method, date }],
            paymentDate: date // Update the payment date to today
          }
          : m
      )
    );

    // 2. Update the Accordion History Data
    setAccordionData(prevData => {
      // Check if the user already has a history array for this specific year
      const existingYearIndex = prevData.findIndex(
        item => (item.userName || "").toLowerCase() === payingMember.toLowerCase() && item.year === paymentYear
      );

      const newTransaction = {
        date: date,
        amount: numericAmount.toFixed(2),
        details: method
      };

      if (existingYearIndex >= 0) {
        // The year already exists, push the new transaction into its yearHistory
        const updatedData = [...prevData];
        updatedData[existingYearIndex] = {
          ...updatedData[existingYearIndex],
          yearHistory: [newTransaction, ...updatedData[existingYearIndex].yearHistory] // Adds to top of list
        };
        return updatedData;
      } else {
        return [
          {
            userName: payingMember,
            year: paymentYear,
            yearHistory: [newTransaction]
          },
          ...prevData
        ];
      }
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  let memberIndex = 0;

  const addMore = () => {

    let members = document.getElementById('AddMoreMembers');
    memberIndex++;

    members.innerHTML += `<div class="flex gap-2 items-center flex-row mt-3 w-full" id="member-${memberIndex}">
  <input class="border-white border rounded-xl p-3 
  focus:border-white focus:outline-white text-white 
  w-full member-name-input" type="text" placeholder="Enter Member Name" />
  <p class="border border-white rounded-xl w-12 h-12 
  grid place-content-center text-white shrink-0 hover:-translate-y-1
  cursor-pointer" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-trash"></i>
  </p>
  </div>`;
  };

  const saveMember = () => {
    const dynamicInputs = document.querySelectorAll('.member-name-input');
    const dynamicNames = Array.from(dynamicInputs)
      .map(input => input.value.trim())
      .filter(name => name !== "");

    const membersToAdd = [];

    if (newMember.trim()) {
      membersToAdd.push({
        id: `new-${Date.now()}-${Math.random()}`,
        memberName: newMember.trim(),
        totPaid: 0,
        status: "Pending",
        schemeName: selectedSchemeName,
        paymentDate: new Date().toISOString().split('T')[0],
        transactions: [
          { amount: 0, method: paymentMethod, date: new Date().toISOString().split('T')[0] }
        ]
      });
    }

    dynamicNames.forEach((name, idx) => {
      membersToAdd.push({
        id: `dynamic-${Date.now()}-${idx}`,
        memberName: name,
        totPaid: 0,
        status: "Pending",
        schemeName: selectedSchemeName,
        paymentDate: new Date().toISOString().split('T')[0],
        transactions: [
          { amount: 0, method: paymentMethod, date: new Date().toISOString().split('T')[0] }
        ]
      });
    });

    if (membersToAdd.length === 0) return;

    setMembers((prev) => [...prev, ...membersToAdd]);
    setNewMember("");
    setIsAddMember(false);

    const membersContainer = document.getElementById('AddMoreMembers');
    if (membersContainer) membersContainer.innerHTML = "";
    memberIndex = 0;
  };


  const [totalSchemeYearlyContribution, setTotalSchemeYearlyContribution] = useState(0);
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    setTotalSchemeYearlyContribution(
      members.filter((member) => {
        const memberYear = new Date(member.paymentDate).getFullYear();
        return memberYear === currentYear && member.schemeName === selectedSchemeName;
      }).reduce((total, curr) => total + curr.totPaid, 0)
    )
  }, [handleConfirmPayment])

  const [totalSchemeMonthlyContribution, setTotalSchemeMonthlyContribution] = useState(0);
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const total = members
      .filter(member => member.schemeName === selectedSchemeName)
      .reduce((sum, member) => {
        const monthlyTotal = (member.transactions || []).reduce((txSum, tx) => {
          const txDate = new Date(tx.date);

          if (
            txDate.getMonth() === currentMonth &&
            txDate.getFullYear() === currentYear
          ) {
            return txSum + Number(tx.amount);
          }

          return txSum;
        }, 0);

        return sum + monthlyTotal;
      }, 0);

    setTotalSchemeMonthlyContribution(total);
  }, [members, selectedSchemeName]);

  const [yearlyTarget, setYearlyTarget] = useState(0);
  useEffect(() => {
    setYearlyTarget(
      (schemes.find(scheme => scheme.scheme === selectedSchemeName)?.monthlyContribution * filteredMembers.length * 12)
    );
  }, [saveMember, handleConfirmPayment, selectedSchemeName, filteredMembers.length]);

  const [monthlyTarget, setMonthlyTarget] = useState(0);
  useEffect(() => {
    setMonthlyTarget(
      (schemes.find(scheme => scheme.scheme === selectedSchemeName)?.monthlyContribution * filteredMembers.length)
    );
  }, [saveMember, handleConfirmPayment, selectedSchemeName, filteredMembers.length]);

  const [totalCash, setTotalCash] = useState({ monthly: 0, yearly: 0 });
  const [totalEFT, setTotalEFT] = useState({ monthly: 0, yearly: 0 });
  const [totalOther, setTotalOther] = useState({ monthly: 0, yearly: 0 });

  useEffect(() => {
    const filteredPaymentMethodAmount = () => {
      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      return members
        .filter((member) => member.schemeName === selectedSchemeName)
        .reduce((sums, member) => {
          member.transactions
            .filter((tx) => tx.method === "Cash")
            .forEach((tx) => {
              const txDate = new Date(tx.date);
              if (txDate.getFullYear() === currYear) {
                sums.yearly += tx.amount;
                if (txDate.getMonth() === currMonth) {
                  sums.monthly += tx.amount;
                }
              }
            });
          return sums;
        }, { monthly: 0, yearly: 0 });
    };
    setTotalCash(filteredPaymentMethodAmount());
  }, [members, selectedSchemeName]);

  useEffect(() => {
    const filteredPaymentMethodAmount = () => {
      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      return members
        .filter((member) => member.schemeName === selectedSchemeName)
        .reduce((sums, member) => {
          member.transactions
            .filter((tx) => tx.method === "EFT")
            .forEach((tx) => {
              const txDate = new Date(tx.date);
              if (txDate.getFullYear() === currYear) {
                sums.yearly += tx.amount;
                if (txDate.getMonth() === currMonth) {
                  sums.monthly += tx.amount;
                }
              }
            });
          return sums;
        }, { monthly: 0, yearly: 0 });
    };
    setTotalEFT(filteredPaymentMethodAmount());
  }, [members, selectedSchemeName]);

  useEffect(() => {
    const filteredPaymentMethodAmount = () => {
      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      return members
        .filter((member) => member.schemeName === selectedSchemeName)
        .reduce((sums, member) => {
          member.transactions
            .filter((tx) => tx.method === "Other" || tx.method === "Mobile Money" || tx.method === "Direct Deposit")
            .forEach((tx) => {
              const txDate = new Date(tx.date);
              if (txDate.getFullYear() === currYear) {
                sums.yearly += tx.amount;
                if (txDate.getMonth() === currMonth) {
                  sums.monthly += tx.amount;
                }
              }
            });
          return sums;
        }, { monthly: 0, yearly: 0 });
    };
    setTotalOther(filteredPaymentMethodAmount());
  }, [members, selectedSchemeName]);


  const getMemberStatus = (member, scheme) => {
    if (!member || !scheme || typeof scheme.monthlyContribution === 'undefined') {
      return "Pending";
    }

    const totPaid = member.totPaid || 0;
    const monthlyFee = scheme.monthlyContribution;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); 

    // total amount paid ONLY during this current month
    const transactions = member.transactions || [];
    const paidThisMonth = transactions
      .filter(tx => {
        if (!tx.date) return false;
        const txDate = new Date(tx.date);
        return txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth;
      })
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    if (totPaid === 0) {
      return "Pending";
    }

    // Calculate how long they have been a member
    const startDateStr = member.paymentDate || new Date().toISOString().split('T')[0];
    const startDate = new Date(startDateStr);
    const monthsElapsed = (currentYear - startDate.getFullYear()) * 12 + (currentMonth - startDate.getMonth());

    if (monthsElapsed >= 2 && paidThisMonth === 0) {
      return "Arrears";
    }

    if (paidThisMonth > monthlyFee) {
      return "Ahead";
    }

    if (paidThisMonth === monthlyFee && monthlyFee > 0) {
      return "Paid";
    }

    return "Partially Paid";
  };



  
  return (
    <>
      {/* calender */}
      {calenderState && (
        <div
          className='fixed top-0 left-0 w-screen h-screen bg-black/70 z-999999'
          onClick={() => setCalenderState(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-1/8 left-1/2 -translate-x-1/2 -translate-y-1/8"
          >
            <Calendar
              onChange={onChange}
              value={value}
              calenderState={calenderState}
              setCalenderState={setCalenderState}
            />
          </div>
        </div>
      )}



      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} overlayer={overlayer} setOverlayer={setOverlayer} selectedSchemeName={selectedSchemeName} />
      <div className='flex overflow-hidden'>
        <SideBar toggleState={toggleState} setToggleState={setToggleState} activeTab={activeTab} selectedSchemeName={selectedSchemeName} />
        <Profile toggleState={toggleState} />
        <Dashboard toggleState={toggleState} toggleMobileState={toggleMobileState} overlayer={overlayer}
          openCalender={openCalender} formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes}
          schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState} setSchemeSelectedState={setSchemeSelectedState}
          totalSpentThisMonth={totalSpentThisMonth} activeTab={activeTab} toggleTabMobile={toggleTabMobile} financialData={financialData} netDifference={netDifference}
          totalSchemeYearlyContribution={totalSchemeYearlyContribution} totalSchemeMonthlyContribution={totalSchemeMonthlyContribution} yearlyTarget={yearlyTarget} monthlyTarget={monthlyTarget}
          totalCash={totalCash} totalEFT={totalEFT} totalOther={totalOther} members={members} selectedSchemeName={selectedSchemeName} getMemberStatus={getMemberStatus} allMembers={allMembers}
          filteredMembers={filteredMembers} 
        />
        <Overlayer overlayer={overlayer} toggleMenu={toggleMenu} />
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender}
          formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes} schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState}
          setSchemeSelectedState={setSchemeSelectedState} selectedSchemeName={selectedSchemeName} allMembers={allMembers} handleConfirmPayment={handleConfirmPayment}
          totalSchemeYearlyContribution={totalSchemeYearlyContribution} filteredMembers={filteredMembers} members={members} setMembers={setMembers} searchState={searchState}
          setSearchState={setSearchState} payingMember={payingMember} setPayingMember={setPayingMember} accordionData={accordionData} setAccordionData={setAccordionData}
          saveMember={saveMember} addMore={addMore} newMember={newMember} setNewMember={setNewMember} isAddMember={isAddMember} setIsAddMember={setIsAddMember} setPaymentMethod={setPaymentMethod}
          getMemberStatus={getMemberStatus}
        />
        <Expenses toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender} formattedDate={formattedDate}
          newExpenses={newExpenses} setExpenses={setExpenses} filteredExpenses={filteredExpenses} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          selectedCat={selectedCat} setSelectedCat={setSelectedCat} payments={payments} setPayments={setPayments} totalSpentThisMonth={totalSpentThisMonth}
          totalTransactionsThisMonth={totalTransactionsThisMonth} totalSpentThisYear={totalSpentThisYear} totalTransactionsThisYear={totalTransactionsThisYear} topCategory={topCategory}
          topCategoryAmount={topCategoryAmount} topCategoryPercentage={topCategoryPercentage} totalSpentForRefundsAndCredits={totalSpentForRefundsAndCredits} totalTransactionsForRefundsAndCredits={totalTransactionsForRefundsAndCredits}
          selectedSchemeName={selectedSchemeName} financialData={financialData} netDifference={netDifference}
        />
        <Insights toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} />
        <ActivityHistory toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} />
        <Settings toggleState={toggleState} toggleMobileState={toggleMobileState} />
      </div>
      <MobileMenu isOpen={isOpen} toggleMobileState={toggleMobileState} toggleMenu={toggleMenu} settoggleMobileState={settoggleMobileState} toggleTabMobile={toggleTabMobile} />
    </>
  )
}

export default App
