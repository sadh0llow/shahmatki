import axios, { AxiosInstance } from "axios";
import type { PlayerProfile, PlayerStats, LeaderboardResponse } from "./types";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.chess.com/pub",
  timeout: 10_000,
});

export const getPlayer = async (username: string): Promise<PlayerProfile> => {
  const { data } = await api.get<PlayerProfile>(`/player/${username}`);
  return data;
};

export const getPlayerStats = async (username: string): Promise<PlayerStats> => {
  const { data } = await api.get<PlayerStats>(`/player/${username}/stats`);
  return data;
};

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
  const { data } = await api.get<LeaderboardResponse>("/leaderboards");
  return data;
};