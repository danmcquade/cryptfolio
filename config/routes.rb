Rails.application.routes.draw do
  scope '/api' do
    resources :coins
    get 'positions/summary' => 'positions#summary'
    resources :positions
    post 'user_token' => 'user_token#create'
    get 'whoami' => 'positions#whoami'
  end
end
