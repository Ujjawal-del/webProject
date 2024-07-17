const API_KEY = "c8861d7efa0d4b66b707362062e631a4";
const url = "https://newsapi.org/v2/everything?q=";
let tareek= "2024-07-11";
window.addEventListener("load",()=> fetchNews("India"));
async function fetchNews(query){
    const res = await fetch(`${url}${query}&from=${tareek}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardcontainer = document.getElementById("card-container");
    const newscardtemplate = document.getElementById("template-news-card");

    cardcontainer.innerHTML = '';

    articles.forEach(article =>{
        if(!article.urlToImage)
            return;
        
            const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardcontainer.appendChild(cardClone);
        
        
    });
}

function fillDataInCard(cardClone,article){
    const newsImage = cardClone.querySelector("#news");
    const newsTitle = cardClone.querySelector("#title");
    const newsrc = cardClone.querySelector("#news-source");
    const newsDes = cardClone.querySelector("#news-des");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDes.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/jakarta"
    });

    newsrc.innerHTML = `${article.source.name}:${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>
    {
        window.open(article.url,"_blank");
    });
}
let curSelectedNav = null;
function onNavitem(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("searchbutton");
const searchText = document.getElementById("search");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
function reload(){
    window.location.reload();
}
