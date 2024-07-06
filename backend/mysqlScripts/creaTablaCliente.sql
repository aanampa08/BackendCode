USE ticketcode;

create table cliente(
	idCliente INT AUTO_INCREMENT PRIMARY KEY NOT NULL
    ,Usuario VARCHAR(100) NOT NULL
    ,Contraseña VARCHAR(100) NOT NULL
    ,Dni INT NOT NULL
    ,Nombre VARCHAR(100) NOT NULL
    ,Apellido VARCHAR(100) NOT NULL
    ,Mail VARCHAR(200) NOT NULL
    ,Telefono INT NOT NULL
);