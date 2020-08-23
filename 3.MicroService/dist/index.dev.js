"use strict";

var Koa = require("koa");

var Router = require("koa-router");

var logger = require("koa-logger");

var cors = require("koa-cors");

var KafkaRest = require("kafka-rest");

var kafka = new KafkaRest({
  url: "http://kafka:9092"
});
var app = new Koa();
var router = new Router();
app.use(logger());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
router.get("/:degree", function _callee(ctx) {
  var degree, operation;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          degree = ctx.params.degree;
          operation = Math.pow(Math.sin(degree), 2) + Math.pow(Math.cos(degree), 2);
          ctx.body = {
            result: "sin^2(".concat(degree, ")+cos^2(").concat(degree, ")=").concat(operation)
          };

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/home", function _callee2(ctx) {
  var sinGet, cosGet;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          kafka.consumer("sin").join({
            format: "avro",
            "auto.commit.enable": "true"
          }, function (err, consumer_instance) {
            var stream1 = consumer_instance.subscribe("sin");
            var stream2 = consumer_instance.subscribe("cos");
            stream1.on("data", function (msg) {
              sinGet = msg;
            });
            stream2.on("data", function (msg) {
              cosGet = msg;
            });
            ctx.body = {
              result: "".concat(Math.pow(sinGet, 2) + Math.pow(cosGet, 2))
            };
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(5000, function () {
  console.log("listening");
});