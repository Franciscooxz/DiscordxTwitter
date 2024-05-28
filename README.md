# Discord Twitter Bot

Un bot de Discord que envía mensajes a un canal cada vez que un usuario específico de Twitter publica un nuevo tweet, utilizando la API de Streaming de Twitter.

Este bot utiliza las bibliotecas `twitter-api-v2` para interactuar con la API de Twitter y `discord.js` para interactuar con la API de Discord.


## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/Franciscooxz/DiscordxTwitter.git

cd discord-twitter-bot
npm install

*CONFIGURACION*

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

Copy codeTWITTER_USER_NAME=
DISCORD_TOKEN=
DISCORD_CHANNEL_ID=
BEARER_TOKEN=
CHANNEL_MESSAGE=
TWITTER_USER_NAME: El nombre de usuario de Twitter del cual deseas recibir los tweets.
DISCORD_TOKEN: El token de autenticación de tu bot de Discord.
DISCORD_CHANNEL_ID: El ID del canal de Discord al cual deseas enviar los mensajes con los tweets.
BEARER_TOKEN: El token de portador (bearer token) que se utiliza para autenticarse con la API de Twitter v2.
CHANNEL_MESSAGE: Un mensaje adicional que se enviará junto con la URL del tweet en el canal de Discord.
Reemplaza los valores vacíos (=) con tus propias credenciales y tokens.

*Uso*:
npm start
Este comando iniciará el bot y comenzará a escuchar los tweets del usuario especificado en TWITTER_USER_NAME. Cada vez que se publique un nuevo tweet, el bot enviará un mensaje al canal de Discord especificado en DISCORD_CHANNEL_ID con la URL del tweet y el mensaje adicional definido en CHANNEL_MESSAGE.

*Docker*: 
También puedes ejecutar el bot utilizando Docker. Primero, construye la imagen:
docker build -t discord-twitter-bot .

Luego, ejecuta el contenedor:

docker run --env-file=<RUTA_AL_ARCHIVO_ENV> -d --name=discord-twitter-bot discord-twitter-bot

Asegúrate de reemplazar <RUTA_AL_ARCHIVO_ENV> con la ruta absoluta al archivo .env que contiene las variables de entorno necesarias.
