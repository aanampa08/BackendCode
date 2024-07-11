use ticketcode;

CREATE TABLE detalle_compra(
	idDetalleCompra INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    ,compra_id INT
    ,cantidadTicket INT NOT NULL
    ,ticket_id INT
    ,precio_unitario INT
    ,FOREIGN KEY (compra_id) REFERENCES compra(idCompra)
    ,FOREIGN KEY (ticket_id) REFERENCES ticket(idTicket)
);