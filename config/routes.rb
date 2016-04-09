Rails.application.routes.draw do

  root "pages#home"

  get "notify", to: "pages#notify"
  get "report", to: "pages#report"
  get "search", to: "pages#search"
  resources :reports, only: [:index]
  resources :subscriptions, only: [:create]

end
