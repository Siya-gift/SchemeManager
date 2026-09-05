import React from 'react'
import { useState } from 'react';

function ActivityHistory(
  { toggleState,
    toggleMobileState,
    formattedDate,
    openCalender,
    LatestTransactions,
    selectedSchemeName,
    logDetailsModal,
    setLogDetailsModal,
    logDetailsMemberName,
    logDetailsDate,
    logDetailsDescription,
    logDetailsAmount,
    logDetailsMethod,
    logDetailsOccuredPeriod,
    logDetailsJoinedDate,
    setLogDetailsMemberName,
    setLogDetailsDate,
    setLogDetailsDescription,
    setLogDetailsAmount,
    setLogDetailsMethod,
    setLogDetailsOccuredPeriod,
    setLogDetailsJoinedDate
  }
) {

  const [selectedActivity, setSelectedActivity] = useState(null);

  const LatestTransactionsForSelectedScheme = () => LatestTransactions.filter(transaction => transaction.transactionScheme === selectedSchemeName);
  const logDetailsModalWithValues = (occuredPeriod, memberName, date, description, amount, method, joinedDate) => {
    setLogDetailsModal(true);
    setLogDetailsMemberName(memberName);
    setLogDetailsDate(date);
    setLogDetailsDescription(description);
    setLogDetailsAmount(amount);
    setLogDetailsMethod(method);
    setLogDetailsOccuredPeriod(occuredPeriod);
    setLogDetailsJoinedDate(joinedDate);
    setSelectedActivity({ occuredPeriod, memberName, date, description, amount, method, joinedDate });
  }
  return (
    <div className={`ActivityHistory w-full min-h-screen p-4 
        md:p-5 ${toggleMobileState === 5 ? "block" : "hidden"}
         ${toggleState === 5 ? "md:block" : "md:hidden"}
        `}>

      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
          Activity History
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

      <div className='glass p-6 text-white h-screen flex flex-col'>
        <h2 className='text-xl font-semibold mb-6 flex items-center gap-3 shrink-0'>
          <i className="fa-solid fa-clock-rotate-left"></i> Scheme Activity History
        </h2>
        <div className='flex-1 overflow-hidden'>
          <ul className='glass-scroll text-md h-full overflow-auto pr-2'>
            {
              LatestTransactionsForSelectedScheme().length === 0 ?
                (
                  <div className="text-center text-white/50 py-10 w-full h-full flex justify-center items-center flex-col gap-2">
                    <div className='text-9xl'><i className="fa-solid fa-hourglass-start"></i></div>
                    <p>No transactions <br /> available</p>
                  </div>
                ) :
                LatestTransactionsForSelectedScheme().map((transaction, index) => (
                  <li key={index} className='flex items-center justify-between border-b border-white/10 py-3 w-full 
                  hover:bg-white/10 transition-all cursor-pointer px-2 rounded-lg hover:text-white gap-2'
                    onClick={() => logDetailsModalWithValues(transaction.occuredPeriod, transaction.memberName, transaction.date, transaction.description, transaction.amount, transaction.method, transaction.joinedDate)}>

                    <p className='text-white/70 text-sm w-24 md:w-1/4 shrink-0 text-left'>
                      {transaction.occuredPeriod}
                    </p>

                    <p className='text-white/90 text-sm text-left flex-1 truncate'>
                      {transaction.description}
                    </p>

                    <p className='text-white/90 text-sm shrink-0 text-right whitespace-nowrap'>
                      {
                        (transaction.amount && transaction.amount !== "N/A" && transaction.amount !== "None" && transaction.amount !== "") ?
                          transaction.amount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }) :
                          transaction.memberName
                      }
                    </p>

                  </li>
                ))

            }
          </ul>
        </div>
      </div>

      <div className='footer md:col-span-3 flex grow flex-col sm:flex-row 
      justify-center items-center py-5 px-6 glass text-white mt-6'>
        <p>All rights reserved &copy; 2026 </p>
      </div>


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

                  {(logDetailsAmount && logDetailsAmount !== "N/A" && logDetailsAmount !== "None" && logDetailsAmount !== "" ?

                    <p className='text-xs text-white/70'>
                      <span className='font-bold'>Amount: </span>
                      {logDetailsAmount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                    </p>
                    : <p></p>)
                  }

                  <div>
                    <p className='sm:hidden text-xs text-white/70'>
                      <span className='font-bold'>joinedDate:</span> {new Date(logDetailsJoinedDate).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                    <p className='hidden sm:inline text-xs text-white/70'>
                      <span className='font-bold'>joinedDate:</span> {new Date(logDetailsJoinedDate).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>


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
                    {logDetailsAmount && logDetailsAmount !== "N/A" && logDetailsAmount !== "None" && logDetailsAmount !== "" ? (
                      <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Amount</td></tr>
                    ) : (<tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Value</td></tr>)}
                    <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Date</td></tr>
                    {logDetailsAmount && logDetailsAmount !== "N/A" && logDetailsAmount !== "None" && logDetailsAmount !== "" ? (
                      <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>Method</td></tr>
                    ) : (<tr></tr>)}
                  </td>
                  <td>
                  {logDetailsAmount && logDetailsAmount !== "N/A" && logDetailsAmount !== "None" && logDetailsAmount !== "" && logDetailsAmount !== null ? (
                    <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>none</td></tr>
                  ) : (<tr></tr>)}
                    <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>None</td></tr>
                    {logDetailsAmount && logDetailsAmount !== "N/A" && logDetailsAmount !== "None" && logDetailsAmount !== "" ? (
                      <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>None</td></tr>
                    ) : (<tr></tr>)}
                  </td>
                  <td>
                    {logDetailsAmount && logDetailsAmount !== "N/A" && logDetailsAmount !== "None" && logDetailsAmount !== "" ? (
                      <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>
                        {(() => {
                          if (!logDetailsAmount) return "None";

                          const cleanedAmount = String(logDetailsAmount).replace(/[^0-9.-]/g, '');
                          const num = Number(cleanedAmount);

                          if (!isNaN(num) && cleanedAmount !== '') {
                            return logDetailsAmount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
                          }

                          return "None";
                        })()}
                      </td></tr>
                    ) : (<tr className='hover:bg-gray-50 text-gray-900 cursor-pointer'><td className='p-3'>{logDetailsMemberName}</td></tr>)}
                    <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer h-full">
                      <td className='p-3'>
                        <td className='sm:hidden'>{new Date(logDetailsOccuredPeriod).toLocaleDateString('en-ZA', { timeZone: 'Africa/Johannesburg', day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className='hidden sm:inline'>{new Date(logDetailsOccuredPeriod).toLocaleDateString('en-ZA', { timeZone: 'Africa/Johannesburg', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      </td>
                    </tr>
                    {logDetailsAmount && logDetailsMethod !== "N/A" && logDetailsMethod !== "None" && logDetailsMethod !== "" ? (
                      <tr className="hover:bg-gray-50 text-gray-900 cursor-pointer"><td className='p-3'>{logDetailsMethod === "" ? "None" : logDetailsMethod}</td></tr>
                    ) : (<tr></tr>)}
                  </td>
                </tbody>
              </table>
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

export default ActivityHistory