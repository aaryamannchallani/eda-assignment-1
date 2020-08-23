const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const cors = require("koa-cors");
const KafkaRest = require("kafka-rest");
const kafka = new KafkaRest({ url: "http://kafka:9092" });

const app = new Koa();
const router = new Router();
app.use(logger());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

router.get("/:degree", async (ctx) => {
  const degree = ctx.params.degree;
  const operation =
    Math.pow(Math.sin(degree), 2) + Math.pow(Math.cos(degree), 2);
  ctx.body = {
    result: `sin^2(${degree})+cos^2(${degree})=${operation}`,
  };
});

router.get("/home", async (ctx) => {
  var sinGet, cosGet;
  kafka.consumer("sin").join(
    {
      format: "avro",
      "auto.commit.enable": "true",
    },
    function (err, consumer_instance) {
      var stream1 = consumer_instance.subscribe("sin");
      var stream2 = consumer_instance.subscribe("cos");
      stream1.on("data", (msg) => {
        sinGet = msg;
      });
      stream2.on("data", (msg) => {
        cosGet = msg;
      });
      ctx.body = {
        result: `${Math.pow(sinGet, 2) + Math.pow(cosGet, 2)}`,
      };
    }
  );
});

app.listen(5000, () => {
  console.log("listening");
});
