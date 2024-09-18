<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de entrenadores

require_once('../models/entrenadores.model.php');
error_reporting(0);
$entrenadores = new Entrenadores;

switch ($_GET["op"]) {
        //TODO: operaciones de entrenadores
    case 'buscar': // Procedimiento para cargar todos los datos de los entrenadores
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Entrenador ID not specified."]);
            exit();
        }
        $texto = intval($_POST["texto"]);
        $datos = array();
        $datos = $entrenadores->buscar($texto);
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'todos': // Procedimiento para cargar todos los datos de los entrenadores
        $datos = array();
        $datos = $entrenadores->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un registro de la base de datos
        if (!isset($_POST["entrenadorId"])) {
            echo json_encode(["error" => "Entrenador ID not specified."]);
            exit();
        }
        $entrenadorId = intval($_POST["entrenadorId"]);
        $datos = array();
        $datos = $entrenadores->uno($entrenadorId);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un entrenador en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["especialidad"]) || !isset($_POST["telefono"]) || !isset($_POST["email"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $especialidad = $_POST["especialidad"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];

        $datos = array();
        $datos = $entrenadores->insertar($nombre, $especialidad, $telefono, $email);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un entrenador en la base de datos
        if (!isset($_POST["entrenadorId"]) || !isset($_POST["nombre"]) || !isset($_POST["especialidad"]) || !isset($_POST["telefono"]) || !isset($_POST["email"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $entrenadorId = intval($_POST["entrenadorId"]);
        $nombre = $_POST["nombre"];
        $especialidad = $_POST["especialidad"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];

        $datos = array();
        $datos = $entrenadores->actualizar($entrenadorId, $nombre, $especialidad, $telefono, $email);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un entrenador en la base de datos
        if (!isset($_POST["entrenadorId"])) {
            echo json_encode(["error" => "Entrenador ID not specified."]);
            exit();
        }
        $entrenadorId = intval($_POST["entrenadorId"]);
        $datos = array();
        $datos = $entrenadores->eliminar($entrenadorId);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
