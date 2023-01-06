//processamento dos pedidos de autenticação para a nossa API utilizando a API Fetch

class AuthRequest {

    login(data, onSuccess, onError) {
        if (new DatabaseTables().checkJSON(DatabaseTables.ADMIN, data)) {
            data = JSON.stringify(data);
    
            fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: data
            })
            .then(res => {
                if (res.status == 200) res.json().then(data => { 
                    sessionStorage.setItem("Admin", data["name"]);
                    onSuccess(JSON.stringify(data["message"])); 
                });
                else if (res.status == 400 || res.status == 401) res.json().then(message => { this.noPermission(message["message"]); });
                else res.json().then(message => { onError(JSON.stringify(message)); });
            });
        }
    }

    logout(onError) {
        fetch("/logout", { method: "GET" })
        .then(res => {
            if (res.status == 200) res.json().then(() => { new BrowserStorage().reset(); });
            else if (res.status == 401) res.json().then(message => { this.noPermission(message["message"]); });
            else res.json().then(message => { onError(JSON.stringify(message)); });
        });
    }

    noPermission(message) {
        alert(message);
        new BrowserStorage().reset();
    }
}