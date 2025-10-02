import { useEffect, useState } from "react";

import AddMember from "../components/allMembers/AddMember";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import EditMember from "../components/allMembers/EditMember";
import DeleteMember from "../components/allMembers/DeleteMember";
import { calculateDaysLeft } from "../utils/AllMembers";
import DetailedMember from "../components/allMembers/DetailedMember";
import Notification from "../components/Notification";

const MEMBERS_PER_PAGE = 6;

const AllMembers = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allMembers, setAllMembers] = useState([]);

  const [showMobileControls, setShowMobileControls] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [notification, setNotification] = useState({
    state: false,
    message: "",
  });
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const membersCollectionRef = collection(db, "members");

  //function the fetch the first page of members
  const fetchInitialMembers = async () => {
    setNotification({ state: true, message: "Loading members...." });
    try {
      const q = query(
        membersCollectionRef,
        orderBy("createdAt", "desc"),
        limit(MEMBERS_PER_PAGE)
      );
      const documentSnapshots = await getDocs(q);

      const members = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllMembers(members);

      //save the last document as the pointer for the nex fetch

      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      //if we fetched fewer members than our page limit, there are no more to load
      if (members.length < MEMBERS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      alert("error fetching initial members", error.message);
    } finally {
      setNotification({ state: false, message: "" });
    }
  };

  //function to fetch next page / more members

  const handleLoadMore = async () => {
    if (!lastVisible || !hasMore) return;

    setNotification({ state: true, message: "Laoding more members....." });
    try {
      const q = query(
        membersCollectionRef,
        orderBy("createdAt", "desc"),
        limit(MEMBERS_PER_PAGE),
        startAfter(lastVisible)
      );

      const documentSnapshots = await getDocs(q);
      const newMembers = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllMembers((prevMembers) => [...prevMembers, ...newMembers]);

      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (newMembers.length < MEMBERS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      alert("error fetching more members", error.message);
    } finally {
      setNotification({ state: false, message: "" });
    }
  };

  useEffect(() => {
    fetchInitialMembers();
    console.log("<=========render fired==========>");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMembers = allMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MobileCard = ({ member }) => {
    const isExpanded = expandedCardId === member.id;

    const daysLeft = calculateDaysLeft(
      member.memberships && member.memberships.length > 0
        ? member.memberships[member.memberships.length - 1].joiningDate
        : null,
      member.memberships && member.memberships.length > 0
        ? member.memberships[member.memberships.length - 1].dueDate
        : null
    );

    const isExpired = daysLeft <= 0;
    const statusText = isExpired ? "Expired" : `${daysLeft} days`;

    return (
      <div
        className={`bg-neutral-900 rounded-lg border transition-all duration-300 shadow-lg ${
          isExpanded
            ? "border-lime-500/50 shadow-lime-500/20"
            : "border-neutral-700 hover:border-neutral-600"
        }`}
      >
        {/* Collapsed View - Always Visible */}
        <div
          className="p-2.5 cursor-pointer"
          onClick={() => setExpandedCardId(isExpanded ? null : member.id)}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-medium text-gray-500">
                  ID:
                </span>
                <span className="text-[10px] font-bold text-lime-400">
                  {member.idNo || "N/A"}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white truncate mb-0.5">
                {member.name || "N/A"}
              </h3>
              <p className="text-[10px] text-gray-400 truncate">
                {member.number || "N/A"}
              </p>
            </div>

            {/* Status Badge & Expand Icon */}
            <div className="flex flex-col items-end gap-1">
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                  isExpired
                    ? "bg-red-500/20 text-red-400"
                    : "bg-lime-500/20 text-lime-400"
                }`}
              >
                {statusText}
              </span>
              <svg
                className={`w-4 h-4 text-lime-400 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded View - Conditional */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2.5 pb-2.5 space-y-2">
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent"></div>

            {/* Info Grid - 2 Columns */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Gender */}
              <div className="flex items-center gap-1.5 bg-neutral-800/50 rounded p-1.5">
                <svg
                  className="w-3 h-3 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-gray-500">Gender</p>
                  <p className="text-[10px] font-medium text-white truncate">
                    {member.gender || "N/A"}
                  </p>
                </div>
              </div>

              {/* Seat Type */}
              <div className="flex items-center gap-1.5 bg-neutral-800/50 rounded p-1.5">
                <svg
                  className="w-3 h-3 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-gray-500">Seat</p>
                  <p className="text-[10px] font-medium text-white truncate">
                    {member.memberships && member.memberships.length > 0
                      ? member.memberships[member.memberships.length - 1]
                          .reserved
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-1.5 bg-neutral-800/50 rounded p-1.5">
                <svg
                  className="w-3 h-3 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-gray-500">Due Date</p>
                  <p className="text-[10px] font-medium text-white truncate">
                    {member.memberships && member.memberships.length > 0
                      ? member.memberships[member.memberships.length - 1]
                          .dueDate
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Joining Date */}
              <div className="flex items-center gap-1.5 bg-neutral-800/50 rounded p-1.5">
                <svg
                  className="w-3 h-3 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-gray-500">Joined</p>
                  <p className="text-[10px] font-medium text-white truncate">
                    {member.memberships && member.memberships.length > 0
                      ? member.memberships[member.memberships.length - 1]
                          .joiningDate
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="flex items-start gap-1.5 bg-neutral-800/50 rounded p-1.5">
              <svg
                className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] text-gray-500 mb-0.5">Description</p>
                <p className="text-[10px] text-gray-300 line-clamp-2">
                  {member.description || "No description provided"}
                </p>
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="flex items-start gap-1.5 bg-neutral-800/50 rounded p-1.5">
              <svg
                className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] text-gray-500 mb-0.5">Address</p>
                <p className="text-[10px] text-gray-300 line-clamp-2">
                  {member.address || "No address provided"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              <DetailedMember member={member} setAllMembers={setAllMembers} />
              <EditMember member={member} setAllMembers={setAllMembers} />
              <DeleteMember member={member} setAllMembers={setAllMembers} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full text-white bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl rounded-2xl overflow-hidden border border-neutral-700/50">
      {/* Enhanced Header Section with Gradient Overlay */}
      <div className="relative bg-gradient-to-r from-neutral-800/90 to-neutral-900/90 backdrop-blur-sm border-b border-neutral-700/50">
        <div className="mx-3 sm:mx-4 lg:mx-6 mt-3 sm:mt-4 lg:mt-6 mb-3 sm:mb-4 lg:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full"></div>
                <h5 className="font-sans text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white">
                  Members Directory
                </h5>
              </div>
              <p className="font-sans text-xs sm:text-sm text-gray-400 ml-3 sm:ml-4">
                Manage and monitor your member database
              </p>
            </div>

            {/* Add new member button - Desktop only */}
            <div className="hidden lg:block flex-shrink-0">
              <AddMember setAllMembers={setAllMembers} />
            </div>
          </div>

          {/* Enhanced Controls Section */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar - Always Visible */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 lg:flex-none lg:w-79">
                <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  className="w-full h-10 sm:h-11 lg:h-12 rounded-lg sm:rounded-xl border border-neutral-700/50 focus:border-lime-500 outline-none bg-neutral-900/60 backdrop-blur-sm pl-10 sm:pl-12 pr-3 sm:pr-4 font-sans text-xs sm:text-sm font-normal text-white placeholder-gray-500 transition-all duration-300 shadow-lg focus:shadow-lime-500/20"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile: Dropdown Toggle Button */}
              <div className="lg:hidden flex-shrink-0">
                <button
                  onClick={() => setShowMobileControls(!showMobileControls)}
                  className="flex items-center justify-center p-2 sm:p-2.5 rounded-lg bg-neutral-900/80 backdrop-blur-sm border-2 border-neutral-700/50 text-gray-300 hover:text-white hover:border-lime-500/50 transition-all duration-300"
                >
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                      showMobileControls ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile: Collapsible Controls */}
            <div
              className={`lg:hidden flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
                showMobileControls
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {/* Tabs */}
              <div className="flex-shrink-0">
                <nav className="inline-flex w-full">
                  <ul className="relative flex flex-row w-full p-1.5 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 shadow-lg">
                    {["all", "active", "expired"].map((tab) => (
                      <li
                        key={tab}
                        role="tab"
                        className={`relative flex items-center justify-center h-full flex-1 py-2 font-sans text-xs sm:text-sm font-medium tracking-wide cursor-pointer select-none transition-all duration-300 rounded-lg ${
                          activeTab === tab
                            ? "text-black"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <div className="relative z-10 capitalize">{tab}</div>
                        {activeTab === tab && (
                          <div className="absolute inset-0 h-full bg-gradient-to-r from-lime-200 to-lime-300 rounded-lg shadow-lg transition-all duration-300"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Add Member Button */}
              <div className="flex-shrink-0">
                <AddMember setAllMembers={setAllMembers} />
              </div>
            </div>

            {/* Desktop: Horizontal Layout */}
            <div className="hidden lg:flex lg:items-center lg:justify-between gap-5">
              {/* Stylish Tabs */}
              <div className="flex-shrink-0">
                <nav className="inline-flex">
                  <ul className="relative flex flex-row p-1.5 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 shadow-lg">
                    {["all", "active", "expired"].map((tab) => (
                      <li
                        key={tab}
                        role="tab"
                        className={`relative flex items-center justify-center h-full px-6 lg:px-8 py-2.5 font-sans text-sm font-medium tracking-wide cursor-pointer select-none transition-all duration-300 rounded-lg ${
                          activeTab === tab
                            ? "text-black"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <div className="relative z-10 capitalize">{tab}</div>
                        {activeTab === tab && (
                          <div className="absolute inset-0 h-full bg-gradient-to-r from-lime-200 to-lime-300 rounded-lg shadow-lg transition-all duration-300"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Better Spacing */}
      <div className="flex-1 overflow-hidden bg-neutral-900/30">
        {/* Desktop/Tablet Table View - Enhanced */}
        <div className="hidden lg:block h-full overflow-auto px-6 lg:px-8 py-6">
          <div className="bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-neutral-700/50 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-b-2 border-lime-200/30">
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        ID
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        Member
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        Gender/Description
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        Seat Type
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        End Date
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        Days Left
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        Address
                      </p>
                    </th>
                    <th className="px-5 py-4">
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-700/30">
                  {allMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="group hover:bg-neutral-800/40 transition-all duration-200"
                    >
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-200/10 text-white border border-gray-500/20">
                          {member.idNo || "N/A"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col min-w-0">
                            <p className="font-sans text-sm font-semibold text-white truncate">
                              {member.name || "N/A"}
                            </p>
                            <p className="font-sans text-xs text-gray-400 truncate">
                              {member.number || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <p className="font-sans text-sm font-medium text-white">
                            {member.gender || "N/A"}
                          </p>
                          <p className="font-sans text-xs text-gray-400 line-clamp-1">
                            {member.description || "No description"}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-neutral-700/50 text-gray-200 border border-neutral-600">
                          {member.memberships && member.memberships.length > 0
                            ? member.memberships[member.memberships.length - 1]
                                .reserved
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-300 font-medium">
                          {member.memberships && member.memberships.length > 0
                            ? member.memberships[member.memberships.length - 1]
                                .dueDate
                            : "N/A"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-neutral-700/50 text-gray-200 border border-neutral-600">
                          {calculateDaysLeft(
                            member.memberships && member.memberships.length > 0
                              ? member.memberships[
                                  member.memberships.length - 1
                                ].joiningDate
                              : null,
                            member.memberships && member.memberships.length > 0
                              ? member.memberships[
                                  member.memberships.length - 1
                                ].dueDate
                              : null
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-300 line-clamp-2 max-w-xs">
                          {member.address || "N/A"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <DetailedMember
                            member={member}
                            setAllMembers={setAllMembers}
                          />
                          <EditMember
                            member={member}
                            setAllMembers={setAllMembers}
                          />
                          <DeleteMember
                            member={member}
                            setAllMembers={setAllMembers}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Load More Section */}
          <div className="flex flex-col items-center justify-center mt-8 mb-4">
            {hasMore && !notification.state && (
              <button
                onClick={handleLoadMore}
                className="group relative px-8 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold rounded-xl hover:from-lime-500 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-lime-500/50 transform hover:scale-105"
              >
                <span className="relative z-10">Load More Members</span>
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            )}

            {!hasMore && allMembers.length > 0 && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                <p className="text-sm font-medium">All members loaded</p>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              </div>
            )}
          </div>
        </div>

        {notification && notification.state && (
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
        )}

        {/* Mobile Card View - Optimized Grid Layout */}
        <div className="lg:hidden px-2 sm:px-3 h-full overflow-y-auto py-2 sm:py-3">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-gray-400 text-sm">
                No members found matching your search.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {filteredMembers.map((member) => (
                  <MobileCard key={member.id} member={member} />
                ))}
              </div>

              {/* Mobile Load More Button */}
              {hasMore && !notification.state && (
                <div className="flex justify-center mt-3 sm:mt-4 mb-1 sm:mb-2">
                  <button
                    onClick={handleLoadMore}
                    className="px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-lime-400 to-lime-500 text-black text-xs sm:text-sm font-bold rounded-lg hover:from-lime-500 hover:to-lime-600 transition-all duration-300 shadow-lg active:scale-95"
                  >
                    Load More
                  </button>
                </div>
              )}

              {!hasMore && allMembers.length > 0 && (
                <div className="flex items-center justify-center gap-2 text-gray-500 mt-3 sm:mt-4 mb-1 sm:mb-2">
                  <div className="w-6 sm:w-8 h-px bg-gray-600"></div>
                  <p className="text-[10px] sm:text-xs font-medium">
                    All members loaded
                  </p>
                  <div className="w-6 sm:w-8 h-px bg-gray-600"></div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Enhanced Empty State */}
        {!hasMore && filteredMembers.length === 0 && (
          <div className="hidden lg:flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-lime-500/10 blur-3xl rounded-full"></div>
              <svg
                className="relative w-20 h-20 text-gray-600 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-gray-300 text-xl font-semibold mb-2">
              No members found
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search criteria or add new members
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMembers;
