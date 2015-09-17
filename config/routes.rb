Rails.application.routes.draw do
  root to: "site#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show]
    resources :tracks, only: [:show, :create, :destroy] do
      resources :plays, only: [:create]
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :show, :update, :destroy]
    end
  end

end
