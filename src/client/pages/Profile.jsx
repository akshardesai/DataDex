import { useEffect, useState } from "react";
import { readMemberDetails } from "../utils/Members";
import defaultImage from "../assets/default.jpg"
import CheckInBtn from "../components/profile/CheckInBtn";

export default function Profile() {
  const [memberInfo, setMemberInfo] = useState(null);

  async function getDecryptedMember() {
    const response = await readMemberDetails();
    if (response.success) {
      setMemberInfo(response.data);
    } else {
      console.error(`Error ${response.error}`);
    }
  }

  useEffect(() => {
    getDecryptedMember();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white  sm:p-4 md:p-6 lg:p-8">
      <div className="w-full h-full min-h-[100vh] sm:min-h-0 sm:h-auto sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex items-center">
        {/* Card with 3D effect */}
        <div className="group relative w-full h-[calc(100vh-1rem)] sm:h-auto">
          <div className="relative border border-black sm:border-2 bg-white h-full sm:h-auto flex flex-col">
            {/* Header */}
            <div className="border-b border-black sm:border-b-2 bg-black p-3 sm:p-3 md:p-4 flex-shrink-0">
              <h1 className="font-mono text-[9px] sm:text-xs md:text-sm tracking-wider sm:tracking-widest text-white">
                MEMBER_PROFILE.EXE
              </h1>
            </div>

            {/* Content - Desktop: horizontal layout, Mobile: vertical layout */}
            <div className="p-4 sm:p-4 md:p-6 lg:p-8 flex-1 flex flex-col md:flex-row md:gap-6 lg:gap-8 overflow-auto md:overflow-visible">
              {/* Image with 3D effect */}
              <div className="relative mb-4 sm:mb-5 md:mb-0 group/img flex-shrink-0 md:w-1/2 lg:w-2/5">
                <div className="relative border border-black sm:border-2 overflow-hidden bg-white transition-transform group-hover/img:translate-x-1 group-hover/img:translate-y-1 sm:group-hover/img:translate-x-1.5 sm:group-hover/img:translate-y-1.5">
                  <img
                    src={defaultImage}
                    alt="Profile"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>

              {/* Right side: Info and Button */}
              <div className="flex-1 flex flex-col justify-between md:justify-center gap-4 sm:gap-5 md:gap-6">
                {/* Info Box with 3D effect */}
                <div className="relative group/info flex-1 md:flex-initial">
                  <div className="absolute inset-0 -translate-x-1 -translate-y-1 sm:-translate-x-1.5 sm:-translate-y-1.5 transition-transform group-hover/info:translate-x-0 group-hover/info:translate-y-0 bg-black"></div>
                  <div className="relative border border-black sm:border-2 bg-white p-4 sm:p-4 md:p-5 lg:p-6 transition-transform group-hover/info:translate-x-1 group-hover/info:translate-y-1 sm:group-hover/info:translate-x-1.5 sm:group-hover/info:translate-y-1.5 h-full md:h-auto">
                    {/* Name and ID side by side */}
                    <div className="mb-3 sm:mb-3 md:mb-4 pb-3 sm:pb-3 md:pb-4 border-b border-black grid grid-cols-2 gap-3">
                      <div>
                        <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider mb-1">
                          &gt; NAME
                        </div>
                        <div className="font-mono text-sm sm:text-base md:text-lg lg:text-xl font-bold break-words">
                          {memberInfo?.name || "MEMBER_NAME"}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider mb-1">
                          &gt; ID
                        </div>
                        <div className="font-mono text-xs sm:text-sm md:text-base">
                          #{memberInfo?.idNo || "N/A"}
                        </div>
                      </div>
                    </div>

                    {/* Number */}
                    <div className="mb-3 sm:mb-3 md:mb-4 pb-3 sm:pb-3 md:pb-4 border-b border-black">
                      <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider mb-1">
                        &gt; NUMBER
                      </div>
                      <div className="font-mono text-xs sm:text-sm md:text-base">
                        {memberInfo?.number || "N/A"}
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-3 sm:mb-3 md:mb-4 pb-3 sm:pb-3 md:pb-4 border-b border-black">
                      <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider mb-1">
                        &gt; GENDER
                      </div>
                      <div className="font-mono text-xs sm:text-sm md:text-base uppercase">
                        {memberInfo?.gender || "N/A"}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider mb-1">
                        &gt; ADDRESS
                      </div>
                      <div className="font-mono text-xs sm:text-sm md:text-base break-words">
                        {memberInfo?.address || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Check In Button with 3D effect */}
                <CheckInBtn memberInfo={memberInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
