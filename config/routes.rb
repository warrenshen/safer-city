Rails.application.routes.draw do

  root "pages#home"

  get "report", to: "pages#report"
  get "search", to: "pages#search"
  get "subscribe", to: "pages#subscribe"
  get "subscribe/success", to: "pages#subscribe_success"
  resources :reports, only: [:index, :create]
  resources :subscriptions, only: [:create]
  resources :categories, only: [:index]
  get "stats/categories", to: "stats#categories"

end
