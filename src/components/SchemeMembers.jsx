import React, { useState, useEffect } from 'react'

function SchemeMembers({ toggleState, toggleMobileState, openCalender, formattedDate }) {

  const [searchState, setSearchState] = useState("");
  const [isDotMenu, setisDotMenu] = useState(false);
  const [activeMenuIdx, setActiveMenuIdx] = useState(null);
  const [isDotMenuState, setisDotMenuState] = useState("hidden");
  const [searchList, setsearchList] = useState("");
  const [searchHistory, setSearchHistory] = useState("");
  const [txtListState, setTxtListState] = useState(false);
  const [payingMember, setPayingMember] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [editSchemeName, setEditSchemeName] = useState(null);
  const [editSchemeAmount, setEditSchemeAmount] = useState(null);
  const [editSchemeStartingBal, setEditSchemeStartingBal] = useState(null);
  const [editSchemeDate, setEditSchemeDate] = useState(null);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [deleteSchemeTargetIndex, setDeleteSchemeTargetIndex] = useState(null);


  //popups states
  const [isAddMember, setIsAddMember] = useState(false);
  const [isDeleteMember, setIsDeleteMember] = useState(false);
  const [isDeleteScheme, setIsDeleteScheme] = useState(false);
  const [isEditMember, setIsEditMember] = useState(false);
  const [isEditScheme, setIsEditScheme] = useState(false);
  const [isDeletePaymentHist, setIsDeletePaymentHist] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isEditPaymentHist, setIsEditPaymentHist] = useState(false);
  const [isAddSchemeModal, setAddSchemeModal] = useState(false);
  const [isPaymentHistoryModal, setPaymentHistoryModal] = useState(false);



  const allMembers = [
    {
      memberName: "Sam",
      totPaid: 500.00,
      status: "Paid"
    },
    {
      memberName: "John",
      totPaid: 1120.00,
      status: "Ahead"
    },
    {
      memberName: "Vivian",
      totPaid: 0.00,
      status: "Arrears"
    },
    {
      memberName: "Paul",
      totPaid: 500.00,
      status: "Paid"
    }
  ]
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

  const [members, setMembers] = useState(() => allMembers);
  const [newMember, setNewMember] = useState("");
  const [member, setMember] = useState("");

  const [schemes, setSchemes] = useState(() => allSchemes);
  const [newScheme, setNewScheme] = useState("");
  const [newSchemeAmount, setNewSchemeAmount] = useState();
  const [newSchemeStartingBal, setNewSchemeStartingBal] = useState();
  const [newSchemeDate, setNewSchemeDate] = useState("");

  const filteredMembers = members.filter((member) =>
    member.memberName.toLowerCase().includes(searchState.toLowerCase())
  );

  const searchFunc = (e) => {
    setSearchState(e.target.value);
  };

  const scrollOnList = (event) => {
    const position = event.currentTarget.scrollTop;

    if (position > 0) {
      setTxtListState(true);
    } else {
      setTxtListState(false);
    }
  };

  const toggleDotMenu = (idx) => {
    setisDotMenu(!isDotMenu);
    setActiveMenuIdx(activeMenuIdx === idx ? null : idx);
  };

  const openAddMember = () => {
    setIsAddMember(prev => !prev);
    if (isAddMember) {
      setIsAddMember(false)
    } else {
      setIsAddMember(true)
    }
  }

  const preventScroll = (e) => {
    e.preventDefault();
  };
  useEffect(() => {


    if (isAddMember) {
      // Blocks mouse wheel, trackpad, and touch scrolling
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isAddMember]);

  const addMore = () => {
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);



    let members = document.getElementById('AddMoreMembers');
    let memberIndex = 0
    memberIndex++;
    members.innerHTML += `<div class="flex gap-2 items-center flex-row mt-3 w-full" id="member-${memberIndex}">
    <input class="border-white border rounded-xl p-3 
    focus:border-white focus:outline-white text-white 
    w-full" type="text" id="NameOfMember" placeholder="Enter Member Name" />
    <p class="border border-white rounded-xl w-12 h-12 
    grid place-content-center text-white shrink-0 hover:-translate-y-1
    cursor-pointer" onclick="deleteMemberCan(${memberIndex})">
        <i class="fa-solid fa-trash"></i>
    </p>
    </div>`

  }

  window.deleteMemberCan = (idx) => {
    const memberElement = document.getElementById(`member-${idx}`);

    if (memberElement) {
      memberElement.remove();
    }
  }

  const handleInputChange = (e) => {
    setNewMember(e.target.value);
  };
  const handleSchemeNameInputChange = (e) => {
    setNewScheme(e.target.value);
  };
  const handleSchemeAmountInputChange = (e) => {
    setNewSchemeAmount(e.target.value);
  };
  const handleSchemeStartingBalInputChange = (e) => {
    setNewSchemeStartingBal(e.target.value);
  };
  const handleSchemeDateInputChange = (e) => {
    setNewSchemeDate(e.target.value);
  };

  //Edit
  const handleInputChangeEdit = (e) => {
    setEditMember(e.target.value);
  };
  const handleSchemeInputChangeEdit = (e) => {
    setEditSchemeName(e.target.value);
  };
  const handleAmountInputChangeEdit = (e) => {
    setEditSchemeAmount(e.target.value);
  };
  const handleStartingBalInputChangeEdit = (e) => {
    setEditSchemeStartingBal(e.target.value);
  };
  const handleDateInputChangeEdit = (e) => {
    setEditSchemeDate(e.target.value);
  };

  const saveMember = () => {
    if (!newMember.trim()) return;

    const memberToAdd = {
      memberName: newMember.trim(),
      totPaid: 0,
      status: "Pending"
    };

    allMembers.push(memberToAdd)

    setMembers((prev) => [...prev, memberToAdd]);
    setNewMember("");
    setIsAddMember(false);
  };

  const saveScheme = () => {
    if (!newScheme.trim()) return;
    if (!newSchemeAmount) return;

    const schemeToAdd = {
      scheme: newScheme.trim(),
      monthlyContribution: newSchemeAmount,
      startingBal: newSchemeStartingBal,
      date: newSchemeDate
    }

    allSchemes.push(schemeToAdd)

    setSchemes((prev) => [...prev, schemeToAdd]);
    setNewScheme("");
    setNewSchemeAmount("");
    setAddSchemeModal(false);
  }

  const deleteMember = (idx) => {
    setIsDeleteMember(true);
    setDeleteTargetIndex(idx);
  };
  const deleteSchemeModal = (idx) => {
    setIsDeleteScheme(true);
    setDeleteSchemeTargetIndex(idx);
  };

  const getStatusClass = (status) => {
    if (status === "Paid") {
      return "bg-green-100 text-green-800";
    } else if (status === "Ahead") {
      return "bg-blue-100 text-blue-800";
    } else if (status === "Pending") {
      return "bg-amber-100 text-amber-800";
    } else {
      return "bg-red-100 text-red-800";
    }
  };

  const removeMember = () => {
    setIsDeleteMember(false);
    if (deleteTargetIndex === null) return;

    const updatedMembers = members.filter((_, index) => index !== deleteTargetIndex);
    setMembers(updatedMembers);
    setDeleteTargetIndex(null);
  };

  const removeScheme = () => {
    setIsDeleteScheme(false);
    if (deleteSchemeTargetIndex === null) return;

    const updatedSchemes = schemes.filter((_, index) => index !== deleteSchemeTargetIndex);
    setSchemes(updatedSchemes);
    setDeleteTargetIndex(null);
  };

  const payingModal = (memberName) => {
    setIsPaying(true)
    setPayingMember(memberName)
  }

  const editModal = (memberName) => {
    setIsEditMember(true)
    setEditMember(memberName)
  }

  const editSchemeModal = (scheme, monthlyContribution, startingBal, date) => {
    setIsEditScheme(true)
    setEditSchemeName(scheme)
    setEditSchemeAmount(monthlyContribution)
    setEditSchemeStartingBal(startingBal)
    setEditSchemeDate(date)
  }

  const addSchemeModal = () => {
    setAddSchemeModal(true)
  }

  const paymentHistoryModal = (memberName) => {
    setPaymentHistoryModal(true)
    setMember(memberName)
  }

  //Payment history Accordion
  //first payment should be january and if not it'll create empty properties
  //with no values, this is to ensure the accordion always has something to 
  // map through and display even if no payments have been made in that year
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const accordionData = [
    {
      year: "2026",
      yearHistory: [
        {
          date: "2026-01-26",
          amount: "8 000.00",
          details: "Cash"
        },
        {
          date: "2026-02-26",
          amount: "10 000.00",
          details: "Other"
        },
        {
          date: "2026-03-26",
          amount: "7 500.00",
          details: "Cash"
        }
      ]
    },
    {
      year: "2025",
      yearHistory: [
        {
          date: "2025-11-20",
          amount: "10 000.10",
          details: "EFT"
        },
        {
          date: "2025-12-15",
          amount: "9 999.50",
          details: "EFT"
        },
      ]
    },
    {
      year: "2024",
      yearHistory: [{
        date: "2024-08-15",
        amount: "20 500.00",
        details: "Other"
      }]
    },
    {
      year: "2023",
      yearHistory: [{
        date: "",
        amount: "",
        details: ""
      }]
    }
  ];
  //-------------------------------------------------------------------


  return (
    <div className={`schemeMembers w-full min-h-screen p-4 md:p-8 
        ${toggleMobileState === 2 ? "block" : "hidden"} 
        ${toggleState === 2 ? "md:block" : "md:hidden"}
        `}>

      {/* Header: Stacks on mobile, side-by-side on md+ */}
      <div className='hearder flex flex-col md:flex-row justify-between items-center py-5 px-6 glass mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-white w-full md:w-auto text-center md:text-left'>
          Scheme & Members
        </h1>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-4 text-white'>
          <h5 className='text-white/50 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
            Filter by date:
          </h5>
          <h3 className='text-light cursor-pointer hover:text-white/80 uppercase text-[clamp(0.875rem,1vw+0.5rem,1.125rem)] whitespace-nowrap'>
            {formattedDate}
          </h3>
          <span className="cursor-pointer hover:text-white/80 text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]"
            onClick={openCalender}>
            <i className="fa-solid fa-calendar-days"></i>
          </span>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-4'>
        <div className='glass p-6 text-white flex flex-col h-auto md:col-span-1'>
          <div className='flex justify-between items-center py-4'>
            <h1 className='font-bold text-xl'>Your Schemes</h1>
            <span className='text-2xl cursor-pointer' onClick={() => { addSchemeModal() }}>
              <i className="fa-solid fa-circle-plus"></i>
            </span>
          </div>

          <ul className='grow min-h-25 max-h-130 overflow-y-auto glass-scroll'>
            {schemes.map((item, idx) => (
              <li key={idx} className='py-5 px-10 bg-white/30  border cursor-pointer hover:bg-white/40
              my-2 rounded-xl mr-1.5 focus:border-2'>
                <div className='flex justify-between items-center gap-3'>
                  <div className='flex justify-between flex-col leading-5'>
                    <h3 className='text-md font-bold'>{item.scheme}</h3>
                    <p className='text-[11px] text-white/70'>R{item.monthlyContribution}/mo</p>
                  </div>
                  <div className='flex gap-3 flex-end text-[11px] transition-transform'>
                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1'
                      onClick={() => editSchemeModal(item.scheme, item.monthlyContribution, item.startingBal, item.date)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </span>
                    <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1'
                      onClick={() => deleteSchemeModal(idx)}>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {schemes.length === 0 && (
              <div>
                <p className="py-10 text-center opacity-50">No scheme found</p>
              </div>
            )}
          </ul>
        </div>

        <div className='glass p-6 text-white flex flex-col min-h-svh md:col-span-2'>
          <div className='flex items-left flex-col gap-y-3'>
            <h1 className='font-bold text-xl'>Members of club now</h1>
            <div className='flex flex-col xl:flex-row gap-3 sm:w-full md:w-auto'>
              <input className='py-2.5 px-2 border rounded-xl w-full focus:border-white 
              focus:outline-white' type='text' value={searchState} onChange={searchFunc}
                id="inputField" placeholder='Search Members...' />

              <button className='bg-white/30 px-2 py-2.5 w-full border rounded-xl 
              cursor-pointer hover:bg-white/45' onClick={openAddMember}>
                <i className="fa-solid fa-plus"></i> Add Member
              </button>
            </div>



          </div>

          <ul className='flex w-full mt-9 rounded-2xl'>
            <div
              className="w-full h-auto max-h-150 md:max-h-110 glass-scroll overflow-x-auto transition-color duration-300 rounded-xl z-1"
              onScroll={scrollOnList}
            >
              <table className='w-full text-left border-collapse'>
                <thead className={`sticky top-0 ${txtListState ? "bg-white/98 [&_tr]:text-black/70" : "text-white"} w-full`}>
                  <tr className="border-b uppercase text-sm">
                    <th className="sticky top-0 py-4 px-2">Name</th>
                    <th className="sticky top-0 py-4 px-2 truncate max-w-50">Total Paid</th>
                    <th className="sticky top-0 py-4 px-2">Status</th>
                    <th className="sticky top-0 py-4 px-2 text-right">Action</th>
                  </tr>
                </thead>

                <tbody id='membersList'>
                  {filteredMembers.map((member, idx) => (
                    <tr key={idx} className={`border-b hover:bg-white/30 transition-colors cursor-pointer ${searchList}`} id='memberRow'>
                      <td className="py-4 px-2 align-middle font-medium truncate hover:text-white/70"
                        onClick={() => paymentHistoryModal(member.memberName)}
                        name={"View Payment History"}>
                        {idx + 1}. {member.memberName}
                      </td>
                      <td className="py-4 px-2 align-middle">R {member.totPaid}</td>
                      <td className="py-4 px-2 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full 
                      text-xs font-medium ${getStatusClass(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="relative md:hidden py-4 px-2 align-middle text-right">
                        <span
                          className='px-2 py-2 mr-2 transition-transform inline-block hover:-translate-y-1 cursor-pointer'
                          onClick={() => { toggleDotMenu(idx) }}
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </span>

                        {activeMenuIdx === idx && (
                          <div className="md:hidden glass bg-white absolute -bottom-30 right-0 
                          py-2.5 px-5 text-sm text-left text-black/70 z-9
                          after:content-[''] after:absolute after:bottom-full after:right-5
                          after:border-8 after:border-transparent after:border-b-white">

                            <p className='border-white-400 flex gap-2 align-center py-2'
                              onClick={() => editModal(member.memberName)}>
                              <i className="fa-regular fa-pen-to-square"></i> Edit
                            </p><hr />
                            <p className='border-white-400 flex gap-2 align-center py-2'
                              onClick={() => deleteMember(idx)}>
                              <i className="fa-solid fa-trash"></i> Delete
                            </p><hr />
                            <p className='border-white-400 flex gap-2 align-center py-2'
                              onClick={() => payingModal(member.memberName)}>
                              <i className="fa-regular fa-credit-card"></i> Pay
                            </p>
                          </div>
                        )}

                      </td>
                      <td className="hidden md:block py-4 px-2 align-middle text-right">
                        <span className='px-2 py-2 mr-2  transition-transform inline-block hover:-translate-y-1'
                          onClick={() => editModal(member.memberName)}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                        <span className='px-2 py-2 mr-2 transition-transform inline-block hover:-translate-y-1'
                          onClick={() => deleteMember(idx)}>
                          <i className="fa-solid fa-trash"></i>
                        </span>
                        <button className='px-3 py-2 mr-2 transition-transform inline-block hover:-translate-y-1
                        bg-white text-black text-xs rounded-xl cursor-pointer' onClick={() => payingModal(member.memberName)}>
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-10 text-center opacity-50">No members found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </ul>
        </div>
        <div className='footer md:col-span-3 flex flex-col sm:flex-row 
        justify-center items-center py-5 px-6 glass text-white'>
          <p>All rights reserved &copy; 2026 </p>
        </div>
      </div>


      {isAddMember &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">

            <div className='flex justify-between align-center w-full text-white'>
              <h1 className='text-2xl'>Add Member</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={openAddMember}>&times;</p>
            </div>
            <div className='flex justify-between align-center w-full text-white mt-10
          text-sm'>
              <h3 className='text-white'>Name</h3>
              <p className='cursor-pointer text-xs align-center hover:text-white/75' onClick={() => { addMore() }}>
                <i className="fa-solid fa-plus"></i> Add More
              </p>
            </div>

            <ul className='max-h-60 overflow-y-auto no-scrollbar' id='AddMoreMembers'>
              <input className='border-white mt-3 border rounded-xl p-3 w-full focus:border-white 
              focus:outline-white text-white' type='text' placeholder='Enter Member Name' id='inputName'
                onChange={handleInputChange}
                value={newMember}
              />
            </ul>

            <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={saveMember}>
              Save
            </button>
          </div>
        </div>
      }

      {isDeleteMember &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <h1 className='text-white text-2xl mb-4'>Delete Member?</h1>

            <h1 className='text-white/90 text-md'>Are you sure you want to delete this member and all their history? This cannot be undone.</h1>
            <div className='flex justify-between align-center gap-4'>
              <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { setIsDeleteMember(false) }}>
                No
              </button>
              <button className='w-full py-3 rounded-xl text-white mt-6 bg-red-500 cursor-pointer
            hover:bg-red-400' onClick={() => { removeMember() }}>
                Yes
              </button>
            </div>

          </div>
        </div>
      }

      {isDeleteScheme &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <h1 className='text-white text-2xl mb-4'>Delete Scheme?</h1>

            <h1 className='text-white/90 text-md'>This will PERMANENTLY remove this scheme and all associated members and expenses.</h1>
            <div className='flex justify-between align-center gap-4'>
              <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { setIsDeleteScheme(false) }}>
                No
              </button>
              <button className='w-full py-3 rounded-xl text-white mt-6 bg-red-500 cursor-pointer
            hover:bg-red-400' onClick={() => { removeScheme() }}>
                Yes
              </button>
            </div>

          </div>
        </div>
      }
      {isDeletePaymentHist &&
        <div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen z-100'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <h1 className='text-white text-2xl mb-4'>Remove Payment?</h1>

            <h1 className='text-white/90 text-md'>Are you sure you want to remove this payment record?</h1>
            <div className='flex justify-between align-center gap-4'>
              <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { setIsDeletePaymentHist(false) }}>
                No
              </button>
              <button className='w-full py-3 rounded-xl text-white mt-6 bg-red-500 cursor-pointer
            hover:bg-red-400' onClick={() => { removePaymentHistory() }}>
                Yes
              </button>
            </div>

          </div>
        </div>
      }

      {isEditMember &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">

            <div className='flex justify-between align-center w-full text-white'>
              <h1 className='text-2xl'>Edit Member</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={() => setIsEditMember(false)}>&times;</p>
            </div>
            <div className='flex start align-center w-full text-white mt-6
            text-sm'>
              <h3 className='text-white'>Name</h3>
            </div>

            <div className='max-h-60 overflow-y-auto no-scrollbar' id='AddMoreMembers'>
              <input className='border-white mt-3 border rounded-xl p-3 w-full focus:border-white 
              focus:outline-white text-white' type='text' value={editMember} onChange={handleInputChangeEdit}
              />
            </div>
            <div className='flex start align-center w-full text-white mt-5
            text-sm'>
              <h3 className='text-white'>Monthly Contribution</h3>
            </div>

            <div className='max-h-60 overflow-y-auto no-scrollbar' id='AddMoreMembers'>
              <input className='border-white mt-3 border rounded-xl p-3 w-full focus:border-white 
              focus:outline-white text-white' type='number' placeholder='Default'
              />
            </div>

            <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30'>
              Save
            </button>
          </div>
        </div>
      }

      {isEditScheme &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <div className='flex justify-between align-center w-full text-white mb-4'>
              <h1 className='text-2xl'>Edit Scheme</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={() => setIsEditScheme(false)}>&times;</p>
            </div>


            <div className='mb-2 text-xs'>
              <h4 className='text-white/85'>Scheme Name</h4>
              <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
              focus:outline-white text-white' required placeholder={`e.g. Social Club ${new Date().getFullYear()}`} type='text'
                onChange={handleSchemeInputChangeEdit} value={editSchemeName} />
            </div>
            <div className='mb-2 text-xs'>
              <h4 className='text-white/85'>Default Monthly Contribution</h4>
              <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
              focus:outline-white text-white ' required type='number' placeholder='R 0.00'
                onChange={handleAmountInputChangeEdit} value={editSchemeAmount}
              />
              <p className='text-white/60 text-[9px] w-full mt-3 mb-6'>
                This is the default amount you expect from each member every month.</p>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-bold uppercase text-white/60 mb-1">
                Starting Balance (Optional)
              </label>
              <div className="flex mb-2">
                <span className="flex items-center px-3 bg-white/60 border border-r-0 
                border-gray-300 rounded-l-lg text-white">
                  <i className="fas fa-coins"></i>
                </span>
                <input
                  type="number"
                  id="editSchemeStartingBalance"
                  className="w-full px-4 py-2 border border-gray-300 rounded-r-lg 
                  text-white focus:outline-none focus:border-white"
                  placeholder="R 0.00"
                  value={editSchemeStartingBal}
                  onChange={handleStartingBalInputChangeEdit}
                />
              </div>


              <div className="flex">
                <span className="flex items-center px-3 bg-white/60 border border-r-0 
                border-gray-300 rounded-l-lg text-sm text-white">
                  As Of
                </span>
                <select
                  id="editSchemeSBMonth"
                  defaultValue={new Date().getMonth()}
                  onChange={handleDateInputChangeEdit}
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

                <select
                  id="editSchemeSBYear"
                  defaultValue={new Date().getFullYear()}
                  className="w-25 bg-transparent px-3 py-2 text-white border 
                  border-l-0 border-white/60 rounded-r-lg text-xs
                  focus:outline-none focus:border-white scheme-dark"
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

              <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { setIsEditScheme(false) }}>
                Save Scheme
              </button>

            </div>

          </div>
        </div>
      }


      {isPaying &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <div className='flex justify-between align-center w-full text-white'>
              <h1 className='text-2xl'>Record Payment</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={() => setIsPaying(false)}>&times;</p>
            </div>

            <div className='Username w-full bg-white/20 border border-white rounded-2xl mt-3 mb-6'>
              <h2 className='p-2 text-white'>{payingMember}</h2>
            </div>
            <div className='flex justify-between flex-col md:flex-row gap-4 align-center mb-2 text-xs'>
              <div className='flex flex-col w-full'>
                <h4 className='text-white/85' >Amount (R) </h4>
                <input className='border-white mt-1 border rounded-xl p-3 focus:border-white 
              focus:outline-white text-white' placeholder='R ' type='number' name='payAmount' />
              </div>
              <div className='flex flex-col w-full'>
                <h4 className='text-white/85'>Date </h4>
                <input
                  className="border-white mt-1 border w-full rounded-xl p-3 bg-transparent text-white focus:border-white focus:outline-none scheme-dark"
                  type="date"
                  name="payDate"
                />
              </div>
            </div>
            <div className='my-3 text-xs'>
              <h4 className='text-white/85'>Payment Method</h4>
              <select className='p-2 border border-white rounded-xl w-full focus:border-white 
              focus:outline-white text-white mt-1 bg-black/40'>
                <option>Cash</option>
                <option>EFT</option>
                <option>Mobile Money</option>
                <option>Direct Deposit</option>
                <option>Other</option>
              </select>
            </div>

            <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { setIsPaying(false) }}>
              Save
            </button>

          </div>

        </div>
      }
      {isEditPaymentHist &&
        <div className='fixed z-100 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <div className='flex justify-between align-center w-full text-white'>
              <h1 className='text-2xl'>Record Payment</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={() => setIsEditPaymentHist(false)}>&times;</p>
            </div>

            <div className='Username w-full bg-white/20 border border-white rounded-2xl mt-3 mb-6'>
              <h2 className='p-2 text-white'>Sam</h2>
            </div>
            <div className='flex justify-between flex-col md:flex-row gap-4 align-center mb-2 text-xs'>
              <div className='flex flex-col w-full'>
                <h4 className='text-white/85' >Amount (R) </h4>
                <input className='border-white mt-1 border rounded-xl p-3 focus:border-white 
              focus:outline-white text-white' placeholder='R ' type='number' name='payAmount' />
              </div>
              <div className='flex flex-col w-full'>
                <h4 className='text-white/85'>Date </h4>
                <input
                  className="border-white mt-1 border w-full rounded-xl p-3 bg-transparent text-white focus:border-white focus:outline-none scheme-dark"
                  type="date"
                  name="payDate"
                />
              </div>
            </div>
            <div className='my-3 text-xs'>
              <h4 className='text-white/85'>Payment Method</h4>
              <select className='p-2 border border-white rounded-xl w-full focus:border-white 
              focus:outline-white text-white mt-1 bg-black/40'>
                <option>Cash</option>
                <option>EFT</option>
                <option>Mobile Money</option>
                <option>Direct Deposit</option>
                <option>Other</option>
              </select>
            </div>

            <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { setIsEditPaymentHist(false) }}>
              Save
            </button>

          </div>

        </div>
      }
      {isAddSchemeModal &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <div className='flex justify-between align-center w-full text-white mb-4'>
              <h1 className='text-2xl'>New Scheme</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={() => setAddSchemeModal(false)}>&times;</p>
            </div>


            <div className='mb-2 text-xs'>
              <h4 className='text-white/85'>Scheme Name</h4>
              <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
              focus:outline-white text-white' required placeholder={`e.g. Social Club ${new Date().getFullYear()}`} type='text'
                onChange={handleSchemeNameInputChange} value={newScheme} />
            </div>
            <div className='mb-2 text-xs'>
              <h4 className='text-white/85'>Default Monthly Contribution</h4>
              <input className='border-white mt-1 border w-full rounded-xl p-3 focus:border-white 
              focus:outline-white text-white ' required type='number' placeholder='R 0.00'
                onChange={handleSchemeAmountInputChange} value={newSchemeAmount}
              />
              <p className='text-white/60 text-[9px] w-full mt-3 mb-6'>
                This is the default amount you expect from each member every month.</p>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-bold uppercase text-white/60 mb-1">
                Starting Balance (Optional)
              </label>
              <div className="flex mb-2">
                <span className="flex items-center px-3 bg-white/60 border border-r-0 
                border-gray-300 rounded-l-lg text-white">
                  <i className="fas fa-coins"></i>
                </span>
                <input
                  type="number"
                  id="editSchemeStartingBalance"
                  className="w-full px-4 py-2 border border-gray-300 rounded-r-lg 
                  text-white focus:outline-none focus:border-white"
                  placeholder="R 0.00"
                  onChange={handleSchemeStartingBalInputChange}
                  value={newSchemeStartingBal}
                />
              </div>


              <div className="flex">
                <span className="flex items-center px-3 bg-white/60 border border-r-0 
                border-gray-300 rounded-l-lg text-sm text-white">
                  As Of
                </span>
                <select
                  id="editSchemeSBMonth"
                  defaultValue={new Date().getMonth()}
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

                <select
                  id="editSchemeSBYear"
                  defaultValue={new Date().getFullYear()}
                  className="w-25 bg-transparent px-3 py-2 text-white border 
                  border-l-0 border-white/60 rounded-r-lg text-xs
                  focus:outline-none focus:border-white scheme-dark"
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

              <button className='w-full py-3 rounded-xl text-white mt-6 bg-white/40 cursor-pointer
            hover:bg-white/30' onClick={() => { saveScheme() }}>
                Save
              </button>

            </div>

          </div>
        </div>
      }

      {isPaymentHistoryModal &&
        <div className='fixed z-9 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-black/50 h-screen w-screen'>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
           w-75 md:w-185 h-auto border-none! glass px-3 py-5 bg-white/30 backdrop-blur-md z-9999">
            <div className='flex justify-between align-center w-full text-white mb-4'>
              <h1 className='text-2xl'>{member}</h1>
              <p className='font-bold text-2xl cursor-pointer' onClick={() => setPaymentHistoryModal(false)}>&times;</p>
            </div>

            <div className='flex w-full gap-3 flex-col md:flex-row pb-4'>
              <div className="flex align-center justify-around">
                <span className="flex items-center px-3 bg-white/60 border border-r-0 
                border-gray-300 rounded-l-xl text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input className='border w-full md:w-50 border-gray-300 rounded-r-xl p-3 focus:border-white border-l-0
              focus:outline-white text-white' type="text" placeholder='Search History...' onChange={(e) => setSearchHistory(e.target.value)} />
              </div>
              <button className='bg-green-900 text-white text-md hover:bg-green-800 border-none 
              outline-none px-8 py-3 py-auto rounded-xl cursor-pointer w-full'>
                <i className="fa-solid fa-file-csv"></i>
                <span className='ml-2'>CSV</span>
              </button>
              <button className='bg-red-900 text-white text-md hover:bg-red-800 border-none 
              outline-none px-8 py-3 py-auto rounded-xl cursor-pointer w-full'>
                <i className="fa-solid fa-file-pdf"></i>
                <span className='ml-2'>PDF Statement</span>
              </button>
            </div>

            <div className="max-h-100 overflow-y-auto pr-2 glass-scroll">
              {accordionData.filter((item) => {
                const query = searchHistory.toLowerCase().trim();

                if (query === "") {
                  return true;
                }
                const yearMatches = item.year.toLowerCase().includes(query);

                const historyMatches = item.yearHistory.some((history) => {

                  const monthName = history.date ? new Date(history.date).toLocaleString("default", { month: "long" }).toLowerCase() : "";
                  const cleanAmount = history.amount ? history.amount.toString().replace(/[\s,.]/g, '') : "";

                  return (
                    (history.date && history.date.toLowerCase().includes(query)) ||
                    cleanAmount.includes(query) ||
                    monthName.includes(query) ||
                    (history.details && history.details.toLowerCase().includes(query))
                  );
                });
                return yearMatches || historyMatches;
              })
                .map((item, index) => {
                  const isOpen = openIndex == index;
                  return (
                    <div key={index} className="mb-2">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="histAccordian flex justify-between items-center text-white bg-white/40 
                      w-full px-5 py-6 my-1.5 rounded-xl transition-all duration-200 hover:bg-white/50
                      focus:border cursor-pointer">
                        <h1 className="flex items-center">
                          <i className="fa-solid fa-calendar-check"></i>
                          <span className="ml-2 font-semibold">{item.year}</span>
                        </h1>
                        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                          <i className='fa-solid fa-chevron-down'></i>
                        </div>
                      </button>

                      {/* //content */}
                      <div className={`grid transition-all duration-300 ease-in-out bg-white/10 rounded-xl px-5 overflow-hidden 
                      ${isOpen ? 'grid-rows-[1fr] py-4 my-1 opacity-100' : 'grid-rows-[0fr] py-0 my-0 opacity-0'}`}>
                        <div className="overflow-hidden text-white/90 text-sm">

                          {/* Desktop Table View (Hidden on mobile) */}
                          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-500">
                              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700">
                                <tr>
                                  <th scope="col" className="px-6 py-3">Date</th>
                                  <th scope="col" className="px-6 py-3">Month</th>
                                  <th scope="col" className="px-6 py-3">Amount</th>
                                  <th scope="col" className="px-6 py-3">Details</th>
                                  <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {!(item.yearHistory.length === 1 && !item.yearHistory[0].date && !item.yearHistory[0].amount) &&
                                  item.yearHistory.map((historyItem, index) => (
                                    <tr className="hover:bg-gray-50" key={index}>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{historyItem.date}</td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {historyItem.date ? new Date(historyItem.date).toLocaleString("default", { month: "long" }) : "-"}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 text-gray-900 font-semibold">
                                        {historyItem.amount ? `R${historyItem.amount}` : "-"}
                                      </td>
                                      <td className="px-6 py-4">
                                        {historyItem.details && <i className="fa-solid fa-money-bill-wave mr-2"></i>}
                                        {historyItem.details || "-"}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex gap-3 px-3 py-1 text-xs font-medium text-black-500 transition">
                                          <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'
                                            onClick={() => setIsEditPaymentHist(true)}>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                          </span>
                                          <span className='px-2 py-2 border rounded-lg inline-block hover:-translate-y-1 cursor-pointer'
                                            onClick={() => setIsDeletePaymentHist(true)}>
                                            <i className="fa-solid fa-trash"></i>
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                }

                                {(item.yearHistory.length === 0 ||
                                  (item.yearHistory.length === 1 && !item.yearHistory[0].date && !item.yearHistory[0].amount)) && (
                                    <tr>
                                      <td colSpan={5} className="py-10 text-center opacity-50">
                                        No History found
                                      </td>
                                    </tr>
                                  )}
                              </tbody>
                            </table>
                          </div>

                          {/* Mobile Block/Card View (Hidden on desktop) */}
                          <div className="block md:hidden space-y-4">
                            {!(item.yearHistory.length === 1 && !item.yearHistory[0].date && !item.yearHistory[0].amount) &&
                              item.yearHistory.map((historyItem, index) => (
                                <ul key={index} className="space-y-4">
                                  <li>
                                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm text-gray-600 space-y-2">

                                      <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold text-gray-900">{historyItem.date || "-"}</span>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Date</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Month:</span>
                                        <span className="text-gray-900 font-medium">
                                          {historyItem.date ? new Date(historyItem.date).toLocaleString("default", { month: "long" }) : "-"}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Amount:</span>
                                        <span className="text-gray-900 font-bold">
                                          {historyItem.amount ? `R${historyItem.amount}` : "-"}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Details:</span>
                                        <span className="text-gray-900">
                                          {historyItem.details && <i className="fa-solid fa-money-bill-wave mr-2"></i>}
                                          {historyItem.details || "-"}
                                        </span>
                                      </div>
                                      <div className="flex text-center justify-between items-center pt-2 border-t">
                                        <div className="flex gap-2 text-xs font-medium text-black-500">
                                          <span className='px-3 py-2 border rounded-lg inline-block cursor-pointer 
                                          bg-gray-50 active:bg-gray-100' onClick={() => setIsEditPaymentHist(true)}>
                                            <i className="fa-regular fa-pen-to-square mr-1"></i> Edit
                                          </span>
                                          <span className='px-3 py-2 border rounded-lg inline-block cursor-pointer 
                                          bg-gray-50 active:bg-gray-100 text-red-600 border-red-100' onClick={() => setIsDeletePaymentHist(true)}>
                                            <i className="fa-solid fa-trash mr-1"></i> Delete
                                          </span>
                                        </div>
                                      </div>

                                    </div>
                                  </li>
                                </ul>
                              ))
                            }
                            {(item.yearHistory.length === 0 ||
                              (item.yearHistory.length === 1 && !item.yearHistory[0].date && !item.yearHistory[0].amount)) && (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                  <p className="py-10 text-center opacity-50 text-gray-600">No History found</p>
                                </div>
                              )}

                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>




          </div>
        </div>
      }

    </div>
  )
}

export default SchemeMembers
