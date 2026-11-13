import "./App.css";
import { useEffect, useState, useRef, useMemo } from "react";
import Lenis from 'lenis';
import toast, { Toaster } from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Draggable } from "gsap/Draggable";
import crustBg from "./images/bg.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//tabs
import Profile from "./components/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Overlayer from "./components/Overlayer.jsx";
import SchemeMembers from "./components/SchemeMembers.jsx";
import Expenses from "./components/Expenses.jsx";
import Insights from "./components/Insights.jsx";
import ActivityHistory from "./components/ActivityHistory.jsx";
import Settings from "./components/Settings.jsx";
import System from "./components/System.jsx";
import HomePage from "./components/HomePage.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";

//components
import SideBar from "./components/SideBar.jsx";
import MobileNav from "./components/MobileNav.jsx";
import MobileMenu from "./components/MobileMenu.jsx";
import HomeMobileMenu from "./components/HomeMobileMenu.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import { supabase } from "./lib/supabaseClient.js";

// gsap
gsap.registerPlugin(Draggable);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [calenderState, setCalenderState] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const openCalender = () => setCalenderState(!calenderState);
  const [overlayer, setOverlayer] = useState(false);

  const [toggleState, setToggleState] = useState(1);
  const [toggleMobileState, settoggleMobileState] = useState(1);

  const [value, onChange] = useState(new Date());
  const formattedDate = value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCalenderState(false);
  }, [value]);

  //smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, [])

  //props declared
  const [schemeSelectedState, setSchemeSelectedState] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("All Expenses (Year)");
  const [selectedCat, setSelectedCat] = useState("All Categories");

  const [logDetailsModal, setLogDetailsModal] = useState(false);
  const [logDetailsMemberName, setLogDetailsMemberName] = useState();
  const [logDetailsOccuredPeriod, setLogDetailsOccuredPeriod] = useState();
  const [logDetailsDate, setLogDetailsDate] = useState();
  const [logDetailsDescription, setLogDetailsDescription] = useState();
  const [logDetailsAmount, setLogDetailsAmount] = useState();
  const [logDetailsMethod, setLogDetailsMethod] = useState();
  const [logDetailsJoinedDate, setLogDetailsJoinedDate] = useState();
  const [isEditMember, setIsEditMember] = useState(false);

  const [isAddSchemeModal, setAddSchemeModal] = useState(false);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const activeAuthUserId = useRef(null);

  //schemes
  const expenses = [
    {
      id: 1,
      date: "2026-03-16",
      month: "March",
      category: "Refunds / Credits Only",
      description: "Money Refund",
      amount: 32500,
      type: "Refund / Credit (Inflow)",
      schemeName: "Section 2 Society",
    },
    {
      id: 2,
      date: "2026-04-16",
      month: "April",
      category: "Other",
      description: "Tent",
      amount: 1000,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society",
    },
    {
      id: 3,
      date: "2026-05-16",
      month: "May",
      category: "Events, Venue & Equipment Hire",
      description: "Sound System",
      amount: 500,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society",
    },
    {
      id: 4,
      date: "2026-06-16",
      month: "June",
      category: "Catering & Refreshments",
      description: "2 Cows",
      amount: 20000,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society",
    },

    {
      id: 5,
      date: "2026-06-20",
      month: "June",
      category: "Catering & Refreshments",
      description: "12 Chickens",
      amount: 15000,
      type: "Expense (Outflow)",
      schemeName: "clubs",
    },
    {
      id: 6,
      date: "2026-06-26",
      month: "June",
      category: "Bulk Groceries & Goods Purchasing",
      description: "12 Chickens and Groceries",
      amount: 5430,
      type: "Expense (Outflow)",
      schemeName: "clubs",
    },
    {
      id: 7,
      date: "2026-07-26",
      month: "June",
      category: "Bulk Groceries & Goods Purchasing",
      description: "12 Chickens and Groceries",
      amount: 2230,
      type: "Expense (Outflow)",
      schemeName: "clubs",
    },
  ];

  const allMembers = [
    {
      id: 1,
      memberName: "Sam",
      totPaid: 1500.0,
      status: "Paid",
      schemeName: "clubs",
      joinedDate: "2026-05-16",
      transactions: [
        { amount: 500, method: "Cash", date: "2026-05-16" },
        { amount: 500, method: "Cash", date: "2026-06-16" },
        { amount: 500, method: "Cash", date: "2026-07-16" },
      ],
    },
    {
      id: 2,
      memberName: "John",
      totPaid: 1120.0,
      status: "Ahead",
      schemeName: "Section 2 Society",
      joinedDate: "2026-03-16",
      transactions: [{ amount: 1120, method: "Cash", date: "2026-03-16" }],
    },
    {
      id: 3,
      memberName: "Vivian",
      totPaid: 22200.0,
      status: "Ahead",
      schemeName: "Section 2 Society",
      joinedDate: "2026-03-16",
      transactions: [{ amount: 22200.0, method: "Cash", date: "2026-03-16" }],
    },
    {
      id: 4,
      memberName: "Paul",
      totPaid: 500.0,
      status: "Paid",
      schemeName: "Section 2 Society",
      joinedDate: "2026-03-16",
      transactions: [{ amount: 500, method: "Cash", date: "2026-03-16" }],
    },
    {
      id: 5,
      memberName: "Jol",
      totPaid: 500.0,
      status: "Arrears",
      schemeName: "clubs",
      joinedDate: "2024-12-16",
      transactions: [{ amount: 500, method: "Cash", date: "2024-12-16" }],
    },
  ];

  const [accordionData, setAccordionData] = useState([
    {
      userName: "Sam",
      year: "2026",
      yearHistory: [
        { date: "2026-07-16", amount: "500.00", details: "Cash" },
        { date: "2026-05-16", amount: "500.00", details: "Cash" },
        { date: "2026-06-16", amount: "500.00", details: "Cash" },
      ],
    },
    {
      userName: "John",
      year: "2026",
      yearHistory: [{ date: "2026-03-16", amount: "1120.00", details: "Cash" }],
    },
    {
      userName: "Vivian",
      year: "2026",
      yearHistory: [
        { date: "2026-03-16", amount: "22200.00", details: "Cash" },
      ],
    },
    {
      userName: "Paul",
      year: "2026",
      yearHistory: [{ date: "2026-03-16", amount: "500.00", details: "Cash" }],
    },
    {
      userName: "Jol",
      year: "2025",
      yearHistory: [{ date: "2025-12-16", amount: "500.00", details: "Cash" }],
    },
    {
      userName: "Jol",
      year: "2026",
      yearHistory: [],
    },
  ]);

  const [LatestTransactions, setLatestTransactions] = useState([
    {
      id: 1,
      memberId: 100,
      oldOccuredPeriod: "Jul 18, 2026, 10:20 AM",
      occuredPeriod: "Jul 18, 2026, 10:30 AM",
      memberName: "Jol",
      transactionScheme: "clubs",
      date: "18 Jul 2026",
      description: "Payment",
      amount: 500.0,
      joinedDate: "2024-12-16",
      method: "Cash",
    },
    {
      id: 2,
      memberId: 100,
      occuredPeriod: "Jul 18, 2026, 10:20 AM",
      memberName: "Jol",
      transactionScheme: "clubs",
      date: "18 Jul 2026",
      description: "Payment",
      amount: 400.0,
      joinedDate: "2024-12-16",
      method: "Cash",
    },
  ]);

  const [schemes, setSchemes] = useState([]);
  const dash_schemes = schemes;
  const [newExpenses, setExpenses] = useState(() => expenses);
  // Initialize with the first scheme's name or an empty string if no schemes exist
  const [selectedSchemeName, setSelectedSchemeName] = useState(
    schemes[0]?.scheme || "",
  );
  const [members, setMembers] = useState(() => allMembers);

  const [searchState, setSearchState] = useState("");
  const [payingMember, setPayingMember] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [isAddMember, setIsAddMember] = useState(false);
  const [membersBehindStatus, setMembersBehindStatus] = useState("");

  // add scheme form input
  const [newScheme, setNewScheme] = useState("");
  const [newSchemeAmount, setNewSchemeAmount] = useState("");
  const [newSchemeStartingBal, setNewSchemeStartingBal] = useState("");
  const [newSchemeDate, setNewSchemeDate] = useState(new Date().getMonth());
  const [newSchemeYear, setNewSchemeYear] = useState(new Date().getFullYear());

  const filteredExpenses = newExpenses.filter((expense) => {
    const monthQuery = selectedMonth.toLowerCase().trim();
    const catQuery = selectedCat.toLowerCase().trim();
    const schemeNameQuery = selectedSchemeName;

    const matchesMonth =
      monthQuery === "all expenses (year)" ||
      expense.month.toLowerCase().includes(monthQuery);
    const matchesCategory =
      catQuery === "all categories" ||
      expense.category.toLowerCase().includes(catQuery);
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
  };

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
      0,
    );

    // --- 3. CALCULATE MONTH & YEAR TOTALS (Using regularPayments) ---
    const thisMonthPayments = regularPayments.filter((payment) => {
      const joinedDate = new Date(payment.date);
      return (
        joinedDate.getFullYear() === currentYear &&
        joinedDate.getMonth() === currentMonth
      );
    });

    const totalTransactionsThisMonth = thisMonthPayments.length;
    const totalSpentThisMonth = thisMonthPayments.reduce(
      (sum, payment) => sum + getAmount(payment.amount),
      0,
    );

    const thisYearPayments = regularPayments.filter((payment) => {
      const joinedDate = new Date(payment.date);
      return joinedDate.getFullYear() === currentYear;
    });

    const totalTransactionsThisYear = thisYearPayments.length;
    const totalSpentThisYear = thisYearPayments.reduce(
      (sum, payment) => sum + getAmount(payment.amount),
      0,
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
    // The safeguard: only run reduce if categories exist!
    if (categories.length > 0) {
      // Find the top category based on highest amount, using occurrences (count) as a tie-breaker
      topCategory = categories.reduce((a, b) => {
        if (categoryStats[a].amount === categoryStats[b].amount) {
          // If amounts are equal, compare the occurrences
          return categoryStats[a].count > categoryStats[b].count ? a : b;
        }
        // Otherwise, prioritize by the highest amount spent
        return categoryStats[a].amount > categoryStats[b].amount ? a : b;
      });

      topCategoryAmount = categoryStats[topCategory].amount;

      // Calculate total spent across all regular payments to find the percentage
      const totalRegularSpent = regularPayments.reduce(
        (sum, payment) => sum + getAmount(payment.amount),
        0,
      );

      if (totalRegularSpent > 0) {
        // Calculate percentage and round to 2 decimal places
        topCategoryPercentage = Number(
          ((topCategoryAmount / totalRegularSpent) * 100).toFixed(2),
        );
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
    setToggleState(idx);
  };
  let toggleTabMobile = (idx) => {
    settoggleMobileState(idx);
  };

  const financialData = filteredExpenses.reduce(
    (acc, expense) => {
      const type = expense.type ? expense.type.toLowerCase().trim() : "";
      const amount = Number(expense.amount) || 0;

      if (type === "refund / credit (inflow)") {
        acc.moneyIn += amount;
      } else {
        acc.moneyOut += amount;
      }

      return acc;
    },
    { moneyIn: 0, moneyOut: 0 },
  );
  const netDifference = financialData.moneyIn - financialData.moneyOut;

  const handleConfirmPayment = (amount, method, date) => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }

    const paymentYear = date.split("-")[0];

    // 1. Update Members table
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.memberName.toLowerCase() !== payingMember.toLowerCase()) {
          return member;
        }

        const updatedTransactions = [
          ...(member.transactions || []),
          {
            amount: numericAmount,
            method,
            date,
          },
        ];

        const updatedTotPaid = (Number(member.totPaid) || 0) + numericAmount;

        return {
          ...member,
          totPaid: updatedTotPaid,
          transactions: updatedTransactions,
        };
      }),
    );

    const oldOccuredPeriod = payingMember
      ? members
          .find(
            (member) =>
              member.memberName.toLowerCase() === payingMember.toLowerCase(),
          )
          ?.transactions?.slice(-1)[0]?.occuredPeriod
      : null;

    //2 update Latest Transactions
    setLatestTransactions((prevTransactions) => [
      {
        occuredPeriod:
          new Date().toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }) || oldOccuredPeriod,
        memberName: payingMember,
        transactionScheme: selectedSchemeName,
        date: new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        description: `Payment`,
        amount: `${numericAmount.toLocaleString("en-ZA", { currency: "ZAR", style: "currency" })}`,
        method: method,
        joinedDate:
          members.find(
            (member) =>
              member.memberName.toLowerCase() === payingMember.toLowerCase(),
          )?.joinedDate || "N/A",
      },
      ...prevTransactions,
    ]);

    console.log(oldOccuredPeriod);

    // 3. Update Accordion History
    setAccordionData((prevData) => {
      const existingYearIndex = prevData.findIndex(
        (item) =>
          (item.userName || "").toLowerCase() === payingMember.toLowerCase() &&
          item.year === paymentYear,
      );

      const newTransaction = {
        date: date,
        amount: numericAmount.toFixed(2),
        details: method,
      };

      // Year already exists
      if (existingYearIndex >= 0) {
        const updatedData = [...prevData];

        updatedData[existingYearIndex] = {
          ...updatedData[existingYearIndex],

          yearHistory: [
            newTransaction,
            ...(updatedData[existingYearIndex].yearHistory || []),
          ],
        };

        return updatedData;
      }

      // New year
      return [
        {
          userName: payingMember,
          year: paymentYear,
          yearHistory: [newTransaction],
        },
        ...prevData,
      ];
    });

    toast.success("Payment successful", { className: "notifier_bg" });
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  let memberIndex = 0;

  const addMore = () => {
    let members = document.getElementById("AddMoreMembers");
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
      members.map((m) => m.memberName.trim().toLowerCase()),
    );

    const dynamicInputs = document.querySelectorAll(".member-name-input");

    const dynamicNames = Array.from(dynamicInputs)
      .map((input) => input.value.trim())
      .filter(
        (name) => name !== "" && !existingNamesSet.has(name.toLowerCase()),
      );

    const membersToAdd = [];

    const currentDate = new Date().toISOString().split("T")[0];

    const currentYear = currentDate.split("-")[0];

    const mainMemberName = newMember.trim();

    // ==================================================
    // MAIN MEMBER
    // ==================================================

    if (mainMemberName && !existingNamesSet.has(mainMemberName.toLowerCase())) {
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
            date: currentDate,
          },
        ],
      });

      existingNamesSet.add(mainMemberName.toLowerCase());
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
              date: currentDate,
            },
          ],
        });

        existingNamesSet.add(lowerName);
      }
    });

    // ==================================================
    // UPDATE LATEST TRANSACTIONS
    // ==================================================
    setLatestTransactions((prevTransactions) => [
      {
        occuredPeriod: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        memberName: `${membersToAdd.map((m) => m.memberName).join(", ") || mainMemberName || "N/A"}`,
        transactionScheme: selectedSchemeName,
        date: new Date(currentDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        description: `${membersToAdd.length === 1 ? "New Member" : "New Members"} Added`,
        amount: "",
        joinedDate: `${membersToAdd.map((m) => m.joinedDate).join(", ") || currentDate}`,
        method: "",
      },
      ...prevTransactions,
    ]);

    // Nothing new to add
    if (membersToAdd.length === 0) {
      toast.error("Nothing to save", { className: "notifier_bg" });
      return;
    }

    // ==================================================
    // UPDATE MEMBERS
    // ==================================================

    setMembers((prev) => [...prev, ...membersToAdd]);

    // ==================================================
    // UPDATE ACCORDION DATA
    // ==================================================

    setAccordionData((prev) => {
      const newHistory = membersToAdd.map((newMember) => ({
        userName: newMember.memberName,
        year: currentYear,
        yearHistory: [],
      }));

      return [...prev, ...newHistory];
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

    const membersContainer = document.getElementById("AddMoreMembers");

    if (membersContainer) {
      membersContainer.innerHTML = "";
    }

    //notify success
    toast.success("Saved successfully", { className: "notifier_bg" });
  };

  const updateMember = (edtID, edtNm) => {
    // Capture the old member details before updating state
    const oldMember = members.find((member) => member.id === edtID);

    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === edtID ? { ...member, ...edtNm } : member,
      ),
    );

    setLatestTransactions((prevTransactions) => [
      {
        occuredPeriod: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        // Assign the NEW name from edtNm, fallback to old if unmodified
        memberName: edtNm.memberName || oldMember?.memberName || "N/A",
        // Explicitly store the OLD name so the modal can display it
        oldMemberName: oldMember?.memberName || "N/A",
        transactionScheme: selectedSchemeName,
        description: `Edited Member Details`,
        amount: "",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        joinedDate: oldMember?.joinedDate || "N/A",
        method: "",
      },
      ...prevTransactions,
    ]);

    setIsEditMember(false);
    toast.success("Updated Member", { className: "notifier_bg" });
  };

  const [totalSchemeYearlyContribution, setTotalSchemeYearlyContribution] =
    useState(0);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setTotalSchemeYearlyContribution(
      members
        .filter((member) => {
          const memberYear = new Date(member.joinedDate).getFullYear();
          return (
            memberYear === currentYear &&
            member.schemeName === selectedSchemeName
          );
        })
        .reduce((total, curr) => total + curr.totPaid, 0),
    );
  }, [handleConfirmPayment]);

  const [totalSchemeMonthlyContribution, setTotalSchemeMonthlyContribution] =
    useState(0);
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const total = members
      .filter((member) => member.schemeName === selectedSchemeName)
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
      schemes.find((scheme) => scheme.scheme === selectedSchemeName)
        ?.monthlyContribution *
        filteredMembers.length *
        12,
    );
  }, [
    saveMember,
    handleConfirmPayment,
    selectedSchemeName,
    filteredMembers.length,
  ]);

  const [monthlyTarget, setMonthlyTarget] = useState(0);
  useEffect(() => {
    setMonthlyTarget(
      schemes.find((scheme) => scheme.scheme === selectedSchemeName)
        ?.monthlyContribution * filteredMembers.length,
    );
  }, [
    saveMember,
    handleConfirmPayment,
    selectedSchemeName,
    filteredMembers.length,
  ]);

  const [totalCash, setTotalCash] = useState({ monthly: 0, yearly: 0 });
  const [totalEFT, setTotalEFT] = useState({ monthly: 0, yearly: 0 });
  const [totalOther, setTotalOther] = useState({ monthly: 0, yearly: 0 });

  useEffect(() => {
    const filteredPaymentMethodAmount = () => {
      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      return members
        .filter((member) => member.schemeName === selectedSchemeName)
        .reduce(
          (sums, member) => {
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
          },
          { monthly: 0, yearly: 0 },
        );
    };
    setTotalCash(filteredPaymentMethodAmount());
  }, [members, selectedSchemeName]);

  useEffect(() => {
    const filteredPaymentMethodAmount = () => {
      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      return members
        .filter((member) => member.schemeName === selectedSchemeName)
        .reduce(
          (sums, member) => {
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
          },
          { monthly: 0, yearly: 0 },
        );
    };
    setTotalEFT(filteredPaymentMethodAmount());
  }, [members, selectedSchemeName]);

  useEffect(() => {
    const filteredPaymentMethodAmount = () => {
      const currYear = new Date().getFullYear();
      const currMonth = new Date().getMonth();

      return members
        .filter((member) => member.schemeName === selectedSchemeName)
        .reduce(
          (sums, member) => {
            member.transactions
              .filter(
                (tx) =>
                  tx.method === "Other" ||
                  tx.method === "Mobile Money" ||
                  tx.method === "Direct Deposit",
              )
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
          },
          { monthly: 0, yearly: 0 },
        );
    };
    setTotalOther(filteredPaymentMethodAmount());
  }, [members, selectedSchemeName]);

  const getMemberStatus = (member, scheme) => {
    if (
      !member ||
      !scheme ||
      typeof scheme.monthlyContribution === "undefined"
    ) {
      member.status = "Pending";
      return "Pending";
    }

    const monthlyFee = Number(scheme.monthlyContribution) || 0;

    if (monthlyFee <= 0) {
      member.status = "Pending";
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
      member.status = "Pending";
      return "Pending";
    }

    const joinedDate = new Date(member.joinedDate);

    if (isNaN(joinedDate.getTime())) {
      member.status = "Pending";
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
      (currentYear - startYear) * 12 + (currentMonth - startMonth),
    );

    // =========================================================
    // 3. EXPECTED PAYMENT FOR PREVIOUS MONTHS
    // =========================================================

    const expectedBeforeCurrentMonth = previousMonthsCount * monthlyFee;

    // =========================================================
    // 4. TOTAL PAID BEFORE CURRENT MONTH
    // =========================================================

    const paidBeforeCurrentMonth = transactions
      .filter((tx) => {
        if (!tx.date) return false;

        const txDate = new Date(tx.date);

        return (
          txDate.getFullYear() < currentYear ||
          (txDate.getFullYear() === currentYear &&
            txDate.getMonth() < currentMonth)
        );
      })
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    // =========================================================
    // 5. PREVIOUS ARREARS
    //
    // Current month is NOT included here.
    // =========================================================

    const previousArrears = Math.max(
      0,
      expectedBeforeCurrentMonth - paidBeforeCurrentMonth,
    );

    // =========================================================
    // 6. CURRENT MONTH PAYMENT
    // =========================================================

    const paidThisMonth = transactions
      .filter((tx) => {
        if (!tx.date) return false;

        const txDate = new Date(tx.date);

        return (
          txDate.getFullYear() === currentYear &&
          txDate.getMonth() === currentMonth
        );
      })
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    // =========================================================
    // 7. NO PREVIOUS ARREARS
    // =========================================================

    if (previousArrears === 0) {
      if (paidThisMonth === 0) {
        member.status = "Awaiting Payment";
        return "Awaiting Payment";
      }

      if (paidThisMonth < monthlyFee) {
        member.status = "Partially Paid";
        return "Partially Paid";
      }

      if (paidThisMonth === monthlyFee) {
        member.status = "Paid";
        return "Paid";
      }

      if (paidThisMonth > monthlyFee) {
        member.status = "Ahead";
        return "Ahead";
      }
    }

    // =========================================================
    // 8. PREVIOUS ARREARS EXIST
    //
    // Current month's payment must first clear the
    // old arrears, then satisfy the current month.
    // =========================================================

    const amountNeededToBecomePaid = previousArrears + monthlyFee;

    // Still clearing old arrears/current contribution
    if (paidThisMonth < amountNeededToBecomePaid) {
      member.status = "Arrears";
      return "Arrears";
    }

    // Old arrears cleared + current month paid
    if (paidThisMonth === amountNeededToBecomePaid) {
      member.status = "Paid";
      return "Paid";
    }

    // More than everything required
    if (paidThisMonth > amountNeededToBecomePaid) {
      member.status = "Ahead";
      return "Ahead";
    }

    member.status = "Pending";
    return "Pending";
  };

  const getMemberArrears = (member, scheme) => {
    if (!member || !scheme) {
      return 0;
    }

    const monthlyFee = Number(scheme.monthlyContribution) || 0;
    if (monthlyFee <= 0) {
      return 0;
    }
    if (!member.joinedDate) {
      return 0;
    }

    const joinedDate = new Date(member.joinedDate);
    if (isNaN(joinedDate.getTime())) {
      return 0;
    }

    const transactions = member.transactions || [];
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const startYear = joinedDate.getFullYear();
    const startMonth = joinedDate.getMonth();

    // 1. Include the current month in the expected count
    const totalMonthsCount = Math.max(
      0,
      (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1,
    );

    // 2. Total expected fees up to right now
    const totalExpected = totalMonthsCount * monthlyFee;

    // 3. Sum ALL payments made up to today (including current month)
    const totalPaid = transactions
      .filter((tx) => {
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

  const logDetails = (
    occuredPeriod,
    memberName,
    date,
    description,
    amount,
    method,
    joinedDate,
  ) => {
    setLogDetailsModal(true);
    setLogDetailsMemberName(memberName);
    setLogDetailsDate(date);
    setLogDetailsDescription(description);
    setLogDetailsAmount(amount);
    setLogDetailsMethod(method);
    setLogDetailsOccuredPeriod(occuredPeriod);
    setLogDetailsJoinedDate(joinedDate);
  };

  const [selectedActivity, setSelectedActivity] = useState(null);
  const getPreviousActivity = (transaction) => {
    const schemeTransactions = LatestTransactions.filter(
      (item) =>
        item.transactionScheme === selectedSchemeName &&
        item.memberName === transaction.memberName,
    );

    const currentIndex = schemeTransactions.findIndex(
      (item) => item.id === transaction.id,
    );

    if (currentIndex === -1) {
      return null;
    }
    if (currentIndex === schemeTransactions.length - 1) {
      return null;
    }

    return schemeTransactions[currentIndex + 1];
  };
  const logDetailsModalWithValues = (transaction) => {
    const previousActivity = getPreviousActivity(transaction);

    setSelectedActivity({
      current: transaction,
      previous: previousActivity,
    });

    setLogDetailsMemberName(transaction.memberName);
    setLogDetailsDate(transaction.date);
    setLogDetailsDescription(transaction.description);
    setLogDetailsAmount(transaction.amount);
    setLogDetailsMethod(transaction.method);
    setLogDetailsOccuredPeriod(transaction.occuredPeriod);
    setLogDetailsJoinedDate(transaction.joinedDate);

    setLogDetailsModal(true);
  };

  const latestTransactionsForSelectedScheme = LatestTransactions.filter(
    (transaction) => transaction.transactionScheme === selectedSchemeName,
  );
  const currentActivity = selectedActivity?.current;
  const previousActivity = selectedActivity?.previous;

  const hasValue = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== "N/A" &&
      value !== "None"
    );
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-ZA", {
      style: "currency",
      currency: "ZAR",
    });
  };
  const formatDate = (date) => {
    if (!date) {
      return "None";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // add scheme modal
  const handleSchemeNameInputChange = (e) => setNewScheme(e.target.value);
  const handleSchemeAmountInputChange = (e) => {
    const numericString = e.target.value.replace(/[^0-9]/g, "");
    const cents = parseInt(numericString || "0", 10);
    setNewSchemeAmount(cents / 100);
  };
  const handleSchemeStartingBalInputChange = (e) => {
    const numericString = e.target.value.replace(/[^0-9]/g, "");
    const cents = parseInt(numericString || "0", 10);
    setNewSchemeStartingBal(cents / 100);
  };
  const handleSchemeDateInputChange = (e) => setNewSchemeDate(e.target.value);
  const handleSchemeYearInputChange = (e) => setNewSchemeYear(e.target.value);

  const upsertScheme = (currentSchemes, incomingScheme) => {
    const existingIndex = currentSchemes.findIndex((scheme) =>
      incomingScheme.id != null
        ? scheme.id === incomingScheme.id
        : scheme.scheme === incomingScheme.scheme,
    );
    if (existingIndex === -1) return [...currentSchemes, incomingScheme];

    return currentSchemes.map((scheme, index) =>
      index === existingIndex ? incomingScheme : scheme,
    );
  };

  const removeSchemeRow = (currentSchemes, removedScheme) =>
    currentSchemes.filter((scheme) =>
      removedScheme.id != null
        ? scheme.id !== removedScheme.id
        : scheme.scheme !== removedScheme.scheme,
    );

  const mapSchemeForApp = (scheme) => ({
    ...scheme,
    monthlyContribution: Number(scheme.monthly_contribution) || 0,
    startingBal: Number(scheme.starting_bal) || 0,
    date: scheme.created_at,
  });

  const isSavingScheme = useRef(false);
  const saveScheme = async () => {
    if (isSavingScheme.current) return;
    if (!newScheme.trim()) return;
    if (!newSchemeAmount) return;

    isSavingScheme.current = true;
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Not logged in or error getting user:", userError);
        return;
      }

      const fullDate = new Date(newSchemeYear, newSchemeDate, 1);

      const schemeToAdd = {
        user_id: user.id,
        scheme: newScheme.trim(),
        monthly_contribution: Number(newSchemeAmount),
        starting_bal: Number(newSchemeStartingBal) || 0,
        created_at: fullDate.toISOString(),
      };

      const { data, error } = await supabase
        .from("members_schemes")
        .insert([schemeToAdd])
        .select();

      if (error) {
        console.error("Error saving scheme to Supabase:", error);
        return;
      }

      const insertedScheme = data[0];
      const appScheme = {
        ...insertedScheme,
        monthlyContribution: Number(insertedScheme.monthly_contribution),
        startingBal: Number(insertedScheme.starting_bal) || 0,
        date: insertedScheme.created_at,
      };
      setSchemes((prev) => upsertScheme(prev, appScheme));

      schemeSelected(dash_schemes.length, insertedScheme.scheme);

      setNewScheme("");
      setNewSchemeAmount("");
      setNewSchemeStartingBal("");
      setNewSchemeDate(new Date().getMonth());
      setNewSchemeYear(new Date().getFullYear());
      setAddSchemeModal(false);
    } finally {
      isSavingScheme.current = false;
    }
  };

  
  useEffect(() => {
    let isActive = true;
    let schemeSubscription = null;

    async function fetchUserSchemesData() {
      try {
        const { data, error } = await supabase
          .from("members_schemes")
          .select("*")
          .eq("user_id", user.id);

        if (!isActive) return;
        if (error) {
          console.error("Error fetching table data:", error);
        } else {
          const fetchedSchemes = data || [];
          setSchemes(fetchedSchemes.map(mapSchemeForApp));
          schemeSelected(
            fetchedSchemes.length > 0 ? 0 : -1,
            fetchedSchemes[0]?.scheme || "",
          );
        }

        if (!isActive) return;
        schemeSubscription = supabase
          .channel(`dash-schemes-realtime-${crypto.randomUUID()}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "members_schemes",
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              if (!isActive) return;
              if (payload.eventType === "INSERT") {
                setSchemes((prev) =>
                  upsertScheme(prev, mapSchemeForApp(payload.new)),
                );
              } else if (payload.eventType === "DELETE") {
                setSchemes((prev) =>
                  removeSchemeRow(prev, payload.old),
                );
              }
            },
          )
          .subscribe();
      } catch (error) {
        if (isActive) {
          console.error("Could not load schemes:", error);
        }
      }
    }

    if (!user?.id) {
      return () => {
        isActive = false;
      };
    }

    fetchUserSchemesData();

    return () => {
      isActive = false;
      if (schemeSubscription) {
        supabase.removeChannel(schemeSubscription);
      }
    };
  }, [user?.id]);

  const dashboardProps = {
    isOpen,
    setIsOpen,
    toggleMenu,
    overlayer,
    setOverlayer,
    toggleState,
    setToggleState,
    toggleMobileState,
    settoggleMobileState,
    activeTab,
    toggleTabMobile,
    selectedSchemeName,
    openCalender,
    formattedDate,
    schemes,
    setSchemes,
    isAddSchemeModal,
    setAddSchemeModal,
    newScheme,
    setNewScheme,
    newSchemeAmount,
    setNewSchemeAmount,
    newSchemeStartingBal,
    setNewSchemeStartingBal,
    newSchemeDate,
    setNewSchemeDate,
    newSchemeYear,
    setNewSchemeYear,
    handleSchemeNameInputChange,
    handleSchemeAmountInputChange,
    handleSchemeStartingBalInputChange,
    handleSchemeDateInputChange,
    handleSchemeYearInputChange,
    saveScheme,
    schemeSelected,
    schemeSelectedState,
    setSchemeSelectedState,
    handleConfirmPayment,
    totalSpentThisMonth,
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
    getMemberStatus,
    allMembers,
    filteredMembers,
    membersBehindStatus,
    getMemberArrears,
    LatestTransactions,
    logDetails,
    setLogDetailsModal,
    logDetailsModal,
    setLogDetailsMemberName,
    setLogDetailsDate,
    setLogDetailsDescription,
    setLogDetailsAmount,
    setLogDetailsMethod,
    setLogDetailsOccuredPeriod,
    setLogDetailsJoinedDate,
    logDetailsMemberName,
    logDetailsDate,
    logDetailsDescription,
    logDetailsAmount,
    logDetailsMethod,
    logDetailsOccuredPeriod,
    logDetailsJoinedDate,
    logDetailsModalWithValues,
    currentActivity,
    previousActivity,
    hasValue,
    formatAmount,
    formatDate,
    latestTransactionsForSelectedScheme,
    setMembers,
    searchState,
    setSearchState,
    payingMember,
    setPayingMember,
    accordionData,
    setAccordionData,
    saveMember,
    addMore,
    newMember,
    setNewMember,
    isAddMember,
    setIsAddMember,
    setPaymentMethod,
    toast,
    setLatestTransactions,
    updateMember,
    isEditMember,
    setIsEditMember,
    newExpenses,
    setExpenses,
    filteredExpenses,
    selectedMonth,
    setSelectedMonth,
    selectedCat,
    setSelectedCat,
    payments,
    setPayments,
    totalTransactionsThisMonth,
    totalSpentThisYear,
    totalTransactionsThisYear,
    topCategory,
    topCategoryAmount,
    topCategoryPercentage,
    totalSpentForRefundsAndCredits,
    totalTransactionsForRefundsAndCredits,
    dash_schemes,
  };

  useEffect(() => {
    let active = true;
    let authStateReceived = false;
    const updateAuthenticatedUser = (nextUser) => {
      const nextUserId = nextUser?.id ?? null;
      if (activeAuthUserId.current !== nextUserId) {
        activeAuthUserId.current = nextUserId;
        setSchemes([]);
        schemeSelected(-1, "");
      }
      setUser(nextUser);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authStateReceived = true;
      updateAuthenticatedUser(session?.user ?? null);
      setAuthLoading(false);
    });

    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (!active) return;

        const session = data.session;
        if (!authStateReceived) {
          updateAuthenticatedUser(session?.user ?? null);
          setAuthLoading(false);
        }

        if (error) {
          console.error(
            "Could not restore the current Supabase session:",
            error.message,
          );
          return;
        }

        if (session?.user) {
          const { error: userError } = await supabase.auth.getUser();
          if (
            !active ||
            !userError?.message.includes(
              "User from sub claim in JWT does not exist",
            )
          ) {
            if (userError) {
              console.error(
                "Could not validate the current Supabase session:",
                userError.message,
              );
            }
            return;
          }

          const { data: currentSessionData } = await supabase.auth.getSession();
          if (currentSessionData.session?.user.id !== session.user.id) return;

          const { error: signOutError } = await supabase.auth.signOut({
            scope: "local",
          });
          if (signOutError) {
            console.error(
              "Could not clear the invalid local session:",
              signOutError.message,
            );
          }
          updateAuthenticatedUser(null);
        }
      })
      .catch((error) => {
        if (!active) return;
        console.error(
          "Could not validate the current Supabase session:",
          error,
        );
        setAuthLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Calendar Overlay */}
      {calenderState && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-999999"
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

      <Routes>
        <Route
          path="/"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#1E1E1E]" />
            ) : user ? (
              <Navigate to="/Dashboard" replace />
            ) : (
              <HomePage />
            )
          }
        />

        <Route
          path="/Signup"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#1E1E1E]" />
            ) : user ? (
              <Navigate to="/Dashboard" replace />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/Signin"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#1E1E1E]" />
            ) : user ? (
              <Navigate to="/Dashboard" replace />
            ) : (
              <Signin />
            )
          }
        />
        <Route
          path="/Dashboard"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#1E1E1E]" />
            ) : user ? (
              <System dashboardProps={dashboardProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/UpdatePassword"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#1E1E1E]" />
            ) : user ? (
              <UpdatePassword />
            ) : (
              <Navigate to="/Signin" replace />
            )
          }
        />
        <Route
          path="*"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#1E1E1E]" />
            ) : (
              <Navigate to={user ? "/Dashboard" : "/"} replace />
            )
          }
        />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
