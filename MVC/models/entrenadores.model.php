<?php
// TODO: Clase de Entrenadores
require_once('../config/config.php');

class Entrenadores
{
    // TODO: Implementar los métodos de la clase


    public function buscar($textp) // select * from Entrenadores
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `entrenadores` where nombre='$textp'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
    public function todos() // select * from Entrenadores
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `entrenadores`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($entrenadorId) // select * from Entrenadores where id = $entrenadorId
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `entrenadores` WHERE `entrenador_id` = $entrenadorId";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $especialidad, $telefono, $email) // insert into entrenadores (nombre, especialidad, telefono, email) values ($nombre, $especialidad, $telefono, $email)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `entrenadores`(`nombre`, `especialidad`, `telefono`, `email`) 
                       VALUES ('$nombre', '$especialidad', '$telefono', '$email')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Return the inserted ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($entrenadorId, $nombre, $especialidad, $telefono, $email) // update entrenadores set nombre = $nombre, especialidad = $especialidad, telefono = $telefono, email = $email where entrenador_id = $entrenadorId
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `entrenadores` SET 
                       `nombre`='$nombre',
                       `especialidad`='$especialidad',
                       `telefono`='$telefono',
                       `email`='$email'
                       WHERE `entrenador_id` = $entrenadorId";
            if (mysqli_query($con, $cadena)) {
                return $entrenadorId; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($entrenadorId) // delete from entrenadores where id = $entrenadorId
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `entrenadores` WHERE `entrenador_id`= $entrenadorId";
            if (mysqli_query($con, $cadena)) {
                return 1; // Success
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
