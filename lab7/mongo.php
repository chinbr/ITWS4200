
<?php
echo '<html>';
echo '<link href="style2.css" rel="stylesheet">';
echo '<body>';
try {
$mongo = new Mongo();
$cursor = $mongo->tweets->tweets->find();
echo '<div id="content">';

  foreach ($cursor as $obj) {
    echo '<div class="user">' . $obj['user_name'] . '<br/></div>';
	echo  '<div class="tweet">' . $obj['text'] . '<br/></div>';
    echo '<br/>';
  }
} catch (MongoConnectionException $e) {
  die('Error connecting to MongoDB server');
}
echo '</div>';
echo '</body>';
echo '</html>';