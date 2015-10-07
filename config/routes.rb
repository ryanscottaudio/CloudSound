Rails.application.routes.draw do

  root to: "site#root"
  get ":username", to: "site#find_by_username"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :update, :show, :destroy, :index] do
      resources :tracks, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]
    resources :tracks, only: [:show, :create, :destroy] do
      resources :plays, only: [:create]
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :update, :destroy]
    end
    resources :follows, only: [:create, :destroy]
    get "/search", to: "static_pages#search"
    get "/explore", to: "static_pages#explore"
    get "/feed", to: "static_pages#feed"
  end

  get "auth/:provider/callback", to: "api/sessions#omniauth", defaults: {format: :json}


end
