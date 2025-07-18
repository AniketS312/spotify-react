import { useState, useEffect, useContext } from "react"
import SearchBar from "../../../utils/SearchBar"
import PlaylistCard from "../../../utils/PlaylistCard"
import { truncateAfter200 } from "../../../utils/helpers"
import { addPlaylist } from "../../../utils/helpers"
import { CurrentNotificationContext } from "../../../Dashboard/index"

type Playlist = {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string};
  owner: { id: string };
  playlistActionText: string;
};

export default function SearchPlaylist() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Playlist[]>([])
  const accessToken = localStorage.getItem('access_token');

      const notificationContext = useContext(CurrentNotificationContext);
      if (!notificationContext) return null;
      const { setStatusMessage } = notificationContext;
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '' || debouncedSearchTerm.trim().length <= 3) {
      setSearchResults([]);
      return;
    }
    async function fetchSearchResults() {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(debouncedSearchTerm.trim())}&type=playlist`,
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setSearchResults(data.playlists.items);
      } catch (err: any) {
        console.error(err.message || "Unknown error");
      }
    }
    fetchSearchResults();
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  return (
     <div className="flex flex-col spotify-gray-bg w-full h-auto m-5 p-5 rounded-lg">
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-4xl py-5">Search Playlists</h1>
            <SearchBar 
              searchTerm={searchTerm}
              handleInputChange={handleInputChange}
              searchResults={searchResults}
            />
        </div>
        <div className="flex flex-wrap justify-center overflow-y-auto gap-5 max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
          {searchResults.length > 0 &&  searchResults.map((playlist) => (
        playlist
              ? (
                <PlaylistCard
                  key={playlist.id}
                  id={playlist.id}
                  name={playlist.name}
                  description={truncateAfter200(playlist.description) || "No description available"}
                  images={playlist.images}
                  external_urls={playlist.external_urls}
                  playlistUserId={playlist.owner.id}
                  playlistActionText="Add Playlist"
                  playlistActionFunction={() => addPlaylist(playlist.id , setStatusMessage, accessToken)}
                />
              )
              : null
          ))}
          {searchResults.length === 0 && <p className="py-10 text-2xl">Search for playlists here!</p>}
        </div>
    </div>
  )
}