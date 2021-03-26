import React from 'react';

const Background = ({ isOpen, closeModal }) => {
  return (
    isOpen && (
      <div
        className="fixed w-screen h-screen bg-[#18191F] opacity-70 top-0 lef-0 transition delay-75 duration-300 ease-in-out z-10"
        onClick={closeModal}
      ></div>
    )
  );
};

export default Background;
