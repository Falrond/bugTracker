import React, { useState, useEffect } from 'react';
import { firebase } from '../lib/firebase';
import { useUserContext } from '../context/user';
import { useProjectsContext } from '../context/projects';
import Project from './project';
import Link from 'next/link';

const ProjectList = () => {
  const { user } = useUserContext();
  const { filteredProjects } = useProjectsContext();

  return (
    <>
      <div className="flex items-center justify-center  fadein mx-auto">
        <div className="container max-w-screen-lg">
          <table className="w-full flex flex-row flex-no-wrap   md:rounded-md overflow-hidden sm:shadow-lg my-5">
            <thead className="text-red-300">
              {filteredProjects?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="flex flex-col flex-no wrap bg-dark-gray sm:table-row  sm:rounded-none mb-2 sm:mb-0"
                  >
                    <th className="p-3 ">Project Name</th>
                    <th className="p-3 ">Bugs</th>
                    <th className="p-3 ">Members</th>
                    <th className="p-3 ">Added</th>
                    <th className="p-3 ">Details</th>
                  </tr>
                );
              })}
            </thead>
            <tbody
              className="flex-1
          text-gray-100 font-spartan font-bold text-center sm:flex-none"
            >
              {filteredProjects?.map(item => {
                return (
                  <tr
                    key={item.projectId}
                    className="flex flex-col flex-no text-sm bg-dark-gray wrap sm:table-row mb-2 sm:mb-0"
                  >
                    <td className="p-4 h-[48px] truncate uppercase">
                      {item.name}
                    </td>
                    <td className="p-4 h-[48px] truncate">
                      {item.bugs.length}
                    </td>
                    <td className="p-4  h-[48px]">{item.members.length}</td>
                    <td className="p-4  h-[48px]">
                      {new Date(item.dateCreated).toLocaleString()}
                    </td>
                    <td className="p-2 cursor-pointer">
                      <Link href={`/project/${item.projectId}`}>
                        <svg
                          className="w-8 text-red-300 mx-auto hover:text-red-400"
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="container mx-auto mt-6 max-w-screen-lg fadein">
        <div className="h-full">
          <h1 className="font-spartan mx-8 text-2xl text-red-300 font-bold mb-7 ">
            Projects
          </h1>

          {filteredProjects?.map(item => {
            return <Project key={item.projectId} item={item} />;
          })}
        </div>
      </div> */}
    </>
  );
};

export default ProjectList;
