function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function readMDFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    let returnText = "";
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                returnText += allText;
            }
        }
    }
    rawFile.send(null);
    // Break up text into descriptors and body
    return returnText.split("---");
}

let post_name = getUrlVars()['post'];

let converter = new showdown.Converter();
let post_text = readMDFile("../files/"+post_name+".markdown");
let headers = post_text[0].split("\n").map(x => x.split(": ")[1]);

let [title, author, description, path, date, categories] = headers;

let categories_html = "";
const categories_list = categories.split(" ");
categories_list.forEach(function(item, index) {
    categories_html += '<li>'+item+'</li>'
})

let content = converter.makeHtml(post_text[1]);

// Set page elements
document.getElementById("post-title").innerText = title;
document.getElementById("post-date").innerText += date;
document.getElementById("post-categories").innerHTML += categories_html;

document.getElementById("content").innerHTML += content;