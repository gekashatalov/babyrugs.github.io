<?php

$productName = trim($_POST['productName']);
$productSize= trim($_POST['productSize']);
$clientName= trim($_POST['buy_name']);
$clientPhone= trim($_POST['buy_phone']);
mail('geka.shatalov@gmail.com', 'Новый заказ', "Название товара: $productName, Размер: $productSize, Номер заказчика: $clientPhone,  Имя заказчика: $clientName");