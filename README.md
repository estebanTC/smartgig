Prueba Tecnica SmartGiG 

Para probar en localhost: 

  1.- descargue las dos carpetas que => SmartGiG_api y Mensaje, 
  
  2.- inicie el comando npm install para descargar los archivos necesarios en los dos proyectos
  
  3.- ejecute el comando "npm run start:dev" en el proyecto "SmartGiG_api"  y espere los mensajes con la url para probar 
  
  4.- ejecute el comando "npm run dev" en el proyecto "Mensaje" para iniciar la app web 
  
  
  
 
```bash

  Contraseñas y usuarios:

  MongoDB:
  Email: esteban.tinoco.g@gmial.com
  pass: ContraseñaPrueb4s



  MongoDB Cluster User:
  User: smartgig
  pass: contraseñamongodb


  Conexión MongoAtlas:

  mongodb+srv://smartgig:contraseñamongodb@cluster0.rpsmj.mongodb.net/test

  Login App mensajes:
  
  user: SmartGiG
  pass: 1234
  
  user: Teban
  pass: 1234
  
  user: El Panadero
  pass: 1234

```

contratiempo, decisión programación y decisión de diseño:

  Inicie investigando las tecnologias que no uso como lo son prisma, aws y docker (en este ultimo tenia bagos recuerdos).
  lo que me tomo tiempo entre pruebas y pruebas que por cuestiones del tiempo de entrega no pude concretar.
  por lo que opte a realizar la prueba sustituyendo prisma por moongoose con el cual realize las clases para los registros de la DB
  
  el diseño de la base de datos consta de solo dos tablas o colecciones las cuales son usuarios y mensajes, donde en mensajes 
  tengo un id, texto, userid (para vincular el mensaje con su "dueño") y un numero este ultimo lo utilizo para mostrar un mensaje al azar 
  en el front.
  
  para el front utilice la libreria de tailwindcss para el diseño pero por el tiempo me tuve que adapatar a un diseño super minimalista estilo web de los 80's XD 
  para ponerle algo dinamico utilice sweetalert para mostrar alertas y para editar los mensajes de los usuarios 
  
  actualmente hay 11 mensajes en la base de datos esto para las pruebas de que funcionara el mensaje random 
  
  bugs: 
  
  - al momento de registrar un nuevo mensaje no aparece en la pagina 
  
  - si se refresca la pagina se pierde el usuario (esto debido a que utilice context en lugar de guardarlo en una variable local)
  - cuando se edita un mensaje no se refresca hasta que el usuario vuelva a iniciar sesion (esto debido al punto numero 2)
  - por alguna razon XD (y luche con eso 1 hora jaja ) el componente de "NuevoMensaje" no respetaba la etiqueta <br> de salto de linea por lo que el boton "escribir" se  queda pegado al textarea.
  
  
  Querys generados pero no implementados:
  
  Cambiar Contraseña 
  
  Registrar usuario
  


Documentacion utilizada y referencias:


https://docs.docker.com/

https://aws.amazon.com/es/getting-started/hands-on/launch-an-app/

https://tailwindcss.com/

https://sweetalert.js.org/guides/

https://www.youtube.com/watch?v=pmz6aWVIlOE&t=302s&ab_channel=CodingAndCaffeine

https://www.prisma.io/docs/concepts/database-connectors/mongodb

https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/querying-the-database-typescript-mongodb




