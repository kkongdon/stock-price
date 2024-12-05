var express = require("express");
var app = express();

app.get("/stock-price", function (req: any, res: any) {
  const { serviceKey, numOfRows, pageNo, resultType, likeItmsNm } =
    req.query;

  var api_url =
    "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?";
  var request = require("request");
  var options = {
    url: api_url,
    qs: { serviceKey, numOfRows, pageNo, resultType, likeItmsNm },
  };

  request.get(options, function (error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/stock-price?serviceKey=u6LTeM%2FaiScn%2FEGgwHFzHgzkg4LFRF6FmjTVuQPcgTKTjJBo%2BVGWSu%2FFMVxPYpZqR0dA2dtLTq5hYZ3kIkB%2BfA%3D%3D&numOfRows=1&pageNo=1&&likeItmsNm=삼성전자&mrktCls=KOSPI&numOfRows=1&pageNo=1&basDt=20241205 app listening on port 3000!"
  );
});
