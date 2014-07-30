require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'pry'
require 'rack'
require 'sinatra/reloader'

# SESSIONS
use Rack::Session::Pool, :expire_after => 2592000


# ROUTES

  # FRONT END
  get '/' do
    redirect to '/index.html'
  end

