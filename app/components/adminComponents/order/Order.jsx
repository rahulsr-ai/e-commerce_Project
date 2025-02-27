"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Ban,
  CheckCircle,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { HandleUserStatus, getAllUsers } from "@/lib/apiCalls";

const AdminDashboard = ({ user }) => {
  const { isSidebarOpen } = useSidebar();

  const [users, setUsers] = useState(user);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    userId: null,
    action: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    setUsers(user);
  }, [user]);

  const filterUsers = () => {
    const filteredUsers = user.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "All" || user.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });

    setUsers(filteredUsers);
  };

  // Handle user actions
  const handleUserAction = async (userId, action) => {
    setActionMenuOpen(null);

    if (action === "block") {
      setConfirmationModal({
        isOpen: true,
        userId,
        action,
        title: "Block User",
        message:
          "Are you sure you want to block this user? They will not be able to access the platform until unblocked.",
      });
    } else if (action === "unblock") {
      setConfirmationModal({
        isOpen: true,
        userId,
        action,
        title: "Unblock User",
        message:
          "Are you sure you want to unblock this user? They will regain access to the platform.",
      });
    } else if (action === "delete") {
      setConfirmationModal({
        isOpen: true,
        userId,
        action,
        title: "Delete User",
        message:
          "Are you sure you want to delete this user? This action cannot be undone.",
      });
    }
  };

  // Confirm user action
  const confirmAction = async () => {
    const { userId, action } = confirmationModal;

    const response = await HandleUserStatus(userId, action);
    console.log("response", response);

    if (response.success) {
      if (action === "block") {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, status: "Blocked" } : user
          )
        );
      } else if (action === "unblock") {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, status: "Active" } : user
          )
        );
      } else if (action === "delete") {
        setUsers(users.filter((user) => user._id !== userId));
      }
    }

    setConfirmationModal({
      isOpen: false,
      userId: null,
      action: "",
      title: "",
      message: "",
    });
  };

  return (
    <div
      className={`min-h-screen bg-zinc-900 text-white ${
        isSidebarOpen ? "w-full" : "ml-20"
      }`}
    >
      <main className="p-4 md:p-6 ">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-zinc-400">Manage user accounts and permissions</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "All"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedFilter("All")}
            >
              <Users className="h-4 w-4" />
              <span>All</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "Active"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedFilter("Active")}
            >
              <CheckCircle className="h-4 w-4" />
              <span>Active</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "Blocked"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedFilter("Blocked")}
            >
              <Ban className="h-4 w-4" />
              <span>Blocked</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="bg-zinc-800 border border-zinc-700 rounded-md py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-full divide-y divide-zinc-700">
              <thead className="bg-zinc-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Signup
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Last Login
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-zinc-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={"/others/userprofile01.jpg"}
                              alt={user.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {user.name}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.authProvider === "google"
                              ? "bg-green-900 text-violet-200"
                              : "bg-violet-700 text-zinc-200"
                          }`}
                        >
                          {user.authProvider.charAt(0).toUpperCase() +
                            user.authProvider.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === "admin"
                              ? "bg-violet-900 text-violet-200"
                              : user.role === "user"
                              ? "bg-blue-900 text-blue-200"
                              : "bg-zinc-700 text-zinc-200"
                          }`}
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.status === "Active"
                              ? "bg-green-900 text-green-200"
                              : user.status === "Blocked"
                              ? "bg-red-900 text-red-200"
                              : "bg-yellow-900 text-yellow-200"
                          }`}
                        >
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                        {new Date(user.createdAt).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <button
                            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-700"
                            onClick={() =>
                              setActionMenuOpen(
                                actionMenuOpen === user._id ? null : user._id
                              )
                            }
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>

                          {actionMenuOpen === user._id && (
                            <div className="absolute right-7 top-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-10">
                              {user.status === "Blocked" ? (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 flex items-center space-x-2"
                                  onClick={() =>
                                    handleUserAction(user._id, "unblock")
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>Unblock User</span>
                                </button>
                              ) : (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 flex items-center space-x-2"
                                  onClick={() =>
                                    handleUserAction(user._id, "block")
                                  }
                                >
                                  <Ban className="h-4 w-4 text-red-500" />
                                  <span>Block User</span>
                                </button>
                              )}
                              <button
                                className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 flex items-center space-x-2"
                                onClick={() =>
                                  handleUserAction(user._id, "delete")
                                }
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                                <span>Delete User</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-zinc-400"
                    >
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Showing <span className="font-medium">{users.length}</span> of{" "}
            <span className="font-medium">{user.length}</span> users
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-2">
              {confirmationModal.title}
            </h3>
            <p className="text-zinc-400 mb-4">{confirmationModal.message}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600"
                onClick={() =>
                  setConfirmationModal({ ...confirmationModal, isOpen: false })
                }
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500"
                onClick={confirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;