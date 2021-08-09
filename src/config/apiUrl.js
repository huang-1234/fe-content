// let ipUrl = 'http://127.0.0.1:7001/admin/';
let ipUrl = 'http://localhost:8001/admin/'

let servicePath = {

  checkLogin: ipUrl + 'checkLogin',         // user Login interface
  checkLogout: ipUrl + 'checkLogout',         //
  getTypeInfo: ipUrl + 'getTypeInfo',         // 获得文章类别信息
  addArticle: ipUrl + 'addArticle',  //  添加文章
  updateArticle: ipUrl + 'updateArticle',  //  修改文章第api地址
  getArticleList: ipUrl + 'getArticleList',  //  文章列表
  delArticle: ipUrl + 'delArticle/',  //  删除文章

  getArticleById: ipUrl + 'getArticleById/',  //  根据ID获得文章详情

};
export default servicePath;