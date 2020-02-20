<?php
$msg = "First line of text\nSecond line of text";
$msg = wordwrap($msg,70);

    $success = mail("alexbeuscher@gmail.com","My subject",$msg);
    if (!$success) {
        $errorMessage = error_get_last()['message'];
    }
    echo "xxx";
?>
