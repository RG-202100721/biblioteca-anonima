//processamento dos dados recebidos da nossa API utilizando o objeto localStorage e sessionStorage

import { DatabaseRequest } from "./DB-request.js";
import { DatabaseTables } from "./DB-tables.js";

export class BrowserStorage {

	checkStorage() {
		if (sessionStorage.getItem("Livro") == undefined) {
			new DatabaseRequest().getAllDB(() => { location.reload(); }, (message) => { console.log(message); });
		}
	}

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

	copyToSessionStorage(result) {
		sessionStorage.setItem("Autor", JSON.stringify(result["data"][0]));
		sessionStorage.setItem("Categoria", JSON.stringify(result["data"][1]));
		sessionStorage.setItem("Editora", JSON.stringify(result["data"][2]));

		for (var i = 0; i < result["data"][3].length; i++) {
			result["data"][3][i]["IDEditora"] = {
				"ID": result["data"][3][i]["IDEditora"], 
				"Nome": result["data"][2][result["data"][3][i]["IDEditora"] - 1]["Nome"]
			};

			let authors = new Array();
			result["data"][4].forEach(elmt => {
				if (result["data"][3][i]["ID"] == elmt["IDLivro"])
					authors.push({
						"ID": elmt["IDAutor"],
						"Nome": result["data"][0][elmt["IDAutor"] - 1]["Nome"]
					});
			});
			result["data"][3][i]["IDAutores"] = authors;

			let categories = new Array();
			result["data"][5].forEach(elmt => {
				if (result["data"][3][i]["ID"] == elmt["IDLivro"])
					categories.push({
						"ID": elmt["IDCategoria"],
						"Nome": result["data"][1][elmt["IDCategoria"] - 1]["Nome"]
					});
			});
			result["data"][3][i]["IDCategorias"] = categories;
		}
		sessionStorage.setItem("Livro", JSON.stringify(result["data"][3]));
	}

	addSessionStorage(data) {
		let array = new Array();
		let table = data["Tabela"];
		let id = 0;
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
			case DatabaseTables.EDITORA:
				if (table == DatabaseTables.AUTOR) array = this.getAuthors();
				else array = this.getPublishers();
				for (id = 1; id - 1 < Object.keys(array).length; id++) if (array[id - 1]["ID"] != id) break;
				array.push({
					"ID": id,
					"Nome": data["Nome"],
					"Pais": data["Pais"]
				});
				array.sort((a, b) => a["ID"] - b["ID"]);
				break;

			case DatabaseTables.LIVRO:
				let authors = new Array();
				this.getAuthors().forEach(author => {
					data["IDAutores"].forEach(rowId => {
						if (rowId == author["ID"])
							authors.push({
								"ID": rowId,
								"Nome": author["Nome"]
							});
					});
				});

				let categories = new Array();
				this.getCategories().forEach(category => {
					data["IDCategorias"].forEach(rowId => {
						if (rowId == category["ID"])
							categories.push({
								"ID": rowId,
								"Nome": category["Nome"]
							});
					});
				});

				array = this.getBooks();
				for (id = 1; id - 1 < Object.keys(array).length; id++) if (array[id - 1]["ID"] != id) break;
				array.push({
					"ID": id,
					"Titulo": data["Titulo"],
					"ISBN": data["ISBN"],
					"Numero_Paginas": data["Numero_Paginas"],
					"IDEditora": {
						"ID": data["IDEditora"], 
						"Nome": this.getPublishers()[data["IDEditora"] - 1]["Nome"]
					},
					"Capa": data["Capa"],
					"IDAutores": authors,
					"IDCategorias": categories
				});
				array.sort((a, b) => a["ID"] - b["ID"]);
				break;
		}
		sessionStorage.setItem(table.name, JSON.stringify(array));
	}

	updateSessionStorage(data) {
		let array = new Array();
		let table = data["Tabela"];
		let id = data["ID"];
		switch (table) {
			case DatabaseTables.CATEGORIA:

				break;

			case DatabaseTables.AUTOR:
			case DatabaseTables.EDITORA:
				if (table == DatabaseTables.AUTOR) array = this.getAuthors();
				else array = this.getPublishers();
				
				break;

			case DatabaseTables.LIVRO:
				
				break;
		}
		sessionStorage.setItem(table.name, JSON.stringify(array));
	}

	deleteSessionStorage(data) {
		let array = new Array();
		let table = data["Tabela"];
		let id = data["ID"];
		switch (table) {
			case DatabaseTables.CATEGORIA:
				array = this.getCategories();
				array.splice(array.map(i => i["ID"]).indexOf(id), 1);
				break;

			case DatabaseTables.AUTOR:
			case DatabaseTables.EDITORA:
				if (table == DatabaseTables.AUTOR) array = this.getAuthors();
				else array = this.getPublishers();
				array.splice(array.map(i => i["ID"]).indexOf(id), 1);
				break;

			case DatabaseTables.LIVRO:
				array = this.getBooks();
				array.splice(array.map(i => i["ID"]).indexOf(id), 1);
				break;
		}
		sessionStorage.setItem(table.name, JSON.stringify(array));
	}

	reset() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.href = "/";
	}
}
//use localStorage to store admin data (delete when admin logs out)