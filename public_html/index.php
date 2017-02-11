<?php
include_once('./cockpit/bootstrap.php');

$app = new Lime\App();



// bind routes
$app->bind("/:thepage", function($params) use($app) {
  $filepath = "./dist/views/".explode("/",$params['thepage'])[0].".php";
  $page_data = array(
      "pages"=>cockpit("collections")->find('Pages'),
      "games"=>cockpit("collections")->find('TriviaNights'),
      "hosts"=>cockpit("collections")->find('Hosts'),
      "venues"=>cockpit("collections")->find('venues'),
      "press"=>cockpit("collections")->find('BookPress'),
      "retailers"=>cockpit("collections")->find('BookRetailers'),
      "text_blocks"=>cockpit("collections")->find('BlockContent')
    );
    if ($params['thepage']=="publish") {
      return $app->render('dist/views/publish_locals.php', ['page_data' => $page_data]);
    }
    else if (file_exists($filepath) || $params['thepage']=="") {

      if (file_exists($filepath)) {
        $page_data["current"]=$params['thepage'];
        return $app->render($filepath, ['page_data' => $page_data]);
      }
      else if ($params['thepage']==""){
        $page_data["current"]="home";
        return $app->render('dist/views/home.php', ['page_data' => $page_data]);
      }

    }
    else {
      $page_data["current"]="404";
      return $app->render('dist/views/404.php', ['page_data' => $page_data]);
    }
});

$app->bind("/:thepage/:entry", function($params) use($app) {
  $filepath = "./views/".explode("/",$params['thepage'])[0].".php";
    if ($params['thepage']=="publish") {
      return $app->render('dist/views/publish.php', ['page_data' => $page_data]);
    }
    if ($params['thepage']=="publish_locals") {
      return $app->render('dist/views/publish_locals.php', ['page_data' => $page_data]);
    }
    else if (file_exists($filepath) || $params['thepage']=="") {
      if (file_exists($filepath)) {
        if (isset($params['entry'])) {
          $page_data["entry_title"]=$params['entry'];
        }
        $page_data["current"]=$params['thepage'];
        return $app->render($filepath, ['page_data' => $page_data]);
      }
      else if ($params['thepage']==""){
        $page_data["current"]="home";
        return $app->render('dist/views/home.php', ['page_data' => $page_data]);
      }

    }
    else {
      $page_data["current"]="404";
      return $app->render('dist/views/404.php', ['page_data' => $page_data]);
    }
});

$app->run();
