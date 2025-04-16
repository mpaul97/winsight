class HttpService {
  constructor() {
    this.BASE_URL = import.meta.env.VITE_BASE_URL
  };
  async set_all_players() {
    try {
      const response = await fetch(`${this.BASE_URL}get_all_players`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        },
      })
      localStorage.setItem('allPlayers', JSON.stringify(await response.json()));
    } catch (err) {
      console.error('Error GETTING/SETTING all_players\n', err);
      return undefined;
    }
  };
  async get_gamelogs(player_id) {
    try {
      const response = await fetch(`${this.BASE_URL}get_gamelogs/${player_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        },
      })
      return response.json();
    } catch (err) {
      console.error('Error GETTING gamelogs\n', err);
      return undefined;
    }
  };
  async post_bet_info(data) {
    try {
      const response = await fetch(`${this.BASE_URL}post_bet_info`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        },
      })
      return response.json();
    } catch (err) {
      console.error('Error POSTING bet_info\n', err);
      return undefined;
    }
  }
};

export default new HttpService();
