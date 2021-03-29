import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFirebaseContext } from '../src/context/firebase';
import { BsCamera } from 'react-icons/bs';
import Link from 'next/link';
import { isUsernameExists } from '../src/services/firebase';

const SignUp = () => {
  const router = useRouter();
  const { firebase } = useFirebaseContext();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid =
    password === '' || email === '' || fullName === '' || username === '';

  const handleSignUp = async e => {
    e.preventDefault();
    const isUserExists = await isUsernameExists(username);
    if (!isUserExists.length) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUser.user.updateProfile({ displayName: username });

        await firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: email.toLowerCase(),
          dateCreated: Date.now(),
        });
        router.push('/');
      } catch (error) {
        setFullName('');
        setEmail('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setError('That username is already taken, please try another');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  return (
    // max-w-screen-sm
    <div className=" mx-auto h-fullnavbar flex flex-col justify-center items-center">
      <div className="w-4/5 max-w-[412px] bg-[#282A34] rounded-md shadow-xl mx-auto fadein ">
        <div className="w-11/12 mx-auto px-3">
          <h1 className="font-spartan font-bold text-2xl text-gray-100 tracking-wide my-4 py-2 mt-6">
            Create account
          </h1>

          {error && (
            <p className="font-spartan font-bold text-sm pb-2 text-red-500">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSignUp}
            method="POST"
            className="font-spartan"
            // aria-label="wpisz swój adres email"
          >
            <input
              type="text"
              placeholder="Username"
              className="  w-full mb-6 py-3 px-3 text-gray-100 rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="  w-full mb-6 py-3 px-3 text-gray-100 rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              type="text"
              placeholder="Email address"
              className="  w-full mb-6 py-3 px-3 text-gray-100 rounded-md font-bold focus:outline-none shadow-md bg-[#585D73]"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className=" text-gray-100 w-full bg-[#585D73] mb-6 py-3 px-3 rounded-md font-bold focus:outline-none shadow-md"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`py-3 mb-6 text-center bg-red-300 w-full font-bold rounded-md text-gray-900 tracking-wide focus:outline-none hover:bg-red-400 transition ${
                isInvalid && 'opacity-50 hover:bg-red-300'
              }`}
            >
              Sign up
            </button>
          </form>
          <div className="py-3 mb-6 text-center font-spartan text-sm font-bold text-gray-50">
            {' '}
            <p>
              Already have an account?
              <Link href="/login">
                <a className="ml-2 text-red-300 transition hover:text-red-400">
                  Sign in
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
