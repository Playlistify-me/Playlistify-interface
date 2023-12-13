import { Playlist } from "../playlists/playlistDto";

const getPlaylistsEndpoint: string = "http://localhost:8080/playlist/me";
const getPlaylistsEndpointTest: string =
  "http://localhost:8080/playlist/metest";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

async function test(): Promise<void> {
  const tokenToSend: Token = {
    accessToken: "test",
    refreshToken: "test",
  };

  const playlistItems = await getPlaylistsByUser(tokenToSend);
  console.log(playlistItems);
}

export async function getPlaylistsByUser(tokens: Token) {
  console.log("tokens=");
  console.log(tokens);
  const response = await fetch(getPlaylistsEndpoint, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokens),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  if (responseData) {
    console.log("responsedata");
    console.log(responseData);
  }
  return responseData;
}

export async function getPlaylistsGetRequest(): Promise<Playlist[]> {
  const response = await fetch(getPlaylistsEndpointTest);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData: Playlist[] = await response.json();

  if (responseData) {
    console.log("responsedata");
    console.log(responseData);
  } else {
    console.log("no response data");
  }

  return responseData;
}

export default test;
