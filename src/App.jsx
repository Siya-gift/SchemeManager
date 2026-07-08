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
      description: "Tent",
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
      category: "Sound System & Choir",
      description: "Sound System",
      amount: 500,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society"
    },
    {
      id: 4,
      date: "2026-06-16",
      month: "June",
      category: "Livestock / Slaughter",
      description: "2 Cows",
      amount: 20000,
      type: "Expense (Outflow)",
      schemeName: "Section 2 Society"
    },

    {
      id: 5,
      date: "2026-06-20",
      month: "June",
      category: "Livestock / Slaughter",
      description: "2 Chickens",
      amount: 15000,
      type: "Expense (Outflow)",
      schemeName: "clubs"
    },
  ]
  const [schemes, setSchemes] = useState(() => allSchemes);
  const [newExpenses, setExpenses] = useState(() => expenses);
  // Initialize with the first scheme's name or an empty string if no schemes exist
  const [selectedSchemeName, setSelectedSchemeName] = useState(schemes[0]?.scheme || "");

  const filteredExpenses = newExpenses.filter((expense) => {
    const monthQuery = selectedMonth.toLowerCase().trim();
    const catQuery = selectedCat.toLowerCase().trim();
    const schemeNameQuery = selectedSchemeName;

    const matchesMonth = monthQuery === "all expenses (year)" || expense.month.toLowerCase().includes(monthQuery);
    const matchesCategory = catQuery === "all categories" || expense.category.toLowerCase().includes(catQuery);
    const matchesSchemeName = expense.schemeName === schemeNameQuery;

    return matchesMonth && matchesCategory && matchesSchemeName;
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
        />
        <Overlayer overlayer={overlayer} toggleMenu={toggleMenu} />
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender}
          formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes} schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState}
          setSchemeSelectedState={setSchemeSelectedState} selectedSchemeName={selectedSchemeName}
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
