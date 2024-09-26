import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Import the required CSS for styling

const Card = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4 flex items-center min-h-[120px]" id={`tooltip-${title}`}>
      <div className="flex-shrink-0 flex items-center justify-center mr-2">
        <Icon className="w-8 h-8 text-teal-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-md font-bold text-gray-700 mb-1">{value}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{title}</p>
      </div>

      {/* Tooltip */}
      <Tooltip
        anchorId={`tooltip-${title}`}
        content={title}
        place="top"
        className="text-xs"
      />
    </div>
  );
};

export default Card;