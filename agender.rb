require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'pry'
require 'rack'
require 'sinatra/reloader'

# SESSIONS
use Rack::Session::Pool, :expire_after => 2592000

#MONGO SETUP
  #LOCAL
  DB = Mongo::Connection.new.db("agender_app", :pool_size => 5, :timeout=> 5)

# ROUTES

  # FRONT END
  get '/' do
    redirect to '/index.html'
  end


  #API


