# BLOG

## Installation

```
$ npm i
```
## Run server

```shell
node server.js
```

## Authentication

```curl
  curl --location --request POST 'http://localhost:3000/user/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "admin@gmail.com",
      "password": "123123"
  }'
```

Copy `token` value to `x-access-token` header:

```curl
  curl --location --request GET 'http://localhost:3000/article/news' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDY4MDZhYjcyNWE0ZTk5ZDU3MzBjIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkFkbWluIiwiYWdlIjoiMjMiLCJnZW5kZXIiOiJuYW0iLCJpYXQiOjE2NTU1MzE1NzQsImV4cCI6MTY1NTUzODc3NH0.Cev9AgCHhGfZTGfFeBlWFy6puINoGx6G6hjHLlu51fQ'
```

## api

### Dang nhap:
    curl --location --request POST 'http://localhost:3000/user/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "admin@gmail.com",
      "password": "123123"
  }'

### Dang ky tai khoan:
```
  curl --location --request POST 'http://localhost:3000/user/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "test1@gmail.com",
      "password": "123123",
      "password2": "123123",
      "userName": "Test",
      "age": "32",
      "gender": "Nữ"
  }'
```

### Chinh sua thong tin tai khoan
```
  curl --location --request PUT 'http://localhost:3000/user/info' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDZmYTI0YzgwMmE2OWQ5MDhlZDczIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlRlc3QiLCJhZ2UiOiIzMiIsImdlbmRlciI6Ik7hu68iLCJpYXQiOjE2NTU1MzM2MjYsImV4cCI6MTY1NTU0MDgyNn0.Ivf0Zs07e6_jPrqlIcjIMRpnl84Dfs7OGVS4Yjbe9gU' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "password": "1111111",
      "password2": "1111111",
      "userName": "ggddgg",
      "age": "12",
      "gender": "nam"
  }'
```

### Danh sach bai viet
```
  DRAFT: '235c6194-ee49-11ec-8ea0-0242ac120002',
  PUBLIC: '2778fa08-ee49-11ec-8ea0-0242ac120002'
```
```
  curl --location --request GET 'http://localhost:3000/article/news?status=2778fa08-ee49-11ec-8ea0-0242ac120002' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDY4MDZhYjcyNWE0ZTk5ZDU3MzBjIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkFkbWluIiwiYWdlIjoiMjMiLCJnZW5kZXIiOiJuYW0iLCJpYXQiOjE2NTU1MzE1NzQsImV4cCI6MTY1NTUzODc3NH0.Cev9AgCHhGfZTGfFeBlWFy6puINoGx6G6hjHLlu51fQ'
```

### Tao bai viet
```
  curl --location --request POST 'http://localhost:3000/article/create' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDZmYTI0YzgwMmE2OWQ5MDhlZDczIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlRlc3QiLCJhZ2UiOiIzMiIsImdlbmRlciI6Ik7hu68iLCJpYXQiOjE2NTU1MzM2MjYsImV4cCI6MTY1NTU0MDgyNn0.Ivf0Zs07e6_jPrqlIcjIMRpnl84Dfs7OGVS4Yjbe9gU' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "title": "bai viet 1",
          "description": "description",
          "content": "content 1",
          "avatar": "savatar",
          "status": "2778fa08-ee49-11ec-8ea0-0242ac120002",
          "categoryId": "62aca869716bbe6f646e5641"
  }'
```

### Chinh sua bai viet
```
  curl --location --request PUT 'http://localhost:3000/article/62aca37c235ea072abe2c9ca' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDZmYTI0YzgwMmE2OWQ5MDhlZDczIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlRlc3QiLCJhZ2UiOiIzMiIsImdlbmRlciI6Ik7hu68iLCJpYXQiOjE2NTU1MzM2MjYsImV4cCI6MTY1NTU0MDgyNn0.Ivf0Zs07e6_jPrqlIcjIMRpnl84Dfs7OGVS4Yjbe9gU' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "title": "Tieu de 123123",
          "description": "description 123 123",
          "content": "content",
          "avatar": "savatar",
          "status": "2778fa08-ee49-11ec-8ea0-0242ac120002",
          "categoryId": "62aca869716bbe6f646e5641"
  }'
```

### Xoa bai viet
```
  curl --location --request DELETE 'http://localhost:3000/article/62ac8ebc9c05c63b119992c4' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDZmYTI0YzgwMmE2OWQ5MDhlZDczIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlRlc3QiLCJhZ2UiOiIzMiIsImdlbmRlciI6Ik7hu68iLCJpYXQiOjE2NTU1MzM2MjYsImV4cCI6MTY1NTU0MDgyNn0.Ivf0Zs07e6_jPrqlIcjIMRpnl84Dfs7OGVS4Yjbe9gU'
```

### Hien thi danh sach bai viet theo danh muc
```
  curl --location --request GET 'http://localhost:3000/category/news/62ad74d48f50bacbbb6994b8' \
  --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJhZDZmYTI0YzgwMmE2OWQ5MDhlZDczIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IlRlc3QiLCJhZ2UiOiIzMiIsImdlbmRlciI6Ik7hu68iLCJpYXQiOjE2NTU1MzM2MjYsImV4cCI6MTY1NTU0MDgyNn0.Ivf0Zs07e6_jPrqlIcjIMRpnl84Dfs7OGVS4Yjbe9gU'
```
