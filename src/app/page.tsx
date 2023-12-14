"use client";

import Image from "next/image";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import {
  getPlaylistsByUser,
  getPlaylistsGetRequest,
} from "./services/getPlaylists";
import { Playlist } from "./playlists/playlistDto";
import {
  mergePlaylists,
  MergePlaylistsRequest,
} from "./services/mergePlaylists";
import { Token } from "./services/fetchRequest";

export default function Home() {
  return (
    <SessionProvider>
      <div>
        <MainPage />
      </div>
    </SessionProvider>
  );
}

async function handleClick(s: Session) {
  const token: Token = {
    accessToken: s.accessToken!,
    refreshToken: s.refreshToken!,
  };

  const data: Playlist[] = await getPlaylistsByUser(token);
  console.log("data:");
  console.log(data);
}

async function handleClickTest(s: Session) {
  const token: Token = {
    accessToken: s.accessToken!,
    refreshToken: s.refreshToken!,
  };

  const playlists: Playlist[] = await getPlaylistsGetRequest();
  console.log("data:");
  console.log(playlists);
}

async function handleMergeTest(s: Session) {
  const token: Token = {
    accessToken: s.accessToken!,
    refreshToken: s.refreshToken!,
  };

  const playlistIdFirst: string = "5QQ3zBbqd0mgT1kQoHJMTm";
  const playlistIdSecond: string = "6WLWfFGTfVQjiZ4MKAzCeD";
  const newPlaylistName: string = "test playlist";

  const req: MergePlaylistsRequest = {
    playlistIds: [playlistIdFirst, playlistIdSecond],
    newPlaylistName: newPlaylistName,
    accessToken: token.accessToken,
  };

  await mergePlaylists(req);
}

function MainPage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log("session:");
    console.log(session);

    return (
      <div>
        <p>
          Signed in as {session.user?.email}
          <br />
          Welcome {session.user?.name}
          <Image
            src={session.user?.image!}
            alt="current_user_profile_picture"
            width="100"
            height="100"
          />
          <br />
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </p>
        <br />
        <p>
          GET PLAYLISTS:
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleClick(session)}
          >
            GET PLAYLISTS W TOKEN
          </button>
        </p>
        <p>
          TEST RESPONSE:
          <button
            className="bg-blue-500 hover:bg-blue-500/90 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => handleClickTest(session)}
          >
            TEST REQUEST
          </button>
        </p>
        <p>
          TEST MERGE:{" "}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleMergeTest(session)}
          >
            TEST MERGE
          </button>
        </p>
      </div>
    );
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}
