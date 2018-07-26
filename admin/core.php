<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {
    case 'init':
        init();
        break;
    case "selectonegoods":
        selectonegoods();
        break;
   case 'updategoods':
       updategoods();
       break;
   case 'newgoods':
       newgoods();
       break;
	case 'loadgoods':
       loadgoods();
       break;
	case 'cartadding':
       cartadding();
       break;
	case 'writingcart':
       writingcart();
       break;
	case 'catinit':
       catinit();
       break;
	case 'catchange':
       catchange();
       break;
	case 'goodopen':
       goodopen();
       break;
}