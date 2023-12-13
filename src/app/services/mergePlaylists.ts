const mergePlaylistsEndPoint = "http://localhost:8080/merge/playlists";

// another name?
export interface MergePlaylistsRequest {
  playlistIds: string[];
  newPlaylistName: string;
  accessToken: string;
}

export const mergePlaylists = async (
  request: MergePlaylistsRequest
): Promise<void> => {
  const response = await fetch(mergePlaylistsEndPoint, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
