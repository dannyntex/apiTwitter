# Api Twitter

He creado la api solicitada. He utilizado expressjs para los parametros y fs para almacenar los datos en json.


Para probar la api he creado un template en postman con la siguiente Url.
https://www.getpostman.com/collections/c15fc80285ed91d5d391

### Rutas

**/api/tweets** Muestra todos los tweets

**/api/tweets/:id** Muestra los tweets según su id

**/api/eliminartweets/:id** Elimina un tweet según su id

**/api/marcarfavorito/:id** Marca un tweet como favorito

**/api/verfavorito** Muestra los favoritos

**/api/newtweet** Añade un nuevo tweet


## Test de prueba

Test unitarios con jasmine y supertest
