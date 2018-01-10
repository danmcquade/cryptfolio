Rails.application.routes.draw do
  scope '/api' do
    resources :coins
    resources :positions
    post 'user_token' => 'user_token#create'
  end
end
