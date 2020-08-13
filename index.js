const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const cors = require('koa-cors')

const app = new Koa()
const router = new Router()
app.use(logger())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods());

router.get('/:degree',async ctx=>{
    const degree = ctx.params.degree
    const operation = Math.pow(Math.sin(degree),2) + Math.pow(Math.cos(degree),2)
    ctx.body = {
        result: `sin^2(${degree})+cos^2(${degree})=${operation}`
    }
})

app.listen(5000, ()=>{
    console.log("listening")
})