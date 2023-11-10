"use client";

import Image from "next/image";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { getPlaylistsByUser, Token } from "./services/getPlaylists";

export default function Home() {
  return (
    <SessionProvider>
      <div>
        <Component />
        <h1>testing</h1>
      </div>
    </SessionProvider>
  );
}

function handleClick(s: Session) {
  const token: Token = {
    accessToken: s.accessToken!,
    refreshToken: s.refreshToken!,
  };

  console.log(token);

  // getPlaylistsByUser(token);
}

function Component() {
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
          <button className="border-solid border-2" onClick={() => signOut()}>
            Sign out
          </button>
        </p>
        <br />
        <p>accessToken = {session.accessToken}</p>
        <br />
        <p>refreshToken = {session.refreshToken}</p>
        <br />
        <p>
          get Playlists:{" "}
          <button
            className="border-solid border-2"
            onClick={() => handleClick(session)}
          >
            GET PLAYLISTS
          </button>
        </p>
      </div>
    );
  }

  return (
    <button className="border-solid border-2" onClick={() => signIn()}>
      Sign in
    </button>
  );
}
