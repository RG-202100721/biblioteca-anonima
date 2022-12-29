//adiciona scripts à página pela ordem do array.

function newScript(file) {
    var script = document.createElement("script");
    script.src = file;
    return script;
}

var scripts = new Array();

scripts.push(newScript("js/DB-tables.js"));
scripts.push(newScript("js/DB-request.js"));
scripts.push(newScript("js/script.js"));

scripts.forEach(script => {
    document.head.append(script);
});