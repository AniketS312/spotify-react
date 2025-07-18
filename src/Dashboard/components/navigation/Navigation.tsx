import { FaList, FaNewspaper, FaSpotify, FaSignOutAlt , FaRegListAlt } from "react-icons/fa";

// Navigation menu structure. Ensure to add a relevant icon from react-icons for each item.
const menu = [
  {
        title: 'Account',
        items: [
            { name: 'Playlists', path: 'ShowPlayList', icon: <FaList /> },
            { name: 'logout', path: 'logout', icon:<FaSignOutAlt  /> },
        ] 

    },
    {
        title: 'Explore',
        items: [
            { name: 'New Releases', path: 'newReleases', icon:<FaNewspaper /> },
            { name: 'Search Playlists', path: 'searchPlaylists', icon:<FaRegListAlt  /> },
        ]
    },
    {
        title: 'Extra',
        items: [
            // { name: 'About this App', path: 'about', icon: <FaSort/> },
            { name: 'About the API', path: 'api', icon:<FaSpotify /> },
        ]
    }
];

export default menu;