<h1 align="center">
  🚀 Mons Institute of technology - API 🖥️
</h1>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/github/license/GitWatin/MIT_API" alt="Licence">
  </a>

  <a href="#">
    <img src="https://img.shields.io/github/v/release/GitWatin/MIT_API" alt="Version">
  </a>

  <a href="https://www.paypal.me/valentindenis">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="Donate">
  </a>


<p align="center">
  Academic project to provide C/C++/ASM Compiler in NodeJS
</p>
</p>

---

# BackEnd
## Requirements

✔ NodeJS >= 12.20.0

## Dependencies

```bash
npm install body-parser cookier-parser dotenv errorhandler express express-handlebars helmet jsonwebtoken methode-override mysql pino pino-http eslint nodemon pino-pretty prettier eslint-config-prettier --save
```

## Database credentials

Make sure you change the variables needed for the PLC to work properly in the .env file.

## Start Server

  - Development mode 

```bash
npm run dev
```
  - Production mode 

```bash
npm run start
```

# FrontEnd

## Start Client

```bash
dart main.dart
```

## Credentials

Make sure you change the variables needed for the client to work properly in src/config/credentials.yml.

```yaml
credentials:
 nom: 'LastName'
 prenom: 'FirstName'
 email: "Email"

```

## How to compile

To compile the file, place it in the compilation folder and add it to the credentials.yml file.

```yaml

PathToCompile:
  path: 'Path_To_File_'
  #D:\compiler\main.asm
```










