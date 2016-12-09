<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 9/12/2016
 * Time: 14:02
 */
error_reporting( E_ALL );

if (isset($_POST['data']) && isset($_POST['name']) && strlen($_POST['name']) > 1) {
    $text = json_encode($_POST['data']);
    $filename = $_POST['name'];

    file_put_contents(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .  'trainingData' . DIRECTORY_SEPARATOR . $filename , $text);
    echo 'Succesfully saved file';
}
else {
    echo 'Could not save file';
}

?>