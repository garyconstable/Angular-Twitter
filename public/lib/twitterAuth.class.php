<?php
/**
 * Twitter Auth - Token Generator
 * --
 * @category Twitter
 * @package public/lib/
 * @author Gary Constable <garyconstable80@gmail.com>
 * @copyright (c) 2016, Gary Constable
 * @version 0.1
 */
class twitterAuth extends twitterApp
{
  const ENDPOINT = 'https://api.twitter.com/oauth2/token';
  /**
   * Create the bearer token
   * --
   * @return String base 64 encoded combination of key and secret
   */
  private function getBearerToken()
  {
    $encoded_consumer_key = urlencode( self::KEY );
    $encoded_consumer_secret = urlencode(self::SECRET );
    return base64_encode($encoded_consumer_key.':'.$encoded_consumer_secret);
  }
  /**
   * Return the curl request headers
   * --
   * @return array curl request headers
   */
  private function getRequestHeaders()
  {
    return array(
      "POST /oauth2/token HTTP/1.1",
      "Host: api.twitter.com",
      "User-Agent: my Twitter App v.1",
      "Authorization: Basic ".$this->getBearerToken(),
      "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
      "Content-Length: 29",
    );
  }
  /**
   * Return the curel request data
   * --
   * @return String Client credentials
   */
  private function getData()
  {
    return 'grant_type=client_credentials';
  }
  /**
   * Make the curl request to twitter
   * --
   * @return String Curl response
   */
  private function makeCall()
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, self::ENDPOINT);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getRequestHeaders() );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $this->getData() );
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
  }
  /**
   * Retrieve the bearer token from Twitter
   * --
   * @return Array Curl response from Twitter
   */
  public function retrieveToken()
  {
    return $this->makeCall();
  }
}
