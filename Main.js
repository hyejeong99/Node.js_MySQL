const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)

var authRouter = require('./auth');
var authCheck = require('./authCheck.js');
var template = require('./template.js');
const request = require('request');

const app = express()
const port = 2000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);



// 메인 페이지
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  }
  var html = template.HTML('Admin Page',
    `<hr>
        <h1>관리자 페이지</h1>
        <form action="/auth/search_process" method="post">
            <p><input class="btn" type="submit" value="데이터 조회"></p>
            <h3>발전소명 : ${req.session.plantId}</h3>
            <p>조회 기간 : ${req.session.startT} ~ ${req.session.endT}</p>
            <table>
              <thead>
                <tr>
                  <th>　작업로봇 ID　</th>
                  <th>작업시간(누적, 초)</th>
                  <th>작업면적(제곱미터)</th>
                </tr>
              </thead>
              <tbody>
                <P>${req.session.searchData}</P>  
              </tbody>
            </table>
            
        </form>         
        `,
    authCheck.statusUI(req, res)
    // authCheck.timeUI(req, res),//조회 기간
    //authCheck.searchData(req,res)//조회 데이터
  );
  res.send(html);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})