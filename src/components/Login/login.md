
# Login相关

## axios跨域问题

当我们使用axios向后端请求数据的时候，也就是下面这段代码
```js
axios({
  method: 'post',
  url: servicePath.checkLogin,
  data: dataProps,
  withCredentials:true   //前后端是否共享session
}).then(
  (res) => {
    setIsLoading(false);
    if ('login_successfully' === res.data.data) {
      // 判断用户的账户密码是否在数据库当中，以及是否正确，正确，则跳转到登录后的首页，否则直接else报错
      localStorage.setItem('openID', res.data.openID);
      props.history.push('/index');
    } else {
      props.history.push('/login/');
      message.error('username or password was wrong');
    }
})
```
然后登录的时候就报错了

这意味着当我们使用axios访问后端接口servicePath.checkLogin时会发生跨域访问，浏览器不接受数据

```js
localhost/:1 Access to XMLHttpRequest at 'http://127.0.0.1:7001/admin/checkLogin' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```

## 解决跨域问题
这个时候就要想一想怎么进行跨域了;
先是在侯丹


但是又出现了新情况
```js
POST http://127.0.0.1:7001/admin/checkLogin 404 (Not Found)
dispatchXhrRequest @ xhr.js:177
xhrAdapter @ xhr.js:13
dispatchRequest @ dispatchRequest.js:52
Promise.then (async)
request @ Axios.js:61
wrap @ bind.js:9
checkLogin @ index.jsx:37
handleClick @ button.js:203
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4070
executeDispatch @ react-dom.development.js:8243
processDispatchQueueItemsInOrder @ react-dom.development.js:8275
processDispatchQueue @ react-dom.development.js:8288
dispatchEventsForPlugins @ react-dom.development.js:8299
(anonymous) @ react-dom.development.js:8508
batchedEventUpdates$1 @ react-dom.development.js:22396
batchedEventUpdates @ react-dom.development.js:3745
dispatchEventForPluginEventSystem @ react-dom.development.js:8507
attemptToDispatchEvent @ react-dom.development.js:6005
dispatchEvent @ react-dom.development.js:5924
unstable_runWithPriority @ scheduler.development.js:468
runWithPriority$1 @ react-dom.development.js:11276
discreteUpdates$1 @ react-dom.development.js:22413
discreteUpdates @ react-dom.development.js:3756
dispatchDiscreteEvent @ react-dom.development.js:5889
xhr.js:177 XHR failed loading: POST "http://127.0.0.1:7001/admin/checkLogin".
dispatchXhrRequest @ xhr.js:177
xhrAdapter @ xhr.js:13
dispatchRequest @ dispatchRequest.js:52
Promise.then (async)
request @ Axios.js:61
wrap @ bind.js:9
checkLogin @ index.jsx:37
handleClick @ button.js:203
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4070
executeDispatch @ react-dom.development.js:8243
processDispatchQueueItemsInOrder @ react-dom.development.js:8275
processDispatchQueue @ react-dom.development.js:8288
dispatchEventsForPlugins @ react-dom.development.js:8299
(anonymous) @ react-dom.development.js:8508
batchedEventUpdates$1 @ react-dom.development.js:22396
batchedEventUpdates @ react-dom.development.js:3745
dispatchEventForPluginEventSystem @ react-dom.development.js:8507
attemptToDispatchEvent @ react-dom.development.js:6005
dispatchEvent @ react-dom.development.js:5924
unstable_runWithPriority @ scheduler.development.js:468
runWithPriority$1 @ react-dom.development.js:11276
discreteUpdates$1 @ react-dom.development.js:22413
discreteUpdates @ react-dom.development.js:3756
dispatchDiscreteEvent @ react-dom.development.js:5889
createError.js:16 Uncaught (in promise) Error: Request failed with status code 404
    at createError (createError.js:16)
    at settle (settle.js:17)
    at XMLHttpRequest.handleLoad (xhr.js:62)
```
什么情况，404！！！

看了下后台的输出信息

```js
sql: SELECT userName FRom admin_user WHERE userName = undefinedAND password = s
code: "ER_PARSE_ERROR"
errno: 1064
sqlMessage: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'password = s' at line 1"
sqlState: "42000"
index: 0
sql: "SELECT userName FRom admin_user WHERE userName = undefinedAND password = s"
headers: {"Access-Control-Allow-Origin":"http://localhost:3000","Access-Control-Allow-Credentials":"true","vary":"Origin"}
name: "ER_PARSE_ERRORError"
pid: 50452
hostname: HSQ
```

> 改完相关的错误以后再去访问

出现了没有这个table,我倒是想看看访问一个不存在的表会怎么杨
```js
code: "ER_NO_SUCH_TABLE"
errno: 1146
sqlMessage: "Table 'react_blog.admin_user' doesn't exist"
sqlState: "42S02"
index: 0
sql: "SELECT userName FROM admin_user WHERE userName = undefined AND password = d"
headers: {"Access-Control-Allow-Origin":"http://localhost:3000","Access-Control-Allow-Credentials":"true","vary":"Origin"}
name: "ER_NO_SUCH_TABLEError"
pid: 57680
hostname: HSQ
```

## MySQL的合法查询语句
最后的问题竟然是sql语句的问题

> mysql查询

关于去mysql查询username和password，用来登录的问题
就是一个字符串转换为一个合法的SQL语句

```js
    const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
```

> 后台接口

```js
  async checkLogin() {
    // 这个地方接收的username和password可以使用md5加密
    const { ctx, app } = this;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
    const res = await app.mysql.query(sql);
    console.log(res);
    if (res.length > 0) {
      const openID = new Date().getTime();
      ctx.session.openID = { openID };
      // 传一个sessionID，方便后续就不用频繁的访问数据库了
      ctx.body = {
        data: 'login_successfully',
        openID,
      };
    } else {
      ctx.body = {
        data: 'failed_login',
      };
    }
  }
```

输入账号：huang
输入密码：shuiqing
这些数据库当中也有，但是就是没法跳转路由

## 解决问题
我在service/router/admin.js里写的是
```js
router.get('/admin/index',  controller.admin.main.index);
router.get('/admin/getTypeInfo', adminauth,controller.admin.main.getTypeInfo);
```

查了后端的路由守卫的使用应该是

```js
router.get('/admin/index', adminauth, controller.admin.main.index);
router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);
```

这样的错误以后不可犯了