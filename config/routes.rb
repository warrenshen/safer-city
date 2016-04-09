Rails.application.routes.draw do

  root "pages#home"

  get "notify", to: "pages#notify"
  get "report", to: "pages#report"
  get "search", to: "pages#search"
  resources :reports, only: [:index, :create] do
    collection do
      get "/recent", to: "reports#recent"
    end
  end
  resources :subscriptions, only: [:create]

end
