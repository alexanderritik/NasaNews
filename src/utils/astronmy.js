const request=require('request');


const astronmy=function(date,callback){
  
	request({ 
  	method: 'GET',
  	json:true,
  	url: `https://api.nasa.gov/planetary/apod?hd=True&api_key=GUr0cBuZkQReQKu3cLg7BxCgtNZH15oeDgnRDjgz&date=${date}`,
	},(error,{body}={})=>{
        // here we use {body}={} means destructiing value  is undefined when no body is prsent   
	if(error){
		callback('unable to connect to services',undefined);	
	}else if(body.error){
		callback('some input is wrong',undefined);
	}
	else{
	// console.log(body)
		callback(error,body)
	}
	})
}

// astronmy("2020-01-02",(error,body)=>{
//     console.log(body)
// })

module.exports=({
	astronmy:astronmy
})
