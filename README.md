## Backend for the vue-login-form-frontend

[![Known Vulnerabilities](https://snyk.io/test/github/peterdee/vue-login-form-backend/badge.svg?targetFile=package.json)](https://snyk.io/test/github/peterdee/vue-login-form-backend?targetFile=package.json)

Frontend project: [`vue-login-form-frontend`](https://github.com/peterdee/vue-login-form-frontend)

Stack: [`Koa`](https://koajs.com)

DEV: http://localhost:9000

STAGE: https://vue-login-form-backend.herokuapp.com/

Hardcoded user credentials:
```text
login: user@test.com
password: qwerty123
```

### Routes

- `/api/login` - `POST` - login request
- `/api/dashboard` - `GET` - get user email and name for the dashboard
- `/api/posts` - `GET` - get all of the posts
- `/api/posts?id=<POST_ID>` - `GET` - get a single post

### Deploy

- `git clone https://github.com/peterdee/vue-login-form-backend`
- `cd ./vue-login-form-backend`
- `nvm use 13.1` (please see the actual Node version in [package.json](package.json) file)
- `npm i` (use `npm i --prod` for `stage` / `production`)

### Launch

Development:

- `npm run dev`

Stage / production:

- `npm start`

### Heroku

The `stage` branch is deployed to [Heroku](https://herokuapp.com/) automatically
