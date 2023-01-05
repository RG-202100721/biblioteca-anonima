//processamento dos pedidos de autenticação para a nossa API utilizando a API Fetch

var BS = new BrowserStorage();
var DT = new DatabaseTables();

class AuthRequest {

    login(data, onSuccess, onError) {
        if (DT.checkJSON(DatabaseTables.ADMIN, data)) {
            data = JSON.stringify(data);
    
            fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: data
            })
            .then(res => {
                if (res.status == 200) res.json().then(message => { onSuccess(JSON.stringify(message)); });
                else if (res.status == 400 || res.status == 401) res.json().then(message => { this.noPermission(message["message"]); });
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