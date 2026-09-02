import './App.css'
import { useEffect, useState, useRef, useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast'
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
      date: "2026-01-01"
    },
    {
      scheme: "Section 2 Society",
      monthlyContribution: 2200.00,
      startingBal: 2000,
      date: "2026-01-02"
    },
    {
      scheme: "Billioniare Dream",
      monthlyContribution: 10050.00,
      startingBal: 2000,
      date: "2026-01-03"
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
      totPaid: 1500.00,
      status: "Paid",
      schemeName: "clubs",
      joinedDate: "2026-05-16",
      transactions: [
        { amount: 500, method: "Cash", date: "2026-05-16" },
        { amount: 500, method: "Cash", date: "2026-06-16" },
        { amount: 500, method: "Cash", date: "2026-07-16" },
      ]
    },
    {
      id: 2,
      memberName: "John",
      totPaid: 1120.00,
      status: "Ahead",
      schemeName: "Section 2 Society",
      joinedDate: "2026-03-16",
      transactions: [
        { amount: 1120, method: "Cash", date: "2026-03-16" }
      ]
    },
    {
      id: 3,
      memberName: "Vivian",
      totPaid: 2200.00,
      status: "Ahead",
      schemeName: "Section 2 Society",
      joinedDate: "2026-03-16",
      transactions: [
        { amount: 2200.00, method: "Cash", date: "2026-03-16" }
      ]
    },
    {
      id: 4,
      memberName: "Paul",
      totPaid: 500.00,
      status: "Paid",
      schemeName: "Section 2 Society",
      joinedDate: "2026-03-16",
      transactions: [
        { amount: 500, method: "Cash", date: "2026-03-16" }
      ]
    },
    {
      id: 5,
      memberName: "Jol",
      totPaid: 500.00,
      status: "Arrears",
      schemeName: "clubs",
      joinedDate: "2024-12-16",
      transactions: [
        { amount: 500, method: "Cash", date: "2024-12-16" }
      ]
    }
  ]

  const [accordionData, setAccordionData] = useState([
    {
      userName: "Sam",
      year: "2026",
      yearHistory: [
        { date: "2026-07-16", amount: "500.00", details: "Cash" },
        { date: "2026-05-16", amount: "500.00", details: "Cash" },
        { date: "2026-04-16", amount: "500.00", details: "Cash" }
      ]
    },
    {
      userName: "John",
      year: "2026",
      yearHistory: [
        { date: "2026-03-16", amount: "1120.00", details: "Cash" }
      ]
    },
    {
      userName: "Vivian",
      year: "2026",
      yearHistory: [
        { date: "2026-03-16", amount: "2200.00", details: "Cash" }
      ]
    },
    {
      userName: "Paul",
      year: "2026",
      yearHistory: [
        { date: "2026-03-16", amount: "500.00", details: "Cash" }
      ]
    },
    {
      userName: "Jol",
      year: "2025",
      yearHistory: [
        { date: "2025-12-16", amount: "500.00", details: "Cash" }
      ]
    },
    {
      userName: "Jol",
      year: "2026",
      yearHistory: []
    }
  ]);

  const [LatestTransactions, setLatestTransactions] = useState([
    {
      occuredPeriod: "Jul 18, 2026, 10:30 AM",
      memberName: "Jol",
      transactionScheme: "clubs",
      date: "18 Jul 2026",
      description: "Payment",
      amount: 500.00,
      joinedDate: "2024-12-16", 
      method: "Cash"
    },
    {
      occuredPeriod: "Jul 18, 2026, 10:30 AM",
      memberName: "Jol",
      transactionScheme: "clubs",
      date: "18 Jul 2026",
      description: "Payment",
      amount: 400.00,
      joinedDate: "2024-12-16",
      method: "Cash"
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
  const [membersBehindStatus, setMembersBehindStatus] = useState("");


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
      const joinedDate = new Date(payment.date);
      return joinedDate.getFullYear() === currentYear && joinedDate.getMonth() === currentMonth;
    });

    const totalTransactionsThisMonth = thisMonthPayments.length;
    const totalSpentThisMonth = thisMonthPayments.reduce(
      (sum, payment) => sum + getAmount(payment.amount),
      0
    );

    const thisYearPayments = regularPayments.filter((payment) => {
      const joinedDate = new Date(payment.date);
      return joinedDate.getFullYear() === currentYear;
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

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }

    const paymentYear = date.split("-")[0];

    // 1. Update Members table
    setMembers(prevMembers =>
      prevMembers.map(member => {

        if (
          member.memberName.toLowerCase() !==
          payingMember.toLowerCase()
        ) {
          return member;
        }

        const updatedTransactions = [
          ...(member.transactions || []),
          {
            amount: numericAmount,
            method,
            date
          }
        ];

        const updatedTotPaid =
          (Number(member.totPaid) || 0) + numericAmount;

        return {
          ...member,
          totPaid: updatedTotPaid,
          transactions: updatedTransactions
        };
      })
    );

    //2 update Latest Transactions
    setLatestTransactions(prevTransactions => [
      {
        occuredPeriod: new Date().toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        memberName: payingMember,
        transactionScheme: selectedSchemeName,
        date: new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        description: `Payment`,
        amount: `${numericAmount.toLocaleString('en-ZA',{currency:'ZAR', style:'currency'})}`,
        method: method,
        joinedDate: members.find(member => member.memberName.toLowerCase() === payingMember.toLowerCase())?.joinedDate || "N/A"
      },
      ...prevTransactions
    ]);

    // 3. Update Accordion History
    setAccordionData(prevData => {

      const existingYearIndex = prevData.findIndex(
        item =>
          (item.userName || "").toLowerCase() ===
          payingMember.toLowerCase() &&
          item.year === paymentYear
      );

      const newTransaction = {
        date: date,
        amount: numericAmount.toFixed(2),
        details: method
      };


      // Year already exists
      if (existingYearIndex >= 0) {

        const updatedData = [...prevData];

        updatedData[existingYearIndex] = {
          ...updatedData[existingYearIndex],

          yearHistory: [
            newTransaction,
            ...(updatedData[existingYearIndex].yearHistory || [])
          ]
        };

        return updatedData;
      }


      // New year
      return [
        {
          userName: payingMember,
          year: paymentYear,
          yearHistory: [newTransaction]
        },
        ...prevData
      ];
    });

    toast.success("Payment successful", { className: 'notifier_bg' });
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  let memberIndex = 0;

  const addMore = () => {

    let members = document.getElementById('AddMoreMembers');
    // setDynamicMembers(prev => [...prev, ""]);
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

  const saveMember = (e) => {
    e.preventDefault();

    const existingNamesSet = new Set(
      members.map((m) =>
        m.memberName.trim().toLowerCase()
      )
    );

    const dynamicInputs =
      document.querySelectorAll('.member-name-input');

    const dynamicNames = Array.from(dynamicInputs)
      .map((input) => input.value.trim())
      .filter(
        (name) =>
          name !== "" &&
          !existingNamesSet.has(name.toLowerCase())
      );

    const membersToAdd = [];

    const currentDate =
      new Date().toISOString().split("T")[0];

    const currentYear =
      currentDate.split("-")[0];

    const mainMemberName = newMember.trim();


    // ==================================================
    // MAIN MEMBER
    // ==================================================

    if (
      mainMemberName &&
      !existingNamesSet.has(mainMemberName.toLowerCase())
    ) {
      membersToAdd.push({
        id: `new-${Date.now()}-${Math.random()}`,
        memberName: mainMemberName,
        totPaid: 0,
        status: "Pending",
        schemeName: selectedSchemeName,
        joinedDate: currentDate,
        transactions: [
          {
            amount: 0,
            method: paymentMethod,
            date: currentDate
          }
        ]
      });

      existingNamesSet.add(
        mainMemberName.toLowerCase()
      );
    }


    // ==================================================
    // DYNAMIC MEMBERS
    // ==================================================

    let transactionsIdx = 0;

    dynamicNames.forEach((name, idx) => {

      const lowerName = name.toLowerCase();
      transactionsIdx = idx;

      if (!existingNamesSet.has(lowerName)) {

        membersToAdd.push({
          id: `dynamic-${Date.now()}-${idx}-${Math.random()}`,
          memberName: name,
          totPaid: 0,
          status: "Pending",
          schemeName: selectedSchemeName,
          joinedDate: currentDate,
          transactions: [
            {
              amount: 0,
              method: paymentMethod,
              date: currentDate
            }
          ]
        });

        existingNamesSet.add(lowerName);
      }
    });

    // ==================================================
    // UPDATE LATEST TRANSACTIONS
    // ==================================================
    setLatestTransactions(prevTransactions => [
      {
        occuredPeriod: new Date().toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        memberName: `${membersToAdd.map(m => m.memberName).join(", ") || mainMemberName || "N/A"}`,
        transactionScheme: selectedSchemeName,
        date: new Date(currentDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        description: `${membersToAdd.length === 1 ? "New Member" : "New Members"} Added`,
        amount: `${membersToAdd.map(m => m.memberName).join(", ") || mainMemberName || "N/A"}`,
        method: "",
        joinedDate: `${membersToAdd.map(m => m.joinedDate).join(", ") || currentDate}`
      },
      ...prevTransactions
    ]);


    // Nothing new to add
    if (membersToAdd.length === 0) {
      toast.error("Nothing to save", { className: 'notifier_bg' });
      return;
    }


    // ==================================================
    // UPDATE MEMBERS
    // ==================================================

    setMembers((prev) => [
      ...prev,
      ...membersToAdd
    ]);


    // ==================================================
    // UPDATE ACCORDION DATA
    // ==================================================

    setAccordionData((prev) => {

      const newHistory = membersToAdd.map((newMember) => ({
        userName: newMember.memberName,
        year: currentYear,
        yearHistory: []
      }));

      return [
        ...prev,
        ...newHistory
      ];
    });


    // ==================================================
    // RESET FORM
    // ==================================================

    setNewMember("");
    setIsAddMember(false);


    // Clear dynamic inputs
    dynamicInputs.forEach((input) => {
      input.value = "";
    });


    const membersContainer =
      document.getElementById("AddMoreMembers");

    if (membersContainer) {
      membersContainer.innerHTML = "";
    }

    //notify success
    toast.success('Saved successfully', { className: 'notifier_bg' });

  };

  const [totalSchemeYearlyContribution, setTotalSchemeYearlyContribution] = useState(0);
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    setTotalSchemeYearlyContribution(
      members.filter((member) => {
        const memberYear = new Date(member.joinedDate).getFullYear();
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
    if (
      !member ||
      !scheme ||
      typeof scheme.monthlyContribution === "undefined"
    ) {
      return "Pending";
    }

    const monthlyFee =
      Number(scheme.monthlyContribution) || 0;

    if (monthlyFee <= 0) {
      return "Pending";
    }

    const transactions = member.transactions || [];

    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // =========================================================
    // 1. MEMBER JOINED DATE
    // =========================================================

    if (!member.joinedDate) {
      return "Pending";
    }

    const joinedDate = new Date(member.joinedDate);

    if (isNaN(joinedDate.getTime())) {
      return "Pending";
    }

    const startYear = joinedDate.getFullYear();
    const startMonth = joinedDate.getMonth();


    // =========================================================
    // 2. MONTHS COMPLETED BEFORE CURRENT MONTH
    //
    // Example:
    // Joined: May
    // Current: August
    //
    // Completed months:
    // May, June, July = 3
    //
    // August is NOT included yet.
    // =========================================================

    const previousMonthsCount = Math.max(
      0,
      (currentYear - startYear) * 12 +
      (currentMonth - startMonth)
    );


    // =========================================================
    // 3. EXPECTED PAYMENT FOR PREVIOUS MONTHS
    // =========================================================

    const expectedBeforeCurrentMonth =
      previousMonthsCount * monthlyFee;


    // =========================================================
    // 4. TOTAL PAID BEFORE CURRENT MONTH
    // =========================================================

    const paidBeforeCurrentMonth = transactions
      .filter(tx => {
        if (!tx.date) return false;

        const txDate = new Date(tx.date);

        return (
          txDate.getFullYear() < currentYear ||
          (
            txDate.getFullYear() === currentYear &&
            txDate.getMonth() < currentMonth
          )
        );
      })
      .reduce(
        (sum, tx) =>
          sum + (Number(tx.amount) || 0),
        0
      );


    // =========================================================
    // 5. PREVIOUS ARREARS
    //
    // Current month is NOT included here.
    // =========================================================

    const previousArrears = Math.max(
      0,
      expectedBeforeCurrentMonth -
      paidBeforeCurrentMonth
    );


    // =========================================================
    // 6. CURRENT MONTH PAYMENT
    // =========================================================

    const paidThisMonth = transactions
      .filter(tx => {
        if (!tx.date) return false;

        const txDate = new Date(tx.date);

        return (
          txDate.getFullYear() === currentYear &&
          txDate.getMonth() === currentMonth
        );
      })
      .reduce(
        (sum, tx) =>
          sum + (Number(tx.amount) || 0),
        0
      );


    // =========================================================
    // 7. NO PREVIOUS ARREARS
    // =========================================================

    if (previousArrears === 0) {

      if (paidThisMonth === 0) {
        return "Awaiting Payment";
      }

      if (paidThisMonth < monthlyFee) {
        return "Partially Paid";
      }

      if (paidThisMonth === monthlyFee) {
        return "Paid";
      }

      if (paidThisMonth > monthlyFee) {
        return "Ahead";
      }
    }


    // =========================================================
    // 8. PREVIOUS ARREARS EXIST
    //
    // Current month's payment must first clear the
    // old arrears, then satisfy the current month.
    // =========================================================

    const amountNeededToBecomePaid =
      previousArrears + monthlyFee;


    // Still clearing old arrears/current contribution
    if (paidThisMonth < amountNeededToBecomePaid) {
      return "Arrears";
    }


    // Old arrears cleared + current month paid
    if (paidThisMonth === amountNeededToBecomePaid) {
      return "Paid";
    }


    // More than everything required
    if (paidThisMonth > amountNeededToBecomePaid) {
      return "Ahead";
    }


    return "Pending";
  };

  const getMemberArrears = (member, scheme) => {
    if (!member || !scheme) { return 0; }

    const monthlyFee = Number(scheme.monthlyContribution) || 0;
    if (monthlyFee <= 0) { return 0; }
    if (!member.joinedDate) { return 0; }

    const joinedDate = new Date(member.joinedDate);
    if (isNaN(joinedDate.getTime())) { return 0; }

    const transactions = member.transactions || [];
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const startYear = joinedDate.getFullYear();
    const startMonth = joinedDate.getMonth();

    // 1. Include the current month in the expected count
    const totalMonthsCount = Math.max(
      0,
      (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1
    );

    // 2. Total expected fees up to right now
    const totalExpected = totalMonthsCount * monthlyFee;

    // 3. Sum ALL payments made up to today (including current month)
    const totalPaid = transactions
      .filter(tx => {
        if (!tx.date) return false;
        const txDate = new Date(tx.date);
        // Keep all transactions up to today
        return txDate <= today;
      })
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    // 4. Calculate real-time arrears
    const currentArrears = Math.max(0, totalExpected - totalPaid);

    return currentArrears;
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

      <Toaster />

      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} overlayer={overlayer} setOverlayer={setOverlayer} selectedSchemeName={selectedSchemeName} />
      <div className='flex overflow-hidden'>
        <SideBar toggleState={toggleState} setToggleState={setToggleState} activeTab={activeTab} selectedSchemeName={selectedSchemeName} />
        <Profile toggleState={toggleState} />
        <Dashboard toggleState={toggleState} toggleMobileState={toggleMobileState} overlayer={overlayer}
          openCalender={openCalender} formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes}
          schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState} setSchemeSelectedState={setSchemeSelectedState} handleConfirmPayment={handleConfirmPayment}
          totalSpentThisMonth={totalSpentThisMonth} activeTab={activeTab} toggleTabMobile={toggleTabMobile} financialData={financialData} netDifference={netDifference}
          totalSchemeYearlyContribution={totalSchemeYearlyContribution} totalSchemeMonthlyContribution={totalSchemeMonthlyContribution} yearlyTarget={yearlyTarget} monthlyTarget={monthlyTarget}
          totalCash={totalCash} totalEFT={totalEFT} totalOther={totalOther} members={members} selectedSchemeName={selectedSchemeName} getMemberStatus={getMemberStatus} allMembers={allMembers}
          filteredMembers={filteredMembers} membersBehindStatus={membersBehindStatus} getMemberArrears={getMemberArrears} LatestTransactions={LatestTransactions}
        />
        <Overlayer overlayer={overlayer} toggleMenu={toggleMenu} />
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender}
          formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes} schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState}
          setSchemeSelectedState={setSchemeSelectedState} selectedSchemeName={selectedSchemeName} allMembers={allMembers} handleConfirmPayment={handleConfirmPayment}
          totalSchemeYearlyContribution={totalSchemeYearlyContribution} filteredMembers={filteredMembers} members={members} setMembers={setMembers} searchState={searchState}
          setSearchState={setSearchState} payingMember={payingMember} setPayingMember={setPayingMember} accordionData={accordionData} setAccordionData={setAccordionData}
          saveMember={saveMember} addMore={addMore} newMember={newMember} setNewMember={setNewMember} isAddMember={isAddMember} setIsAddMember={setIsAddMember} setPaymentMethod={setPaymentMethod}
          getMemberStatus={getMemberStatus} toast={toast} setLatestTransactions={setLatestTransactions}
        />
        <Expenses toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender} formattedDate={formattedDate}
          newExpenses={newExpenses} setExpenses={setExpenses} filteredExpenses={filteredExpenses} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          selectedCat={selectedCat} setSelectedCat={setSelectedCat} payments={payments} setPayments={setPayments} totalSpentThisMonth={totalSpentThisMonth}
          totalTransactionsThisMonth={totalTransactionsThisMonth} totalSpentThisYear={totalSpentThisYear} totalTransactionsThisYear={totalTransactionsThisYear} topCategory={topCategory}
          topCategoryAmount={topCategoryAmount} topCategoryPercentage={topCategoryPercentage} totalSpentForRefundsAndCredits={totalSpentForRefundsAndCredits} totalTransactionsForRefundsAndCredits={totalTransactionsForRefundsAndCredits}
          selectedSchemeName={selectedSchemeName} financialData={financialData} netDifference={netDifference} setLatestTransactions={setLatestTransactions}
        />
        <Insights toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} openCalender={openCalender} />
        <ActivityHistory toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} openCalender={openCalender} LatestTransactions={LatestTransactions} />
        <Settings toggleState={toggleState} toggleMobileState={toggleMobileState} />
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} toggleMobileState={toggleMobileState} toggleMenu={toggleMenu} settoggleMobileState={settoggleMobileState} toggleTabMobile={toggleTabMobile} />
    </>
  )
}

export default App
