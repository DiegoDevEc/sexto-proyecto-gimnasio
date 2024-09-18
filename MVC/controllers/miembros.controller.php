<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de miembros

require_once('../models/miembros.model.php');
error_reporting(0);
$miembros = new Miembros;

switch ($_GET["op"]) {
        //TODO: operaciones de miembros
    case 'todos': // Procedimiento para cargar todos los datos de los miembros
        $datos = array();
        $datos = $miembros->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un registro de la base de datos
        if (!isset($_POST["miembroId"])) {
            echo json_encode(["error" => "Miembro ID not specified."]);
            exit();
        }
        $miembroId = intval($_POST["miembroId"]);
        $datos = array();
        $datos = $miembros->uno($miembroId);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un miembro en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["fechaNacimiento"]) || !isset($_POST["tipoMembresia"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fechaNacimiento = $_POST["fechaNacimiento"];
        $tipoMembresia = $_POST["tipoMembresia"];

        $datos = array();
        $datos = $miembros->insertar($nombre, $apellido, $fechaNacimiento, $tipoMembresia);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un entrenador en la base de datos
        if (!isset($_POST["miembroId"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["fechaNacimiento"]) || !isset($_POST["tipoMembresia"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $miembroId = intval($_POST["miembroId"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fechaNacimiento = $_POST["fechaNacimiento"];
        $tipoMembresia = $_POST["tipoMembresia"];

        $datos = array();
        $datos = $miembros->actualizar($miembroId, $nombre, $apellido, $fechaNacimiento, $tipoMembresia);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un miembro en la base de datos
        if (!isset($_POST["miembroId"])) {
            echo json_encode(["error" => "Entrenador ID not specified."]);
            exit();
        }
        $miembroId = intval($_POST["miembroId"]);
        $datos = array();
        $datos = $miembros->eliminar($miembroId);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
