import axios from 'axios';
const URL = 'http://localhost:8080/apis/sentences';

const sentenceApi = {
  getTotalSentences: (topics = []) => {
    return axios.get(`${URL}/total`, {
      params: { topics: JSON.stringify(topics) },
    });
  },

  getSentenceList: (page = 1, perPage = 20, topics = []) => {
    return axios.get(`${URL}/list`, {
      params: {
        page,
        perPage,
        topics: JSON.stringify(topics),
      },
    });
  },
};

export default sentenceApi;
