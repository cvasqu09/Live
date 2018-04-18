ng serve --environment=local --port 4200 --proxy-config proxy.config.json --open

wait(1000)
start
ng build -env=local && nodemon server.js
