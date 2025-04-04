class HttpService {
  constructor() {
    this.BASE_URL = import.meta.env.VITE_BASE_URL
  };
  async get_all_players() {
    const response = await fetch(`${this.BASE_URL}get_all_players`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
      },
    })
    return response.json();
  };
  async get_gamelogs(player_id) {
    const response = await fetch(`${this.BASE_URL}get_gamelogs/${player_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
      },
    })
    return response.json();
  };
};

export default new HttpService();
