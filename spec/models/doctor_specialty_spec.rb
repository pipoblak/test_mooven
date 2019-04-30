require 'rails_helper'

RSpec.describe DoctorSpecialty, type: :model do
  it "Doctor cant have equal specialties" do
    specialties = Specialty.create([{name: "Test Specialty 1"}])
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test", specialty_ids:[specialties[0].id,specialties[0].id])
    doctor.save
    specialty_with_error = doctor.doctor_specialties.select{|specialty| specialty.errors.full_messages.any? }.first
    expect(specialty_with_error.errors[:doctor_id]).to include('has already been taken')
  end
end
