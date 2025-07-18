import { useState,useEffect, createContext } from 'react';
import { useSearchParams, useNavigate} from 'react-router';

import MainNav from './components/navigation/MainNav';
import NewReleases from './components/main/NewReleases';
import ShowPlayList from './components/main/ShowPlayList';
import SearchPlaylist from './components/main/SearchPlaylist';
import Notifications from '../utils/Notifications';
import { setSessionView } from '../utils/helpers';


interface StatusMessage {
  message: string | null;
  color: string | null;
}

type NotificationContextType = {
  statusMessage: StatusMessage;
  setStatusMessage: React.Dispatch<React.SetStateAction<StatusMessage>>;
} | null;


export const CurrentNotificationContext= createContext<NotificationContextType | null>(null);

export default function Dashboard() {
  
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [view, setView] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage>({
      message: null,
      color: null
    });

    const accessToken = searchParams.get('access_token'),
          refreshToken = searchParams.get('refresh_token'),
          expiresIn = searchParams.get('expires_in');




    // Inital page load useEffect for setting up STORAGE
    useEffect(() => {
      const dateNow = new Date();
      const expiresInStr = localStorage.getItem('expires_in');

      // if no access token is present in localStorage, store the new one and the refresh and time of expiry
        if (localStorage.getItem('access_token') === null && accessToken) {
            localStorage.setItem('access_token', accessToken ?? '');
            localStorage.setItem('refresh_token', refreshToken ?? '');
            localStorage.setItem('expires_in', expiresIn ?? '');

        }
        // if access token is present in localStorage but different from the new one, update it
        if (localStorage.getItem('access_token') !== null && accessToken && localStorage.getItem('access_token') !== accessToken) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken ?? '');
            localStorage.setItem('expires_in', expiresIn ?? '');

        }
        if(expiresInStr !== null && new Date(expiresInStr) < dateNow) {
          console.log('Token expired, please refresh the page to get a new token');
          navigate('/');
        } 
        }, []);

    // Set the initial view based on sessionStorage or default to NewReleases 
        useEffect(() => {
          if(view === null && sessionStorage.getItem('view') === null) {
            setView('NewReleases');
          } else if (view === null && sessionStorage.getItem('view') !== null) {
            const storedView = sessionStorage.getItem('view');
            if (storedView !== null) {
              setView(JSON.parse(storedView));
            }
          } else {
            sessionStorage.setItem('view', "NewReleases");
            setView('NewReleases');
          }
        }, []);


    // Handle Nav item click and change session view and view state
    interface Item {
      [key: string]: any;
    }

    const handleItemClick = (item: Item): void => {
      switch (item.path) {
    case 'ShowPlayList':
      setView('ShowPlayList');
      setSessionView('ShowPlayList');
      break;
    case 'logout':
      // Handle logout logic
      // Example: clear tokens and redirect
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
      navigate('/');
      break;
    case 'newReleases':
      setView('NewReleases');
      setSessionView('NewReleases');
      break;
      case 'searchPlaylists':
      setView('SearchPlaylists');
      setSessionView('SearchPlaylists');
      break;
    case 'about':
      // Handle about navigation or logic
      console.log('Navigate to about');
      break;
    case 'api':
      // Handle API info navigation or logic
      console.log('Navigate to API info');
      break;
    default:
      console.log('Unknown path:', item.path);
      break;
  }
    };

    // triggers the notfication message
    useEffect(() => {
      if(statusMessage.message !== null && statusMessage.color !== null) {
        setTimeout(() => {
          setStatusMessage({
            message: null,
            color: null
          });
        }, 4000);
      } 
    },[statusMessage])

  return (
    <div className='font-serif flex w-full min-h-screen spotify-black-bg text-white'>
    <CurrentNotificationContext value={{statusMessage, setStatusMessage}}>
        <MainNav 
        handleFunction={handleItemClick}/>
        <main className='w-7/8 flex w-5/6 border border-2 border-red-500'>
        { statusMessage.message !== null && statusMessage.color !== null && <Notifications message={statusMessage.message} color={statusMessage.color} />} 
        
        { view === 'NewReleases' && <NewReleases />}
          { view === 'ShowPlayList' && <ShowPlayList />}
          {view === 'SearchPlaylists' && <SearchPlaylist />}
        </main>
    </CurrentNotificationContext>
    </div>
  )
}