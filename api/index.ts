var express = require("express");
var app = express();

app.get("/stock-price", function (req: any, res: any) {
  const { serviceKey, numOfRows, pageNo, resultType, isinCd } = req.query;

  // 필수 파라미터 검증
  if (!serviceKey || !numOfRows || !pageNo || !isinCd) {
    res.status(400).json({ error: "필수 파라미터 누락: isinCd를 포함한 모든 파라미터를 확인하세요." });
    return;
  }

  var api_url = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?";
  var request = require("request");

  var options = {
    url: api_url,
    qs: { serviceKey, numOfRows, pageNo, resultType, isinCd },
    headers: {
      Accept: "*/*", // cURL 요청과 동일하게 Accept 헤더 추가
    },
  };

  // 외부 API 요청
  request.get(options, function (error: any, response: any, body: any) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      console.error("API 호출 오류:", error || response.statusCode);
      res.status(response.statusCode || 500).json({ error: "외부 API 호출 실패" });
    }
  });
});

app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/stock-price?serviceKey=u6LTeM%2FaiScn%2FEGgwHFzHgzkg4LFRF6FmjTVuQPcgTKTjJBo%2BVGWSu%2FFMVxPYpZqR0dA2dtLTq5hYZ3kIkB%2BfA%3D%3D&numOfRows=10&pageNo=1&isinCd=KR7005380001 app listening on port 3000!"
  );
});
