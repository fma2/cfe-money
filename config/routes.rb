Rails.application.routes.draw do
  root 'welcome#index'

  match '/search/:loc_code' => 'schools#search', via: [:get], as: "search"
  get '/random' => 'schools#random40'
  get '/school_districts' => 'schools#districts'

  get '/districts' => 'welcome#districts'

  get '/electoral_districts/:leg_chamber/:leg_district' => 'schools#electoral_districts1'
 end
