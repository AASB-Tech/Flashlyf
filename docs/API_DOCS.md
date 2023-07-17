# API documentation for FlashLyf

## Table of Contents

- [Overview](#overview)
- [Detailed information](#detailed-information)

## Overview

Required Header for POST, DELETE, PUT requests: `"X-CSRFTOKEN"`
The `X-CSRFTOKEN` is automatically added by Axios.

Default response structure:
```
{
    "success": Boolean,
    "message": String,
    "data": Object,
    "errors": Array
}
```

How to use the API in the NextJS client:
```
// 1. Import the api class
import api from "@clientAPI/api.js";

// 2. Call the API method you need. Optionally you can also add parameters in the method call.
const res = await api.methodName()
```

#### Routes marked with ! require authenthication/authorization.
#### Routes marked with !! require moderator/admin authenthication/authorization.

### Auth

- POST   /api/auth/register
- POST   /api/auth/login
- POST   /api/auth/logout
- POST   /api/auth/checkAuth
- ! POST /api/auth/changePassword

### Notifications

- ! GET /api/notifications/getNotifications
- ! PUT /api/notifications/readNotification

### Media



## Detailed information

### POST | /api/auth/register

Register a new user.

#### Input

```
{
    "username": "test123",
    "email": "test@test.com",
    "password": "test123"
}
```

#### Output

Success example.
```
{
    "success": true,
    "message": "User test123 registered successfully.",
    "data": {},
    "errors": []
}
```
Error example.
```
{
    "success": false,
    "message": "",
    "data": {},
    "errors": [
        {
            "attr": "username",
            "code": "unique",
            "message": "A user with that username already exists."
        },
        {
            "attr": "email",
            "code": "unique",
            "message": "User with this email address already exists."
        }
    ]
}
```

### POST | /api/auth/login

Login a user.

#### Input

```
{
    "email": "test@test.com",
    "password": "test123"
}
```

#### Output

```
{
    "success": true,
    "message": "User logged in.",
    "data": {
        "user": {
            "id": "124ed254-dde4-461e-aaf5-bf0de681d9b4",
            "username": "test123",
            "email": "test@test.com"
        }
    },
    "errors": []
}
```