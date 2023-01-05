//adiciona o JavaScript à página pela ordem do array.

function newScript(file) {
    let script = document.createElement("script");
    script.src = file;
    return script;
}

let scripts = new Array();

scripts.push(newScript("js/DB/tables.js"));
scripts.push(newScript("js/DB/storage.js"));
scripts.push(newScript("js/DB/authentication.js"));
scripts.push(newScript("js/DB/request.js"));
scripts.push(newScript("js/script.js"));

scripts.forEach(script => {
    document.head.append(script);
});