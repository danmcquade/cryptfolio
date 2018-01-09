Rails.application.routes.draw do
  scope '/api' do
    post 'user_token' => 'user_token#create'
  end
end
