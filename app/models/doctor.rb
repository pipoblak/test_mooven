class Doctor < ApplicationRecord
  validates :name, presence: true 
  validates :crm, presence: true , uniqueness: true 
  validates :phone, presence: true
  
end
