Rails.application.routes.draw do

  root "pages#home"

  get "report", to: "pages#report"
  get "report/success", to: "pages#report_success"
  get "search", to: "pages#search"
  get "subscribe", to: "pages#subscribe"
  get "subscribe/success", to: "pages#subscribe_success"
  get "navigation", to: "pages#navigation"
  resources :reports, only: [:index, :create]
  resources :subscriptions, only: [:create]
  resources :categories, only: [:index]
  get "stats/categories", to: "stats#categories"

end
