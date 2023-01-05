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
        var pass = false;
        var text = "Campos ou valores do objeto JSON estão errados.\n";
        try {
            switch (table) {
                case DatabaseTables.CATEGORIA:
                    text += "Campo JSON para a tabela \"Categoria\" é:\nNome [String]";
                    if (this.getLengthOfObject(data) == 1 && data["Nome"] != "") pass = true;
                    break;

                case DatabaseTables.AUTOR:
                case DatabaseTables.EDITORA:
                    text += "Campos JSON para a tabela \"Autor\" e \"Editora\" são:\nNome [String]\nPais [String]";
                    if (this.getLengthOfObject(data) == 2 && data["Nome"] != "" && data["Pais"] != "") pass = true;
                    break;

                case DatabaseTables.LIVRO:
                    text += "Campos JSON para a tabela \"Livro\" são:\nTitulo [String]\nISBN [String]\nNumero_Paginas [int]\nIDEditora [int]\nCapa [String]\nIDAutores [Array JSON de ints]\nIDCategorias [Array JSON de ints]";
                    if (this.getLengthOfObject(data) == 7 && data["Titulo"] != "" && data["ISBN"] != "" && data["Numero_Paginas"] > 0 && data["IDEditora"] > 0 && data["Capa"] != "") {
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
		alert("JSON está errado.\nPara detalhes:\n[F12 -> Console]");
    }

    getLengthOfObject(object) {
        var i = 0;
        for (var key in object) i++;
        return i;
    }
}