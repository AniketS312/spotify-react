import { useState, useEffect, useContext } from "react";
import {truncateAfter20, truncateAfter14 } from "./helpers";
import { getGenreFromArtist, addAlbum } from "./helpers";
import { CurrentNotificationContext } from "../Dashboard/Dashboard";

interface AlbumCardProps {
  image: string;
  title: string;
  releaseDate: string;
  addLink: string;
  viewLink: string;
  artist: string;
  artistId: string;
}

export default function AlbumCard({
  image,
  title,
  releaseDate,
  addLink,
  viewLink,
  artist,
  artistId,

}: AlbumCardProps) {
  
  const [genre, setGenre] = useState<string>("");

  const notificationContext = useContext(CurrentNotificationContext);
  if (!notificationContext) return null;
  const { setStatusMessage } = notificationContext;
  
  useEffect(() => {
    getGenreFromArtist(artistId, () => {}).then(setGenre);
  }, [artistId]);

  return (
    <div key={addLink} className="flex flex-col border-2 border-gray-300 rounded-lg p-4 m-2 w-64">
        <span className="mx-auto pb-2">{truncateAfter20(genre)}</span>
        <img src={image} />
        <div className="flex flex-row justify-between py-2">
          <p>{truncateAfter14(artist)}</p>
          <p className="text-gray-500">{releaseDate}</p>
        </div>
        <p>{truncateAfter20(title)}</p>
        <div className="flex flex-col gap-3 justify-between py-2 w-full ">
          <a className="spotify-green-bg text-center py-2 rounded-md cursor-pointer" onClick={async () => await addAlbum(addLink, setStatusMessage)}>Add Album</a>
          <a className="spotify-white-bg spotify-gray text-center py-2 rounded-md cursor-pointer" href={viewLink} target="_blank" rel="noopener noreferrer">View Album</a>
        </div>
    </div>
  )
}