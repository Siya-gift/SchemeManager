import React, { useState } from "react";

function ActivityHistory({
  toggleState,
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
  setLogDetailsJoinedDate,
  latestTransactionsForSelectedScheme,
  logDetailsModalWithValues,
  currentActivity,
  previousActivity,
  hasValue,
  formatAmount,
  formatDate
}) {


  return (
    <div
      className={`ActivityHistory w-full min-h-screen p-4 md:p-5
        ${toggleMobileState === 5
          ? "block"
          : "hidden"
        }
        ${toggleState === 5
          ? "md:block"
          : "md:hidden"
        }
      `}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="header flex flex-col md:flex-row
        justify-between items-center py-5 px-6
        glass mb-6 gap-4"
      >
        <h1
          className="text-3xl font-bold text-white
          w-full md:w-auto text-center md:text-left"
        >
          Activity History
        </h1>

        <div
          className="flex flex-wrap justify-center
          md:justify-end items-center gap-4
          text-white mt-4 md:mt-0"
        >
          <h5
            className="text-white/50
            text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]
            whitespace-nowrap"
          >
            Filter by date:
          </h5>

          <h3
            className="text-light cursor-pointer
            hover:text-white/80 uppercase
            text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]
            whitespace-nowrap"
          >
            {formattedDate}
          </h3>

          <span
            className="cursor-pointer
            hover:text-white/80
            text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]"
            onClick={openCalender}
          >
            <i className="fa-solid fa-calendar-days"></i>
          </span>
        </div>
      </div>

      {/* =====================================================
          TRANSACTION LIST
      ===================================================== */}

      <div
        className="glass p-6 text-white
        h-screen flex flex-col"
      >
        <h2
          className="text-xl font-semibold mb-6
          flex items-center gap-3 shrink-0"
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
          Scheme Activity History
        </h2>

        <div className="flex-1 overflow-hidden">

          <ul
            className="glass-scroll text-md
            h-full overflow-auto pr-2"
          >

            {latestTransactionsForSelectedScheme.length === 0 ? (

              <div
                className="text-center text-white/50
                py-10 w-full h-full
                flex justify-center items-center
                flex-col gap-2"
              >
                <div className="text-9xl">
                  <i className="fa-solid fa-hourglass-start"></i>
                </div>

                <p>
                  No transactions
                  <br />
                  available
                </p>
              </div>

            ) : (

              latestTransactionsForSelectedScheme.map(
                (transaction, idx) => (

                  <li
                    key={idx}
                    className="flex items-center
                    justify-between
                    border-b border-white/10
                    py-3 w-full
                    hover:bg-white/10
                    transition-all cursor-pointer
                    px-2 rounded-lg
                    hover:text-white gap-2"
                    onClick={() =>
                      logDetailsModalWithValues(
                        transaction
                      )
                    }
                  >

                    {/* OCCURRED PERIOD */}

                    <p
                      className="text-white/70 text-sm
                      w-24 md:w-1/4
                      shrink-0 text-left"
                    >
                      {transaction.occuredPeriod}
                    </p>

                    {/* DESCRIPTION */}

                    <p
                      className="text-white/90 text-sm
                      text-left flex-1 truncate"
                    >
                      {transaction.description}
                    </p>

                    {/* AMOUNT */}

                    <p
                      className="text-white/90 text-sm
                      shrink-0 text-right
                      whitespace-nowrap"
                    >
                      {hasValue(transaction.amount)
                        ? formatAmount(
                          transaction.amount
                        )
                        : transaction.memberName}
                    </p>

                  </li>
                )
              )

            )}

          </ul>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="footer md:col-span-3
        flex grow flex-col sm:flex-row
        justify-center items-center
        py-5 px-6 glass text-white mt-6"
      >
        <p>
          All rights reserved &copy; 2026
        </p>
      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {logDetailsModal && (

        <div
          className="fixed z-50 top-0 left-0
                    bg-black/50 h-screen w-screen"
        >

          <div
            className="fixed top-1/2 left-1/2
                        -translate-y-1/2
                        -translate-x-1/2
                        w-[90%] md:w-185
                        max-h-[90vh]
                        overflow-auto
                        glass px-3 py-5
                        bg-white/30
                        backdrop-blur-md
                        z-9999"
          >

            {/* =================================================
                            MODAL HEADER
                        ================================================= */}

            <div
              className="flex justify-between
                             items-center w-full text-white"
            >

              <h1 className="text-2xl">
                Log Details
              </h1>

              <p
                className="font-bold text-2xl
                                cursor-pointer"
                onClick={() =>
                  setLogDetailsModal(false)
                }
              >
                &times;
              </p>

            </div>

            {/* =================================================
                            TRANSACTION DETAILS
                        ================================================= */}

            <div
              className="bg-white/20
                            border border-white
                            rounded-2xl
                            mt-6 mb-3 p-3"
            >

              <div
                className="w-full flex
                                justify-between mb-3"
              >

                <div className="flex flex-col">

                  {/* MEMBER */}

                  <h2
                    className="text-md
                                        text-white/80"
                  >
                    {currentActivity?.memberName}
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className="text-xs
                                        text-white/70"
                  >
                    <span className="font-bold">
                      Description:
                    </span>{" "}
                    {currentActivity?.description}
                  </p>

                  {/* CURRENT AMOUNT */}

                  {hasValue(
                    currentActivity?.amount
                  ) && (

                      <p
                        className="text-xs
                                                text-white/70"
                      >
                        <span className="font-bold">
                          Amount:
                        </span>{" "}
                        {formatAmount(
                          currentActivity?.amount
                        )}
                      </p>

                    )}

                  {/* JOINED DATE */}

                  <p
                    className="text-xs
                                         text-white/70"
                  >
                    <span className="font-bold">
                      Joined Date:
                    </span>{" "}
                    {formatDate(
                      currentActivity?.joinedDate
                    )}
                  </p>

                </div>

                {/* OCCURRED PERIOD */}

                <p
                  className="text-xs
                                    text-white/70
                                    text-right"
                >
                  {currentActivity?.occuredPeriod}
                </p>

              </div>

              {/* =================================================
                                OLD / NEW TABLE
                            ================================================= */}

              <div className="overflow-x-auto">

                <table
                  className="w-full
                                    bg-white
                                    text-left text-sm
                                    text-gray-500
                                    rounded-xl
                                    overflow-hidden"
                >

                  <thead>

                    <tr>

                      <th
                        className="bg-gray-50
                                                text-xs font-semibold
                                                uppercase
                                                tracking-wider
                                                text-gray-700 p-3"
                      >
                        Property
                      </th>

                      <th
                        className="bg-gray-50
                                            text-xs font-semibold
                                            uppercase
                                            tracking-wider
                                            text-gray-700 p-3"
                      >
                        Old Value
                      </th>

                      <th
                        className="bg-gray-50
                                                text-xs font-semibold
                                                uppercase
                                                tracking-wider
                                                text-gray-700 p-3"
                      >
                        New Value
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {/* =================================================
                                            AMOUNT
                                        ================================================= */}

                    {hasValue(
                      currentActivity?.amount
                    ) && (

                        <tr
                          className="hover:bg-gray-50
                                                    text-gray-900"
                        >

                          <td
                            className="p-3
                                                        font-semibold"
                          >
                            Amount
                          </td>

                          {/* OLD */}

                          <td className="p-3">

                            {previousActivity && previousActivity.amount !== ""
                              ? formatAmount(
                                previousActivity.amount
                              )
                              : "None"}

                          </td>

                          {/* NEW */}

                          <td className="p-3">

                            {formatAmount(
                              currentActivity?.amount
                            )}

                          </td>

                        </tr>

                      )}


                    {/* =================================================
                                            MEMBER / VALUE
                                        ================================================= */}

                    {!hasValue(currentActivity?.amount) && (
                      <tr className="hover:bg-gray-50 text-gray-900">
                        <td className="p-3 font-semibold">
                          Value
                        </td>

                        {/* OLD */}
                        <td className="p-3">
                          {currentActivity?.oldMemberName || previousActivity?.memberName || "None"}
                        </td>

                        {/* NEW */}
                        <td className="p-3">
                          {currentActivity?.memberName || "None"}
                        </td>
                      </tr>
                    )}

                    {/* =================================================
                                            DATE
                                        ================================================= */}
                    {hasValue(currentActivity?.occuredPeriod) && (


                      <tr
                        className="hover:bg-gray-50
                                                text-gray-900"
                      >

                        <td
                          className="p-3
                                                    font-semibold"
                        >
                          Date
                        </td>

                        {/* OLD DATE */}

                        <td className="p-3">

                          {previousActivity?.occuredPeriod || currentActivity?.occuredPeriod || "None"}

                        </td>

                        {/* NEW DATE */}

                        <td className="p-3">

                          {currentActivity?.occuredPeriod || "None"}

                        </td>

                      </tr>

                    )}

                    {/* =================================================
                                            METHOD
                                        ================================================= */}

                    {hasValue(
                      currentActivity?.amount
                    ) && (

                        <tr
                          className="hover:bg-gray-50
                        text-gray-900"
                        >

                          <td
                            className="p-3
                          font-semibold"
                          >
                            Method
                          </td>

                          {/* OLD METHOD */}

                          <td className="p-3">

                            {previousActivity
                              ?.method || "None"}

                          </td>

                          {/* NEW METHOD */}

                          <td className="p-3">

                            {currentActivity
                              ?.method || "None"}

                          </td>

                        </tr>

                      )}

                  </tbody>

                </table>

              </div>
            </div>

            {/* =================================================
                    
            ================================================= */}

            <button
              className="w-full py-3
                            rounded-xl
                            text-white mt-2
                            bg-white/40
                            cursor-pointer
                            hover:bg-white/30"
              onClick={() =>
                setLogDetailsModal(false)
              }
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default ActivityHistory;
