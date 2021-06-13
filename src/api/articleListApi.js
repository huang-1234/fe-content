/* 
import adminInstanceAxios from '../utils/request'
import adminUrl from './apiUrl.js'

// 获取文章列表的api
export function getArticleListApi() {
  adminInstanceAxios.get(adminUrl.getArticleList)
    .then((response) => {
      console.log('getArticleListApi<<',response.data)
      return response.data;
  })
}
 */
import {getArticleListRequest} from './request';
import servicePath  from '../config/apiUrl'
// import adminUrl from './apiUrl.js';

export function getArticleListApi() {
  getArticleListRequest().then((data) => {
    console.log('getArticleListApi__data<<', data)
    return data;
  })
    .catch((err) => {
    console.log(err,'err')
  })
}
