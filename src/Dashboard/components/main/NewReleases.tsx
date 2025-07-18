import { useEffect, useState, useContext } from "react"
import AlbumCard from "../../../utils/AlbumCard";
import  {CurrentNotificationContext}  from "../../../Dashboard/index";
import LoadingPlaceHolder from "../../../utils/Loading";

interface Album {
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
  artists: { name: string; id: string }[];
  external_urls: { spotify: string };
  // Add other fields as needed
}



export default function NewReleases() {
    const [newReleases, setNewReleases] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadMoreLink, setLoadMoreLink] = useState<string | null>(null);
    const [showMoreButton, setShowMoreButton] = useState(true);

    const notificationContext = useContext(CurrentNotificationContext);
    if (!notificationContext) return null;
    const { setStatusMessage } = notificationContext;

    useEffect(() => {
        
        let accessToken = localStorage.getItem('access_token');

        async function fetchNewReleases() {
            setLoading(true);
            try {
                if (!accessToken) {
                    return;
                }
                const response = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=48', {
                    headers:  {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setLoadMoreLink(data.albums.next);
                setNewReleases(data.albums.items)
            } catch (err: any) {
                console.log(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
    
        
    }
    fetchNewReleases();
}, []);

    async function  loadMoreReleases() {
        let accessToken = localStorage.getItem('access_token');

       
  try {
             if (loadMoreLink === null) {
                setShowMoreButton(false);
                setStatusMessage({ message: "No more releases to load", color: "yellow" });
                return;
            }        
            if (localStorage.getItem('access_token') === null) {
                throw new Error("Access token is missing");
            }
            const response = await fetch(loadMoreLink, {
                headers:  {
                Authorization: 'Bearer ' + accessToken
                }
            });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data.albums.next)
                setLoadMoreLink(data.albums.next);
                setNewReleases(prev => [...prev, ...data.albums.items]);
        } catch (error) {
            console.log(error);
        }
    }


  if(loading) {
    return (
        <LoadingPlaceHolder />
    )
  }
  return (
      <div className="flex flex-col spotify-gray-bg w-full m-5 pt-5 px-5 rounded-lg">
            <h1 className="text-4xl py-5">New Releases</h1>
            <div className="flex flex-wrap justify-center overflow-y-auto gap-5 max-h-[75vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                {newReleases.length > 0 ? 
                newReleases.map((album: any) => (
                    <AlbumCard 
                        key={album.id}
                        image={album.images[0].url}
                        title={album.name}
                        releaseDate={album.release_date}
                        addLink={album.id}
                        viewLink={album.external_urls.spotify}
                        artist={album.artists[0].name}
                        artistId={album.artists[0].id}
                    />
                )) :
                <p>No new releases found</p>}
            </div>
             { showMoreButton && <button onClick={loadMoreReleases} className="self-center my-auto spotify-green-bg px-10 py-3 rounded-full cursor-pointer hover:spotify-gray hover:spotify-white-bg">Load more</button>}
        </div>
  )
}

