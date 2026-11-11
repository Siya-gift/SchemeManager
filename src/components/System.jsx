import ActivityHistory from './ActivityHistory.jsx'
import Dashboard from './Dashboard.jsx'
import Expenses from './Expenses.jsx'
import Insights from './Insights.jsx'
import MobileMenu from './MobileMenu.jsx'
import MobileNav from './MobileNav.jsx'
import Overlayer from './Overlayer.jsx'
import Profile from './Profile.jsx'
import SchemeMembers from './SchemeMembers.jsx'
import Settings from './Settings.jsx'
import SideBar from './SideBar.jsx'
import systemBackground from '../images/bannerPic1.jpg'

function System({ dashboardProps }) {
  const {
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
    dash_schemes
  } = dashboardProps;

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${systemBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} overlayer={overlayer} setOverlayer={setOverlayer} selectedSchemeName={selectedSchemeName} />
      <div className='flex overflow-hidden'>
        <SideBar toggleState={toggleState} setToggleState={setToggleState} activeTab={activeTab} selectedSchemeName={selectedSchemeName} />
        <Profile toggleState={toggleState} />

        <Dashboard toggleState={toggleState} toggleMobileState={toggleMobileState} overlayer={overlayer}
          openCalender={openCalender} formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes}
          isAddSchemeModal={isAddSchemeModal} setAddSchemeModal={setAddSchemeModal} newScheme={newScheme} setNewScheme={setNewScheme} newSchemeAmount={newSchemeAmount} setNewSchemeAmount={setNewSchemeAmount}
          handleSchemeNameInputChange={handleSchemeNameInputChange} handleSchemeAmountInputChange={handleSchemeAmountInputChange} handleSchemeStartingBalInputChange={handleSchemeStartingBalInputChange}
          handleSchemeDateInputChange={handleSchemeDateInputChange} handleSchemeYearInputChange={handleSchemeYearInputChange} newSchemeStartingBal={newSchemeStartingBal} setNewSchemeStartingBal={setNewSchemeStartingBal}
          newSchemeDate={newSchemeDate} setNewSchemeDate={setNewSchemeDate} newSchemeYear={newSchemeYear} setNewSchemeYear={setNewSchemeYear} saveScheme={saveScheme}
          schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState} setSchemeSelectedState={setSchemeSelectedState} handleConfirmPayment={handleConfirmPayment}
          totalSpentThisMonth={totalSpentThisMonth} activeTab={activeTab} toggleTabMobile={toggleTabMobile} financialData={financialData} netDifference={netDifference}
          totalSchemeYearlyContribution={totalSchemeYearlyContribution} totalSchemeMonthlyContribution={totalSchemeMonthlyContribution} yearlyTarget={yearlyTarget} monthlyTarget={monthlyTarget}
          totalCash={totalCash} totalEFT={totalEFT} totalOther={totalOther} members={members} selectedSchemeName={selectedSchemeName} getMemberStatus={getMemberStatus} allMembers={allMembers}
          filteredMembers={filteredMembers} membersBehindStatus={membersBehindStatus} getMemberArrears={getMemberArrears} LatestTransactions={LatestTransactions}
          logDetails={logDetails} setLogDetailsModal={setLogDetailsModal} logDetailsModal={logDetailsModal} setLogDetailsMemberName={setLogDetailsMemberName} setLogDetailsDate={setLogDetailsDate} setLogDetailsDescription={setLogDetailsDescription}
          setLogDetailsAmount={setLogDetailsAmount} setLogDetailsMethod={setLogDetailsMethod} setLogDetailsOccuredPeriod={setLogDetailsOccuredPeriod} setLogDetailsJoinedDate={setLogDetailsJoinedDate}
          logDetailsMemberName={logDetailsMemberName} logDetailsDate={logDetailsDate} logDetailsDescription={logDetailsDescription} logDetailsAmount={logDetailsAmount} logDetailsMethod={logDetailsMethod}
          logDetailsOccuredPeriod={logDetailsOccuredPeriod} logDetailsJoinedDate={logDetailsJoinedDate} logDetailsModalWithValues={logDetailsModalWithValues} currentActivity={currentActivity}
          previousActivity={previousActivity} hasValue={hasValue} formatAmount={formatAmount} formatDate={formatDate}
          latestTransactionsForSelectedScheme={latestTransactionsForSelectedScheme}
          dash_schemes={dash_schemes}

        />
        <Overlayer overlayer={overlayer} toggleMenu={toggleMenu} />
        <SchemeMembers toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender}
          isAddSchemeModal={isAddSchemeModal} setAddSchemeModal={setAddSchemeModal} newScheme={newScheme} setNewScheme={setNewScheme} newSchemeAmount={newSchemeAmount} setNewSchemeAmount={setNewSchemeAmount}
          handleSchemeNameInputChange={handleSchemeNameInputChange} handleSchemeAmountInputChange={handleSchemeAmountInputChange} handleSchemeStartingBalInputChange={handleSchemeStartingBalInputChange}
          handleSchemeDateInputChange={handleSchemeDateInputChange} handleSchemeYearInputChange={handleSchemeYearInputChange} newSchemeStartingBal={newSchemeStartingBal} setNewSchemeStartingBal={setNewSchemeStartingBal}
          newSchemeDate={newSchemeDate} setNewSchemeDate={setNewSchemeDate} newSchemeYear={newSchemeYear} setNewSchemeYear={setNewSchemeYear} saveScheme={saveScheme}
          formattedDate={formattedDate} schemes={schemes} setSchemes={setSchemes} schemeSelected={schemeSelected} schemeSelectedState={schemeSelectedState}
          setSchemeSelectedState={setSchemeSelectedState} selectedSchemeName={selectedSchemeName} allMembers={allMembers} handleConfirmPayment={handleConfirmPayment}
          totalSchemeYearlyContribution={totalSchemeYearlyContribution} filteredMembers={filteredMembers} members={members} setMembers={setMembers} searchState={searchState}
          setSearchState={setSearchState} payingMember={payingMember} setPayingMember={setPayingMember} accordionData={accordionData} setAccordionData={setAccordionData}
          saveMember={saveMember} addMore={addMore} newMember={newMember} setNewMember={setNewMember} isAddMember={isAddMember} setIsAddMember={setIsAddMember} setPaymentMethod={setPaymentMethod}
          getMemberStatus={getMemberStatus} toast={toast} setLatestTransactions={setLatestTransactions} updateMember={updateMember} isEditMember={isEditMember} setIsEditMember={setIsEditMember} dash_schemes={dash_schemes}
        />
        <Expenses toggleState={toggleState} toggleMobileState={toggleMobileState} openCalender={openCalender} formattedDate={formattedDate}
          newExpenses={newExpenses} setExpenses={setExpenses} filteredExpenses={filteredExpenses} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          selectedCat={selectedCat} setSelectedCat={setSelectedCat} payments={payments} setPayments={setPayments} totalSpentThisMonth={totalSpentThisMonth}
          totalTransactionsThisMonth={totalTransactionsThisMonth} totalSpentThisYear={totalSpentThisYear} totalTransactionsThisYear={totalTransactionsThisYear} topCategory={topCategory}
          topCategoryAmount={topCategoryAmount} topCategoryPercentage={topCategoryPercentage} totalSpentForRefundsAndCredits={totalSpentForRefundsAndCredits} totalTransactionsForRefundsAndCredits={totalTransactionsForRefundsAndCredits}
          selectedSchemeName={selectedSchemeName} financialData={financialData} netDifference={netDifference} setLatestTransactions={setLatestTransactions}
        />
        <Insights toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} openCalender={openCalender} filteredMembers={filteredMembers} schemes={schemes} selectedSchemeName={selectedSchemeName} />
        <ActivityHistory toggleState={toggleState} toggleMobileState={toggleMobileState} formattedDate={formattedDate} openCalender={openCalender} LatestTransactions={LatestTransactions}
          selectedSchemeName={selectedSchemeName} logDetails={logDetails} setLogDetailsModal={setLogDetailsModal} logDetailsModal={logDetailsModal} setLogDetailsMemberName={setLogDetailsMemberName} setLogDetailsDate={setLogDetailsDate} setLogDetailsDescription={setLogDetailsDescription}
          setLogDetailsAmount={setLogDetailsAmount} setLogDetailsMethod={setLogDetailsMethod} setLogDetailsOccuredPeriod={setLogDetailsOccuredPeriod} setLogDetailsJoinedDate={setLogDetailsJoinedDate}
          logDetailsMemberName={logDetailsMemberName} logDetailsDate={logDetailsDate} logDetailsDescription={logDetailsDescription} logDetailsAmount={logDetailsAmount} logDetailsMethod={logDetailsMethod}
          logDetailsOccuredPeriod={logDetailsOccuredPeriod} logDetailsJoinedDate={logDetailsJoinedDate} logDetailsModalWithValues={logDetailsModalWithValues} currentActivity={currentActivity} previousActivity={previousActivity} hasValue={hasValue} formatAmount={formatAmount} formatDate={formatDate}
          latestTransactionsForSelectedScheme={latestTransactionsForSelectedScheme}
        />
        <Settings toggleState={toggleState} toggleMobileState={toggleMobileState} settoggleMobileState={settoggleMobileState} setToggleState={setToggleState} />
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} toggleMobileState={toggleMobileState} toggleMenu={toggleMenu} settoggleMobileState={settoggleMobileState} toggleTabMobile={toggleTabMobile} />
    </div>
  )
}

export default System
