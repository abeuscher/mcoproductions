<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MCO Productions | Home</title>
    <link rel="icon" sizes="16x16 32x32" href="/favicon.ico">
    <meta name="author" content="Michael Oneill">
    <meta name="description" content="MCO Productions provides pub trivia and DJ services  in New Hampshire, Massachusetts, and Rhode Island.">
    <meta name="keywords" content="trivia, boston trivia, michael oneill, mco productions, event trivia, pub trivia, boston pub trivia">
    <meta property="og:type" content="website">
    <meta property="og:url" content="www.mcoproductions.com">
    <meta property="og:title" content="Home">
    <meta property="og:image" content="">
    <meta property="og:description" content="MCO Productions provides pub trivia and DJ services  in New Hampshire, Massachusetts, and Rhode Island.">
    <meta name="twitter:title" content="Home">
    <meta name="twitter:description" content="MCO Productions provides pub trivia and DJ services  in New Hampshire, Massachusetts, and Rhode Island.">
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
              <li><a href="/contact"><span class="fa fa-phone"></span><span class="pagetitle">Contact</span></a>
              </li>
              <li><a href="/hosts"><span class="fa fa-microphone"></span><span class="pagetitle">Hosts</span></a>
              </li>
              <li><a class="current" href="/null"><span class="fa fa-home"></span><span class="pagetitle">Home</span></a>
              </li>
              <li><a class="current" href="/remote-game-info"><span class="fa fa-camera"></span><span class="pagetitle">Remote Game Info</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav><?php $item = null;
$page_data = $page_data;
foreach($page_data['text_blocks'] as $key => $block) {
  switch ($block["title"]) {
    case "Front Page Trivia":
      $trivia_blurb = $block;
      break;
    case "Front Page DJ Services":
      $dj_blurb = $block;
      break;
    case "Book Section Header":
      $book_blurb = $block;
      break;
    case "Covid Announcement":
      $covid_blurb = $block;
      break;
    default:
      break;
  }
} ?>
      <div class="container-fluid">
        <div class="row content">
          <div class="col-md-8">
            <div class="row vtop">
              <div class="col-md-6">
                <div class="block about-trivia">
                  <div class="user_content">
                    <h1><?php echo $trivia_blurb["header"]; ?></h1>
                    <div><?php echo $trivia_blurb["Content"]; ?></div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="block book-dj">
                  <div class="user_content">
                    <h1><?php echo $dj_blurb["header"]; ?></h1>
                    <div><?php echo $dj_blurb["Content"]; ?></div>
                  </div>
                </div>
              </div>
              <div class="col-md-12"><a class="button cta" href="/contact">Book Trivia or a DJ</a></div>
              <div class="col-xs-12">
                <div class="block the-book">
                  <div class="user_content">
                    <h1><?php echo $book_blurb["header"]; ?></h1>
                    <div><?php echo $book_blurb["Content"]; ?></div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 book-bucket">
                <div class="block"><img src="../../../../img/book-image.jpg" alt=""></div>
              </div>
              <div class="col-sm-6">
                <div class="block">
                  <h2>Press</h2>
                  <blockquote>The Best Bar Trivia Book Ever arms you with the knowledge your team needs to annihilate your bar trivia competition.<a href="http://www.nerdprobs.com/feature/book-review-the-best-bar-trivia-book-ever-all-you-need-for-pub-quiz-domination-by-michael-oneill/">~ nerdprobs.com</a></blockquote>
                  <ul class="press"><?php foreach($page_data['press'] as $val) {
  echo "<li><a href='".$val["link"]."'>" . $val["organization"] . "</a></li>";
} ?>
                  </ul>
                  <h2>Retailers
                    <ul class="retailers"><?php foreach($page_data['retailers'] as $val) {
  echo "<li><a href='". $val["Link"]."'><img src='" . $val["Image"]["path"] . "' alt='". $val["Name"]."' title='". $val["Name"]."' /></a></li>";
} ?>
                    </ul>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="block trivia">
              <div class="trivia-widget" id="triviaWidget"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-overlay" id="bookingModal">
        <div class="modal">
          <div class="inner booking"><a class="btn-close" href="#">&times;</a><?php cockpit("forms:open", "booking"); ?>
            <div class="form-message-success">
              <p>Thank You! I'll get back to you real soon..</p>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label for="name">Name</label>
                <input id="name" name="form[name]">
              </div>
              <div class="col-sm-6">
                <label for="business">Name of Your Business</label>
                <input id="name" name="form[business]">
              </div>
              <div class="col-sm-6">
                <label for="email">Email</label>
                <input id="email" name="form[email]">
              </div>
              <div class="col-sm-6">
                <label for="dayOfWeek">Day of week (if recurring)</label>
                <select id="day_of_week" name="form[dayOfWeek]">
                  <option value="" selected>select day</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
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