import{ useEffect, useState, useContext } from 'react';
import LoadingPlaceHolder from '../../../utils/Loading';
import PlaylistCard from '../../../utils/PlaylistCard';
import { removePlaylist } from '../../../utils/helpers';
import { CurrentNotificationContext } from '../../Dashboard';

export default function ShowPlayList() {
    let accessToken = localStorage.getItem('access_token');
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    const notificationContext = useContext(CurrentNotificationContext);
    if (!notificationContext) return null;
    const { setStatusMessage } = notificationContext;

    useEffect(() => {
    async function fetchUserPlaylists() {
        setLoading(true);
        try {
            if (!accessToken) {
                throw new Error("Access token is missing");

            }
            const response = await fetch('https://api.spotify.com/v1/me/playlists', {
                headers:  {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setPlaylists(data.items);
        } catch (err: any) {
            console.log(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    
        
    }
    fetchUserPlaylists();
}, []);

     if(loading) {
        return (
            <LoadingPlaceHolder />
        )
    }
    return (
        <div className="flex flex-col spotify-gray-bg w-full h-auto m-5 p-5 rounded-lg">
            <div className="flex flex-wrap justify-center overflow-y-auto gap-5 max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                {playlists.length > 0 ? (
                    playlists.map((playlist: any) => (
                        <PlaylistCard
                            key={playlist.id}
                            id={playlist.id}
                            name={playlist.name}
                            description={playlist.description || "No description available"}
                            images={playlist.images}
                            external_urls={playlist.external_urls}
                            playlistUserId={playlist.owner.id}
                            playlistActionText="Remove Playlist"
                            playlistActionFunction={() => removePlaylist(playlist.id, setStatusMessage, accessToken ?? "")}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No playlists found.</p>
                )}
            </div>
        </div>
    )
};

