/*
Relações entre tabelas:

Cada autor pode ter 1 ou mais livros
Cada livro pode ter 1 ou mais autores

Cada editora pode ter 1 ou mais livros
Cada livro tem 1 editora

Cada cagetoria pode ter 1 ou mais livros
Cada livro pode ter 1 ou mais categorias
*/

/*
DROP DATABASE IF EXISTS prog_info_projeto; 
CREATE DATABASE IF NOT EXISTS prog_info_projeto; 
USE prog_info_projeto;
*/

DROP TABLE IF EXISTS Autor;
CREATE TABLE IF NOT EXISTS Autor (
  ID int NOT NULL AUTO_INCREMENT, 
  Nome varchar(255) NOT NULL UNIQUE, 
  Pais varchar(255) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS Editora;
CREATE TABLE IF NOT EXISTS Editora (
  ID int NOT NULL AUTO_INCREMENT, 
  Nome varchar(255) NOT NULL UNIQUE, 
  Pais varchar(255) NOT NULL,
  Logo varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS Livro;
CREATE TABLE IF NOT EXISTS Livro (
  ID int NOT NULL AUTO_INCREMENT, 
  Titulo varchar(255) NOT NULL UNIQUE, 
  ISBN varchar(255) NOT NULL UNIQUE,
  Numero_Paginas int NOT NULL,
  IDEditora int NOT NULL,
  Capa varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (ID),
  FOREIGN KEY (IDEditora) REFERENCES Editora(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS Categoria;
CREATE TABLE IF NOT EXISTS Categoria (
  ID int PRIMARY KEY AUTO_INCREMENT,
  Nome varchar(25) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS Livro_Autor;
CREATE TABLE Livro_Autor (
    IDLivro  INT NOT NULL,
    IDAutor INT NOT NULL,
    FOREIGN KEY (IDLivro) REFERENCES Livro(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDAutor) REFERENCES Autor(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS Livro_Categoria;
CREATE TABLE Livro_Categoria (
    IDLivro  INT NOT NULL,
    IDCategoria INT NOT NULL,
    FOREIGN KEY (IDLivro) REFERENCES Livro(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDCategoria) REFERENCES Categoria(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

INSERT INTO Autor (Nome, Pais) VALUES
('J.D. Salinger', 'USA'),
('F. Scott Fitzgerald', 'USA'),
('Jane Austen', 'UK'),
('Scott Hanselman', 'USA'),
('Jason N. Gaylord', 'USA'),
('Pranav Rastogi', 'India'),
('Todd Miranda', 'USA'),
('Christian Wenz', 'USA');

INSERT INTO Editora (Nome, Pais, Logo) VALUES
('Little, Brown and Company', 'USA', 'https://miro.medium.com/max/2400/0*AR6ZP36DQ4axeRxs.jpeg'),
('Scribner', 'USA', 'https://about.simonandschuster.biz/wp-content/uploads/2016/08/Scribner-Logo.jpg'),
('Thomas Egerton', 'UK', 'https://pbs.twimg.com/media/Elqv7kgXUAEoaw2.jpg'),
('Wiley', 'USA', 'https://4vector.com/i/free-vector-wiley-1_075176_wiley-1.png');

INSERT INTO Livro (Titulo, ISBN, Numero_Paginas, IDEditora, Capa) VALUES
('The Catcher in the Rye', "978-0241950425", 240, 1, 'https://m.media-amazon.com/images/I/91HPG31dTwL.jpg'),
('Nine Stories', '978-0316769501', 208, 1, 'https://m.media-amazon.com/images/I/31x+MY57lfL._AC_SY780_.jpg'),
('Franny and Zooey', '978-0316769495', 176, 1, 'https://m.media-amazon.com/images/I/31Jy2ycRn8L._SX400_BO1,204,203,200_.jpg'),
('The Great Gatsby', '979-8745274824', 110, 2, 'https://kbimages1-a.akamaihd.net/c5742da9-e63f-4ed5-acb6-074fab5e3f41/1200/1200/False/the-great-gatsby-11.jpg'),
('Tender is the Night', '978-0684801544', 320, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tender_Is_the_Night_%281934_1st_ed_dust_jacket%29.jpg/727px-Tender_Is_the_Night_%281934_1st_ed_dust_jacket%29.jpg'),
('Pride and Prejudice', '978-1503290563', 259, 3, 'https://m.media-amazon.com/images/I/41xCxs0B+cL.jpg'),
('Professional ASP.NET 4.5 in C# and VB', "978-1118311820", 1440, 4, 'https://books2search.com/storage/bookimages/4/5/0/2/9781118332054.jpg');

INSERT INTO Categoria (Nome) VALUES
('Romance'),
('Drama'),
('Comédia'),
('Ficção'),
('Ficção científica'),
('Terror'),
('Documentário'),
('Fantasia'),
('Mistério'),
('Desporto'),
('Crime'),
('Musical'),
('Aventura'),
('Noir'),
('Animação'),
('Guerra'),
('Histórico'),
('Indie'),
('Western'),
('Ação'),
('Novela'),
('Tragédia'),
('Programação');

INSERT INTO Livro_Autor (IDLivro, IDAutor) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(6, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 7),
(7, 8);

INSERT INTO Livro_Categoria (IDLivro, IDCategoria) VALUES
(1, 21),
(1, 4),
(2, 4),
(3, 21),
(3, 4),
(4, 21),
(4, 22),
(4, 4),
(5, 7),
(5, 4),
(5, 21),
(5, 22),
(6, 1),
(6, 4),
(7, 23);