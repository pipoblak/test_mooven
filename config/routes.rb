Rails.application.routes.draw do
  resources :doctors do
    collection do
      get :search
    end 
  end
  get "/specialties" , to:"specialties#index"
  root to: "app#index"
end
