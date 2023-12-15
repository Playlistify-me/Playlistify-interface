import { SpotifyPlaylistTrack } from "../types/spotifyTypes";

export type SpotifyPlaylistTracksWithId = {
  id: string;
  playlistTracks: SpotifyPlaylistTrack[];
};
