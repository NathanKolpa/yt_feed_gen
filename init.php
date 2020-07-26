<?php
class yt_feed_gen extends Plugin {

	private $host;

	function about() {
		return array(1.0,
			"Converts youtube channel urls to rss feeds when you paste them",
			"Nathan Kolpa");
	}

	function init($host) {
		$this->host = $host;
	}

	function hook_quick_add_feed() {
		?>
		test
		<?php
	}

	function get_js() {
		return file_get_contents(__DIR__ . "/init.js");
	}

	function api_version() {
		return 2;
	}
}
?>
