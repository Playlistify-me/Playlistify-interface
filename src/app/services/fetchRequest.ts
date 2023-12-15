import { SpotifyPlaylistTracksWithId } from "../playlistTrack/playlistTracksDtos";
import { SpotifyPlaylist } from "../playlists/playlistDto";
import { SpotifyPlaylistTrack } from "../types/spotifyTypes";
import { MergePlaylistsRequest } from "./mergePlaylists";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export class fetchRequest {
  private static readonly postMethod: string = "POST";
  private static readonly corsMode: RequestMode = "cors";
  private static readonly applicationJson: string = "application/json";
  private static readonly httpErrorStatus: string = "HTTP error! Status: ";
  private static readonly jsonContentHeader: HeadersInit = {
    "Content-Type": this.applicationJson,
  };

  static async getRequestPlaylists(
    endpoint: string
  ): Promise<SpotifyPlaylist[]> {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`${this.httpErrorStatus} ${response.status}`);
    }

    const responseData: SpotifyPlaylist[] = await response.json();

    if (!responseData) {
      console.error("no response data from getRequestPlaylists");
    }

    return responseData;
  }

  static async postRequestToken(endpoint: string, token: Token) {
    const response = await fetch(endpoint, {
      method: this.postMethod,
      mode: this.corsMode,
      headers: this.jsonContentHeader,
      body: JSON.stringify(token),
    });

    if (!response.ok) {
      throw new Error(`${this.httpErrorStatus} ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData) {
      console.error("no response data from postRequestToken");
    }

    return responseData;
  }

  static async postRequest(
    endpoint: string,
    request: MergePlaylistsRequest | unknown
  ): Promise<void> {
    if (!this.isMergePlaylistsRequest(request)) {
      throw new Error("request is not a MergePlaylistsRequest");
    }

    const response = await fetch(endpoint, {
      method: this.postMethod,
      mode: this.corsMode,
      headers: this.jsonContentHeader,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`${this.httpErrorStatus} ${response.status}`);
    }
  }

  static async getTracks(
    endpoint: string,
    playlistId: string
  ): Promise<SpotifyPlaylistTrack[]> {
    const endpointWithId = endpoint + playlistId;
    const response = await fetch(endpointWithId);

    if (!response.ok) {
      throw new Error(`${this.httpErrorStatus} ${response.status}`);
    }

    const responseData: SpotifyPlaylistTrack[] = await response.json();

    if (responseData) {
      console.log("responsedata");
      console.log(responseData);
    } else {
      throw new Error("no response data");
    }

    return responseData;
  }

  static async getTracksIds(
    endpoint: string,
    playlistIds: string[]
  ): Promise<SpotifyPlaylistTracksWithId[]> {
    const endpointWithId = endpoint + playlistIds;
    const response = await fetch(endpointWithId);

    if (!response.ok) {
      throw new Error(`${this.httpErrorStatus} ${response.status}`);
    }

    const responseData: SpotifyPlaylistTracksWithId[] = await response.json();

    if (responseData) {
      console.log("responsedata arr");
      console.log(responseData);
    } else {
      throw new Error("no response data");
    }

    return responseData;
  }

  private static isMergePlaylistsRequest(
    obj: any
  ): obj is MergePlaylistsRequest {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "playlistIds" in obj &&
      "newPlaylistName" in obj &&
      "accessToken" in obj
    );
  }
}
