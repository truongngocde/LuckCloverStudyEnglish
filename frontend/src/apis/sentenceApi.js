import axios from 'axios';
const URL = 'http://localhost:8080/apis/sentences';

const sentenceApi = {
  postContributeSentence: (sentence, mean, note, topics) => {
    return axios.post(`${URL}/add-sentence`, {
      sentence,
      mean,
      note,
      topics,
    });
  },
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
  getSentenceDetails: (sentence = '') => {
    return axios.get(`${URL}/sentence-details`, { params: { sentence } });
  },
};

export default sentenceApi;
