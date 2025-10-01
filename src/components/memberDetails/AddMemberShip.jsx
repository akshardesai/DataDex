import  { useState, useEffect } from "react";
import Modal from "../Modal";
import { addMembershipDB } from "../../utils/AllMembers";
import Notification from "../Notification";
import ErrorModal from "../ErrorModal";

export default function AddMemberShip({id,member,setMember,setAllMembers}) {
  
  
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const currentDate = `${year}-${month}-${day}`;

  const [isOpen, setIsOpen] = useState(false);
  const [membershipInfo, setMembershipInfo] = useState({
    amount: "",
    paymentType: "cash",
    joiningDate: currentDate,
    dueDate: "",
    totalTime: "",
    shift: "evening",
    reserved:"normal",
  });

      const [notification, setNotification] = useState({
        state:false,
        message:""
      });
       const [showError,setShowError]=useState({
        state:false,
        message:""
       })
  



 // 🧮 Auto calculate totalTime whenever dates change
useEffect(() => {
  if (membershipInfo.joiningDate && membershipInfo.dueDate) {
    const start = new Date(membershipInfo.joiningDate);
    const end = new Date(membershipInfo.dueDate);

    if (end >= start) {
      const diffTime = end - start;
      let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; 
      // +1 ensures same-day counts as 1

      // calculate rough month difference
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      // If dates align like 2025-01-01 → 2025-02-01
      if (months > 0 && start.getDate() === end.getDate()) {
        setMembershipInfo((prev) => ({
          ...prev,
          totalTime: `${months} month${months > 1 ? "s" : ""}`,
        }));
      } else {
        setMembershipInfo((prev) => ({
          ...prev,
          totalTime: `${diffDays} day${diffDays > 1 ? "s" : ""}`,
        }));
      }
    }else{
         setMembershipInfo((prev) => ({
          ...prev,
          totalTime: `Wrong Date`,
        }));
    }
  }
}, [membershipInfo.joiningDate, membershipInfo.dueDate]);


  const memberShipSubmit = async (e) => {
    e.preventDefault();
    

    const response = await addMembershipDB(id,membershipInfo)

    if (response.success) {


            setAllMembers((prevMembers)=>{
              const updatedMembers = prevMembers.map((m)=>{
                if(m.id===member.id){
                  return{
                    ...m,
                    memberships:[...m.memberships,response.data]
                  }
                }
                return m
              })

              return updatedMembers
            })
            
            setMember((prev)=>{
                 

                  return{
                    ...prev,
                    memberships:[...prev.memberships,response.data]
                  }
                      
              
            })

            setNotification({
              state:true,
              message:"Memberhsip Added"
            })


    }else{
        // alert(response.error)
        setShowError({state:true,message:response.error})
    }

    setMembershipInfo({
      amount: "",
      paymentType: "cash",
      joiningDate: currentDate,
      dueDate: "",
      totalTime: "",
      shift: "evening",
      reserved:"normal",
    });
    setIsOpen(false)


 
    
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-lime-300 gap-1 text-black p-2 rounded-md font-medium flex justify-center items-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 "
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
        </svg>

        <button>Memberhip</button>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-neutral-500">
            <h3 className="text-lg font-semibold text-white">Add New Membership</h3>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="text-red-500 bg-transparent hover:bg-red-500 hover:text-white rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        }
        footer={
          <button
            onClick={(e) => memberShipSubmit(e)}
            type="submit"
            className=" -mt-2 text-black flex justify-self-center items-center bg-lime-300 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add
          </button>
        }
      >
        <form className="p-4 md:p-5 ">
          <div className="grid gap-4 mb-4 grid-cols-2">
            {/* Amount */}
            <div className="col-span-1 ">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-white"
              >
                Amount
              </label>
              <input
                onChange={(e) =>
                  setMembershipInfo({
                    ...membershipInfo,
                    amount: e.target.value,
                  })
                }
                value={membershipInfo.amount}
                type="number"
                id="price"
                className="bg-neutral-800 outline-none border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Amount"
              />
            </div>

            {/* Payment Type */}
            <div className="col-span-1 ">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-white"
              >
                Payment Type
              </label>
              <select
                value={membershipInfo.paymentType}
                onChange={(e) =>
                  setMembershipInfo({
                    ...membershipInfo,
                    paymentType: e.target.value,
                  })
                }
                id="category"
                className="bg-neutral-800 border outline-none border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="col-span-2">
              <div
                id="date-range-picker"
                className="flex flex-col sm:flex-row sm:items-center w-full gap-3"
              >
                {/* Start Date */}
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="datepicker-range-start"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Start Date
                  </label>
                  <input
                    value={membershipInfo.joiningDate}
                    onChange={(e) =>
                      setMembershipInfo({
                        ...membershipInfo,
                        joiningDate: e.target.value,
                      })
                    }
                    id="datepicker-range-start"
                    type="date"
                    className="w-full bg-neutral-800 border border-neutral-600 text-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 placeholder-gray-400 transition duration-150 ease-in-out"
                  />
                </div>

                {/* End Date */}
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="datepicker-range-end"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    End Date
                  </label>
                  <input
                    value={membershipInfo.dueDate}
                    onChange={(e) =>
                      setMembershipInfo({
                        ...membershipInfo,
                        dueDate: e.target.value,
                      })
                    }
                    id="datepicker-range-end"
                    type="date"
                    className="w-full bg-neutral-800 border border-neutral-600 text-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 placeholder-gray-400 transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>

            {/* Total Time */}
            <div className="col-span-1">
              <label
                htmlFor="totalTime"
                className="block mb-2 text-sm font-medium text-white"
              >
                Total Time
              </label>
              <input
                
                value={membershipInfo.totalTime}
                readOnly
                type="text"
                id="totalTime"
                className="bg-neutral-800 outline-none border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>

            {/* Shift */}
            <div className="col-span-1 ">
              <label
                htmlFor="shift"
                className="block mb-2 text-sm font-medium text-white"
              >
                Shift
              </label>
              <select
                value={membershipInfo.shift}
                onChange={(e) =>
                  setMembershipInfo({
                    ...membershipInfo,
                    shift: e.target.value,
                  })
                }
                id="shift"
                className="bg-neutral-800 border outline-none border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="evening">Evening</option>
                <option value="morning">Morning</option>
                <option value="full">Full</option>
              </select>
            </div>

            {/* reservation */}
            <div className="col-span-2 ">
              <label
                htmlFor="shift"
                className="block mb-2 text-sm font-medium text-white"
              >
                Seat Type
              </label>
              <select
                value={membershipInfo.reserved}
                onChange={(e) =>
                  setMembershipInfo({
                    ...membershipInfo,
                    reserved: e.target.value,
                  })
                }
                id="shift"
                className="bg-neutral-800 border outline-none border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="normal">Normal</option>
                <option value="reserved">Reserved</option>
           
              </select>
            </div>
          </div>
        </form>
      </Modal>

      
                  {notification && notification.state &&
            
                    <Notification notification={notification} setNotification={setNotification}/>
                  }
            
                  <ErrorModal showError={showError} setShowError={setShowError}/> 
    </>
  );
}
