import  { useState } from "react";
import Modal from "../Modal";
import { editMemberDB } from "../../utils/AllMembers";
import Notification from "../Notification";
import ErrorModal from "../ErrorModal";

export default function EditMember({ member,setAllMembers }) {
  const [isOpen, setIsOpen] = useState(false);

  const [memberInfo, setMemberInfo] = useState({
    name: member.name,
    idNo:member.idNo,
    number: member.number,
    gender: member.gender,
    address: member.address,
    description:member.description
  });

    const [notification, setNotification] = useState({
      state:false,
      message:""
    });
     const [showError,setShowError]=useState({
      state:false,
      message:""
     })



  async function editMemberSubmit(e) {
    e.preventDefault();
  
    
    const response = await editMemberDB(member.id,memberInfo)
    if (response.success) {

      setAllMembers((prevMembers)=>{

        const updatedMembers = prevMembers.map((m)=>{
            if(m.id===member.id){
              return {...memberInfo,id:member.id}
            }
            return m;
        })

        return updatedMembers
      })
        setNotification({
      state:true,
      message:"Member Edited"
    })

  }else{
   
    
    setShowError({state:true,message:response.error})
  }
  setIsOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <svg
          className="w-5 h-5 text-yellow-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >

          <path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path>
          
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-neutral-500">
            <h3 class="text-lg font-semibold text-white">Edit Member</h3>
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
            onClick={(e) => editMemberSubmit(e)}
            type="submit"
            class=" -mt-2 text-black flex justify-self-center  items-center bg-lime-300 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <svg
            className="w-5 h-5 me-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
            </svg>
            Edit
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
                for="number"
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
                name="number"
                id="number"
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
                                   <div class="col-span-2">
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
                placeholder="Exam preparation?,  Job preparation? studying what?"
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

            {notification && notification.state &&
      
              <Notification notification={notification} setNotification={setNotification}/>
            }
      
            <ErrorModal showError={showError} setShowError={setShowError}/>  
      

    
    </>
  );
}
