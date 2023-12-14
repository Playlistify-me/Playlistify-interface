export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyExternalUrls = {
  externalUrls: {
    spotify: string;
  };
};

export type SpotifyFollowers = {
  href: string | null;
  total: number;
};

export type SpotifyArtist = {
  externalUrls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyAlbum = {
  albumGroup: string | null;
  albumType: string;
  artists: SpotifyArtist[];
  availableMarkets: string[];
  externalUrls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  releaseDate: string;
  releaseDatePrecision: string;
  restrictions: SpotifyRestrictions;
  type: string;
  uri: string;
};

export type SpotifyExternalIds = {
  isrc: string | null;
  ean: string | null;
  upc: string | null;
};

/*
market - The content item is not available in the given market.
product - The content item is not available for the user's subscription type.
explicit - The content item is explicit and the user's account is set to not play explicit content.
*/
export type SpotifyRestrictions = {
  reason: string | unknown | null; // not too sure about unknown/null for now
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  availableMarkets: string[];
  discNumber: number;
  durationMs: number;
  externalIds: SpotifyExternalIds;
  externalUrls: SpotifyExternalUrls;
  href: string;
  id: string;
  isPlayable: boolean | null;
  linkedFrom: object | null;
  restrictions: SpotifyRestrictions;
  name: string;
  popularity: number;
  previewUrl: string;
  trackNumber: number;
  type: string;
  uri: string;
  isExplicit: boolean;
};

export type SpotifyUser = {
  birthdate: string | null;
  country: string | null;
  displayName: string | null;
  email: string | null;
  externalUrls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string | null;
  type: string;
  uri: string;
};

export type SpotifyPlaylistTrack = {
  addedAt: string;
  addedBy: SpotifyUser;
  isLocal: boolean;
  track: SpotifyTrack;
};
