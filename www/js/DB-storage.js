//processamento dos dados recebidos da nossa API utilizando o objeto localStorage e sessionStorage

export class BrowserStorage {

	getBook() {
		
	}

	getAuthor() {
		JSON.parse(sessionStorage.getItem("Autores"))
	}

	getCategory() {
		
	}

	getPublisher() {

	}

	copyToSessionStorage(URL, result) {
		switch (URL) {
			case "/getAll":
				sessionStorage.setItem("Autores", JSON.stringify(result["data"][0]));
				sessionStorage.setItem("Categorias", JSON.stringify(result["data"][1]));
				sessionStorage.setItem("Editoras", JSON.stringify(result["data"][2]));
				sessionStorage.setItem("Livros", JSON.stringify(result["data"][3]));
				sessionStorage.setItem("Livro_Autor", JSON.stringify(result["data"][4]));
				sessionStorage.setItem("Livro_Categoria", JSON.stringify(result["data"][5]));
				break;
			default: break;
		}
	}
}
//use localStorage to store admin data (delete when admin logs out)