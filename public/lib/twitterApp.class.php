<?php
/**
 * Twitter App
 * --
 * @category Twitter
 * @package public/lib/
 * @author Gary Constable <garyconstable80@gmail.com>
 * @copyright (c) 2016, Gary Constable
 * @version 0.1
 */
class twitterApp
{
  /**
   * Constants, keys and url
   * --
   */
  const KEY      = 'nIEwMo6mZO75yJEpCe7LpyI6S';
  const SECRET   = 'Gcn98sgF99tU7mnMv4fhuK6OV2TGLsfphXMhfZyyEZJ3Gvbv65';
  /**
   * Keep track on the class instance
   * --
   * @var Object twitterAuth
   */
  protected static $instance;
  /**
   * Can not return new instance of object
   * --
   */
  protected function __construct(){}
  /**
   * Can not make a clone
   * --
   */
  private function __clone(){}
  /**
   * Prevent unserializing
   * --
   */
  private function __wakeup(){}
  /**
   * Retrieve the single instance of this class, if is null create instance
   * --
   * @return Object twitterAuth
   */
  public static function getInstance()
  {
    if (!isset(static::$instance)) {
      static::$instance = new static;
    }
    return static::$instance;
  }
}
