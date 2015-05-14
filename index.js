var debug = require('debug')('jsplayground:');
var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var acorn = require('acorn');
var app = express();

app.use(express.static('static'));
app.use(express.static('bower_components/'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/code/run', function(req, res) {
  debug('GET /code/run', req.body);
  var ast, comments = [], tokens = []

  try {
    ast = acorn.parse(req.body.code, {
      ranges: true,
      onComment: comments,
      onToken: tokens
    });

    /* === Token Spec
      token = {
        type: {
          // 예약어가 아닌경우 타입이 들어오기도. 예를 들면 숫자 10 이면 'num' 이 되고 value 가 10 으로 저장
          // 변수인 경우, 예를 들어 변수 i 라면 label 은 'name' 이 되고 value 가 'i' 가 됨.
          label: 'for',
          keyword: 'for', // 예약어
          beforeExpr: false,
          startsExpr: false,
          isLoop: true, // 반복문의 예약어인 경우 true
          isAssign: false, // 대입문 '=' 인 경우 true
          prefix: false,
          postfix: false,
          binop: null,
          updateContext: null
        },
        value: 'for', // Optional 종료문자 등인 경우 value 는 없고 type 의 label 만 존재
        start: 12, // 뭐지 ?
        end: 15, // 뭐지?
        range: [12, 15] // start 와 end 값인 듯.
      }
    */
    _.each(tokens, function(token) {

      if(token.type.label === 'name') {
        console.log('Variable: %s', token.value);
      }
    });

    res.send({ parsing: true , code: req.body.code });
  } catch(ex) {
    res.send({ parsing: false });
  }
});

app.listen(8080, function() {
  console.log('Running');
});
