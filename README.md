para ejecutar el proyecto:

1.- Clonar el repositorio master en tu directorio local.

2.- Ejecutar:  

    - npm init -y
    - npm install 
    - modificar el archivo example.env por .env que será un archivo con una variable de entorno,
        dentro de este archivo debes ir a mongodb atlas y obtener una url string y cambiarla por el
        escrito que está en comillas dentro de .env .

        // correr el server sin nodemon
    - npm start
        // ejecutar el server con nodemon          
    - npm run dev

3.- Si todo esta correcto debes por la consola de nodejs:

    - Server on port 5000
    - MongoDB database connection established succesfully
    nota: puedes modificar el número de puerto y se actualizará automáticamente el mensaje por consola en nodejs.

4.- En el navegador ir a la dirección:

    - http://localhost:5000
    si modificas el puerto debes modificar también la dirección url del navegador
    
5.- Las principales tecnologías usadas fueron:

    - Bootstrap
    - Handlebars
    - Express
    - Nodejs
    - MongoDB

6.- Si encuentras algún detalle en que se pueda mejorar favor dejar alguna sugerencia con github. 

7.- Puede visitar el proyecto puesto en producción haciendo click en la dirección: https://notes-mongo-crud.herokuapp.com/
