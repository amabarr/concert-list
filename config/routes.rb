# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  namespace :api do
    namespace :v1 do
      get 'concerts/index'
      post 'concerts/create'
      get '/concerts/show/:id', to: 'concerts#show'
      delete '/concerts/destroy/:id', to: 'concerts#destroy'

      get 'artists/index'
      get '/artists/show/:id', to: 'artists#show'
      get '/artists/concerts_for_artist/:id', to: 'artists#concerts_for_artist'
    end
  end

  get '/*path' => 'home#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
end
