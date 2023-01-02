//processamento dos dados recebidos da nossa API utilizando o objeto localStorage e sessionStorage

export class BrowserStorage {



	copyToSessionStorage(URL, result) {
		switch (URL) {
			case "/getAll":
				
				break;
			default: break;
		}
	}
}

window.onload = function() {
	if (localStorage.getItem("admin") !== null && sessionStorage.getItem("admin") != true) {
		getAll("Aluno", () => {
			getAll("Disciplina", () => {
				getAll("Inscricao", () => {
					getAll("Turma", () => {
						buildTable(turma);				
						buildTable(aluno);						
					});
				});
			});
		});
	}
	else window.location.href = "/";
};
