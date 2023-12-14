import { Playlist } from "../playlists/playlistDto";
import { Token, fetchRequest } from "./fetchRequest";

const getPlaylistsEndpoint: string = "http://localhost:8080/playlist/me";
const getPlaylistsEndpointTest: string =
  "http://localhost:8080/playlist/metest";

// async function test(): Promise<void> {
//   const tokenToSend: Token = {
//     accessToken: "test",
//     refreshToken: "test",
//   };

//   const playlistItems = await getPlaylistsByUser(tokenToSend);
// }

export async function getPlaylistsByUser(tokens: Token) {
  return fetchRequest.postRequestToken(getPlaylistsEndpoint, tokens);
}

export async function getPlaylistsGetRequest(): Promise<Playlist[]> {
  return fetchRequest.getRequestPlaylists(getPlaylistsEndpointTest);
}

// export default test;
