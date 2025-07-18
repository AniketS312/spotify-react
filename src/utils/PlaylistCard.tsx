import { useEffect, useState } from 'react';

interface PlaylistCardProps {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  playlistUserId: string;
  playlistActionText: string;
  playlistActionFunction: () => void;
}
export default function PlaylistCard({ name, description, images, external_urls, id, playlistUserId, playlistActionText, playlistActionFunction }: PlaylistCardProps) {
      const [userId, setUserId] = useState<string | null>(null);
      let accessToken = localStorage.getItem('access_token');

    
      useEffect(() => {
          async function fetchUserId() {
              const response = await fetch('https://api.spotify.com/v1/me', {
                  headers:  {
                      Authorization: 'Bearer ' + accessToken
                  }
          });
          if(!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setUserId(data.id);
      }
  
      try{
          fetchUserId();
      } catch (error) {
          console.error("Failed to fetch user ID:", error);
          console.log("Failed to fetch user ID");
      }
  
      }, []);
  return (
    <div className="flex flex-row gap-5 border-2 border-gray-300 rounded-lg p-4 m-2 w-200 ">
      <img key={id} width={200} src={images[0]?.url}/>
      <div className="flex flex-col justify-evenly w-full">
        <div className='flex flex-row justify-between items-center'>
          <p className="spotify-green text-2xl">{name}</p>
          {userId === playlistUserId && <p className="spotify-green-bg py-2 px-5 rounded-full">By You</p>}
        </div>
        <span>{description}</span>
        <div className="flex flex-row gap-3 justify-stretch ">
          <a className="spotify-green-bg text-center py-2 rounded-md cursor-pointer w-50" target="_blank" rel="noopener noreferrer" href={external_urls?.spotify}>View Playlist</a>
          {userId !== playlistUserId && <a onClick={playlistActionFunction} className="spotify-white-bg spotify-gray text-center py-2 rounded-md cursor-pointer w-50">{playlistActionText}</a>}
        </div>
      </div>
    </div>
  )
}