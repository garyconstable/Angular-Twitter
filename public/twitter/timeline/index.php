<?php

require_once( rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/lib/twitterApp.class.php'  );
require_once( rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/lib/twitterTimeline.class.php' );

header('Content-type:application/json;charset=utf-8');
echo twitterTimeline::getInstance()->queryTwitter();
die();
