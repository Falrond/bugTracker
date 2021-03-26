import React from 'react';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const { firebase } = useFirebaseContext();
  const { user } = useUserContext();
  return (
    user && (
      <div className="h-16 fadein bg-dark-gray shadow-md ">
        <div className="container mx-auto max-w-screen-lg  h-full ">
          <div className="flex justify-between h-full items-center">
            <div className="font-spartan md:text-2xl font-bold tracking-wider ml-6 text-red-300 flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <svg
                    className="w-10 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                    />
                  </svg>
                  <h1>BugTracker</h1>
                </a>
              </Link>
            </div>
            <div className="text-gray-100">
              {user ? (
                <div className="flex h-full justify-center items-center ">
                  <div className="font-spartan mx-4 hidden md:block text-sm font-bold">
                    <h1>{user?.email}</h1>
                  </div>
                  <button
                    onClick={() => firebase.auth().signOut()}
                    type="button"
                    className="bg-red-300 py-2 px-4 rounded-md text-gray-800 flex font-spartan font-bold text-sm justify-around items-center tracking-wide mr-6 hover:bg-red-400 transition"
                  >
                    <span className="hidden md:block">Sign Out</span>
                    <svg
                      className="w-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                router.pathname !== '/login' && (
                  <Link href="/login">
                    <a className="bg-red-300 py-2 px-4 rounded-md text-gray-800 flex font-spartan font-bold text-sm justify-around items-center tracking-wide mr-6">
                      <p>Log In</p>
                      <svg
                        className="w-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </a>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
