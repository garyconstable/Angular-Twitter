<?php

class twitterTimeline extends twitterApp
{
  const ENDPOINT = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  /**
   * Get the current site url and protocal
   * --
   * @return String The site url
   */
  function siteURL()
  {
    $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ||
    $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $domainName = $_SERVER['HTTP_HOST'];
    return $protocol.$domainName;
  }
  /**
   * Create the bearer token
   * --
   * @return String base 64 encoded combination of key and secret
   */
  private function getToken()
  {
    $a_arr = json_decode(file_get_contents( $this->siteURL() . '/twitter/token' , true), TRUE);
    return isset($a_arr['access_token']) ? $a_arr['access_token'] : null;
  }
  /**
   * Return the curl request headers
   * --
   * @return array curl request headers
   */
  private function getRequestHeaders()
  {
    return array(
      "Authorization: Bearer ".$this->getToken(),
    );
  }
  /**
   * Return the curel request data
   * --
   * @return String Client credentials
   */
  private function getData()
  {
    return array();
  }
  /**
   * Build the query to fetch results from Twitter
   * --
   * @return String params written as query string.
   */
  public function buildQuery()
  {
    $params = array(
      'count' => 100
    );
    if(isset($_GET['username'])){
      $params['screen_name'] = $_GET['username'];
    }
    return '?' . http_build_query($params);
  }
  /**
   * Make the curl request to twitter
   * --
   * @return String Curl response
   */
  private function makeCall()
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, self::ENDPOINT . $this->buildQuery() );
    curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getRequestHeaders() );
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
  }
  /**
   * Retrieve the bearer token from Twitter
   * --
   * @return Array Curl response from Twitter
   */
  public function queryTwitter()
  {
    return $this->makeCall();
  }
}
