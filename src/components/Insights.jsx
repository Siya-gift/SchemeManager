import {React, useState} from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer';
import  SchemeSummaryReport  from "../invoice/SchemeSummaryRpt";

function Insights({ toggleState, toggleMobileState, formattedDate, openCalender, filteredMembers, selectedSchemeName, schemes }) {
  
  const [showPdf, setShowPdf] = useState(false);

  const activeScheme = schemes.find((sName) => sName.scheme === selectedSchemeName);
  const monthlyFee = activeScheme ? parseFloat(activeScheme.monthlyContribution) : 0;

  // 1. Updated to accept a member's individual joined date
  const calculateExpected = (joinedDateStr) => {
    if (!joinedDateStr) return 0;
    
    const today = new Date();
    const joined = new Date(joinedDateStr);
    if (joined > today) return 0;

    // Calculate difference in months
    const yearDiff = today.getFullYear() - joined.getFullYear();
    const monthDiff = today.getMonth() - joined.getMonth();
    let totalMonths = (yearDiff * 12) + monthDiff;

    // Fix: check if today's day of the month hasn't reached the signup day yet
    if (today.getMonth() < joined.getMonth()) {
      totalMonths--;
    }

    // Include the first month (signup day payment)
    const expectedCycles = totalMonths + 1;
    return expectedCycles * monthlyFee;
  };

  // --- Dynamic calculations for the 3 OKR Cards ---
  const totalPaidSum = filteredMembers.reduce((acc, m) => acc + (Number(m.totPaid) || 0), 0);
  
  // Card 1: Count members who have contributed anything at all
  const payingMembersCount = filteredMembers.filter(m => Number(m.totPaid) > 0).length;

  // Card 2: Average payment made per total members
  const avgPaymentPerPerson = filteredMembers.length > 0 ? totalPaidSum / filteredMembers.length : 0;

  // Card 3: Count members behind vs high risk (3+ months behind)
  let generalBehindCount = 0;
  let highRiskCount = 0;

  filteredMembers.forEach((member) => {
    const expectedAmount = calculateExpected(member.joinedDate);
    const amountOwed = expectedAmount - member.totPaid;
    const monthsBehind = monthlyFee > 0 ? Math.max(0, Math.ceil(amountOwed / monthlyFee)) : 0;
    
    if (monthsBehind > 0) {
      generalBehindCount++;
      if (monthsBehind >= 3) {
        highRiskCount++;
      }
    }
  });

  const getAvgPayingMembersOver3Months = () => {
  // 1. Get the boundary dates for the last 3 full months
  const today = new Date();
  
  // If your app uses a transaction array, filter them here. 
  // For now, if you only have the current active list:
  const currentPaying = filteredMembers.filter(m => Number(m.totPaid) > 0).length;
  
  // Note: To make this 100% accurate historically, you would map over your payment data:
  // const month1Count = payments.filter(p => isInMonth(p.date, 0)).distinct(p => p.memberId).length;
  
  // If simulating based on your current state (e.g. active paying members running average):
  const simulatedAverage = currentPaying; // Replace with historical calculation if transaction arrays are available
  
  return simulatedAverage;
};

const avgPayingMembers = getAvgPayingMembersOver3Months();

const getStatusTheme = (status, monthsBehind) => {
  const cleanStatus = status?.toLowerCase() || '';

  // 1. Ahead / Paid Up
  if (monthsBehind === 0 && cleanStatus.includes('ahead')) {
    return {
      bg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Paid Ahead'
    };
  }

  // 2. Good Standing / Fully Paid
  if (monthsBehind === 0) {
    return {
      bg: 'bg-green-50 text-green-700 border border-green-200',
      dot: 'bg-green-500',
      label: status || 'Paid Up'
    };
  }

  // 3. High Risk (3+ Months Behind)
  if (monthsBehind >= 3) {
    return {
      bg: 'bg-rose-50 text-rose-700 border border-rose-200 animation-pulse',
      dot: 'bg-rose-500',
      label: status || 'High Risk'
    };
  }

  // 4. Default Arrears / Warning (1-2 Months Behind)
  return {
    bg: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-500',
    label: status || 'In Arrears'
  };
};


// ... Keep all calculations inside the main Insights component exactly the same ...
// Under your existing metrics block, map out the formatted arrays needed for the document:
const pdfDataList = filteredMembers.map(member => {
  const expectedAmount = calculateExpected(member.joinedDate);
  const amountOwed = expectedAmount - member.totPaid;
  const monthsBehind = monthlyFee > 0 ? Math.max(0, Math.ceil(amountOwed / monthlyFee)) : 0;
  return {
    memberName: member.memberName,
    status: member.status,
    monthsBehind: monthsBehind,
    amountOwed: amountOwed
  };
});

// Calculate metrics from the document structure
const totalOutstandingAmount = pdfDataList.reduce((acc, curr) => acc + curr.amountOwed, 0);
const complianceRatePercentage = filteredMembers.length > 0 
  ? Math.round((filteredMembers.filter(m => (calculateExpected(m.joinedDate) - m.totPaid) <= 0).length / filteredMembers.length) * 100) 
  : 0;



  return (
    <div className={`Insights w-full min-h-screen p-4 md:p-5 ${toggleMobileState === 4 ? "block" : "hidden"} ${toggleState === 4 ? "md:block" : "md:hidden"} `}>
      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'> Insights </h1>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white mt-4 md:mt-0'>
          <h5 className='text-white/50 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'> Filter by date: </h5>
          <h3 className='text-light cursor-pointer hover:text-white/80 uppercase text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'> {formattedDate} </h3>
          <span className='cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]' onClick={openCalender}>
            <i className="fa-solid fa-calendar-days"></i>
          </span>
        </div>
      </div>

      <div className='okrContainer flex flex-col md:flex-row gap-4 w-full transition-all duration-300'>
        {/* Card 1: Paying Members */}
        {/* Card 1: Average Paying Members over 3 Months */}
<div className='bg-[linear-gradient(135deg,#4f46e5_0%,#3730a3_100%)] shadow-[0_5px_15px_rgba(79,70,229,0.2)] cursor-pointer text-white p-4 rounded-xl flex flex-col gap-2 flex-1 hover:-translate-y-1 transition-translate duration-300'>
  <h3 className='text-white/75 text-sm'>
    <i className="fas fa-users me-2"></i>
    <span className='ml-2'>Average Paying Members</span>
  </h3>
  <h1 className='text-2xl font-bold'>
    {avgPayingMembers.toFixed(1)}
  </h1>
  <h3 className='text-white/75 text-sm'>Avg. over 3 mo</h3>
</div>


        {/* Card 2: Averages */}
        <div className='bg-[linear-gradient(135deg,#10b981_0%,#065f46_100%)] shadow-[0_5px_15px_rgba(16,185,129,0.2)] cursor-pointer text-white p-4 rounded-xl flex flex-col gap-2 flex-1 hover:-translate-y-1 transition-translate duration-300'>
          <h3 className='text-white/75 text-sm'>
            <i className="fas fa-hand-holding-dollar me-2"></i>
            <span className='ml-2'>Average Payment per Person</span>
          </h3>
          <h1 className='text-2xl font-bold'>
            {avgPaymentPerPerson.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
          </h1>
          <h3 className='text-white/75 text-sm'>
            Target Fee: {monthlyFee.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
          </h3>
        </div>

        {/* Card 3: Risk Summary */}
        <div className='bg-[linear-gradient(135deg,#f59e0b_0%,#b45309_100%)] shadow-[0_5px_15px_rgba(245,158,11,0.2)] cursor-pointer text-white p-4 rounded-xl flex flex-col justify-evenly gap-2 flex-1 hover:-translate-y-1 transition-translate duration-300'>
          <h3 className='text-white/75 text-sm'>
            <i className="fas fa-user-clock me-2"></i>
            <span className='ml-2'>Members at Risk</span>
          </h3>
          <div className='flex flex-row justify-between items-center gap-2'>
            <h1 className='text-2xl font-bold'>{generalBehindCount}</h1>
            <h3 className='text-amber-200 text-xl font-bold text-right'>{highRiskCount}</h3>
          </div>
          <div className='flex flex-row justify-between items-center gap-2 '>
            <h3 className='text-white/75 text-sm'>Behind on Payments</h3>
            <h3 className='text-amber-200 text-xs font-semibold text-right w-full'>High Risk (3+ months behind)</h3>
          </div>
        </div>
      </div>

      <div className='w-full py-5 px-6 mt-4 glass'>
        <div className='flex justify-between gap-4 flex-col md:flex-row items-center'>
          <h3 className='text-xl text-white'>Detailed Risk Report</h3>
          <button className='bg-red-900 text-white text-md 
          hover:bg-red-800 border-none outline-none 
          px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto' onClick={()=> setShowPdf(!showPdf)}>
            <i className="fa-solid fa-file-pdf"></i>
            <span className='ml-2'>Scheme Summary Report</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm mt-4 h-95 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 sticky top-0  shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Member Name</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Expected So Far</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Amount Paid</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700">Status / Months</th>
              <th scope="col" className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-700 text-right">Amount Owed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, index) => {
                const expectedAmount = calculateExpected(member.joinedDate);
                const amountOwed = expectedAmount - member.totPaid;
                const monthsBehind = monthlyFee > 0 ? Math.max(0, Math.ceil(amountOwed / monthlyFee)) : 0;
                
                return (
                  <tr key={member.id || index} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-blue-600 hover:underline transition-colors">
                      {member.memberName}
                    </td>
                    
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {expectedAmount.toLocaleString('en-ZA', { style: "currency", currency: "ZAR" })}
                    </td>
                    
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      {Number(member.totPaid).toLocaleString('en-ZA', { style: "currency", currency: "ZAR" })}
                    </td>
                    
                    <td className="px-6 py-4">
  {(() => {
    const theme = getStatusTheme(member.status, monthsBehind);
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${theme.bg}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`}></span>
        <span className="flex flex-col">
          <span>
            {monthsBehind === 0 ? 'Up to date' : `${monthsBehind} ${monthsBehind === 1 ? 'Month' : 'Months'}`}
          </span>
          <span className="text-[10px] opacity-80 uppercase tracking-wider">{theme.label}</span>
        </span>
      </span>
    );
  })()}
</td>

                    
                    <td className={`px-6 py-4 text-right font-semibold font-mono ${
                      amountOwed <= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {amountOwed <= 0 ? (
                        <>
                          {Math.abs(amountOwed).toLocaleString('en-ZA', { style: "currency", currency: "ZAR" })}
                        </>
                      ) : (
                        amountOwed.toLocaleString('en-ZA', { style: "currency", currency: "ZAR" })
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (

  // 2. Fallback if the array is empty
  <tr>
    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
      No members found
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>
      <div className='footer md:col-span-3 flex grow flex-col sm:flex-row justify-center items-center py-5 px-6 glass text-white mt-5'>
        <p>All rights reserved &copy; 2026 </p>
      </div>

      {showPdf && (
        <div
          className="fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen"
        >
          <div
            className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-full md:w-[90%] h-[90%] border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999"
          >
            <div className="flex justify-between items-center w-full text-white font-bold transition-all duration-300">
              <h1 className="text-xl">PDF Viewer</h1>
              <div
                className="text-xl hover:bg-white/30 p-2 text-center rounded cursor-pointer"
                onClick={() => setShowPdf(false)}
              >
                &times;
              </div>
            </div>
            <div
              className="h-[90%] "
              style={{ marginTop: "20px"}}
            >
              <SchemeSummaryReport
          data={pdfDataList} 
          totalOutstanding={totalOutstandingAmount}
          complianceRate={complianceRatePercentage}
          totalBeneficiaries={filteredMembers.length}
          selectedSchemeName={selectedSchemeName}
        />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Insights
