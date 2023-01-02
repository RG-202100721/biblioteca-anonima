//processamento dos dados recebidos da nossa API utilizando o objeto localStorage e sessionStorage

import { DatabaseRequest } from "./DB-request.js";

export class BrowserStorage {

	checkStorage() {
		if (sessionStorage.getItem("Livros") == undefined) {
			new DatabaseRequest().getAllDB(() => { location.reload(); }, (message) => { console.log(message); });
		}
	}

	getBooks() {
		return JSON.parse(sessionStorage.getItem("Livros"));
	}
	getBook(index) {
		let books = JSON.parse(sessionStorage.getItem("Livros"));
		if (index == 0 || index > books.length) console.error("index is wrong (tip: start from 1)");
		return books[index - 1];
	}

	getAuthors() {
		return JSON.parse(sessionStorage.getItem("Autores"));
	}
	getAuthor(index) {
		let authors = JSON.parse(sessionStorage.getItem("Autores"));
		if (index == 0 || index > authors.length) console.error("index is wrong (tip: start from 1)");
		return authors[index - 1];
	}

	getCategories() {
		return JSON.parse(sessionStorage.getItem("Categorias"));
	}
	getCategory(index) {
		let categories = JSON.parse(sessionStorage.getItem("Categorias"));
		if (index == 0 || index > categories.length) console.error("index is wrong (tip: start from 1)");
		return categories[index - 1];
	}

	getPublishers() {
		return JSON.parse(sessionStorage.getItem("Editoras"));
	}
	getPublisher(index) {
		let publishers = JSON.parse(sessionStorage.getItem("Editoras"));
		if (index == 0 || index > publishers.length) console.error("index is wrong (tip: start from 1)");
		return publishers[index - 1];
	}

	copyToSessionStorage(result) {
		sessionStorage.setItem("Autores", JSON.stringify(result["data"][0]));
		sessionStorage.setItem("Categorias", JSON.stringify(result["data"][1]));
		sessionStorage.setItem("Editoras", JSON.stringify(result["data"][2]));

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
		sessionStorage.setItem("Livros", JSON.stringify(result["data"][3]));
	}

	updateSessionStorage(URL, data) {
		switch (URL) {
			case "/create":
				
				break;

			case "/edit":
				
				break;

			case "/delete":
				
				break;
			default: break;
		}
	}

	reset() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.href = "/";
	}
}
//use localStorage to store admin data (delete when admin logs out)