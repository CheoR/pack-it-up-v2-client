# PackItUpV2

**Track what you pack, app.**

Users can track what they pack.
This is V2 version of [PackItUp](https://cr-demo--packitup.netlify.app/), my NSS frontend capstone project.

[Backend](https://github.com/CheoR/pack-it-up-v2-server)

[![Build Status](https://app.travis-ci.com/CheoR/pack-it-up-v2-server.svg?branch=main)](https://app.travis-ci.com/CheoR/pack-it-up-v2-server)

## Purpose

**I like to keep things simple and organized.**

<p align="center">
<img src="https://user-images.githubusercontent.com/5026476/230626491-fe1490d2-7368-4bdc-b845-ccffcafd27f2.jpg" alt="Storage Unit" title="Storage Unit" height="500">
</p>

I also tend to forget where I put things, especially things I don't use often.

I created this app mostly to get familar with Apollo-Client/Server, React-Native, TypeScript, Tailwind, and testing.

Users can use app to pack personal possessions.

## Features

- Intuitive and user-friendly mobile design, users can easily create, delete, edit items into collections
- Catalog assets and details into collections, backend automatically aggregates and updates collection data
- User can upload images, filter inventory by description, image, name, tags

## Run Locally

### Prerequisite

Before you being you will need accounts with and api keys from

- [Cloudinary](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/)

### Setup

Clone the projects

```bash
  git clone https://github.com/CheoR/pack-it-up-v2-client
  git clone https://github.com/CheoR/pack-it-up-v2-server
```

Make sure to have your enviroment variables set up.

#### Client

```bash
GRAPHQL_HOST=http://192.168.1.65:4000/
```

Go to the project directory and install dependencies.

```bash
  cd pack-it-up-v2-client
  yarn install
```

#### Server

```bash
ACCESS_TOKEN_DURATION=STRING
ACCESS_TOKEN_SECRET=STRING
API=STRING
CLOUDINARY_API_KEY=STRING
CLOUDINARY_API_SECRET=STRING
CLOUDINARY_CLOUD_NAME=STRING
CLOUDINARY_URL=STRING
DB_USER=STRING
DB_PASSWORD=STRING
DB_NAME=STRING
DB_CLUSTER=STRING
DOMAIN=STRING
JWT_SECRET=STRING
MONGODB_URI=STRING
REFRESH_TOKEN_DURATION=STRING
REFRESH_TOKEN_SECRET=STRING
SALT=NUMBER
TEST=STRING
```

Go to the project directory and install dependencies.

```bash
  cd pack-it-up-v2-server
  yarn install
```

### Start

Start the client

```bash
  npx expo start
```

Start the server

```bash
  yarn dev
```

## Running Tests

### Client

```bash
  yarn testDebug
```

### Server

```bash
    yarn test
```

## Layout

![PackItUp-Wireframe-MidFidelity-V2](https://user-images.githubusercontent.com/5026476/205509401-57b260cd-9e75-48dd-82c8-cd543bfa5614.png)

## Stack

### Frontend

- apollo-client
- Jest
- react-native
- react-native-testing-library
- TypeScript
- Tailwind | React-Native-Material (different branches)

### Backend

- appollo-server-express
- bcryptjs
- MongoDB
- Mongoose
- Jest
- jsonwebtoken
- TypeScript

## 🚀 About Me

- 🔭 I’m currently working on [PackItUpV2](https://github.com/CheoR/pack-it-up-v2-client)

- 🌱 I’m currently learning **TypeScirpt, Testing, React Native**

- 👯 I’m looking to collaborate on **Mobile projects**

- 🤝 I’m looking for help with **Testing my mobile project**

- 💬 Ask me about **Tacos and code**

- 📫 How to reach me **https://www.linkedin.com/in/cheo-roman/**

- ⚡ Fun fact **Ask how I got started coding**

<div align="left">
    <a href="https://cheor.github.io/" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/badge/portfolio-%233B4D98.svg?style=for-the-badge&logo=Jasmine&logoColor=white">
    </a>
    <a href="https://www.linkedin.com/in/cheo-roman/" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white">
    </a>
        
   <a href="https://github.com/CheoR/CheoR/files/11141070/Cheo_Roman_Resume_.pdf" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Resume-005AF0.svg?style=for-the-badge&logo=adobe&logoColor=white">
   </a>
 </div>
