Rails.application.routes.draw do

  # pages routes
  root 'welcome#index'
  get '/why' => 'welcome#why'
  get '/how' => 'welcome#how'
  get '/resources' => 'welcome#resources'
  get '/districts' => 'districts#index'
  
  # get '/schools/:location/:school_id' => 'schools#show'

  # routes for ajax calls
  get '/school_districts' => 'districts#school_districts'
  get '/electoral_districts/:leg_chamber/:leg_district' => 'districts#electoral_districts'

  # school search route
  match '/search/:loc_code' => 'schools#search', via: [:get], as: "search" 

  # misc
  get '/bitly/new' => 'bitly#new'
  # get '/random' => 'schools#random40'

  
 end
