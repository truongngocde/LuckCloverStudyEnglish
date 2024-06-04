import axiosClient from './axiosClient';

const URL = 'http://localhost:8080/apis/highscores';

const highscoreApi = {
  putUpdateHighscore(name = '', score = 0) {
    return axiosClient.put(`${URL}/update`, { name, score });
  },

  getLeaderboard(name = '') {
    return axiosClient.get(`${URL}/leaderboard`, { params: { name } });
  },
};

export default highscoreApi;