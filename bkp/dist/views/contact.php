<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MCO Productions | Contact</title>
    <link rel="icon" sizes="16x16 32x32" href="/favicon.ico">
    <meta name="author" content="Michael Oneill">
    <meta name="description" content="Contact MCO Productions for Pub Trivia and DJ Services in New England">
    <meta name="keywords" content="contact mco, pub trivia, find a dj">
    <meta property="og:type" content="website">
    <meta property="og:url" content="www.mcoproductions.com">
    <meta property="og:title" content="Contact">
    <meta property="og:image" content="">
    <meta property="og:description" content="Contact MCO Productions for Pub Trivia and DJ Services in New England">
    <meta name="twitter:title" content="Contact">
    <meta name="twitter:description" content="Contact MCO Productions for Pub Trivia and DJ Services in New England">
    <meta name="twitter:image" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="www.mcoproductions.com">
    <link href="https://fonts.googleapis.com/css?family=Fjalla+One|Droid+Sans" rel="stylesheet" type="text/css">
    <link href="/dist/css/screen.css" rel="stylesheet">
  </head>
  <body>
    <div id="bg-main"></div>
    <div id="wrapper">
      <header>
        <div class="row">
          <div class="col-sm-6"><a href="/"><img class="logo" alt="MCO Productions" src="img/logo.png"></a></div>
          <div class="col-sm-6 header-right">
            <ul>
              <li>New England Trivia &</li>
              <li>Dj Services</li>
              <li><a href="tel:6179017701">617-901-7701</a></li>
              <li><a class="email" href="#">info@mcoproductions.com</a></li>
            </ul>
          </div>
        </div>
      </header>
      <nav id="main-nav">
        <div class="row">
          <div class="col-xs-6">
            <div class="hb-button"><span class="hamburger">
                <div class="bar top"></div>
                <div class="bar middle"></div>
                <div class="bar bottom"></div></span>
              <p>menu</p>
            </div>
          </div>
          <div class="col-xs-6 social">
            <p><a class="social-label" href="http://www.facebook.com/pages/Pop-Quiz-Team-Trivia/272936547653">LIKE US ON FACEBOOK</a><a class="fa fa-facebook-square" href="http://www.facebook.com/pages/Pop-Quiz-Team-Trivia/272936547653"></a></p>
          </div>
          <div class="drop">
            <ul>
              <li><a href="/booking"><span class="fa fa-calendar"></span><span class="pagetitle">Booking</span></a>
              </li>
              <li><a href="/pub-trivia"><span class="fa fa-beer"></span><span class="pagetitle">Pub Trivia</span></a>
              </li>
              <li><a class="current" href="/contact"><span class="fa fa-phone"></span><span class="pagetitle">Contact</span></a>
              </li>
              <li><a class="current" href="/hosts"><span class="fa fa-microphone"></span><span class="pagetitle">Hosts</span></a>
              </li>
              <li><a class="current" href="/null"><span class="fa fa-home"></span><span class="pagetitle">Home</span></a>
              </li>
              <li><a class="current" href="/remote-game-info"><span class="fa fa-camera"></span><span class="pagetitle">Remote Game Info</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav><?php foreach($page_data['text_blocks'] as $key => $block) {
  switch ($block["title"]) {
    case "Contact Page":
      $content = $block;
      break;
    default:
      break;
  }
} ?>
      <div class="container-fluid content">
        <div class="row">
          <div class="col-xs-12">
            <h1><?php echo $content["header"] ?></h1>
            <div class="user-content"><?php echo $content["Content"]; ?></div>
          </div>
        </div>
        <div class="row booking">
          <div class="col-sm-12"><?php cockpit("forms:open", "contact"); ?>
            <div class="form-message-success">
              <p>Thank You! I'll get back to you real soon..</p>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="name">Name</label>
                <input id="name" name="form[name]">
              </div>
              <div class="col-sm-6">
                <label for="email">Email</label>
                <input id="email" name="form[email]">
              </div>
              <div class="col-sm-12">
                <label for="message">Message</label>
                <textarea id="message" name="form[message]"></textarea>
              </div>
              <div class="col-sm-12">
                <button class="button" type="submit">Send</button>
              </div>
            </div></form>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2020 MCO Productions. All rights reserved.</p>
      </footer>
    </div>
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