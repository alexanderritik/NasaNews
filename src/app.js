const express=require('express')
const path = require('path');
const hbs=require('hbs');


const news=require('./utils/astronmy.js')

// path module helps us to change directory
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const publicDirectory=path.join(__dirname,'../public');
// console.log(__filename)


const viewpath=path.join(__dirname,'../Template/views');
const partialpath=path.join(__dirname,'../Template/partials');

// thsi is how we setup the app route and render
const app=express();

const port=process.env.PORT || 3000;

// in this we directly accse sto index.html which
// is a default path 
app.use(express.static(publicDirectory))

// include template engine design "view engine must be same but can change hbs accoding to the module used"
app.set('view engine','hbs')

// teh use of the partial is write the code which is used every where
// here we use to register the partial path 
hbs.registerPartials(partialpath)
// since the express use the view folder as the deafult name as views  so we can change to something as else
// by changing its default vlaue to something else

app.set('views' ,viewpath)


// res means for response 
// req means for request
app.get('',(req,res)=>{
	res.render('index',{
		heading:"NASA World",
		title:"Nasa",
		name:"Ritik",
		title:"ABout the nasa astronmy  page"
	})
})


app.get('/help',(req,res)=>{
	res.render('help',{
		heading:"NASA World",
		title:"HELP",
		name:"Ritik",
		helptext:"did you help need any text"
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{
		heading:"NASA World",
		title:"Ritk srivastava (alexander)",
		name:"Nasa Astronmy News and Api",
		about:"I am an web developer . I am intrsested in building new project if any one have great idea plaese conatact me"
	})
})

// here we learn the api call parameter
// req.query conatines the parameter passed from the url like = app/nasa?search="astronmy"
// here req.query is keyword and search can be name ofthe parameneter
app.get('/nasa',(req,res)=>{

	// if theer is no query then  req.query.search is true 
	let date=req.query.date;
	if(!req.query.date){

		// this will run if not parameter is passed from date
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today =yyyy+'-'+mm+'-'+dd;
		// console.log(today);
		date=today;

		// the below can also be used if no parameter passed can show this json
		// return res.send({
		// 	title:"error",
		// 	body:"an date parameter is need to be passed"
		// })
	}
	// console.log(date)
	// here we include the utils folder astronmy.js in heading
	news.astronmy(date,(error,body)=>{
		if(error)
		{
			return res.send({
				title:"eroor",
				body:"an seacrh parameter is need to be passed"
			})
		}
		res.send({
			title:"Astronmy Today news",
			body
		})
		})
})



app.get('/help/*',(req,res)=>{
	res.render('error',{
		title:"Error",
		name:"ritik",
		text:"The page is not found"
	})
	// res.send('This help page is not found')
})


// the order is not matched then it goes to * but be careful since the order of the
// app.get route called is important
// the last app.get is to called
app.get('*',(req,res)=>{
	// res.send('This page is not found 404 page')
	res.render('error',{
		title:"Error",
		name:"ritik",
		text:"The page is not found"
	})
})


// this is the command we use to start the server
app.listen(port,()=>{
	console.log('We start the post a port')
})




// app.get('/help',(req,res)=>{
// 	res.send('')
// })

// res.send() is used to set static page aur value but
// we can send design template in as such its value can get changed
// by res.render means render templating 

// there are many module like jade,handlebar,vash,EJS
// and many more here we use handlebar.js which is hbs


// mistake
// if in views folder xyz.hbs and public folder xyz.html it will load public folder so give differnt name 
// in vew folder to avoid confusion



// this isthe way which is used the rto send the daat on the above given url
// app.get('/music',(req,res)=>{
// 	res.send({
// 		music:"tracks"
// 	})
// })
