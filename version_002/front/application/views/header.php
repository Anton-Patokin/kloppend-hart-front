<?php

//   $rootPath = "http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/";
      $rootPath = "http://localhost/edge/projects/kloppend-hart-antwerpen/kloppend-hart-front/version_002/front/";
// $rootPath = "https://apen.be/kloppend-hart-antwerpen/front/";

?>
<!DOCTYPE html>
<html lang="nl-BE">

<head>
    <meta charset="UTF-8">
<!--    <meta name=viewport content="width=device-width, initial-scale=1">-->
<!--    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />-->
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />

    <link rel="icon" type="image/png" href="<?= $rootPath ?>/images/icon-002.png">

    <!--    css-->
    <link rel="stylesheet" href="<?= $rootPath ?>css/libs/bootstrap.min.css">
    <link rel="stylesheet" href="<?= $rootPath ?>css/libs/angular-material.min.css">
    <link rel="stylesheet" href="<?= $rootPath ?>css/base.css">
    <link rel="stylesheet" href="<?= $rootPath ?>css/samStyling.css">
    <link rel="stylesheet" href="<?= $rootPath ?>js/angular-carousel.css">
    <link rel="stylesheet" href="<?= $rootPath ?>css/libs/rzslider.css">
    <link rel="stylesheet" href="<?= $rootPath ?>css/weather-icons.min.css">
    <link rel="stylesheet" href="<?= $rootPath ?>css/weather-icons-wind.min.css">
    <script type="text/javascript" src="<?= $rootPath ?>js/libs/lodash.min.js"></script>
    <script type="text/javascript" src="<?= $rootPath ?>js/libs/angular.min.js"></script>
    <script src="<?= $rootPath ?>js/angular-simple-logger.js"></script>
    <script src="<?= $rootPath ?>js/angular-google-maps.js"></script>

    <!--    data picker-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-animate.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-aria.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-messages.min.js"></script>
    <script src="<?= $rootPath ?>js/libs/angular-material.js"></script>

    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrmTkGoBzp--pRgO5vRXIsbXPrk3VMp_w&libraries=places&language=nl&region=BE&sensor=false&libraries=drawing&libraries=visualization"
        type="text/javascript"></script>
    <script type="text/javascript" src="<?= $rootPath ?>js/libs/angular-cookies.min.js"></script>
    <script src="<?= $rootPath ?>js/libs/angular-route.js"></script>
    <script src="<?= $rootPath ?>js/libs/jquery.min.js"></script>
    <script type="text/javascript" src="<?= $rootPath ?>js/libs/rzslider.js"></script>
    <script src="<?= $rootPath ?>js/libs/raphael-min.js"></script>
    <script src="<?= $rootPath ?>js/libs/morris.min.js"></script>
    <script src="<?= $rootPath ?>js/libs/angular-morris.min.js"></script>
    <script src="<?= $rootPath ?>js/angular_main.js"></script>
    <script src="<?= $rootPath ?>js/angular_section_angular_google_maps_controller.js"></script>
    <script src="<?= $rootPath ?>js/searchFormController.js"></script>
    <script src="<?= $rootPath ?>js/angular_section_1_controller.js"></script>
    <script src="<?= $rootPath ?>js/angular_section_7_controller.js"></script>
    <script src="<?= $rootPath ?>js/angular_section_8_controller.js"></script>
    <script src="<?= $rootPath ?>js/weatherController.js"></script>

    <script type="text/javascript" src="<?= $rootPath ?>js/angular_nav_top_trending_controller.js"></script>
    <script type="text/javascript" src="<?= $rootPath ?>js/angular_side_bar_controller.js"></script>
    <script type="text/javascript" src="<?= $rootPath ?>js/global_var.js"></script>
    <script type="text/javascript" src="<?= $rootPath ?>js/time_lineController.js"></script>
</head>
<?php include_once 'application/views/index.php'; ?>
