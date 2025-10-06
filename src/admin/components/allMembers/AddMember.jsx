import  { useState } from "react";
import Modal from "../Modal";
import { addMemberDB } from "../../utils/AllMembers";
import Notification from "../Notification";
import ErrorModal from "../ErrorModal";
export default function AddMember({setAllMembers}) {
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    idNo:"",
    number: "",
    gender: "male",
    address: "",
    description:"",
  });

  const [notification, setNotification] = useState({
    state:false,
    message:""
  });
   const [showError,setShowError]=useState({
    state:false,
    message:""
   })

  // Modal Props isOpen,setIsOpen,header,children,footer

  const [isOpen, setIsOpen] = useState(false);

    const   addmemberSubmit = async(e) => {
    e.preventDefault();
        

    
    
    
    const response = await addMemberDB(memberInfo)

    if (response.success){ 

      setAllMembers((prev)=>{
        return [response.data,...prev]
      })
        
    setNotification({
      state:true,
      message:"Member Added"
    })


    }else{
        // alert("Error adding member:"+response.error)
        setShowError({state:true,message:response.error})
    }
   

    setIsOpen(false);
    setMemberInfo({
        name: "",
        idNo:"",
        number: "",
        gender: "male",
        address: "",   
        description:"", 
        });


        
    }



    
  return (
    <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
      <button
        onClick={() => setIsOpen(true)}
        className="flex select-none items-center justify-center gap-3 rounded-lg bg-lime-300 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
        </svg>

        <span className="hidden sm:inline">Add member</span>

        <span className="sm:hidden">Add</span>
      </button>
      {/* modal props isOpen,setIsOpen,header,children,footer     */}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-neutral-500">
            <h3 class="text-lg font-semibold text-white">Add New Member</h3>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              class="text-red-500 bg-transparent hover:bg-red-500 hover:text-white rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        }
        footer={
          <button
            onClick={(e) => addmemberSubmit(e)}
            type="submit"
            class=" -mt-2 text-black flex justify-self-center  items-center bg-lime-300 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <svg
              class="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Add
          </button>
        }
      >
        <form class="p-4 md:p-5 ">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, name: e.target.value })
                }
                value={memberInfo.name}
                type="text"
                name="name"
                id="name"
                class="bg-neutral-800 outline-none border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Kabir"
                required=""
              />
            </div>
            <div class="col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-white"
              >
                ID No.
              </label>
              <input
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, idNo: e.target.value })
                }
                value={memberInfo.idNo}
                type="text"
                name="name"
                id="name"
                class="bg-neutral-800 outline-none border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="3138"
                required=""
              />
            </div>
            <div class="col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-white"
              >
                Number
              </label>
              <input
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, number: e.target.value })
                }
                value={memberInfo.number}
                type="number"
                name="price"
                id="price"
                class="bg-neutral-800 outline-none  border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder=" 6355779790"
                required=""
              />
            </div>
            <div class="col-span-1">
              <label
                for="gender"
                class="block mb-2 text-sm font-medium text-white"
              >
                Gender
              </label>
              <select
                value={memberInfo.gender} // controlled input
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, gender: e.target.value })
                }
                id="category"
                class="bg-neutral-800 border outline-none border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-white"
              >
                Description
              </label>
              <input
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, description: e.target.value })
                }
                value={memberInfo.description}
                type="text"
                name="name"
                id="name"
                class="bg-neutral-800 outline-none border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Exam preparation?"
                required=""
              />
            </div>
            <div class="col-span-1">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-white"
              >
                Image Link
              </label>
              <input
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, description: e.target.value })
                }
                value={memberInfo.description}
                type="text"
                name="name"
                id="name"
                class="bg-neutral-800 outline-none border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="https://freeimage.host/i/KWP9PZg"
                required=""
              />
            </div>

            <div class="col-span-2">
              <label
                for=" description"
                class="block  text-sm font-medium text-white"
              >
                Address
              </label>
              <textarea
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, address: e.target.value })
                }
                value={memberInfo.address}
                id="description"
                rows="4"
                class="mt-1 block p-2.5 w-full text-sm text-white bg-neutral-800 rounded-lg border border-gray-600 outline-none"
                placeholder="401, Merumount Plaza, Raspan Cross Rd ......."
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>

      {notification && notification.state && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      <ErrorModal showError={showError} setShowError={setShowError} />
    </div>
  );
}
