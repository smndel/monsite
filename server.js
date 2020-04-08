let express = require('express')
    app = express()
	bodyParser = require('body-parser')
 	session = require('express-session')
	sassMiddleware = require('node-sass-middleware')
	path = require('path');

//Moteur de template
app.set('view engine', 'twig')

//Middleware
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname),
    dest: path.join(__dirname, 'public/'),
    debug: true,
    outputStyle: 'compressed',
}));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'zazaza',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'))
app.use(require('./middlewares/mail'))

//Routes 
app.get('/', (request, response) => {
	response.render('pages/index', { 'flash' : response.locals.flash});
});

app.post('/ajax', (request, response) => {

	let retour  = {
		status : "",
		message : []
	}

	let errors = [];

	if(request.body.message === undefined || request.body.message === '') {
		
		errors.push("Vous n'avez pas posté de message")	
	}

	if(request.body.email === undefined || request.body.email === '') {
		
		errors.push("Vous n'avez pas indiqué d'email")	
	}

	if(request.body.name === undefined || request.body.name === '') {
		
		errors.push("Vous n'avez pas indiqué votre nom")	
	}

	if(errors.length > 0) {

		// request.flash('errors', errors)
		// response.redirect('/')
		
	}
	else
	{

		request.sendMail(request.body.name, request.body.email, request.body.message)
		// response.render('pages/index', { 'success' : "Merci"});
		response.send('Merci pour votre message')

	}
})

app.listen(8080);