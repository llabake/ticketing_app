Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :events, only: %i[index show create update destroy]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
