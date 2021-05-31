<?php

$clientName= trim($_POST['name']);
$clientPhone= trim($_POST['phone']);
mail('geka.shatalov@gmail.com', 'Перезвоните мне пожалуйста', "Имя : $clientName, Номер телефона: $clientPhone");