import React from 'react';
interface props{
    content:string

}
const Loader = ({content}:props) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <span className="text-lg font-semibold text-gray-800">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
