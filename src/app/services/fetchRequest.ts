import { Playlist } from "../playlists/playlistDto";
import { MergePlaylistsRequest } from "./mergePlaylists";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export class fetchRequest {
  private static readonly postMethod: string = "POST";
  private static readonly corsMode: RequestMode = "cors";
  private static readonly appJson: string = "application/json";
  private static readonly httpErrorStatus: string = "HTTP error! Status: ";

  static async getRequestPlaylists(endpoint: string): Promise<Playlist[]> {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`${this.httpErrorStatus} ${response.status}`);
    }

    const responseData: Playlist[] = await response.json();

    if (!responseData) {
      console.error("no response data from getRequestPlaylists");
    }

    return responseData;
  }

  static async postRequestToken(endpoint: string, token: Token) {
    const response = await fetch(endpoint, {
      method: this.postMethod,
      mode: this.corsMode,
      headers: {
        "Content-Type": this.appJson,
      },
      body: JSON.stringify(token),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
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
      headers: {
        "Content-Type": this.appJson,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
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
