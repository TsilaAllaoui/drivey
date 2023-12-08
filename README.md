<div style="display: flex; align-items: center; gap: 1rem">
  <img width="48" height="48" src="https://img.icons8.com/color/48/google-drive--v1.png" alt="google-drive--v1"/>
  <h1 style="border-bottom: none; margin-top: 1.5rem;">Drivey</h1>
</div>

A minimalistic remote file uploader to GoogleDrive

### Live Demo (http://ec2-3-144-234-235.us-east-2.compute.amazonaws.com:3000/)

# 🔥 Features

- Upload url remote file directly to Google drive

# ✔️ Todo

- Upload multiple url at once
- Support Torrent upload

# How to build (Must be on linux OS)

- Install gcsf <a>(https://github.com/harababurel/gcsf)</a>
- Edit .env file in backend like this: SERVER_USERNAME="you_linux_server_user_name_here"
- Edit .env file in frontend accordingly to your nestjs server
- Change directory to project root folder
- Run "yarn"
- Run "yarn dev" for dev or "yarn build && yarn start" to build and deploy

# 💻 Tech used

<div style="display: flex; flex-direction: column; gap: 1rem; width: 25vw">
    <div style="display: flex; gap: 1rem; font-weight: bold">
      <span>GCSF</span>
      <a>(https://github.com/harababurel/gcsf)</a>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
        <span style="font-weight: bold">NestJS</span>
        <img src="https://github.com/devicons/devicon/raw/master/icons/nestjs/nestjs-plain.svg" alt="NestJS" width="40" height="40" />
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
        <span style="font-weight: bold">ReactJS</span>
        <img src="https://github.com/devicons/devicon/raw/master/icons/react/react-original.svg" alt="ReactJS" width="40" height="40" />
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
        <span style="font-weight: bold">Socket.io</span>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/900px-Socket-io.svg.png" alt="Socket.io" width="40" height="40" style="filter: grayscale(100%);" />
    </div>
     <div style="display: flex; gap: 1rem; align-items: center">
        <span style="font-weight: bold">Linux/Bash</span>
      <img src="https://github.com/devicons/devicon/raw/master/icons/linux/linux-original.svg" alt="Linux" width="40" height="40" />
    </div>
</div>
