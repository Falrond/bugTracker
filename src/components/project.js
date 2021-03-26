import React from 'react';
import Link from 'next/link';

const Project = ({ item }) => {
  return (
    <div className="w-full fadein font-spartan flex h-20 bg-dark-gray my-4 rounded-md text-gray-100 tracking-wide  font-medium justify-around items-center shadow-md">
      <h1 className="w-[100px]">{item.name}</h1>
      <p>{item.bugs.length}</p>
      <p>{item.members.length}</p>
      <p>{new Date(item.dateCreated).toLocaleDateString()}</p>
      <Link href={`/project/${item.projectId}`}>
        <svg
          className="w-8 text-red-300 hover:text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Project;
