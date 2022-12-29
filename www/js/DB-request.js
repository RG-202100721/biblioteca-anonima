//processamento dos pedidos CRUD para a nossa API utilizando a API Fetch

function getDataDB(URL, onSuccess, onError) {
    fetch(URL, { method: "GET" })
    .then(res => {
        if (res.status == 200) 
            res.json().then(result => {
                copyToSessionStorage(URL, result);
                onSuccess(JSON.stringify(result));
            });
        else res.json().then(message => { onError(JSON.stringify(message)) });
    });
}

function createDB(table, data, onSuccess, onError) {
    if (table.checkJSON(table, data)) {
        data["Tabela"] = table.name;
        data = JSON.stringify(data);

        fetch("/create", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: data
        })
        .then(res => {
            if (res.status == 200) res.json().then(message => { onSuccess(JSON.stringify(message)) });
            else res.json().then(message => { onError(JSON.stringify(message)) });
        });
    }
}

function editDB(table, id, data, onSuccess, onError) {
    if (table.checkJSON(table, data)) {
        data["Tabela"] = table.name;
        data["ID"] = id;
        data = JSON.stringify(data);

        fetch("/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: data
        })
        .then(res => {
            if (res.status == 200) res.json().then(message => { onSuccess(JSON.stringify(message)) });
            else res.json().then(message => { onError(JSON.stringify(message)) });
        });
    }
}

function deleteDB(table, id, onSuccess, onError) {
    var data = {};
    data["Tabela"] = table.name;
    data["ID"] = id.toString();
    data = JSON.stringify(data);

    fetch("/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: data
    })
    .then(res => {
        if (res.status == 200) res.json().then(message => { onSuccess(JSON.stringify(message)); });
        else res.json().then(message => { onError(JSON.stringify(message)) });
    });
}