import React from 'react';
import { useFirebaseContext } from '../../src/context/firebase';
import { useProjectsContext } from '../../src/context/projects';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UpdateBar from '../../src/components/update-bar';
import { useUserContext } from '../../src/context/user';
import Bugs from '../../src/components/bugs';
import Background from '../../src/components/background';
import Modal from '../../src/components/modal';

const ProjectPage = () => {
  const { user } = useUserContext();
  const { projects, isChange, setIsChange } = useProjectsContext();
  const { firebase } = useFirebaseContext();
  const router = useRouter();
  const id = router.query.projectname;
  const [singleProject, setSingleProject] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const getProject = async projectId => {
    const [project] = await projects.filter(item => {
      if (item.projectId === projectId) {
        return item;
      }
    });
    setSingleProject(project);
    setIsReady(!isReady);
  };
  async function getUserById(userId) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('userId', '==', userId)
      .get();

    const user = await result.docs.map(item => {
      return { ...item.data(), docId: item.id };
    });
    setUserProfile(user);
    return user;
  }
  const removeProject = async () => {
    if (singleProject.createdBy === user.uid) {
      await firebase
        .firestore()
        .collection('projects')
        .doc(singleProject.projectId)
        .delete();
      await setIsChange(!isChange);
      await router.push('/');
    } else {
      setError('Only owners can delete projects');
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    setError('');
  };
  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    getProject(id);
  }, [projects]);

  useEffect(() => {
    if (singleProject?.createdBy) {
      getUserById(singleProject.createdBy);
    }
  }, [singleProject]);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user]);
  // useEffect(() => {
  //   setIsChange(!isChange);
  // }, []);

  return (
    user && (
      <>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          removeProject={removeProject}
          error={error}
        />
        <Background isOpen={isOpen} closeModal={closeModal} />

        <div className="fadein container mx-auto max-w-screen-lg bg-dark-gray py-4 mt-4 shadow-md md:rounded-md font-spartan ">
          <div className=" mx-8">
            <Link href="/" className="inline-block">
              <a>
                <svg
                  className="w-7 text-red-300 hover:text-red-400 transition"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
              </a>
            </Link>
            <div className="flex md:flex-row flex-col items-center justify-between pb-2 mt-3">
              <h1 className="capitalize md:text-2xl text-xl font-bold text-gray-100">
                {singleProject?.name}
              </h1>
              <button onClick={openModal} className="">
                <svg
                  className="w-9 ml-3 text-red-300 hover:text-red-400 transition"
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
            </div>

            <div className="h-[2px] bg-red-300"></div>
            <div className="text-sm">
              <h1 className="text-red-300 my-4 font-bold">
                Created By:
                <span className="text-gray-100 ml-2">
                  {' '}
                  {userProfile[0]?.fullName}
                </span>
              </h1>
              <h1 className="text-red-300 my-4 font-bold">
                Members:
                <span className="text-gray-100 ml-2">
                  {singleProject?.members.join(', ')}
                </span>
                {/* <span className="text-gray-100 ml-2">
                  {' '}
                  {singleProject?.members.map((item, index) => {
                    return (
                      <span key={index} className="mx-2">
                        {item}
                      </span>
                    );
                  })}
                </span> */}
              </h1>
              <h1 className="text-red-300 my-4 font-bold">
                Date:{' '}
                <span className="text-gray-100 ml-2">
                  {new Date(singleProject?.dateCreated).toLocaleString()}
                </span>
              </h1>
            </div>
            <UpdateBar singleProject={singleProject} />
          </div>
        </div>
        <Bugs singleProject={singleProject} />
      </>
    )
  );
};

export default ProjectPage;
