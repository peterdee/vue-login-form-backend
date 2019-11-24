const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const serve = require('koa-static');

const posts = require('./posts');

const app = new Koa();
const user = {
  email: 'user@test.com',
  name: 'Jack Sparrow',
  password: 'qwerty123',
};

// handle dashboard request
const dashboardRouter = new Router();
dashboardRouter.get('/api/dashboard', async (ctx) => {
  // delay response
  const delayedData = new Promise(
    resolve => setTimeout(() => resolve({ email: user.email, name: user.name }), 3000),
  );
  const data = await delayedData;
  ctx.status = 200;
  ctx.body = {
    data: {
      ...data,
      posts,
    },
    info: 'OK',
    status: ctx.status,
  };
  return ctx.body;
});

// handle login request
const loginRouter = new Router();
loginRouter.post('/api/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  if (!(email && password)) {
    ctx.status = 400;
    ctx.body = {
      info: 'MISSING_DATA',
      status: ctx.status,
    };
    return ctx.body;
  }
  
  // delay response
  const delay = new Promise(resolve => setTimeout(() => resolve(), 2000));
  await delay;

  if (email !== user.email || password !== user.password) {
    ctx.status = 401;
    ctx.body = {
      info: 'ACCESS_DENIED',
      status: ctx.status,
    };
    return ctx.body;
  }

  ctx.status = 200;
  ctx.body = {
    info: 'OK',
    status: ctx.status,
  };
  return ctx.body;
});

// handle posts requests
const postsRouter = new Router();
postsRouter.get('/api/posts', async (ctx) => {
  const { id = '' } = ctx.request.query;

  // delay response
  const delay = new Promise(resolve => setTimeout(() => resolve(), 2000));
  await delay;

  const data = id ? posts.filter(post => post.id === Number(id))[0] : posts;

  ctx.status = 200;
  ctx.body = {
    data,
    info: 'OK',
    status: ctx.status,
  };
  return ctx.body;
});

app.use(bodyParser());
app.use(cors());
app.use(logger());

// serve dist for production build
if (process.env.NODE_ENV === 'production') {
  app.use(serve(`${__dirname}/dist`));
}

app.use(dashboardRouter.routes());
app.use(loginRouter.routes());
app.use(postsRouter.routes());

// launch the server
const PORT = Number(process.env.port) || 9000;
/* eslint-disable */
app.listen(PORT, () => console.log(`-- Server is running on port ${PORT}`));
