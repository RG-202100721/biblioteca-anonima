//para apagar antes da apresentação final
//-------------------------------------------------------------------------------------------------------
//exemplos de uso dos métodos do script DB-request.js (Pedidos CRUD à API).
//se quiserem fazer uma operação só depois da outra ter terminado, têm de fazer-la no callback da 1º

import { DatabaseTables } from "./DB-tables.js";
import { DatabaseRequest } from "./DB-request.js";

var DB = new DatabaseRequest();

var book = { 
    "Titulo": "some book 2 - the sequel",
    "ISBN": "8972965743",
    "Numero_Paginas": 543,
    "IDEditora": 2,
    "Capa": "https://sequel.us",
    "IDAutores": [ 2 ],
    "IDCategorias": [ 21, 15 ]
};

DB.createDB(DatabaseTables.LIVRO, book, (message) => onSuccess(message), (message) => onError(message));  
DB.editDB(DatabaseTables.LIVRO, 9, book, (message) => onSuccess(message), (message) => onError(message));  
DB.deleteDB(DatabaseTables.LIVRO, 10, (message) => onSuccess(message), (message) => onError(message));

function onSuccess(message) {
    //fazer algo
    //ou não... é com vocês
}

function onError(message) {
    //fazer algo
    //ou não... é com vocês
}

//-------------------------------------------------------------------------------------------------------

//exemplos de uso dos métodos do script DB-storage.js (Pedidos à Storage do Browser). 
//utilizem estas funções para mostrar os dados ao utilizador/admin

import { BrowserStorage } from "./DB-storage.js";

var BS = new BrowserStorage();

BS.getBooks();
BS.getBook(1);

BS.getAuthors();
BS.getAuthor(2);

BS.getCategories();
BS.getCategory(3);

BS.getPublishers();
BS.getPublisher(4);


//-------------------------------------------------------------------------------------------------------
