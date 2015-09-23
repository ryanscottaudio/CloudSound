Rails.application.routes.draw do

  root to: "site#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :update, :show, :destroy, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :tracks, only: [:show, :create, :destroy, :index] do
      resources :plays, only: [:create]
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :update, :destroy]
    end
  end

  get "auth/:provider/callback", to: "api/sessions#omniauth", defaults: {format: :json}

end
