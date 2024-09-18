
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Gimnasios-Sexto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Gimnasios-Sexto` DEFAULT CHARACTER SET utf8 ;
USE `Gimnasios-Sexto` ;

-- -----------------------------------------------------
-- Table `Gimnasios-Sexto`.`miembros`
-- -----------------------------------------------------

create table `Gimnasios-Sexto`.`miembros`(
  miembro_id INT NOT NULL AUTO_INCREMENT,
  nombre text not null,
  apellido text not null,
  fecha_nacimiento date not null,
  tipo_membresia text not null,
  PRIMARY KEY (`miembro_id`)
);

-- -----------------------------------------------------
-- Table `Gimnasios-Sexto`.`entrenadores`
-- -----------------------------------------------------

create table `Gimnasios-Sexto`.`entrenadores`  (
  entrenador_id INT NOT NULL AUTO_INCREMENT,
  nombre text not null,
  especialidad text not null,
  telefono text not null,
  email text not null,
  PRIMARY KEY (`entrenador_id`)
);

-- -----------------------------------------------------
-- Table `Gimnasios-Sexto`.`sesionesentrenamiento`
-- -----------------------------------------------------

create table `Gimnasios-Sexto`.`sesionesentrenamiento`  (
  sesion_id INT NOT NULL AUTO_INCREMENT,
  miembro_id INT NOT NULL,
  entrenador_id INT NOT NULL,
  fecha date not null,
  hora_inicio time not null,
  hora_fin time not null,
  PRIMARY KEY (`sesion_id`),
  foreign key (miembro_id) references miembros (miembro_id),
  foreign key (entrenador_id) references entrenadores (entrenador_id)
);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Insert Miembros
insert into
  miembros (
    nombre,
    apellido,
    fecha_nacimiento,
    tipo_membresia
  )
values
  ('Juan', 'Pérez', '1990-05-15', 'Premium'),
  ('María', 'Gómez', '1985-07-22', 'Básica'),
  ('Carlos', 'López', '1992-11-30', 'Estándar'),
  ('Ana', 'Martínez', '1988-03-10', 'Premium'),
  ('Luis', 'Rodríguez', '1995-09-25', 'Básica'),
  ('Laura', 'Fernández', '1991-12-05', 'Estándar'),
  ('Jorge', 'Sánchez', '1987-01-17', 'Premium'),
  ('Marta', 'Díaz', '1993-06-08', 'Básica'),
  ('Pedro', 'García', '1994-04-20', 'Estándar'),
  ('Sofía', 'Romero', '1996-08-14', 'Premium');

-- Insert Entrenadores
insert into
  entrenadores (nombre, especialidad, telefono, email)
values
  ('Roberto', 'Yoga', '555-1234', 'roberto@yoga.com'),
  (
    'Elena',
    'Pilates',
    '555-5678',
    'elena@pilates.com'
  ),
  (
    'Miguel',
    'Crossfit',
    '555-8765',
    'miguel@crossfit.com'
  ),
  ('Lucía', 'Zumba', '555-4321', 'lucia@zumba.com'),
  ('Andrés', 'Boxeo', '555-6789', 'andres@boxeo.com'),
  (
    'Clara',
    'Natación',
    '555-9876',
    'clara@natacion.com'
  ),
  (
    'Fernando',
    'Ciclismo',
    '555-3456',
    'fernando@ciclismo.com'
  ),
  (
    'Patricia',
    'Running',
    '555-6543',
    'patricia@running.com'
  ),
  ('Javier', 'Pesas', '555-7890', 'javier@pesas.com'),
  (
    'Sara',
    'Aeróbicos',
    '555-0987',
    'sara@aerobicos.com'
  );

-- Insert into SesionesEntrenamiento
insert into
  sesionesentrenamiento (
    miembro_id,
    entrenador_id,
    fecha,
    hora_inicio,
    hora_fin
  )
values
  (1, 1, '2023-10-01', '09:00', '10:00'),
  (2, 2, '2023-10-02', '10:00', '11:00'),
  (3, 3, '2023-10-03', '11:00', '12:00'),
  (4, 4, '2023-10-04', '12:00', '13:00'),
  (5, 5, '2023-10-05', '13:00', '14:00'),
  (6, 6, '2023-10-06', '14:00', '15:00'),
  (7, 7, '2023-10-07', '15:00', '16:00'),
  (8, 8, '2023-10-08', '16:00', '17:00'),
  (9, 9, '2023-10-09', '17:00', '18:00'),
  (10, 10, '2023-10-10', '18:00', '19:00');

