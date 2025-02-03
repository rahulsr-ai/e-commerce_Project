//@ts-nocheck
"use client";



import React from "react";

const params = { firstName: "John", lastName: "Wick" };

const ProfileOverview = () => {
 

  const UpdateUser = async (e) => {
    e.preventDefault();
  

    console.log("user details");
  


  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={UpdateUser}
      >
        <div className="space-y-2">
          <label className="text-gray-400">Full Name</label>
          <input
            type="text"
            className=" text-black px-3 py-1 mx-2 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Email</label>
          <input
            type="text"
            className=" text-black px-3 py-1 mx-2 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Phone</label>
          <input
            type="text"
            className=" text-black px-3 py-1 mx-2 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Location</label>
          <input
            type="text"
            className=" text-black px-3 py-1 mx-2 rounded-md"
          />
        </div>

        <button className=""> Update</button>
      </form>
    </div>
  );
};

export default ProfileOverview;
