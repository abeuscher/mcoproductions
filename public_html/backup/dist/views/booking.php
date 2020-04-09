<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MCO Productions | Booking</title>
    <link rel="icon" sizes="16x16 32x32" href="/favicon.ico">
    <meta name="author" content="Michael Oneill">
    <meta name="description" content="Book one of our DJ's for event trivia, DJ'ing, or master of ceremony work.">
    <meta name="keywords" content="booking trivia, book a dj, boston dj">
    <meta property="og:type" content="website">
    <meta property="og:url" content="www.mcoproductions.com">
    <meta property="og:title" content="Booking">
    <meta property="og:image">
    <meta property="og:description" content="Book one of our DJ's for event trivia, DJ'ing, or master of ceremony work.">
    <meta name="twitter:title" content="Booking">
    <meta name="twitter:description" content="Book one of our DJ's for event trivia, DJ'ing, or master of ceremony work.">
    <meta name="twitter:image">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="www.mcoproductions.com">
    <link href="https://fonts.googleapis.com/css?family=Fjalla+One|Droid+Sans" rel="stylesheet" type="text/css">
    <link href="/dist/css/screen.css" rel="stylesheet">
  </head>
  <body>
    <div id="bg-main"></div>
    <div id="wrapper">
      <header class="row">
        <div class="col-6-s"><a href="/"><img class="logo" alt="MCO Productions" src="img/logo.png"></a></div>
        <div class="col-6-s header-right">
          <ul>
            <li>New England Trivia &</li>
            <li>Dj Services</li>
            <li><a href="tel:6179017701">617-901-7701</a></li>
            <li><a class="email" href="#">info@mcoproductions.com</a></li>
          </ul>
        </div>
      </header>
      <nav class="row" id="main-nav">
        <div class="col-6-xs">
          <div class="hb-button"><span class="hamburger"></span>
            <p>menu</p>
          </div>
        </div>
        <div class="col-6-xs social">
          <p><a class="social-label" href="http://www.facebook.com/pages/Pop-Quiz-Team-Trivia/272936547653">LIKE US ON FACEBOOK</a><a class="fa fa-facebook-square" href="http://www.facebook.com/pages/Pop-Quiz-Team-Trivia/272936547653"></a></p>
        </div>
        <div class="drop">
          <ul>
            <li><a href="/home"><span class="fa fa-home"></span><span class="pagetitle">Home</span></a>
            </li>
            <li><a href="/hosts"><span class="fa fa-microphone"></span><span class="pagetitle">Hosts</span></a>
            </li>
            <li><a href="/contact"><span class="fa fa-phone"></span><span class="pagetitle">Contact</span></a>
            </li>
            <li><a href="/pub-trivia"><span class="fa fa-beer"></span><span class="pagetitle">Pub Trivia</span></a>
            </li>
            <li>
            </li>
            <li><a class="current" href="/booking"><span class="fa fa-calendar"></span><span class="pagetitle">Booking</span></a>
            </li>
          </ul>
        </div>
      </nav><?php foreach($page_data['text_blocks'] as $key => $block) {
  switch ($block["title"]) {
    case "Booking DJ Page":
      $content = $block;
      break;
    default:
      break;
  }
} ?>
      <div class="row content">
        <div class="col-12-xs">
          <h1>Book A DJ</h1>
          <div class="user-content"><?php echo $content["Content"]; ?></div>
        </div>
      </div>
      <footer>
        <p>&copy; 2017 MCO Productions. All rights reserved.</p>
      </footer>
    </div>
    <!--script(src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js")-->
    <!--script(src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASI4UENvuDCS3mBAnYjtmXz5ymla8KvFY")-->
    <script src="/dist/js/bundle.js"></script>
    <script>
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-25857481-7']);
      _gaq.push(['_trackPageview']);
      
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
  </body>
</html>