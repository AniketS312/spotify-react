
// Functions to limit title or descriptions of albums and playlists -----
// Maybe combine these three and make a more flexiable function?
export function truncateAfter20(str:string): string {
  if (str.length <= 20) return str;
  return str.slice(0, 20) + "...";
}

export function truncateAfter14(str:string): string {
  if (str.length <= 14) return str;
  return str.slice(0, 14) + "...";
}

export function truncateAfter200(str:string): string {
  if (str.length <= 200) return str;
  return str.slice(0, 200) + "...";
}
// End of functions to limit title or descriptions of albums and playlists -----

export function firstTwoAsString<T extends string>(arr: T[]): string {
  return arr
  .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" and ");
}

// function to get Artist genre as album genre is deprecated
export async function getGenreFromArtist(
  artistId: string,
  finallyFunction: () => void,
  delayMs: number = 100 // Optional delay in milliseconds
): Promise<string> {
  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  // Add delay before making the fetch request


  try {

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

      if (response.status === 429) {
       const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 500 : 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      // Retry once after waiting
        return await getGenreFromArtist(artistId, finallyFunction, delayMs);
    }

    if (!response.ok) {
      throw new Error(`Error fetching artist data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const filteredData = firstTwoAsString(data.genres);
    if (filteredData.length === 0) {
      return 'Unknown Genre';
    } else if (filteredData.length === 1) {
      return filteredData[0];
    } else if (filteredData.length >= 2) {
      return firstTwoAsString(data.genres);
    }
    return "Unknown Genre";
  } catch (error) {
    return "Unknown Genre";
  } finally {
    finallyFunction();
  }
}

// Function to add album to user library
export async function addAlbum(albumId: string, setStatusMessage: (message: { message: string | null; color: string | null }) => void) {
  let doesAlbumExist;

  const url = 'https://api.spotify.com/v1/me/albums/contains';
  try {
    const response = await fetch(`${url}?ids=${albumId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }    
    });

    if (!response.ok) {
      throw new Error(`Error adding album: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    doesAlbumExist = data[0];
    if (doesAlbumExist) {
      setStatusMessage({ message: "Album already exists in your library", color: "yellow" });
    }

    if( !doesAlbumExist) {
      const url = 'https://api.spotify.com/v1/me/albums';
      try {
        const response = await fetch(`${url}?ids=${albumId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error adding album: ${response.status} ${response.statusText}`);
        }
        setStatusMessage({ message: "Album added successfully", color: "green" });
      } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the calling function
      } 
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling function
  } 


}

// Sets session storage for VIEW key
export function setSessionView(view:string) {
  sessionStorage.setItem('view', JSON.stringify(view));
}

// Add playlist to user library
export async function addPlaylist(playlistId: string, setStatusMessage: (msg: { message: string | null; color: string | null }) => void, accessToken: string | null) {
   let doesPlaylistExist;

 const url = 'https://api.spotify.com/v1/playlists';
  try {
    const response = await fetch(`${url}/${playlistId}/followers/contains`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error adding album: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    doesPlaylistExist = data[0];
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling function
  } 
  if( doesPlaylistExist) {
    setStatusMessage({ message: "Playlist already exists in your library", color: "yellow" });
    return;
  }
  if (!doesPlaylistExist) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error adding playlist: ${response.status} ${response.statusText}`);
    }
      setStatusMessage({ message: "Playlist added successfully", color: "green" });
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling function
    } 
  }
}

// Function to remove album from user library
export async function removePlaylist(playlistId: string, setStatusMessage: (msg: { message: string | null; color: string | null }) => void, accessToken: string) {

   const url = 'https://api.spotify.com/v1/playlists';
    try {
    const response = await fetch(`${url}/${playlistId}/followers`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      setStatusMessage({ message: `Error removing playlist: ${response.statusText}`, color: "red" });
    }
      console.log('Removed album successfully');
      setStatusMessage({ message: "Playlist removed successfully", color: "green" });
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling function
    }  
}