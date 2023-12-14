import { fetchRequest } from "./fetchRequest";

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
  return fetchRequest.postRequest(mergePlaylistsEndPoint, request);
};
