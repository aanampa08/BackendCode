USE ticketcode;

CREATE TABLE Compra(
	idCompra INT AUTO_INCREMENT PRIMARY KEY
    ,Fecha DATETIME NOT NULL
    ,Monto FLOAT NOT NULL
    ,concierto_id INT NOT NULL
    ,usuario_id INT NOT NULL
    ,FOREIGN KEY (usuario_id) REFERENCES ticketcode.cliente(idCliente)
    ,FOREIGN KEY (concierto_id) REFERENCES ticketcode.concierto(idConcierto)
);