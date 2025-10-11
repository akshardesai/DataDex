import { reqAdminDB } from "../../utils/Members";


export default function CheckInBtn({ memberInfo }) {
  async function sendReq() {
    const response = await reqAdminDB(memberInfo);

    if (response.success) {
      console.log("req sent successfully");
    } else {
      console.error(`Failed to send req ${response.error}`);
    }
  }

  return (
    <>
      {/* Check In Button with 3D effect */}
      <button
        onClick={sendReq}
        className="-mt-3 group/btn relative inline-flex items-center justify-center w-full cursor-pointer flex-shrink-0"
      >
        <div className="absolute inset-0 translate-x-1 translate-y-1 sm:translate-x-1.5 sm:translate-y-1.5 transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 bg-black"></div>
        <span className="relative w-full border border-black sm:border-2 bg-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-2.5 md:py-3 lg:py-4 font-mono text-xs sm:text-sm md:text-base tracking-wider sm:tracking-widest transition-transform group-hover/btn:translate-x-1 group-hover/btn:translate-y-1 sm:group-hover/btn:translate-x-1.5 sm:group-hover/btn:translate-y-1.5 text-center">
          CHECK_IN →
        </span>
      </button>
    </>
  );
}
