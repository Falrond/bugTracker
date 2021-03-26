import { useState, useEffect } from 'react';
import MultiSelect from 'react-multi-select-component';
import { firebase } from '../lib/firebase';
import { useProjectsContext } from '../context/projects';
import { useUserContext } from '../context/user';

const UpdateBar = ({ singleProject }) => {
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [updatedName, setUpdatedName] = useState('');
  const [selected, setSelected] = useState([]);
  const { isChange, setIsChange } = useProjectsContext();
  const [error, setError] = useState('');

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

  const handleUpdate = async e => {
    e.preventDefault();
    let filterSelected;
    if (selected.length < 1) {
      filterSelected = singleProject?.members;
    } else {
      filterSelected = selected.map(item => {
        return item.value;
      });
    }

    console.log(filterSelected);
    if (singleProject.createdBy === user.uid) {
      if (updatedName) {
        await firebase
          .firestore()
          .collection('projects')
          .doc(singleProject.projectId)
          .set({
            ...singleProject,
            name: updatedName,
            members: filterSelected,
          });
        setSelected([]);
        setUpdatedName('');
        setIsChange(!isChange);
      } else {
        setError('Complete your entries');
      }
    } else {
      setError('Only owners can edit records');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setError(''), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <div className="container mx-auto max-w-screen-lg  font-spartan">
      <div className="">
        <h1 className="text-md text-red-300 font-bold mt-6 mb-3 tracking-wide">
          Update Project
        </h1>
        {error && (
          <p className=" font-spartan font-bold text-sm my-4 text-red-500">
            {error}
          </p>
        )}
        <div>
          <div className="md:flex">
            <form
              action=""
              className="w-full items-center focus:outline-none md:flex-row flex flex-col "
              onSubmit={handleUpdate}
            >
              <input
                onChange={({ target }) => setUpdatedName(target.value)}
                value={updatedName}
                className="md:w-[400px] my-2 w-full py-3 px-3 text-gray-100 rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
                type="text"
                placeholder="Enter new project name"
              />
              <MultiSelect
                hasSelectAll={false}
                disableSearch
                className="md:w-[400px] my-2 w-full multi-select px-3 md:mx-2 border-none text-gray-100 !important rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={'Se'}
                placeholder="dupa"
              />
              <button className="flex items-center justify-center px-3 my-2 rounded-md bg-red-300 text-gray-800 text-sm font-bold h-[48px] hover:bg-red-400 transition focus:outline-none w-full md:w-[145px]">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBar;
