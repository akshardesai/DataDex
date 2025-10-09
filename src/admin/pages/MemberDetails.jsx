import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AddMemberShip from "../components/memberDetails/AddMemberShip";
import EditMemberShip from "../components/memberDetails/EditMemberShip";
import DeleteMemberShip from "../components/memberDetails/DeleteMemberShip";

export default function MemberDetails({
  isOpen,
  setIsOpen,
  memberDetails,
  setAllMembers,
  source,
}) {
  const [member, setMember] = useState(memberDetails);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!member || Object.keys(member).length === 0) {
    return null;
  }

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
      }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white/20 backdrop-blur-[3px] transition-opacity duration-300 ease-in-out z-[9998]"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-7xl h-[96vh] sm:h-[92vh] md:h-[88vh] lg:h-[85vh] transform transition-all duration-300 ease-in-out scale-100 opacity-100 z-[10000]"
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex flex-col w-full h-full text-white bg-neutral-900/95 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl md:rounded-2xl lg:rounded-3xl bg-clip-border backdrop-blur-xl overflow-hidden border border-neutral-700/50">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header Section */}
          <div className="flex-shrink-0 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-5 pb-3 sm:pb-4 border-b border-neutral-700/50 bg-neutral-800/50">
            {/* Member Name */}
            <h5 className="text-center uppercase font-mono text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 pr-8 tracking-wide">
              {member?.name || "Error"}
            </h5>

            {/* Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-2 sm:mb-3">
              <div className="bg-black rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2">
                <p className="text-[10px] sm:text-xs text-gray-400">Address</p>
                <div className="mt-1 sm:mt-2">
                  <span className="inline-block rounded-full bg-success-500/15 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-success-500 truncate max-w-full">
                    {member?.address || "N/A"}
                  </span>
                </div>
              </div>
              <div className="bg-black rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2">
                <p className="text-[10px] sm:text-xs text-gray-400">Gender</p>
                <div className="mt-1 sm:mt-2">
                  <span className="inline-block rounded-full bg-success-500/15 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-success-500">
                    {member?.gender || "N/A"}
                  </span>
                </div>
              </div>
              <div className="bg-black rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2">
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Phone Number
                </p>
                <div className="mt-1 sm:mt-2">
                  <span className="inline-block rounded-full bg-success-500/15 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-success-500 truncate max-w-full">
                    {member?.number || "N/A"}
                  </span>
                </div>
              </div>
              <div className="bg-black rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2">
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Description
                </p>
                <div className="mt-1 sm:mt-2">
                  <span className="inline-block rounded-full bg-success-500/15 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-success-500 truncate max-w-full">
                    {member?.description || "studying for B.Tech"}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls Section - Tabs and Add Button */}
            <div className="flex items-center justify-between gap-2">
              <nav>
                <ul className="relative flex flex-row p-1 sm:p-1.5 rounded-lg bg-black">
                  <li className="relative flex items-center justify-center h-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 font-sans text-[11px] sm:text-xs md:text-sm antialiased font-normal leading-relaxed text-center cursor-pointer select-none transition-all text-white">
                    <div className="capitalize text-white z-10">
                      Memberships
                    </div>
                    <div className="absolute inset-0 h-full bg-neutral-600 rounded-md shadow"></div>
                  </li>
                  <li className="relative flex items-center justify-center h-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 font-sans text-[11px] sm:text-xs md:text-sm antialiased font-normal leading-relaxed text-center cursor-pointer select-none transition-all text-gray-400">
                    <div className="text-white capitalize z-10">Attendance</div>
                  </li>
                </ul>
              </nav>

              <AddMemberShip
                id={member.id}
                member={member}
                setMember={setMember}
                setAllMembers={setAllMembers}
                source={source}
              />
            </div>
          </div>

          {/* Content Section - Card View for ALL screen sizes */}
          <div className="flex-1 overflow-hidden bg-gradient-to-b from-transparent to-neutral-900/30">
            <div className="h-full overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
              {member.memberships?.length > 0 ? (
                [...member.memberships].reverse().map((info, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-neutral-800/80 to-neutral-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 mb-2 sm:mb-3 md:mb-4 hover:from-neutral-700/80 hover:to-neutral-700/50 transition-all duration-200 border border-neutral-700/30 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                  >
                    {/* Grid Layout */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4">
                      <div>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                          Start Date
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                          {info.joiningDate || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                          End Date
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                          {info.dueDate || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                          Seat Type
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                          {info.reserved || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                          Shift
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                          {info.shift || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                          Duration
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                          {info.totalTime || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                          Amount
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                          {info.amount || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3 md:pt-4 border-t border-neutral-600/50">
                      <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm bg-blue-500/20 text-blue-400 rounded-md sm:rounded-lg font-medium border border-blue-500/30">
                        {info.paymentType || "N/A"}
                      </span>
                      <div className="flex gap-2 sm:gap-3 md:gap-4">
                        <EditMemberShip
                          info={info}
                          member={member}
                          setMember={setMember}
                          setAllMembers={setAllMembers}
                          source={source}
                        />
                        <DeleteMemberShip
                          info={info}
                          member={member}
                          setMember={setMember}
                          setAllMembers={setAllMembers}
                          source={source}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-12 sm:py-16 md:py-20 text-sm sm:text-base md:text-lg">
                  No memberships found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
