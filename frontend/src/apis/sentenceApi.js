// import axiosClient from './axiosClient';
import axios from 'axios';
const URL = 'http://localhost:8080/apis/sentences';

const sentenceApi = {
  // postContributeSentence: (sentence, mean, note, topics) => {
  //   return axiosClient.post(`${URL}/add-sentence`, {
  //     sentence,
  //     mean,
  //     note,
  //     topics,
  //   });
  // },

  getTotalSentences: (topics = []) => {
    // return axios.get(`${URL}/total`, {
    //   params: { topics: JSON.stringify(topics) },
    // });

    return axios
      .get('http://localhost:8080/apis/sentences/total', {
        params: { topics: JSON.stringify(topics) },
      })
      .then((response) => {
        // Xử lý dữ liệu nhận được từ API
        console.log(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error('Error fetching data:', error);
      });
  },

  getSentenceList: (page = 1, perPage = 20, topics = []) => {
    // return axiosClient.get(`${URL}/list`, {
    //   params: {
    //     page,
    //     perPage,
    //     topics: JSON.stringify(topics),
    //   },
    // });
    return axios
      .get('http://localhost:8080/apis/sentences/list', {
          params: {
            page,
            perPage,
            topics: JSON.stringify(topics),
          },
      })
  },
};

export default sentenceApi;
