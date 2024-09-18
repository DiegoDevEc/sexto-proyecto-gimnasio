<?php
// TODO: Clase de Miembros
require_once('../config/config.php');

class Miembros
{
    // TODO: Implementar los métodos de la clase


    public function buscar($textp) // select * from Miembros
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `miembros` where nombre='$textp'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
    public function todos() // select * from Miembros
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `miembros`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($miembroId) // select * from Miembros where id = $miembroId
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `miembros` WHERE `miembro_id` = $miembroId";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $apellido, $fechaNacimiento, $tipoMembresia) // insert into Miembros (`nombre`, `apellido`, `fecha_nacimiento`, `tipo_membresia`) values ($nombre, $apellido, $fechaNacimiento, $tipoMembresia)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `miembros`(`nombre`, `apellido`, `fecha_nacimiento`, `tipo_membresia`) 
                       VALUES ('$nombre', '$apellido', '$fechaNacimiento', '$tipoMembresia')";
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

    public function actualizar($miembroId, $nombre, $apellido, $fechaNacimiento, $tipoMembresia) // update Miembros set nombre = $nombre, apellido = $apellido, fecha_nacimiento = $fechaNacimiento, tipo_membresia = $tipoMembresia where miembro_id = $miembroId
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `miembros` SET 
                       `nombre`='$nombre',
                       `apellido`='$apellido',
                       `fecha_nacimiento`='$fechaNacimiento',
                       `tipo_membresia`='$tipoMembresia'
                       WHERE `miembro_id` = $miembroId";
            if (mysqli_query($con, $cadena)) {
                return $miembroId; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($miembroId) // delete from Miembros where id = $miembroId
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `miembros` WHERE `miembro_id`= $miembroId";
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
