import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-2 gap-4">
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-red-700 flex items-center justify-center" />
      <p className="animate-pulse text-white absolute">Loading</p>
    </div>
  );
};

export default Loader;
