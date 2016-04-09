Rails.application.routes.draw do

  root "pages#home"

  get "search", to: "pages#search"
  get "submit", to: "pages#submit"
  get "submit/success", to: "pages#submit_success"
  get "subscribe", to: "pages#subscribe"
  get "subscribe/success", to: "pages#subscribe_success"
  get "navigation", to: "pages#navigation"
  resources :reports, only: [:create, :index, :show]
  resources :subscriptions, only: [:create]
  resources :categories, only: [:index]

end
