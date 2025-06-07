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
  },
  BOVADA_PROP_STAT_MAPPINGS: {
    'total_assists': ['AST'],
    'total_assists-1stquarter': ['AST'],
    'total_blocks': ['BLK'],
    'total_made_3_points_shots': ['FG3M'],
    'total_personal_fouls': ['PF'],
    'total_points': ['PTS'],
    'total_points,_rebounds_and_assists': ['PTS', 'REB', 'AST'],
    'total_points-1stquarter': ['PTS'],
    'total_points_and_assists': ['PTS', 'AST'],
    'total_points_and_rebounds': ['PTS', 'REB'],
    'total_rebounds': ['REB'],
    'total_rebounds-1stquarter': ['REB'],
    'total_rebounds_and_assists': ['REB', 'AST'],
    'total_steals': ['STL'],
    'total_turnovers': ['TOV']
  },
  BAR_CHART_COLORS: [
    "--p-green", "--p-yellow", "--p-cyan",
    "--p-pink", "--p-indigo", "--p-teal",
    "--p-orange", "--p-bluegray", "--p-purple",
    "--p-red", "--p-gray"
  ]
};
