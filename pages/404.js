import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not found';
  }, []);
  return (
    <div className="max-w-screen-sm mx-auto h-screen flex flex-col justify-center items-center">
      <h1 className="text-red-400 font-spartan font-bold text-2xl">
        404 Page not found
      </h1>
    </div>
  );
};

export default NotFound;
