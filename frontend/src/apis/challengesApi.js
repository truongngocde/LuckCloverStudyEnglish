import axios from 'axios';
const URL = 'http://localhost:8080/apis/challenges';

const challengeApi = {
  // correct word 
  getWordPackCorrectWord: (
    type = '-1',
    level = '-1',
    specialty = '-1',
    topics = [],
    nQuestion = 50,
  ) => {
    return axios.get(`${URL}/correct-word-pack`, {
      params: {
        type,
        level,
        specialty,
        topics: JSON.stringify(topics),
        nQuestion,
      },
    });
  },

  // word match 
  getWordPackWordMatch: (
    type = '-1',
    level = '-1',
    specialty = '-1',
    topics = [],
    nQuestion = 50,
  ) => {
    return axios.get(`${URL}/match-word-pack`, {
      params: {
        type,
        level,
        specialty,
        topics: JSON.stringify(topics),
        nQuestion,
      },
    });
  },

  // fast word
  getWordPackWordFast: (topic = 0) => {
    return axios.get(`${URL}/fast-word-pack`, {
      params: { topic },
    });
  },
  // sentence match 
  getSentencePackWordMatch: (
    topics = [],
    nQuestion = 50,
  ) => {
    return axios.get(`${URL}/match-sentence-pack`, {
      params: {
        topics: JSON.stringify(topics),
        nQuestion,
      },
    });
  },


};

export default challengeApi;
