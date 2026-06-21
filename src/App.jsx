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
      type: "Refund / Credit (Inflow)"
    },
    {
      id: 2,
      date: "2026-04-16",
      month: "April",
      category: "Other",
      description: "Tent",
      amount: 1000,
      type: "Expense (Outflow)"
    },
    {
      id: 3,
      date: "2026-05-16",
      month: "May",
      category: "Sound System & Choir",
      description: "Sound System",
      amount: 500,
      type: "Expense (Outflow)"
    },
    {
      id: 4,
      date: "2026-06-16",
      month: "June",
      category: "Livestock / Slaughter",
      description: "2 Cows",
      amount: 20000,
      type: "Expense (Outflow)"
    },
  ]
  const [schemes, setSchemes] = useState(() => allSchemes);
  const [newExpenses, setExpenses] = useState(() => expenses);

  const filteredExpenses = newExpenses.filter((expense) => {
    const monthQuery = selectedMonth.toLowerCase().trim();
    const catQuery = selectedCat.toLowerCase().trim();
    const matchesMonth = monthQuery === "all expenses (year)" || expense.month.toLowerCase().includes(monthQuery);
    const matchesCategory = catQuery === "all categories" || expense.category.toLowerCase().includes(catQuery);

    return matchesMonth && matchesCategory;
  });

  const schemeSelected = (idx) => {
    setSchemeSelectedState(idx)
  }

  //OKRs
  const [payments, setPayments] = useState(filteredExpenses);
  const { totalSpentThisMonth, totalTransactionsThisMonth, totalSpentThisYear, totalTransactionsThisYear, topCategory, topCategoryAmount, topCategoryPercentage, totalSpentForRefundsAndCredits, totalTransactionsForRefundsAndCredits } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const thisMonthPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const type = payment.type ? payment.type.trim().toLowerCase() : "";
      return (
        paymentDate.getFullYear() === currentYear &&
        paymentDate.getMonth() === currentMonth &&
        type !== "refund / credit (inflow)"
      );
    });
    const thisYearPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const type = payment.type ? payment.type.trim().toLowerCase() : "";
      return (
        paymentDate.getFullYear() === currentYear &&
        type !== "refund / credit (inflow)"
      );
    });

    // Count the occurrences of each category
    const counts = payments.reduce((acc, payment) => {
      const type = payment.type ? payment.type.trim().toLowerCase() : "";
      const category = payment.category ? payment.category.trim() : "Unknown";

      if (type === "refund / credit (inflow)") {
        return acc;
      }

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {});


    const totalAmountMonth = thisMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalAmountYear = thisYearPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalCountMonth = thisMonthPayments.length;
    const totalCountYear = thisYearPayments.length;
    const topCat = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b); // Find the category key with the highest count


    let topCatAmount = 0;
    let grandTotal = 0;

    payments.forEach((payment) => {
      grandTotal += payment.amount;
      if (payment.category === topCat) {
        topCatAmount += payment.amount;
      }
    });

    const topCatPercentage = ((topCatAmount / grandTotal) * 100).toFixed(2);

    const refundsAndCreditsData = payments.reduce((acc, expense) => {
      const query = expense.type ? expense.type.toLowerCase().trim() : "";

      if (query === "refund / credit (inflow)") {
        acc.totalSpent += (Number(expense.amount) || 0);
        acc.count += 1;
      }

      return acc;
    }, { totalSpent: 0, count: 0 });

    const totSpentForRefundsAndCredits = refundsAndCreditsData.totalSpent;
    const totTransactionsForRefundsAndCredits = refundsAndCreditsData.count;



    return {
      totalSpentThisYear: totalAmountYear,
      totalSpentThisMonth: totalAmountMonth,
      totalTransactionsThisMonth: totalCountMonth,
      totalTransactionsThisYear: totalCountYear,
      topCategory: topCat,
      topCategoryAmount: topCatAmount,
      topCategoryPercentage: topCatPercentage,
      totalSpentForRefundsAndCredits: totSpentForRefundsAndCredits,
      totalTransactionsForRefundsAndCredits: totTransactionsForRefundsAndCredits
    };
  }, [payments]);

  let activeTab = (idx) => {
    setToggleState(idx)
  }
  let toggleTabMobile = (idx) => {
    settoggleMobileState(idx)
  }

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



      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} overlayer={overlayer} setOverlayer={setOverlayer} />
      <div className='flex overflow-hidden'>
        <SideBar toggleState={toggleState} setToggleState={setToggleState} activeTab={activeTab} />
        <Profile toggleState={toggleState} />
        <Dashboard toggleState={toggleState} toggleMobileState={toggleMobileState} overlayer={overlayer}
          openCalender={openCalender} formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes}
          schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState} setSchemeSelectedState={setSchemeSelectedState}
          totalSpentThisMonth={totalSpentThisMonth} activeTab={activeTab} toggleTabMobile={toggleTabMobile} 
        />
        <Overlayer overlayer={overlayer} toggleMenu={toggleMenu} />
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender}
          formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes} schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState}
          setSchemeSelectedState={setSchemeSelectedState}

        />
        <Expenses toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender} formattedDate={formattedDate}
          newExpenses={newExpenses} setExpenses={setExpenses} filteredExpenses={filteredExpenses} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          selectedCat={selectedCat} setSelectedCat={setSelectedCat} payments={payments} setPayments={setPayments} totalSpentThisMonth={totalSpentThisMonth}
          totalTransactionsThisMonth={totalTransactionsThisMonth} totalSpentThisYear={totalSpentThisYear} totalTransactionsThisYear={totalTransactionsThisYear} topCategory={topCategory}
          topCategoryAmount={topCategoryAmount} topCategoryPercentage={topCategoryPercentage} totalSpentForRefundsAndCredits={totalSpentForRefundsAndCredits} totalTransactionsForRefundsAndCredits={totalTransactionsForRefundsAndCredits}
        />
        <Insights toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} />
        <ActivityHistory toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} />
        <Settings toggleState={toggleState} toggleMobileState={toggleMobileState} />
      </div>
      <MobileMenu isOpen={isOpen} toggleMobileState={toggleMobileState} toggleMenu={toggleMenu} settoggleMobileState={settoggleMobileState} toggleTabMobile={toggleTabMobile}/>
    </>
  )
}

export default App
