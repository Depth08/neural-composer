<?php
/**
 * Created by PhpStorm.
 * User: Rafael
 * Date: 9/12/2016
 * Time: 14:02
 */
error_reporting( E_ALL );

if (isset($_GET['load'])) {
    try {
        if (strlen($_GET['load']) < 1) {
            throw new Exception('Filename too short');
        }

        $filename = $_GET['load'];

        $contents = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .  'trainingData' . DIRECTORY_SEPARATOR . $filename);

        echo $contents;
    }
    catch (Exception $e) {
        echo 'Something went wrong: ' . $e->getMessage() . PHP_EOL;
    }
}

if (isset($_POST['data']) && isset($_POST['name'])) {
    try {
        if (strlen($_POST['name']) < 1) {
            throw new Exception('Filename too short');
        }

        $text = json_encode($_POST['data']);
        $filename = $_POST['name'];

        file_put_contents(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .  'trainingData' . DIRECTORY_SEPARATOR . $filename , $text);
        echo 'Successfully saved file';
    }
    catch (Exception $e) {
        echo 'Something went wrong: ' . $e->getMessage() . PHP_EOL;
    }

    die();
}

?>