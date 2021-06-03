<?php

$clientName= trim($_POST['name']);
$clientPhone= trim($_POST['phone']);
mail('veolstore@gmail.com', 'Перезвоните мне пожалуйста', "Имя : $clientName, Номер телефона: $clientPhone");