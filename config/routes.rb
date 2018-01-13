Rails.application.routes.draw do
  scope '/api' do
    get 'coins/list' => 'coins#list'
    get 'coin_symbol/:id' => 'coins#symbol_lookup'
    resources :coins
    get 'positions/summary' => 'positions#summary'
    get 'positions/delete/:id' => 'positions#delete'
    resources :positions
    post 'user_token' => 'user_token#create'
    get 'whoami' => 'positions#whoami'
  end
  resources :users, only: [:create]
end
