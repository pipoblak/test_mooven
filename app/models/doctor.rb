class Doctor < ApplicationRecord
  searchkick word_start: [:name, :crm]

  has_many :doctor_specialties, dependent: :destroy
  has_many :specialties, through: :doctor_specialties, dependent: :destroy

  validates :name, presence: true 
  validates :crm, presence: true , uniqueness: true 
  validates :phone, presence: true
  validates :specialty_ids, presence: true, length: {minimum: 2}

  accepts_nested_attributes_for :specialties, allow_destroy: true

  def described_specialties
    specialties.map{|specialty| specialty.name}.join(', ')
  end 
end
