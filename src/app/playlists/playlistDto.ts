export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyOwner = {
  birthdate: string | null;
  country: string | null;
  displayName: string | null;
  email: string | null;
  externalUrls: SpotifyExternalUrls;
  followers: any;
  href: string;
  id: string;
  images: any;
  product: string | null;
  type: string;
  uri: string;
};

type Tracks = {
  href: string;
  total: number;
};

export type Playlist = {
  externalUrls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyOwner;
  snapshotId: string;
  tracks: Tracks;
  type: string;
  uri: string;
  isCollaborative: boolean;
  isPublicAccess: boolean;
};
