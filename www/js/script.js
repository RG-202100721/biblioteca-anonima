//funções de front office



//exemplos de uso dos métodos do script DB-request.js (Pedidos CRUD à API).
//se quiserem fazer mais do que uma operação ao mesmo tempo, têm de fazer a 2ª no callback da 1º (para a 1ª acabar primeiro)

getDataDB("/getBooks", (result) => {
    document.body.innerText += result;
    document.body.innerHTML += "<br><br>";
});

/*
var book = { 
    "Titulo": "some book 2 - the sequel",
    "ISBN": "8972965743",
    "Numero_Paginas": 543,
    "IDEditora": 2,
    "Capa": "https://sequel.us",
    "IDAutores": [ 2 ],
    "IDCategorias": [ 21, 15 ]
};

createDB(DatabaseTables.LIVRO, book, (message) => onSuccess(message), (message) => onError(message));  
//editDB(DatabaseTables.LIVRO, 9, book);
//deleteDB(DatabaseTables.LIVRO, 10, (message) => onSuccess(message));
*/
function onSuccess(message) {
    //fazer algo com a mensagem de sucesso
    //ou não... é com vocês
}

function onError(message) {
    //fazer algo com a mensagem de erro
    //ou não... é com vocês
}