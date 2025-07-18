import { Link, useNavigate } from 'react-router'
import Head from './utils/Head';
import { useEffect } from 'react';


function App() {
  const navigate = useNavigate();
  const backendLoginLink = 'https://spotify-backend-4en9.onrender.com/login';


            useEffect(() => {
              // check to see if logged in prior and access code is still valid.. redirects to dashbaord
              const dateNow = new Date();
              const expiresInStr = localStorage.getItem('expires_in');
  
                if(localStorage.getItem('access_token') !== null && expiresInStr !== null && new Date(expiresInStr) > dateNow) {
                  navigate('/dashboard');
                }
  
                }, []);
                
  return (
    <>
      <Head 
      title={'Spotify Album Finder'}
      description={'Find new releases to be added to your library'}/>
      <div className='main-container w-screen flex flex-col items-center justify-center h-screen spotify-black-bg gap-5'>
        <h1 className='text-4xl font-bold spotify-white'>Log in to the Dashboard</h1>
        <Link to={backendLoginLink}>
          <button className='spotify-white spotify-green-bg text px-5 py-2 rounded-md cursor-pointer'>Click Here</button>
        </Link>
      </div>
    </>
  )
}

export default App
