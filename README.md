"# Mercados-Test-Project" 

Old way

"scripts": {
    "build": "cd angular-frontend && npm install && pwd && ./node_modules/.bin/ng build --prod && cd ../ && netlify-lambda build express --config ./webpack.functions.js && ls && pwd && cd ./functions && ls",
    "start": "nodemon server.js",
    "start:lambda": "netlify-lambda serve express --config ./webpack.functions.js"
  },
