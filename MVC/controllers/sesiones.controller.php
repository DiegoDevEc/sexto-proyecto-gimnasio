<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de sesionesEntrenamiento

require_once('../models/sesiones.model.php');
error_reporting(0);
$sesionesEntrenamiento = new Sesiones;

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todos los datos de los sesionesEntrenamiento
        $datos = array();
        $datos = $sesionesEntrenamiento->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un registro de la base de datos
        if (!isset($_POST["sesionId"])) {
            echo json_encode(["error" => "Sesion de Entrenamiento ID not specified."]);
            exit();
        }
        $sesionId = intval($_POST["sesionId"]);
        $datos = array();
        $datos = $sesionesEntrenamiento->uno($sesionId);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un entrenador en la base de datos
        if (!isset($_POST["miembroId"]) || !isset($_POST["entrenadorId"]) || !isset($_POST["fecha"]) || !isset($_POST["horaInicio"]) || !isset($_POST["horaFin"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $fecha = $_POST["fecha"];
        $horaInicio = $_POST["horaInicio"];
        $horaFin = $_POST["horaFin"];
        $miembroId = $_POST["miembroId"];
        $entrenadorId = $_POST["entrenadorId"];

        $datos = array();
        $datos = $sesionesEntrenamiento->insertar($fecha, $horaInicio, $horaFin, $miembroId, $entrenadorId);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un entrenador en la base de datos
        if (!isset($_POST["sesionId"]) || !isset($_POST["miembroId"]) || !isset($_POST["entrenadorId"]) || !isset($_POST["fecha"]) || !isset($_POST["horaInicio"]) || !isset($_POST["horaFin"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $sesionId = intval($_POST["sesionId"]);        
        $fecha = $_POST["fecha"];
        $horaInicio = $_POST["horaInicio"];
        $horaFin = $_POST["horaFin"];
        $miembroId = $_POST["miembroId"];
        $entrenadorId = $_POST["entrenadorId"];

        $datos = array();
        $datos = $sesionesEntrenamiento->actualizar($sesionId, $fecha, $horaInicio, $horaFin, $miembroId, $entrenadorId);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un entrenador en la base de datos
        if (!isset($_POST["sesionId"])) {
            echo json_encode(["error" => "Entrenador ID not specified."]);
            exit();
        }
        $sesionId = intval($_POST["sesionId"]);
        $datos = array();
        $datos = $sesionesEntrenamiento->eliminar($sesionId);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
