//enumeração das tabelas da base de dados e verificação do JSON a ser enviado para a API.

class DatabaseTables {
	static AUTOR = new DatabaseTables("Autor");
	static EDITORA = new DatabaseTables("Editora");
	static LIVRO = new DatabaseTables("Livro");
	static CATEGORIA = new DatabaseTables("Categoria");
    static ADMIN = new DatabaseTables("Administrador");
  
	constructor(name) {
		this.name = name;
	}

	checkJSON(table, data) {
        var pass = false, conflict = false;
        var BS = new BrowserStorage();
        var text = "Campos ou valores do objeto JSON estão errados.\n";
        try {
            switch (table) {
                case DatabaseTables.CATEGORIA:
                    text += "Campo JSON para a tabela \"Categoria\" é:\nNome [String] - UNIQUE";
                    if (this.getLengthOfObject(data) == 1 && data["Nome"] != "") {
                        BS.getCategories().forEach(elmt => {
                            if (elmt["Nome"] == data["Nome"]) conflict = true;
                        });
                        if (conflict == false) pass = true;
                    }
                    break;

                case DatabaseTables.AUTOR:
                    text += "Campos JSON para a tabela \"Autor\" são:\nNome [String] - UNIQUE\nPais [String]";
                    if (this.getLengthOfObject(data) == 2 && data["Nome"] != "" && data["Pais"] != "") {
                        BS.getAuthors().forEach(elmt => {
                            if (elmt["Nome"] == data["Nome"]) conflict = true;
                        });
                        if (conflict == false) pass = true;
                    }
                    break;

                case DatabaseTables.EDITORA:
                    text += "Campos JSON para a tabela \"Editora\" são:\nNome [String] - UNIQUE\nPais [String]\nLogo [String] - UNIQUE";
                    if (this.getLengthOfObject(data) == 3 && data["Nome"] != "" && data["Pais"] != "" && data["Logo"] != "") {
                        BS.getPublishers().forEach(elmt => {
                            if (elmt["Nome"] == data["Nome"] || elmt["Logo"] == data["Logo"]) conflict = true;
                        });
                        if (conflict == false) pass = true;
                    }
                    break;

                case DatabaseTables.LIVRO:
                    text += "Campos JSON para a tabela \"Livro\" são:\nTitulo [String] - UNIQUE\nISBN [String] - UNIQUE\nNumero_Paginas [int]\nIDEditora [int]\nCapa [String] - UNIQUE\nIDAutores [Array JSON de ints]\nIDCategorias [Array JSON de ints]";
                    if (this.getLengthOfObject(data) == 7 && data["Titulo"] != "" && data["ISBN"] != "" && data["Numero_Paginas"] > 0 && data["IDEditora"] > 0 && data["Capa"] != "") {
                        BS.getBooks().forEach(elmt => {
                            if (elmt["Titulo"] == data["Titulo"] || elmt["ISBN"] == data["ISBN"] || elmt["Capa"] == data["Capa"]) conflict = true;
                        });
                        if (conflict == false) {
                            var ForEachBreak = {};
                            try {
                                BS.getPublishers().forEach(elmt => { if (elmt["ID"] == data["IDEditora"]) throw ForEachBreak; });
                                conflict = true;
                            } 
                            catch (error) {}
                            if (conflict == false) {
                                var autores = data["IDAutores"];
                                var categorias = data["IDCategorias"];
                                if (autores.length > 0 && categorias.length > 0) {
                                    var trial = BS.getAuthors();
                                    for (var i = 0; i < autores.length; i++) {
                                        if (autores[i] <= 0) throw "DB row index 0 or below";
                                        try {
                                            trial.forEach(elmt => { if (elmt["ID"] == autores[i]) throw ForEachBreak; });
                                            conflict = true;
                                        } 
                                        catch (error) {}
                                        if (conflict == true) break;
                                    }
                                    if (conflict == false) {
                                        trial = BS.getCategories();
                                        for (var i = 0; i < categorias.length; i++) {
                                            if (categorias[i] <= 0) throw "DB row index 0 or below";
                                            try {
                                                trial.forEach(elmt => { if (elmt["ID"] == categorias[i]) throw ForEachBreak; });
                                                conflict = true;
                                            } 
                                            catch (error) {}
                                            if (conflict == true) break;
                                        }
                                        if (conflict == false) pass = true;
                                    }
                                }
                            }
                        }
                    }
                    break;
                    
                case DatabaseTables.ADMIN:
                    text += "Campos JSON para fazer o login são:\nNumero_Conta [int]\nPassword [String]";
                    if (this.getLengthOfObject(data) == 2 && data["Numero_Conta"] > 0 && data["Password"] != "") pass = true;
                    break;
            }
            if (pass === false) this.errorJSON(text, null);
        }
        catch (e) {
            this.errorJSON(text, e);
        }
        return pass;
    }

    errorJSON(text, e) {
        if (e == null) console.error(text);
        else console.error(e + "\n" + text);
    }

    getLengthOfObject(object) {
        var i = 0;
        for (var key in object) i++;
        return i;
    }
}