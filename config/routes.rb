Rails.application.routes.draw do

  root "pages#home"

  get "report", to: "pages#report"
  get "search", to: "pages#search"

end
