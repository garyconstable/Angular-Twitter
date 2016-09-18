<?php

require_once( rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/lib/twitterApp.class.php'  );
require_once( rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/lib/twitterAuth.class.php'  );
$token_file = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/twitter/token/token.json';

if(!file_exists($token_file)){
  $response = twitterAuth::getInstance()->retrieveToken();
  file_put_contents('token.json', $response);
}
echo file_get_contents($token_file);
die();
