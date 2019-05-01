Rails.application.routes.draw do
  resources :doctors
  get "/specialties" , to:"specialties#index"
  root to: "app#index"
end
