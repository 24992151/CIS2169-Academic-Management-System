FROM clue/json-server
EXPOSE 80
ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/data.json /data/
ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/routes.json /data/routes/
ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/index.html /data/public/
ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/main.js /data/public/
ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/style.css data/public/
ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes", "/data/routes/routes.json","--port", "80"]
# ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes","--port", "80"] #Use this option if you do not want to use custom routing