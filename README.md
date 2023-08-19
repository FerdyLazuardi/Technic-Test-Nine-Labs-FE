# Mock-Tes-FE
This is the Front End Repository for the Mock Test at Binar Academy. Feel free to check the Deployment in the following link.

> [!IMPORTANT]
> You must run the backend locally due to the unavailability of free PostgreSQL hosting for deployment.

[Link Deployment](https://todog-apps.netlify.app/)

Test account, pin : 1234

## Authors
- [Ferdy Fadhil Lazuardi](https://github.com/FerdyLazuardi)

## Tech Stacks
Vite, React, React-redux, axios, framer motion, bootstrap, react-hot-toast

## Run Locally

Clone the project
```
https://github.com/FerdyLazuardi/Mock-Test-FE.git
```
Go to the project directory
```
cd Mock-Test-FE
```
Install dependencies
```
npm i
```
Run The Project
```
npm run dev
```

# Penjelasan Project To Dogs Apps
To Dogs Apps merupakan web aplikasi to do list sederhana. User harus membuat akun terlebih dahulu, lalu login hanya dengan menggunakan pin 4 digit. Di dalam aplikasi, user dapat membuat sebuah task. Task yang dibuat nantinya akan terdiri dari title task, dan deadlinenya. User juga dapat menchecklist tugas mereka jika merasa sudah dikerjakan. Selain itu User pun juga dapat menghapus task mereka, dan mengedit task mereka. Terakhir terdapat filter complete task dan juga incomplete task yang memudahkan user untuk melihat task mana yang belum dan sudah dikerjakan.

### Front end 
dibuat dengan framework react dengan memanfaatkan build tools Vite Js. Selain itu pada project ini memanfaatkan framer motion untuk memberikan motion dan juga memakai react-hot-toast untuk memberikan notifikasi agar bisa meningkatkan user experience. Untuk deployment dilakukan menggunakan netlify

### Back end
dibuat dengan framework express js untuk membuat servernya, dan menggunakan postgreSQL untuk membuat databasenya. Server dibuat dengan menggunkan metode MVC (model-view-controller). Terakhir untuk api docsnya dibuat dengan postman

## Kegunaan JSON pada REST API
JSON mempermudah pertukaran data dalam REST API dengan ukuran ringkas, kemudahan proses, dan kompatibilitas yang luas, selain itu JSON digunakan dalam REST API sebagai format pertukaran data antara client dan server. 

## REST API bekerja
REST API adalah cara perangkat lunak berkomunikasi melalui URL dan metode HTTP (GET, POST, PUT, DELETE) untuk mengambil, tambah, ubah, atau hapus data. Data biasanya dalam format JSON atau XML. Server merespons permintaan dengan data dan kode status HTTP, tanpa menyimpan informasi klien antara permintaan.

