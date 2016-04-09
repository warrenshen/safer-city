Rails.application.routes.draw do

  root "pages#home"

  get "report", to: "pages#report"
  get "search", to: "pages#search"
  get "subscribe", to: "pages#subscribe"
  resources :reports, only: [:index, :create]
  resources :subscriptions, only: [:create]
  resources :categories, only: [:index]

end
