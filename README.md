# Fleet Shop 

Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

*El -d, signidica __detached__
```
*Reconstruir los modulos de node 
```
npm install 
npm run dev
```

## Configurar las variables de entorno 
Renombrar el archivo __.env.template__ a __.env__ 



##Ejecutar Migraciones 
```
npm run db:migrate
```

##Ejecutar Seeds para llenado de BD 
```
npm run db:seeds
```
