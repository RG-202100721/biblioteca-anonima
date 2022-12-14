//processamento dos dados recebidos da nossa API utilizando o objeto localStorage e sessionStorage

class BrowserStorage {

	getBooks() {
		return JSON.parse(sessionStorage.getItem("Livro"));
	}
	getBook(index) {
		let books = JSON.parse(sessionStorage.getItem("Livro"));
		if (index == 0 || index > books.length) console.error("index is wrong (tip: start from 1)");
		return books[index - 1];
	}

	getAuthors() {
		return JSON.parse(sessionStorage.getItem("Autor"));
	}
	getAuthor(index) {
		let authors = JSON.parse(sessionStorage.getItem("Autor"));
		if (index == 0 || index > authors.length) console.error("index is wrong (tip: start from 1)");
		return authors[index - 1];
	}

	getCategories() {
		return JSON.parse(sessionStorage.getItem("Categoria"));
	}
	getCategory(index) {
		let categories = JSON.parse(sessionStorage.getItem("Categoria"));
		if (index == 0 || index > categories.length) console.error("index is wrong (tip: start from 1)");
		return categories[index - 1];
	}

	getPublishers() {
		return JSON.parse(sessionStorage.getItem("Editora"));
	}
	getPublisher(index) {
		let publishers = JSON.parse(sessionStorage.getItem("Editora"));
		if (index == 0 || index > publishers.length) console.error("index is wrong (tip: start from 1)");
		return publishers[index - 1];
	}

	copyToSessionStorage(result, onSucess) {
		sessionStorage.setItem("Autor", JSON.stringify(result["data"][0]));
		sessionStorage.setItem("Categoria", JSON.stringify(result["data"][1]));
		sessionStorage.setItem("Editora", JSON.stringify(result["data"][2]));
		try {
			for (var i = 0; i < result["data"][3].length; i++) {
				result["data"][3][i]["IDEditora"] = {
					"ID": result["data"][3][i]["IDEditora"], 
					"Nome": result["data"][2][result["data"][2].map(i => i["ID"]).indexOf(result["data"][3][i]["IDEditora"])]["Nome"]
				};

				let authors = new Array();
				result["data"][4].forEach(elmt => {
					if (result["data"][3][i]["ID"] == elmt["IDLivro"])
						authors.push({
							"ID": elmt["IDAutor"],
							"Nome": result["data"][0][result["data"][0].map(i => i["ID"]).indexOf(elmt["IDAutor"])]["Nome"]
						});
				});
				result["data"][3][i]["IDAutores"] = authors;

				let categories = new Array();
				result["data"][5].forEach(elmt => {
					if (result["data"][3][i]["ID"] == elmt["IDLivro"])
						categories.push({
							"ID": elmt["IDCategoria"],
							"Nome": result["data"][1][result["data"][1].map(i => i["ID"]).indexOf(elmt["IDCategoria"])]["Nome"]
						});
				});
				result["data"][3][i]["IDCategorias"] = categories;
			}
			sessionStorage.setItem("Livro", JSON.stringify(result["data"][3]));
			onSucess();
		}
		catch (error) {
			console.error(error + "\nWrong index?");
		}
	}

