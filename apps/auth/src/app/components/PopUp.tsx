import React from 'react';

type PopupProps = {
  show: boolean;
  onClose: () => void;
  message: string;
};

const Popup: React.FC<PopupProps> = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  } else {
    console.log('error');
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 ml-40 text-center relative">
        <span
          className="absolute top-2 right-2 text-gray-500 cursor-pointer text-3xl"
          onClick={onClose}
        >
          &times;
        </span>
        <p className="text-red-500 text-4xl">X</p>
        <p className="mt-4 text-lg">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Popup;
