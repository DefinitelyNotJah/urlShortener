// Loading up dependancies
const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const { connect } = require('mongoose');

// Starting our app
const app = express()

// Port
const port = process.env.PORT || 5000

// Middlewares
app.use(helmet())
app.use(cors)

// Bodyparser equivilant 
app.use(express.json())

// Loading our routes
require('./routes')(app);

// Error Handing for next()
app.use((error, req, res, next) => {
	res.send({
		success: false,
		message: error.message
	});
});

// Initializing the App
( async () => {
	await connect('YOUR_MONGODB_URL', {
		useFindAndModify : false,
		useUnifiedTopology : true,
		useNewUrlParser : true
	})
	app.listen(port, (err) => {
		if(err)
			return console.log(`[ERROR] An error has occurred : ${err}`)
		console.log(`[INFO] Listening on port ${port}`)
	})
} ) () ;

