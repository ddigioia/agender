require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext'
require 'pry'
require 'rack'
require 'sinatra/reloader'

include Mongo

# SESSIONS
# use Rack::Session::Pool, :expire_after => 2592000

#MONGO SETUP
  #LOCAL
  # DB = Mongo::Connection.new.db("agender_app", :pool_size => 5, :timeout=> 5)

#LOCAL SETUP

configure do
  conn = MongoClient.new("localhost", 27017)
  set :mongo_connection, conn
  set :mongo_db, conn.db('agender_app')
end

LISTS = DB.collection('lists')
LISTITEMS = DB.collection('listItems')

# ROUTES

  # FRONT END
  get '/' do
    redirect to "index.html"
  end


#HELPER METHODS

helpers do
  # a helper method to turn a string ID
  # representation into a BSON::ObjectId
  def object_id(val)
    BSON::ObjectId.from_string(val)
  end

  def document_by_id(id)
    id = object_id(id) if String === id
    settings.mongo_db['agender_app'].
      find_one(:_id => id).to_json
  end
end


#API
get '/api/collections' do
  content_type :json
  settings.mongo_db.collection_names.to_json
end

get '/api/documents' do
  content_type :json
  settings.mongo_db['listItems'].find.to_a.to_json
end

# insert a new document from the request parameters,
# then return the full document
post '/api/new_document' do
  content_type :json
  new_id = settings.mongo_db['listItems'].insert params
  document_by_id(new_id)
end

# get '/api/:listItems' do
#   DB.collection(params[:listItems]).find.to_a.map{|list_item_id| from_bson_id(list_item_id)}.to_json

# end


#ADDITIONAL METHODS

def generate_rand_id
  id = SecureRandom.urlsafe_base64(23)
  list_ids = LISTS.find().to_a.map {|l| l["_id"]}
  (list_ids.include? id) ? generate_rand_id : id
end

