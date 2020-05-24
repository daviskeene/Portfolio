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

// Loop through the post titles (need to have titles doc since I can't read file dirs).
let posts = readMDFile("files/titles")[0];
posts.split("\n").forEach(function(item, index) {
    let text = readMDFile("files/"+item+".markdown");
    let headers = text[0].split("\n");
    let [title, author, description, path, date, categories] = headers;

    let categories_html = "";
    const categories_list = categories.split(": ")[1].split(" ");
    categories_list.forEach(function(item, index) {
        categories_html += '<li>'+item+'</li>'
    })

    let html = '<li>\n' +
        '        <a class="post-link" href="posts/?post='+path.split(": ")[1]+'">\n' +
        '          <h2 class="post-title">'+title.split(":")[1]+'</h2>\n' +
        '        </a>\n' +
        '        <p>'+description.split(": ")[1]+'</p>'+
        '        <div class="post-meta">\n' +
        '          <ul class="post-categories">'+categories_html+'</ul>\n' +
        '          <div class="post-date">\n' +
        '            <i class="icon-calendar"></i>\n' +
        '              '+date.split(":")[1]+'\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="post"></div>\n' +
        '      </li>'

    document.getElementById("posts").innerHTML += html;
})