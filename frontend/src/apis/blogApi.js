import axios from 'axios';

const URL = 'http://localhost:8080/apis/blogs';

const blogApi = {
  getBlogList: () => {
    return axios.get(`${URL}/`);
  },

  getBlogHtml: (_id) => {
    return axios.get(`${URL}/blog-html`, { params: { _id } });
  },
};

export default blogApi;