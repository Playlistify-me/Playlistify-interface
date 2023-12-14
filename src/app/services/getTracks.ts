import { SpotifyPlaylistTracksWithId } from "../playlistTrack/playlistTracksDtos";
import { fetchRequest } from "./fetchRequest";
import { SpotifyPlaylistTrack } from "../types/spotifyTypes";

const getTracksEndpoint: string = "http://localhost:8080/playlist/getTracks/";

export async function getTracksByPlaylistId(
  playlistId: string
): Promise<SpotifyPlaylistTrack[]> {
  return fetchRequest.getTracks(getTracksEndpoint, playlistId);
}

export async function getTracksByPlaylistIds(
  playlistIds: string[]
): Promise<SpotifyPlaylistTracksWithId[]> {
  return fetchRequest.getTracksIds(getTracksEndpoint, playlistIds);
}
