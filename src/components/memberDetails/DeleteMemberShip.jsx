import  { useState } from "react";
import { deleteMembershipDB } from "../../utils/AllMembers";
import Modal from "../Modal";
import Notification from "../Notification";
import ErrorModal from "../ErrorModal";

export default function DeleteMemberShip({ info, member, setMember,setAllMembers }) {
  const [isOpen, setIsOpen] = useState(false);
       const [notification, setNotification] = useState({
            state:false,
            message:""
          });
           const [showError,setShowError]=useState({
            state:false,
            message:""
           })



  async function deleteMembershipSubmit() {
    const response = await deleteMembershipDB(member.id, info);
    
     

          

    if (response.success) {
      
      setAllMembers((prevMembers)=>{
        const updatedMembers = prevMembers.map((m)=>{
          if (m.id===member.id) {
            return{...m,memberships:m.memberships.filter((membership)=>membership.id!==info.id)}
          }
          return m
        })

        return updatedMembers
      })

      setMember((prevMember) => {
        const updatedMemberships = prevMember.memberships.filter(
          (membership) => membership.id !== info.id
        );


        return { ...prevMember, memberships: updatedMemberships };
      });

      setNotification({
        state:true,
        message:"Membership Deleted"
      },[])

      setIsOpen(false);
    } else {
      setShowError({state:true,message:response.error})
    }
  } 


  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <svg
          className="w-5 h-5 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-neutral-500">
            <h3 className="text-lg font-semibold text-white">Delete Member</h3>
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
          <div className="flex items-center justify-end gap-4 p-4 md:p-5 border-t rounded-t border-neutral-500">
            <button
              onClick={(e) => deleteMembershipSubmit(e)}
              type="submit"
              className=" -mt-2 text-black flex  items-center bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Delete
            </button>
            <button
              onClick={() => setIsOpen(false)}
              type="submit"
              className=" -mt-2 text-black flex justify-self-center items-center bg-lime-300 hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="mb-4 p-4">
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            aperiam!
          </p>
        </div>
      </Modal>

              {notification && notification.state &&
                  
                          <Notification notification={notification} setNotification={setNotification}/>
                        }
                  
                        <ErrorModal showError={showError} setShowError={setShowError}/> 

                        
    </>
  );
}


