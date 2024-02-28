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
| Ubuntu | v20.4  |
| Docker | v3 |
| Docker Compose | v3 |
| NodeJS | v14 |

- Info Server
```
CPU model            : Intel Xeon Processor (Skylake, IBRS)
Number of cores      : 2
CPU frequency        : 2593.904 MHz
Total size of Disk   : 80.0 GB (21.0 GB Used)
Total amount of Mem  : 3925 MB (1797 MB Used)
Total amount of Swap : 7999 MB (4 MB Used)
System uptime        : 0 days, 4 hour 10 min
Load average         : 1.23, 0.83, 0.80
OS                   : Ubuntu 21.10 
Arch                 : x86_64 (64 Bit)
Kernel               : 5.13.0-25-generic
Virt                 : kvm
```



