import { useState, useEffect } from 'react';
import MultiSelect from 'react-multi-select-component';
import { firebase } from '../lib/firebase';
import { useUserContext } from '../context/user';
import { useProjectsContext } from '../context/projects';

const InputBar = () => {
  const {
    setProjectName,
    selected,
    setSelected,
    projectName,
    handleProject,
    error,
    setError,
  } = useProjectsContext();
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = firebase.firestore().collection('users');
    const data = await response.get();
    data.docs.forEach(item => {
      setUsers(oldUsers => [...oldUsers, item.data()]);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const options = users.map(item => {
    return {
      label: item.fullName,
      value: item.fullName,
    };
  });

  return (
    user && (
      <div className="container mx-auto py-8 my-4 bg-dark-gray shadow-md md:rounded-md max-w-screen-lg font-spartan">
        <div className="mx-8">
          <h1 className="md:text-2xl text-red-300 font-bold mb-6  tracking-wide">
            Add Project
          </h1>
          <div>
            {error && (
              <p className=" font-spartan font-bold text-sm  text-red-500">
                {error}
              </p>
            )}
            <form
              action=""
              className="md:flex-row flex flex-col items-center focus:outline-none"
              onSubmit={handleProject}
            >
              <input
                onChange={({ target }) => setProjectName(target.value)}
                required
                pattern=".*\S+.*"
                maxLength="22"
                value={projectName}
                className="md:w-[400px] w-full py-3 px-3 text-gray-100 rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
                type="text"
                placeholder="Enter project name"
              />
              <MultiSelect
                hasSelectAll={false}
                disableSearch
                className="md:w-[400px] w-full my-4 multi-select px-3 md:mx-2 border-none text-gray-100 !important rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={'Se'}
                placeholder=""
              />
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
                Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default InputBar;
