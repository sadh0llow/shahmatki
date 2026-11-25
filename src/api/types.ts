export interface PlayerProfile {
  username: string;
  player_id: number;
  title?: string;
  name?: string;
  avatar?: string;
  url: string;
  country?: string;
  joined: number;
  last_online: number;
  followers: number;
  status: string;
}

export interface Rating {
  rating: number;
  date: number;
  rd: number;
}

export interface GameStats {
  last?: Rating;
  best?: Rating;
  record?: { win: number; loss: number; draw: number };
}

export interface PlayerStats {
  chess_blitz?: GameStats;
  chess_rapid?: GameStats;
  chess_bullet?: GameStats;
  chess_daily?: GameStats;
}

export interface LeaderboardPlayer {
  username: string;
  score: number;
  url: string;
  country?: string;
}

export interface LeaderboardResponse {
  live_blitz?: LeaderboardPlayer[];
  live_rapid?: LeaderboardPlayer[];
  live_bullet?: LeaderboardPlayer[];
}