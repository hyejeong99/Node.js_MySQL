module.exports = {
    isOwner: function (request, response) {
      if (request.session.is_logined) {
        return true;
      } else {
        return false;
      }
    },
    statusUI: function (request, response) {
      var authStatusUI = '로그인후 사용 가능합니다'
      if (this.isOwner(request, response)) {
        authStatusUI = `${request.session.nickname}님 환영합니다 | <a href="/auth/logout">로그아웃</a>`;
        //timePeriod = `${request.session.startT} ~ ${request.session.endT}`;
      }
      return authStatusUI;
    },
    timeUI: function (request, response) {
      var timePeriod = '시작 기간 ~ 끝 기간'
      //if (this.isOwner(request, response)) {
        if(request.session.is_data){
          timePeriod = `${request.session.startT} ~ ${request.session.endT}`;
      }
      return timePeriod;
    },
    searchData: function (request, response) {
      var tableTag = '데이터 조회 결과';
      if (request.session.is_data) {
        // for(let i=0;i<request.session.num;i++){
        //   // tableTag += `<tr>
        //   //       <td>${request.session.Rid[i]}</td>
        //   //       <td>${request.session.period[i]}</td>
        //   //       <td>${request.session.area[i]}</td>
        //   //     </tr>`;
        //   // i++;
        //   tableTag = `${request.session.searchData}`;
        // }
        tableTag = `${request.session.searchData}`;
        // tableTag += '</table>';
      }else{
        tableTag='\n조회된 데이터가 없습니다.';
      }
      return tableTag;
    }
  }