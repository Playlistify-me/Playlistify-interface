type Image = {
  height: number;
  url: string;
  width: number;
};

type ExternalUrls = {
  spotify: string;
};

type Owner = {
  birthdate: null;
  country: null;
  displayName: string;
  email: null;
  externalUrls: ExternalUrls;
  followers: null;
  href: string;
  id: string;
  images: null;
  product: null;
  type: string;
  uri: string;
};

type Tracks = {
  href: string;
  total: number;
};

export type Playlist = {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  snapshotId: string;
  tracks: Tracks;
  type: string;
  uri: string;
  isCollaborative: boolean;
  isPublicAccess: boolean;
};
