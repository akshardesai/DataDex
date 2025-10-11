import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../commonUtils/firebase";
import { fetchMoreLogs } from "../../utils/DailyLogs";
import ViewImageBtn from "./ViewImageBtn";
import DeleteBtn from "./DeleteBtn";


const StatusBadge = ({ status }) => {
    let colorClasses = "bg-gray-700 text-gray-300";
    if (status === "checked-in") {
        colorClasses = "bg-green-500/20 text-green-300 border border-green-500/30";
    } else if (status === "daycomplete") {
        colorClasses = "bg-neutral-700/50 text-neutral-400 border border-neutral-600/50";
    }
      return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClasses}`}>
      {status === "daycomplete" ? "Completed" : "Checked In"}
    </span>
  );
};

// Helper function to format Firestore Timestamps
const formatTime = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return "N/A";
  return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


function countDaysIncludingBoth(startDateStr, endDateStr) {

    if (!startDateStr || !endDateStr ) {
        return "Error !"
    }
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  // Calculate difference in milliseconds
  const diffMs = end - start;

  // Convert to days
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Add 1 to include both start and end dates
  return diffDays + 1;
}


export default function AllLogs() {
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [lastVisible, setLastVisible] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    
      const getTodayDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    
    useEffect(() => {
        const today = getTodayDateString()
        const logsCollectionRef = collection(db, `dailyLogs/${today}/logs`)
        
        
        const q = query(
            logsCollectionRef,
            orderBy("checkinTime", "desc"),
            limit(5)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedLogs = []
            snapshot.forEach((doc) => {
                fetchedLogs.push({id:doc.id,...doc.data()})
            })
            setLogs(fetchedLogs)
            setLastVisible(snapshot.docs[snapshot.docs.length - 1])
            setIsLoading(false)

            if (fetchedLogs.length<5) {
                setHasMore(false)
            }
        }, (error) => {
            console.error("error with real-time listener", error)
            setIsLoading(false)
        })

        return ()=>unsubscribe()
    }, [])
    
    const handleLoadMore = async () => {
        if (!lastVisible) {
            return
        }

        const { logs: newLogs, lastVisible: newLastVisible } = await fetchMoreLogs(lastVisible)
        setLogs((prevLogs) => [...prevLogs, ...newLogs])
        setLastVisible(newLastVisible)

        if (newLogs.length<5) {
            setHasMore(false)
        }
    }

  return (
    <>
      <div className="flex-1 overflow-hidden bg-neutral-900/50">
        {/* Desktop/Tablet View with UI Enhancements */}
        <div className="hidden lg:block h-full overflow-auto px-6 lg:px-8 py-6">
          <div className="bg-neutral-800/40 backdrop-blur-sm rounded-xl border border-neutral-700/50 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-neutral-900/70 border-b-2 border-neutral-700">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Member
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Check-in Time
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Check-out Time
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Joining Date
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Due Date
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Days Left
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Image
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                      Delete
                    </th>
                  </tr>
                </thead>
                {!isLoading && (
                  <tbody className="divide-y divide-neutral-800">
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-neutral-800/60 transition-colors duration-200"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-semibold text-white capitalize">
                                {log.memberName}
                              </p>
                              <p className="text-sm text-gray-400">
                                ID: {log.idNo}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={log.status} />
                        </td>
                        <td className="px-5 py-4 font-mono text-white">
                          {formatTime(log.checkinTime)}
                        </td>
                        <td className="px-5 py-4 font-mono text-gray-400">
                          {formatTime(log.checkoutTime)}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-300">
                          {log.membershipDueDate
                            ? log.memberShipJoiningDate
                            : "N/A"}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-300">
                          {log.membershipDueDate
                            ? log.membershipDueDate
                            : "N/A"}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center bg-neutral-700/50  border border-neutral-600 px-3 py-1 rounded-full text-xs font-semibold  text-white">
                            {countDaysIncludingBoth(
                              log.memberShipJoiningDate,
                              log.membershipDueDate
                            ) || "N/A"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-300">
                          <ViewImageBtn member={log} />
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-300">
                          <DeleteBtn member={log} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            {isLoading && (
              <p className="text-gray-400 text-center p-6">
                Loading initial logs...
              </p>
            )}
            {!isLoading && logs.length === 0 && (
              <p className="text-gray-400 text-center p-6">
                No logs for today yet.
              </p>
            )}
          </div>
          {/* Load More Button Section */}
          <div className="flex justify-center mt-8 mb-4">
            {hasMore && !isLoading && (
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-neutral-700 text-gray-300 font-semibold rounded-lg hover:bg-lime-500/20 hover:text-lime-300 border border-neutral-600 hover:border-lime-500/30 transition-all duration-300"
              >
                Load More
              </button>
            )}
            {!hasMore && logs.length > 0 && (
              <p className="text-gray-500 text-sm">
                All logs for today are loaded.
              </p>
            )}
          </div>
        </div>

        {/* Mobile view would go here - for brevity, focusing on the desktop table logic */}
        <div className="lg:hidden px-2 sm:px-3 h-full overflow-y-auto py-2 sm:py-3">
          {/* You can map over `logs` here to create a card-based view for mobile */}
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">
              Mobile view can be implemented here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
