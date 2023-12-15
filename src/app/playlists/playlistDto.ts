import {
  SpotifyExternalUrls,
  SpotifyImage,
  SpotifyUser,
} from "../types/spotifyTypes";

type PlaylistTracks = {
  href: string;
  total: number;
};

export type SpotifyPlaylist = {
  externalUrls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyUser;
  snapshotId: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
  isCollaborative: boolean;
  isPublicAccess: boolean;
};
