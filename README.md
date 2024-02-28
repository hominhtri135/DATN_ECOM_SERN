# [DATN] Ecommerce SERN
- Demo website: https://datn.lialili.com/
- Admin account:
```
user: admin@gmail.com
pass: 123456
```
- Payment test:
```
Ngân hàng: NCB
Số thẻ: 9704198526191432198
Tên chủ thẻ: NGUYEN VAN A
Ngày phát hành: 07/15
Mật khẩu OTP: 123456
```

### Features
- Product Management
- Category management
- Brand management
- Manage discount codes
- Manage shipping fees
- Order management
- Message management
- Supplier management
- Manage Import/Export of products
- Blog management
- User management
- Statistical
- Payment system uses VNpay
- Send email (account authentication, forgot password)
- Sign in with account system or google

### Table of contents
  1. [Frontend - ReactJS](#frontend---reactjs)
  2. [Backend - MySQL, ExpressJS, NodeJS](#backend---mysql-expressjs-nodejs)
  3. [Deployment - Docker](#deployment---docker)

------------
# Frontend - ReactJS
- Convert existing HTML template to ReactJs
- Redux - Global state management
- Axios - HTTP requests
- Bootstrap - CSS framework
- Chart.js - Draw statistical graphs
- Firebase: Authentication 
- React Router - Configuring routes
- Socket.io - Connect to the server to send messages
- Markdown Editor, Paginate, Slick, Toastify, ...

### Free template source used: 
- [e-Commerce Website Template](https://themewagon.com/themes/free-html5-bootstrap-4-e-commerce-website-template-eiser)
- [SB Admin](https://startbootstrap.com/template/sb-admin)
------------
# Backend - MySQL, ExpressJS, NodeJS
- Build an e-commerce API system
- Nodemailer - Send mail (authen, forgot password) with domain mail address
- Authentication using JWT
- Firebase - Authentication Social and OTP
- Payment with VnPay
- Sequelize - connect to MySQL DB
- Socket.io - create a connection to the client for messaging
------------
# Deployment - Docker
The server is deployed on VPS
- Info Application

| Name | Version |
| ------------ | ------------ |
| Ubuntu | 20.04 LTS x64  |
| Docker | v25.0.3 |
| Docker Compose | v2.24.6 |
| NodeJS | v14 |

- Info Server
```
CPU model            : Intel Core Processor (Skylake, IBRS)
Number of cores      : 1
CPU frequency        : 3696.000 MHz
Total size of Disk   : 121.1 GB (33.8 GB Used)
Total amount of Mem  : 959 MB (511 MB Used)
Total amount of Swap : 3099 MB (286 MB Used)
System uptime        : 0 days, 0 hour 23 min
Load average         : 0.48, 0.44, 0.26
OS                   : Ubuntu 20.04.6 LTS
Arch                 : x86_64 (64 Bit)
Kernel               : 5.4.0-170-generic
Virt                 : No Virt
```



