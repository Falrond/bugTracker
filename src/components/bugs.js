import { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../src/context/firebase';
import { useProjectsContext } from '../context/projects';
import { useUserContext } from '../../src/context/user';
import useUser from '../hooks/use-user';

const Bugs = ({ singleProject }) => {
  const { user } = useUser();
  const { isChange, setIsChange } = useProjectsContext();
  const { firebase } = useFirebaseContext();
  const [bugName, setBugName] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');
  console.log(singleProject?.bugs);

  const handleBug = async e => {
    e.preventDefault();

    if (
      user[0]?.userId === singleProject?.createdBy ||
      singleProject?.members.includes(user[0]?.fullName)
    ) {
      if (bugName) {
        const bugs = singleProject?.bugs;
        const bugsnames = bugs.map(item => {
          return item.title.toLowerCase();
        });
        if (!bugsnames.includes(bugName)) {
          const newBug = {
            date: Date.now(),
            priority,
            status: false,
            title: bugName.trim(),
          };

          bugs.push(newBug);
          await firebase
            .firestore()
            .collection('projects')
            .doc(singleProject.projectId)
            .set({ ...singleProject, bugs });

          setBugName('');
          setPriority('low');
          setIsChange(!isChange);
        } else {
          setError('Bug already exists');
        }
      } else {
        setError('Enter the bug name');
      }
    } else {
      setError('Only owners or project members can edit records');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setError(''), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const deleteBug = async id => {
    const bugs = singleProject?.bugs;
    const newBugs = bugs.filter(item => {
      return item.date !== id;
    });
    console.log(user[0]?.userId);
    console.log(singleProject?.createdBy);
    if (
      user[0]?.userId === singleProject?.createdBy ||
      singleProject?.members.includes(user[0]?.fullName)
    ) {
      await firebase
        .firestore()
        .collection('projects')
        .doc(singleProject.projectId)
        .set({ ...singleProject, bugs: newBugs });
      setIsChange(!isChange);
    } else {
      setError('Only owners or project members can edit records');
    }
  };
  const changeStatus = async id => {
    if (
      user[0]?.userId === singleProject?.createdBy ||
      singleProject?.members.includes(user[0]?.fullName)
    ) {
      const bugs = singleProject?.bugs;
      const newBugs = bugs.map(item => {
        if (item.date === id) {
          return { ...item, status: !item.status };
        } else {
          return { ...item };
        }
      });

      await firebase
        .firestore()
        .collection('projects')
        .doc(singleProject.projectId)
        .set({ ...singleProject, bugs: newBugs });
      setIsChange(!isChange);
    } else {
      setError('Only owners or project members can edit records');
    }
  };
  return (
    <>
      <div className="fadein container mx-auto max-w-screen-lg bg-dark-gray py-2 mt-4 shadow-md md:rounded-md font-spartan ">
        <div className="mx-8">
          <h1 className="text-red-300  pt-2 font-bold text-xl">Bugs</h1>
          {error && (
            <p className=" font-spartan font-bold text-sm my-4 text-red-500">
              {error}
            </p>
          )}
          <div className=" my-3">
            <form
              action=""
              className="flex md:flex-row  flex-col  items-center focus:outline-none"
              onSubmit={handleBug}
            >
              <input
                value={bugName}
                onChange={({ target }) => setBugName(target.value)}
                className="md:w-[400px]  w-full py-3 px-3 text-gray-100 rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
                type="text"
                pattern=".*\S+.*"
                maxLength="22"
                placeholder="Bug Description"
              />
              <div className="font-bold text-gray-100 md:mx-2 my-2 md:my-0 flex items-center justify-around md:w-[400px] h-[48px] tracking-wide px-4">
                <div className="px-2">
                  <input
                    checked={priority === 'low'}
                    onChange={e => setPriority(e.target.value)}
                    type="radio"
                    value="low"
                  />{' '}
                  Low
                </div>
                <div className="px-2">
                  <input
                    checked={priority === 'medium'}
                    onChange={e => setPriority(e.target.value)}
                    type="radio"
                    value="medium"
                  />{' '}
                  Medium
                </div>
                <div className="px-2">
                  <input
                    checked={priority === 'high'}
                    onChange={e => setPriority(e.target.value)}
                    type="radio"
                    value="high"
                  />{' '}
                  High
                </div>
              </div>
              <button className="flex items-center justify-center px-3 rounded-md bg-red-300 text-gray-800 text-sm font-bold h-[48px] hover:bg-red-400 transition focus:outline-none w-full md:w-[145px]">
                <svg
                  className="w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Bug
              </button>
            </form>
          </div>
        </div>
        {/* {singleProject?.bugs.length > 0 && (
          <div className="mt-6">
            <table className="table-fixed mx-auto">
              <thead>
                <tr className=" text-sm mb-6 text-red-300">
                  <th className="w-1/6">Title</th>
                  <th className="w-1/6">Priority</th>
                  <th className="w-1/6">Status</th>
                  <th className="w-1/6">Added</th>
                  <th className="w-1/6">Delete</th>
                </tr>
              </thead>
              <tbody className="">
                {singleProject?.bugs.map(item => {
                  return (
                    <tr
                      key={item.date}
                      className="text-sm  text-gray-100 font-bold text-center"
                    >
                      <td className="py-3 h-10">{item.title}</td>
                      <td>
                        <span
                          className={`py-2 px-3 rounded-md  ${
                            item.priority === 'high'
                              ? 'bg-red-500'
                              : item.priority === 'medium'
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td>{item.status}</td>
                      <td className="text-xs">
                        {new Date(item.date).toLocaleString()}
                      </td>
                      <td className="">
                        <button onClick={() => deleteBug(item.date)}>
                          <svg
                            className="w-6 mx-auto hover:text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )} */}
      </div>
      {singleProject?.bugs.length > 0 && (
        <div className="flex items-center justify-center  fadein mx-auto">
          <div className="container max-w-screen-lg">
            <table className="w-full flex flex-row flex-no-wrap   md:rounded-md overflow-hidden sm:shadow-lg my-5">
              <thead className="text-red-300">
                {singleProject?.bugs.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex flex-col flex-no wrap bg-dark-gray sm:table-row  sm:rounded-none mb-2 sm:mb-0"
                    >
                      <th className="p-3">Title</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Added</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Delete</th>
                    </tr>
                  );
                })}
              </thead>
              <tbody
                className="flex-1
      text-gray-100 font-spartan font-bold text-center sm:flex-none"
              >
                {singleProject?.bugs.map(item => {
                  return (
                    <tr
                      key={item.date}
                      className={`flex flex-col flex-no text-sm bg-dark-gray wrap sm:table-row mb-2 sm:mb-0 ${
                        item.status ? 'line-through opacity-40' : null
                      }`}
                    >
                      <td className="p-4 h-[48px] truncate">{item.title}</td>
                      <td className="p-4 h-[48px] truncate">
                        <span
                          className={`py-2 px-3 rounded-md  ${
                            item.priority === 'high'
                              ? 'bg-red-500'
                              : item.priority === 'medium'
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="p-4  h-[48px]">
                        {item.status ? 'closed' : 'open'}
                      </td>
                      <td className="p-4  h-[48px]">
                        {new Date(item.date).toLocaleString()}
                      </td>
                      <td className="p-2 h-[48px] cursor-pointer">
                        <button onClick={() => changeStatus(item.date)}>
                          {!item.status ? (
                            <svg
                              className="w-6 mx-auto hover:text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 mx-auto hover:text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td className="p-2 h-[48px] cursor-pointer">
                        <button onClick={() => deleteBug(item.date)}>
                          <svg
                            className="w-6 mx-auto hover:text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Bugs;
