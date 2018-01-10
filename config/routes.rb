Rails.application.routes.draw do
  scope '/api' do
    resources :coins
    get 'positions/summary' => 'positions#summary'
    get 'positions/delete/:id' => 'positions#delete'
    resources :positions
    post 'user_token' => 'user_token#create'
    get 'whoami' => 'positions#whoami'
  end
end
