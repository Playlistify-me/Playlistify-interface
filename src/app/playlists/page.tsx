"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { getPlaylistsGetRequest } from "../services/getPlaylists";
import { SpotifyPlaylist } from "./playlistDto";
import {
  MergePlaylistsRequest,
  mergePlaylists,
} from "../services/mergePlaylists";
import { SessionProvider, useSession } from "next-auth/react";

const Playlists = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>(
    []
  );
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlists: SpotifyPlaylist[] = await getPlaylistsGetRequest();
      setPlaylists(playlists);
    };

    fetchPlaylists();
  }, []);

  const buttonTitle = (): string => {
    if (selectedPlaylists.length < 2) {
      return "Select at least 2 playlists to merge";
    } else if (newPlaylistName === "") {
      return "Must enter a name for the new playlist";
    } else {
      return "Combine selected playlists";
    }
  };

  const buttonDisabled = (): boolean => {
    if (selectedPlaylists.length < 2) {
      return true;
    } else if (newPlaylistName === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    playlist: SpotifyPlaylist
  ): void => {
    if (event.target.checked) {
      setSelectedPlaylists([...selectedPlaylists, playlist]);
    } else {
      setSelectedPlaylists(
        selectedPlaylists.filter(
          (playlistItem) => playlistItem.id !== playlist.id
        )
      );
    }
  };

  const handleMerge = (): void => {
    const playlistIds: string[] = selectedPlaylists.map(
      (playlist) => playlist.id
    );

    if (playlistIds.length === 0) {
      return;
    }

    const accessToken: string | undefined = session?.accessToken;

    if (!accessToken) {
      console.log("accessToken is undefined: {0}", accessToken);
      return;
    }

    const mergePlaylistsRequest: MergePlaylistsRequest = {
      playlistIds: playlistIds,
      newPlaylistName: newPlaylistName,
      accessToken: session?.accessToken!,
    };

    mergePlaylists(mergePlaylistsRequest);

    setSelectedPlaylists([]);
  };

  if (status !== "authenticated") {
    return (
      <div>
        <p>Must be authenticated to visit this page.</p>
      </div>
    );
  }

  return (
    <div className="max-h-full overflow-y-auto">
      <table className="max-h-full">
        <thead className="sticky top-0">
          <tr>
            <th className="w-1/2 px-4 py-2">Name</th>
            <th className="px-4 py-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist) => (
            <tr key={playlist.id}>
              <td className="border px-3 py-3">{playlist.name}</td>
              <td className="border px-3 py-3">
                <label className="w-full h-full flex justify-center">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, playlist)}
                    checked={selectedPlaylists.includes(playlist)}
                    className="h-5 w-5"
                  />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>
          New playlist name:
          <input
            id="newPlaylistName"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2 my-3"
            onChange={(e) => setNewPlaylistName(e.target.value)}
          ></input>
        </p>
        <p>
          <button
            type="button"
            className="border-4 border-orange-300 rounded disabled:opacity-50 disabled:color-red-500"
            onClick={handleMerge}
            disabled={buttonDisabled()}
            title={buttonTitle()}
          >
            Combine selected playlists
          </button>
        </p>
      </div>
    </div>
  );
};

export const PlaylistsPage = () => {
  return (
    <SessionProvider>
      <Playlists />
    </SessionProvider>
  );
};

export default PlaylistsPage;
