
# Collective Intelligence shop module




## Correr Localmente



Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
El -d, signidica __detached__

#### Reconstruir los modulos de node 
```
npm install 
npm run dev
```

## Configurar las variables de entorno 
Renombrar el archivo __.env.template__ a __.env__ 



### Ejecutar Migraciones 
```
npm run db:migrate
```
### Ejecutar generacion de prisma 
```
npm run prisma:generate  (solo en desarrollo)
```

### Ejecutar Seeds para llenado de BD 
```
npm run db:seeds
```

## Subscripciones 
```
Para las suscripciones , se tiene que crear los productos en el dashboard de stripe
Seguido de esto al crear los precios se debe agregar un metadata en el precio con el nombre del producto 
Ejemplo : 

Producto Proactive ( paquete )
price=> editar => metadata=> name = Proactive

__IMPORTANTE__ = No cambiar el nombre al paquete personalizado debe ser __SELF DRIVING__
```

## Variables de entorno

Para correr este proyecto, necesitaras agregar las siguientes variables de entorno en tu archivo .env : 


`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=`

`STRIPE_SECRET_KEY=`

`STRIPE_WEBHOOK_SECRET=`

`DATABASE_URL="postgresql://`

`user:`

`NODE_ENV=development`

`NEXTAUTH_SECRET=`

`JWT_SECRET_SEED=`

`SERVICE_EMAIL_ID=`

`NEXT_PUBLIC_APIKEY_EMAIL=`

`GOOGLE_CLIENT_ID=`

`GOOGLE_CLIENT_SECRET=`## Referencia de colores

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primario Light | ![#1EAEA8](https://via.placeholder.com/10/1EAEA8?text=+) #1EAEA8 |
| Secundario Light | ![#1F4452](https://via.placeholder.com/10/1F4452?text=+) #1F4452 |
| Primario Dark | ![#F6F5F6](https://via.placeholder.com/10/F6F5F6?text=+) #F6F5F6 |
| Secundario Dark | ![#1EAEA8](https://via.placeholder.com/10/1EAEA8?text=+) #1EAEA8 |


## Features

- Light/dark mode toggle
- Administration panel
- Responsive Design
- Traduction system
- E-commerce system
- Payment Integration ( stripe )


## Tech Stack

**Client:** Next, Typescript, Context, TailwindCSS, Material ui

**Server:** Next server, Postgresql


## Autor

- [@JJDEV18](https://github.com/JJ-Dev18)

