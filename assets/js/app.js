//Variables
const listaTweets = document.getElementById("lista-tweets");

//Event Listeners
eventListener();

function eventListener(){
    //cuando se envia el formulario
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);


    //borrar tweets
    listaTweets.addEventListener("click", borrarTweet);


    // Contenido cargado
    document.addEventListener("DOMContentLoaded", localStorageListo);
}





//Funciones

//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    console.log("Formulario enviado");
    //leer el valor del textarea
    const tweet = document.getElementById("tweet").value;
    //Crear boton eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";
    


    //crear elemento y añadir contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista 
    listaTweets.appendChild(li);

    // Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
}

//Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    } 
}
// Mostrar datos del LocalStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
         // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

         // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
         // añade el botón de borrar al tweet
        li.appendChild(botonBorrar);
         // añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// Agrega Tweet a Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo para local Storage
    localStorage.setItem('tweets', JSON.stringify(tweets) );

}

// Comprobar que haya elementos en local Storages, retorna una array
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valoes de local storage
    if(localStorage.getItem('tweets') === null) {
    tweets = []; 
    } else {
    tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// eliminar tweet del local storage
function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
    if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    }) ;

    localStorage.setItem('tweets', JSON.stringify(tweets) );
}
