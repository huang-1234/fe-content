import axios from 'axios';
import servicePath from '../../config/apiUrl'

export const getArtListData =  async (req, res, next) => {
  const artListUrl = servicePath.getArticleList;
  // const artListUrl = `http://127.0.0.1:7001/default/getArticleList/`
  // return new Promise((resolve, reject) => {
    await axios({
      method: 'GET',
      url:artListUrl
    })
      .then((res) => {
        console.log('远程获取数据结果:', res.data.list);
        // resolve(res.data.list);
        return res.data.list;
        // resolve(res.data.data);
        // artListData = res.data.list;
        // return artListData;
      })
      .catch((error) => {
        console.log('调用接口失败！')
        return error;
        // reject(error)
      });
  // })
}

