const express  = require('express');
const { PORT, JWT_KEY } = require('./env/env');
const mongo = require('./database/mongo');
const cookieParser = require('cookie-parser')
const app = express();
const router = require('./routes/router');
const errorHandler = require('./middleware/errorHandler');
const apiLimiter = require('./enums/rateLimiter');
const { swaggerUi, swaggerDocs } = require('./swagger');
const cors = require('cors')
mongo.connect()  

app.use(cors())
app.use(cookieParser());
app.use(express.json())


app.get("/",(req,res)=>{
res.send("Hello Restarunat");
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// butun routerler router modulundan yonlendirilecek
app.use('/api',apiLimiter,router);

 app.use(errorHandler);

 




app.listen(PORT,()=>{
    console.log(`Server listening Port on ${PORT}`);
})