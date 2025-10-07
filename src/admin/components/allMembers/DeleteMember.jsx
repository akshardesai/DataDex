import  { useState } from "react";
import Modal from "../Modal";
import { deleteMemberDB } from "../../utils/AllMembers";
import Notification from "../Notification";
import ErrorModal from "../ErrorModal";
export default function DeleteMember({ member,setAllMembers }) {
  const [isOpen, setIsOpen] = useState(false);

  const [notification, setNotification] = useState({
    state: false,
    message: "",
  });

  const [showError, setShowError] = useState({
    state: false,
    message: "",
  });

  async function deleteMemberSubmit(e) {
    e.preventDefault();

    const response = await deleteMemberDB(member.id);
    if (response.success) {

      setAllMembers((prevMembers)=>{
        return prevMembers.filter((m)=>m.id!==member.id)
      })

      setNotification({
        state: true,
        message: "Member Deleted",
      });

      
    } else {
      setShowError({ state: true, message: response.error });
    }
  }
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <svg
          className="w-5 h-5 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >

          <path d='M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z'/>
          
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
              onClick={(e) => deleteMemberSubmit(e)}
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

      {notification && notification.state && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      <ErrorModal showError={showError} setShowError={setShowError} />
    </>
  );
}
