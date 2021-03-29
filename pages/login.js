import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFirebaseContext } from '../src/context/firebase';
import { BsCamera } from 'react-icons/bs';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const { firebase } = useFirebaseContext();
  console.log(firebase.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('user logged in');
        });
      router.push('/');
    } catch (error) {
      setEmail('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    // max-w-screen-sm
    <div className=" mx-auto h-fullnavbar flex flex-col justify-center items-center">
      <div className="w-4/5 max-w-[412px] bg-[#282A34] rounded-md shadow-xl mx-auto fadein ">
        <div className="w-11/12 mx-auto px-3">
          <h1 className="font-spartan font-bold text-2xl text-gray-100 tracking-wide my-4 mt-6 py-2">
            Login
          </h1>

          {error && (
            <p className="font-spartan font-bold text-sm pb-2 text-red-500">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} method="POST" className="font-spartan">
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
              Login
            </button>
          </form>
          <p className="text-xs font-spartan text-gray-100 font-bold text-center ">
            Demo account: test1@gmail.com / password: test123
          </p>
          <div className="py-3 mb-6 text-center font-spartan text-sm font-bold text-gray-50">
            {' '}
            <p>
              Don't have an account yet?
              <Link href="/signup">
                <a className="ml-2 text-red-300 transition hover:text-red-400">
                  Sign Up
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
