<?php
// TODO: Clase de Factura Tienda Cel@g
require_once('../config/config.php');

class Sesiones
{
    public function todos() // select * from Sesiones
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT 
                    CONCAT(miembros.nombre, ' ', miembros.apellido) AS miembro,
                    entrenadores.nombre AS entrenador,
                    entrenadores.especialidad AS especialidad,
                    se.miembro_id as miembroId,
                    se.entrenador_id as entrenadorId,
                    se.sesion_id,
                    se.fecha, 
                    se.hora_inicio, 
                    se.hora_fin 
                    FROM `sesionesentrenamiento` se
                    INNER JOIN miembros on se.miembro_id = miembros.miembro_id
                    INNER JOIN entrenadores on se.entrenador_id = entrenadores.entrenador_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idSesionEntrenamiento) // select * from sesionesentrenamiento where id = $idSesionEntrenamiento
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT 
                    CONCAT(miembros.nombre, ' ', miembros.apellido) AS miembro,
                    entrenadores.nombre AS entrenador,
                    entrenadores.especialidad AS especialidad,
                    se.miembro_id as miembroId,
                    se.entrenador_id as entrenadorId,
                    se.sesion_id,
                    se.fecha, 
                    se.hora_inicio, 
                    se.hora_fin
                    FROM `sesionesentrenamiento` se
                    INNER JOIN miembros on se.miembro_id = miembros.miembro_id
                    INNER JOIN entrenadores on se.entrenador_id = entrenadores.entrenador_id
                    WHERE se.sesion_id = $idSesionEntrenamiento";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($fecha, $horaInicio, $horaFin, $miembroId, $entrenadorId) // insert into factura (Fecha, Sub_total, Sub_total_iva, Valor_IVA, Clientes_idClientes) values (...)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `sesionesentrenamiento`(`fecha`, `hora_inicio`, `hora_fin`, `miembro_id`, `entrenador_id`) 
                       VALUES ('$fecha', '$horaInicio', '$horaFin', '$miembroId', '$entrenadorId')";
            //echo $cadena;
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

    public function actualizar($sesionId, $fecha, $horaInicio, $horaFin, $miembroId, $entrenadorId) // update factura set ... where id = $idFactura
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `sesionesentrenamiento` SET 
                       `fecha`='$fecha',
                       `hora_inicio`='$horaInicio',
                       `hora_fin`='$horaFin',
                       `miembro_id`='$miembroId',
                       `entrenador_id`='$entrenadorId'
                       WHERE `sesion_id` = $sesionId";
            if (mysqli_query($con, $cadena)) {
                return $sesionId; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($sesionId) // delete from factura where id = $idFactura
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `sesionesentrenamiento` WHERE `sesion_id`= $sesionId";
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
