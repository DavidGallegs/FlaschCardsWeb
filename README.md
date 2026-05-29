# COMO HACER UPDATES

Paso 1: Entrar y descargar los cambios
Entras a la terminal negra de AWS *(botón Conectar)* y ejecutas:

~~~Bash

cd FlaschCardsWeb

git pull

docker stop contenedor-quiz

docker build -t quiz-app .

docker run -d --name contenedor-quiz -p 80:80 quiz-app

~~~

IP WEB: <http://13.38.12.158>
