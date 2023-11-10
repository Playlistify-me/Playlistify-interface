import React from "react";

const getPlaylistsEndpoint: string = "http://localhost:8080/playlists/me";

function test(playlists: string[]): void {
  //getPlaylistsByUser();
  console.log(playlists);
}

export type Token = {
  accessToken: string;
  refreshToken: string;
};

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

export default test;
