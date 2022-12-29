//enumeração das tabelas da base de dados e verificação do JSON a ser enviado para a API.

class DatabaseTables {
	static AUTOR = new DatabaseTables("Autor");
	static EDITORA = new DatabaseTables("Editora");
	static LIVRO = new DatabaseTables("Livro");
	static CATEGORIA = new DatabaseTables("Categoria");
  
	constructor(name) {
		this.name = name;
	}

	checkJSON(table, data) {
        var pass = false;
        var text = "Campos ou valores do objeto JSON estão errados.\n";
        try {
            switch (table) {
                case DatabaseTables.CATEGORIA:
                    text += "Campo JSON para a tabela \"Categoria\" é:\nNome [String]";
                    if (getLengthOfObject(data) == 1 && data["Nome"] != "") pass = true;
                    break;
                case DatabaseTables.AUTOR:
                case DatabaseTables.EDITORA:
                    text += "Campos JSON para a tabela \"Autor\" e \"Editora\" são:\nNome [String]\nPais [String]";
                    if (getLengthOfObject(data) == 2 && data["Nome"] != "" && data["Pais"] != "") pass = true;
                    break;
                case DatabaseTables.LIVRO:
                    text += "Campos JSON para a tabela \"Livro\" são:\nTitulo [String]\nISBN [String]\nNumero_Paginas [int]\nIDEditora [int]\nCapa [String]\nIDAutores [Array JSON de ints]\nIDCategorias [Array JSON de ints]";
                    if (getLengthOfObject(data) == 7 && data["Titulo"] != "" && data["ISBN"] != "" && data["Numero_Paginas"] > 0 && data["IDEditora"] > 0 && data["Capa"] != "") {
                        var autores = data["IDAutores"];
                        var categorias = data["IDCategorias"];
                        if (autores.length > 0 && categorias.length > 0) {
                            for (var i = 0; i < autores.length; i++) 
								if (autores[i] <= 0) throw "DB row index 0 or below";
                            for (var i = 0; i < categorias.length; i++)
                            	if (categorias[i] <= 0) throw "DB row index 0 or below";
                            pass = true;
                        }
                    }
                    break;
            }
            if (pass === false) table.errorJSON(text, null);
        }
        catch (e) {
            table.errorJSON(text, e);
        }
        return pass;
    }

    errorJSON(text, e) {
        if (e == null) console.log(text);
        else console.log(e + "\n" + text);
		alert("JSON está errado.\nPara detalhes:\n[F12 -> Console]");
    }
}

function getLengthOfObject(object) {
	var i = 0;
	for (var key in object) i++;
	return i;
}