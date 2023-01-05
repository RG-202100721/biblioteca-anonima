//processamento dos pedidos CRUD para a nossa API utilizando a API Fetch

class DatabaseRequest {

    getAllDB(onSuccess, onError) {
        fetch("/getAll", { method: "GET" })
        .then(res => {
            if (res.status == 200) 
                res.json().then(result => {
                    BS.copyToSessionStorage(result, () => onSuccess());
                });
            else res.json().then(message => { onError(JSON.stringify(message)) });
        });
    }
    
    createDB(table, data, onSuccess, onError) {
        if (table.checkJSON(table, data)) {
            data["Tabela"] = table.name;
            data = JSON.stringify(data);
    
            fetch("/create", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: data
            })
            .then(res => {
                if (res.status == 200) 
                    res.json().then(message => {
                        BS.addSessionStorage(JSON.parse(data));
                        onSuccess(JSON.stringify(message));
                    });
                else if (res.status == 401) res.json().then(message => { AR.noPermission(message["message"]); });
                else res.json().then(message => { onError(JSON.stringify(message)); });
            });
        }
    }
    
    editDB(table, id, data, onSuccess, onError) {
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
                if (res.status == 200) 
                    res.json().then(message => {
                        BS.updateSessionStorage(JSON.parse(data));
                        onSuccess(JSON.stringify(message));
                    });
                else if (res.status == 401) res.json().then(message => { AR.noPermission(message["message"]); });
                else res.json().then(message => { onError(JSON.stringify(message)); });
            });
        }
    }
    
    deleteDB(table, id, onSuccess, onError) {
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
            if (res.status == 200) 
                res.json().then(message => {
                    BS.deleteSessionStorage(JSON.parse(data));
                    onSuccess(JSON.stringify(message));
                });
            else if (res.status == 401) res.json().then(message => { AR.noPermission(message["message"]); });
            else res.json().then(message => { onError(JSON.stringify(message)); });
        });
    }

    checkStorage() {
		if (sessionStorage.getItem("Livro") == undefined) {
			this.getAllDB(() => { location.reload(); }, (message) => { console.error(message); });
		}
	}
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') new DatabaseRequest().checkStorage();
};