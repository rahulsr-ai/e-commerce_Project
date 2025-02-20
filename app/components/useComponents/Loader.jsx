import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
    </div>
  );
};

export default Loader;
