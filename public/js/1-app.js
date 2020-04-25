// console.log('this is client side javascript')

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

let prev=1;
const p=document.getElementById("text");
const img=document.getElementById("img");
const vid=document.getElementById("vid");

function earthView(lat,lng){
fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${lng}&lat=${lat}&api_key=GUr0cBuZkQReQKu3cLg7BxCgtNZH15oeDgnRDjgz`)
.then(data=>{
  return data.json()
}).then(res=>{
    console.log(res.url);

})
}

function astro(){
    today =yyyy+'-'+mm+'-'+(dd-prev);
    console.log(today)
fetch(`https://api.nasa.gov/planetary/apod?hd=True&api_key=GUr0cBuZkQReQKu3cLg7BxCgtNZH15oeDgnRDjgz&date=${today}`)
.then(data=>{
  return data.json()
}).then(res=>{
    // console.log(res);
    const {copyright,date,media_type,explanation,url}=res;
    // console.log(hdurl)
    
    // console.log(img)
    img.setAttribute('src'," ")
    img.setAttribute('alt'," ")

    if(media_type=="image"){
        img.style.display="block";
        vid.style.display="none";
        img.setAttribute('src',url)
        img.setAttribute('alt',copyright)
        
    }
    else
    {
        img.style.display="none";
        vid.style.display="block";
        vid.setAttribute('src',url)
    }
    p.innerText=explanation
})
}
astro();


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    earthView(position.coords.latitude ,position.coords.longitude)
}
getLocation();

const reset=()=>{
    img.setAttribute('src','')
    img.setAttribute('alt','')
    vid.setAttribute('src','')
    vid.style.display="none";
    p.innerHTML='<div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>'
    
}


const next=document.getElementById("next")
next.addEventListener('click',()=>{
    reset();
    // console.log(prev)
    prev-=1;
    if(prev==0)
    next.style.display="none"

    astro();
})
const previous=document.getElementById("previous").addEventListener('click',()=>{
    // console.log("previous")
    reset();
    prev+=1;
    if(prev!=0)
    {
        next.style.display="block"
    }
    astro();
});
