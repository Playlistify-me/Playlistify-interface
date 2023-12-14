import { SpotifyPlaylist } from "../playlists/playlistDto";
import { Token, fetchRequest } from "./fetchRequest";

const getPlaylistsEndpoint: string = "http://localhost:8080/playlist/me";
const getPlaylistsEndpointTest: string =
  "http://localhost:8080/playlist/metest";

export async function getPlaylistsByUser(tokens: Token) {
  return fetchRequest.postRequestToken(getPlaylistsEndpoint, tokens);
}

export async function getPlaylistsGetRequest(): Promise<SpotifyPlaylist[]> {
  return fetchRequest.getRequestPlaylists(getPlaylistsEndpointTest);
}
