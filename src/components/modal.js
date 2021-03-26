import React from 'react';

const Modal = ({ isOpen, closeModal, removeProject }) => {
  return (
    isOpen && (
      <div className="fixed flex flex-col items-center justify-center m-auto w-4/5 md:w-[350px] h-[200px] md:h-[220px] inset-2/4 center z-20 bg-dark-gray rounded-md shadow-md transition">
        <div className="my-4">
          <h1 className="font-spartan text-2xl text-red-300 font-bold ">
            Are you sure?
          </h1>
        </div>
        <div className="flex items-center text-sm my-4  ">
          <button
            className="bg-red-300 py-2 px-6 rounded-md hover:bg-red-400 font-bold font-spartan mx-4 text-gray-800"
            onClick={removeProject}
          >
            Yes
          </button>
          <button
            className="bg-red-300 py-2 px-6 rounded-md hover:bg-red-400 font-bold font-spartan mx-4 text-gray-800"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
