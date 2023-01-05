//processamento dos pedidos de autenticação para a nossa API utilizando a API Fetch

class AuthRequest {

    login(data, onSuccess, onError) {
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
                else if (res.status == 401) res.json().then(message => { this.noPermission(message["message"]); });
                else res.json().then(message => { onError(JSON.stringify(message)); });
            });
        }
    }

    logout(onError) {
        fetch("/logout", { method: "GET" })
        .then(res => {
            if (res.status == 200) res.json().then(() => { BS.reset(); });
            else if (res.status == 401) res.json().then(message => { this.noPermission(message["message"]); });
            else res.json().then(message => { onError(JSON.stringify(message)); });
        });
    }

    noPermission(message) {
        alert(message);
        window.history.go(0);
    }
}