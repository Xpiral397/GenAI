import React from "react";

import {
  Book,
  Home,
  Lightbulb,
  PresentToAll,
  Topic,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="bg-blue-500 rounded-lg  text-white w-64 h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold">Math Topics</div>
      <ul className="flex-1 overflow-y-auto">
        <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
          <Topic className="h-6 w-6 mr-2" />
          Arithmetic
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
          <Topic className="h-6 w-6 mr-2" />
          Algebra
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
          <Topic className="h-6 w-6 mr-2" />
          Geometry
        </li>
        {/* Add more list items with icons for other math topics */}
      </ul>
      <div className="p-4 text-2xl font-bold">Additional</div>
      <ul className="flex-1 overflow-y-auto">
        <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
          <Book className="h-6 w-6 mr-2" />
          Word Problems
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
          <Lightbulb className="h-6 w-6 mr-2" />
          Learn New Methods
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
          <PresentToAll className="h-6 w-6 mr-2" />
          Subscription
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
