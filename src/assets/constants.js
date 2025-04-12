export const CONSTANTS = {
  GAMELOG_HEADERS: [
    "SEASON_ID", "Player_ID", "Game_ID", "GAME_DATE", "MATCHUP",
    "WL", "MIN", "FGM", "FGA", "FG_PCT", "FG3M", "FG3A", "FG3_PCT",
    "FTM", "FTA", "FT_PCT", "OREB", "DREB", "REB", "AST",
    "STL", "BLK", "TOV", "PF", "PTS", "PLUS_MINUS", "VIDEO_AVAILABLE"
  ],
  GAMELOG_STATS: [
    "PTS", "REB", "AST", "STL", "BLK", "MIN", "FGM", "FGA",
    "FG_PCT", "FG3M", "FG3A", "FG3_PCT", "FTM", "FTA",
    "FT_PCT", "OREB", "DREB", "TOV", "PF", "PLUS_MINUS"
  ],
  GAMELOG_STAT_LABELS: [
    "PTS", "REB", "AST", "STL", "BLK", "MIN", "FGM", "FGA",
    "FG%", "FG3M", "FG3A", "FG3%", "FTM", "FTA",
    "FT%", "OREB", "DREB", "TOV", "PF",  "+/-"
  ],
  GAMELOG_STAT_LABELS_LF: {
    "MIN": "Minutes", "FGM": "Field Goals Made", "FGA": "Field Goals Attempted",
    "FG%": "Field Goal %", "FG3M": "Three Pointers Made", "FG3A": "Three Pointers Attempted",
    "FG3%": "Three Point %", "FTM": "Free Throws Made", "FTA": "Free Throws Attempted",
    "FT%": "Free Throw %", "OREB": "Offensive Rebounds", "DREB": "Defensive Rebounds",
    "REB": "Rebounds", "AST": "Assists", "STL": "Steals", "BLK": "Blocks",
    "TOV": "Turnovers", "PF": "Personal Fouls", "PTS": "Points", "+/-": "Plus Minus"
  }
};
