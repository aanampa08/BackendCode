USE ticketcode;

CREATE TABLE Compra(
	idCompra INT AUTO_INCREMENT PRIMARY KEY
    ,Fecha DATETIME NOT NULL
    ,Monto FLOAT NOT NULL
    ,usuario_id INT
    ,FOREIGN KEY (usuario_id) REFERENCES ticketcode.cliente(idCliente)
);