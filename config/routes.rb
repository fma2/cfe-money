Rails.application.routes.draw do

  # pages routes
  root 'welcome#index'
  get '/districts' => 'districts#index'

  # routes for ajax calls
  get '/school_districts' => 'districts#school_districts'
  get '/electoral_districts/:leg_chamber/:leg_district' => 'districts#electoral_districts'
  # school search route
  match '/search/:loc_code' => 'schools#search', via: [:get], as: "search" 

  # misc
  # get '/random' => 'schools#random40'
  
 end
