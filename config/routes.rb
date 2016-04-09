Rails.application.routes.draw do

  root "pages#home"

  get "navigation", to: "pages#navigation"
  get "reports/recent", to: "reports#recent"
  get "search", to: "pages#search"
  get "submit", to: "pages#submit"
  get "submit/success", to: "pages#submit_success"
  get "subscribe", to: "pages#subscribe"
  get "subscribe/success", to: "pages#subscribe_success"
  resources :reports, only: [:create, :index, :show] do
    collection do
      get "hourly_stats", to: "reports#hourly_stats"
    end
  end
  resources :subscriptions, only: [:create]
  resources :categories, only: [:index]

end
