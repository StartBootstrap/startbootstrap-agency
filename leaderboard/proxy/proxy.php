<?php
//language
if(!paramExists("lang")) {respond("missing parameter!");}
$language=$_REQUEST["lang"];

//username
if(!paramExists("user")) {respond("missing parameter!");}
$username=$_REQUEST["user"];

//create the request url
$apiUrl="http://$language.wikipedia.org/w/api.php?action=feedcontributions&format=xml&feedformat=rss&user=$username";

//fetch the data
$apiResponse=file_get_contents($apiUrl);

//echo the data
echo $apiResponse;

function paramExists($param, $empty=false) {
	if(isset($_REQUEST[$param])) {
		if(!$empty&&empty($_REQUEST[$param])) {return false;}
		return true;
	}
	return false;
}

function respond($message) {
	echo "<?xml version='1.0'?>\n";
	echo "<proxy>\n";
	echo "\t<message>\n";
	echo "\t\t".$message."\n";
	echo "\t</message>\n";
	echo "</proxy>\n";
	exit();
}

?>