	addSessionStorage(data, onSucess) {
		let array = new Array();
		let table = data["Tabela"];
		let id = 0;
		try {
			switch (table) {
				case DatabaseTables.CATEGORIA:
					array = this.getCategories();
					for (id = 1; id - 1 < Object.keys(array).length; id++) if (array[id - 1]["ID"] != id) break;
					array.push({
						"ID": id,
						"Nome": data["Nome"]
					});
					array.sort((a, b) => a["ID"] - b["ID"]);
					break;

				case DatabaseTables.AUTOR:
					array = this.getAuthors();
					for (id = 1; id - 1 < Object.keys(array).length; id++) if (array[id - 1]["ID"] != id) break;
					array.push({
						"ID": id,
						"Nome": data["Nome"],
						"Pais": data["Pais"]
					});
					array.sort((a, b) => a["ID"] - b["ID"]);
					break;

				case DatabaseTables.EDITORA:
					array = this.getPublishers();
					for (id = 1; id - 1 < Object.keys(array).length; id++) if (array[id - 1]["ID"] != id) break;
					array.push({
						"ID": id,
						"Nome": data["Nome"],
						"Pais": data["Pais"],
						"Logo": data["Logo"]
					});
					array.sort((a, b) => a["ID"] - b["ID"]);
					break;

				case DatabaseTables.LIVRO:
					let authors = this.getContent(data, this.getAuthors(), "IDAutores");
					let categories = this.getContent(data, this.getCategories(), "IDCategorias");

					array = this.getBooks();
					for (id = 1; id - 1 < Object.keys(array).length; id++) if (array[id - 1]["ID"] != id) break;
					array.push({
						"ID": id,
						"Titulo": data["Titulo"],
						"ISBN": data["ISBN"],
						"Numero_Paginas": data["Numero_Paginas"],
						"IDEditora": {
							"ID": data["IDEditora"], 
							"Nome": this.getPublishers()[this.getPublishers().map(i => i["ID"]).indexOf(data["IDEditora"])]["Nome"]
						},
						"Capa": data["Capa"],
						"IDAutores": authors,
						"IDCategorias": categories
					});
					array.sort((a, b) => a["ID"] - b["ID"]);
					break;
			}
			sessionStorage.setItem(table.name, JSON.stringify(array));
			onSucess();
		}
		catch (error) {
			console.error(error + "\nWrong index?");
		}
	}

	updateSessionStorage(data, onSucess) {
		let array = new Array();
		let table = data["Tabela"];
		let id = data["ID"];
		try {
			switch (table) {
				case DatabaseTables.CATEGORIA:
					array = this.getCategories();
					array[array.map(i => i["ID"]).indexOf(id)] = {
						"ID": id,
						"Nome": data["Nome"]
					};
					break;

				case DatabaseTables.AUTOR:
					array = this.getAuthors();
					array[array.map(i => i["ID"]).indexOf(id)] = {
						"ID": id,
						"Nome": data["Nome"],
						"Pais": data["Pais"]
					};
					break;

				case DatabaseTables.EDITORA:
					array = this.getPublishers();
					array[array.map(i => i["ID"]).indexOf(id)] = {
						"ID": id,
						"Nome": data["Nome"],
						"Pais": data["Pais"],
						"Logo": data["Logo"]
					};
					break;

				case DatabaseTables.LIVRO:
					let authors = this.getContent(data, this.getAuthors(), "IDAutores");
					let categories = this.getContent(data, this.getCategories(), "IDCategorias");

					array = this.getBooks();
					array[array.map(i => i["ID"]).indexOf(id)] = {
						"ID": id,
						"Titulo": data["Titulo"],
						"ISBN": data["ISBN"],
						"Numero_Paginas": data["Numero_Paginas"],
						"IDEditora": {
							"ID": data["IDEditora"], 
							"Nome": this.getPublishers()[this.getPublishers().map(i => i["ID"]).indexOf(data["IDEditora"])]["Nome"]
						},
						"Capa": data["Capa"],
						"IDAutores": authors,
						"IDCategorias": categories
					};
					break;
			}
			sessionStorage.setItem(table.name, JSON.stringify(array));
			onSucess();
		}
		catch (error) {
			console.error(error + "\nItem in DB doesn\'t exist. Wrong index or probably deleted?");
		}
	}

	deleteSessionStorage(data, onSucess) {
		let array = new Array();
		let table = data["Tabela"];
		let id = data["ID"];
		try {
			switch (table) {
				case DatabaseTables.CATEGORIA: array = this.getCategories(); break;
				case DatabaseTables.AUTOR: array = this.getAuthors(); break;
				case DatabaseTables.EDITORA: array = this.getPublishers(); break;
				case DatabaseTables.LIVRO: array = this.getBooks(); break;
			}
			array.splice(array.map(i => i["ID"]).indexOf(id), 1);
			sessionStorage.setItem(table.name, JSON.stringify(array));
			onSucess();
		}
		catch (error) {
			console.error(error + "\nItem in DB is probably already deleted.");
		}
	}

	getContent(data, origin, tag) {
		let array = new Array();
		origin.forEach(item => {
			data[tag].forEach(rowId => {
				if (rowId == item["ID"])
					array.push({
						"ID": rowId,
						"Nome": item["Nome"]
					});
				});
		});
		return array;
	}

	getAdmin() {
		return sessionStorage.getItem("Admin");
	}

	reset() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.href = "/";
	}
}