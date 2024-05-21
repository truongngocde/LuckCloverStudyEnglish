import axios from 'axios';
const URL = 'http://localhost:8080/apis/flashcards';

const flashcardApi = {
  getWordPack: (page = 1, perPage = 8, packInfo) => {
    return axios.get(`${URL}/word-pack`, {
      params: { page, perPage, packInfo: JSON.stringify(packInfo) },
    });
  },
  getWordPackTotal: (packInfo) => {
    return axios.get(`${URL}/word-pack/total`, {
      params: { packInfo: JSON.stringify(packInfo) },
    });
  },
};

export default flashcardApi;