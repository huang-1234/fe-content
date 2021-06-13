/* 
import axios from 'axios';
const adminInstanceAxios = axios.create({
  baseUrl: 'http://localhost:7001/admin/',
});

adminInstanceAxios.interceptors.request.use((config) => {
  return config;
})

export default adminInstanceAxios
axios.defaults.baseUrl = 'http://localhost:7001/admin/'
 */
import { axiosInstance } from './config';

export const getArticleListRequest = (req, res) => {
  return axiosInstance({
    url: '/admin/getArticleList',  //  文章列表
    method: 'GET',
  })
}