let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {

  checkLogin: ipUrl + 'checkLogin',         // user Login interface
  checkLogout: ipUrl + 'checkLogout',         // 根据类别ID获得文章列表

};
export default servicePath;