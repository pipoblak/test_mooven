require 'rails_helper'

RSpec.describe Doctor, type: :model do
  it "Doctor is valid when crm is unique and present, phone is present, name is present, has at least 2 specialties" do
    specialties = Specialty.create([{name: "Test Specialty 1"},{name: "Test Specialty 2"}])
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test", specialty_ids:[specialties[0].id,specialties[1].id])
    expect(doctor).to be_valid 
  end

  it "Doctor is Invalid when crm is not unique" do
    specialties = Specialty.create([{name: "Test Specialty 1"},{name: "Test Specialty 2"}])
    doctorX = Doctor.create(name: "Doctor Test", crm:"crm test", phone: "phone_test", specialty_ids:[specialties[0].id,specialties[1].id])
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test", specialty_ids:[specialties[0].id,specialties[1].id])
    doctor.valid?
    expect(doctor.errors[:crm]).to include('has already been taken')
  end

  it "Doctor is Invalid when name is missing" do
    doctor = Doctor.new(crm:"crm test", phone: "phone_test")
    expect(doctor).to be_invalid 
  end

  it "Doctor is Invalid when phone is missing" do
    doctor = Doctor.new(name:"Doctor Test",crm:"crm test")
    expect(doctor).to be_invalid 
  end

  it "Doctor is Invalid when hasn't at least 2 specialties" do
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test")
    expect(doctor).to be_invalid 
  end

  it "Doctor cant have equal specialties" do
    specialties = Specialty.create([{name: "Test Specialty 1"}])
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test", specialty_ids:[specialties[0].id,specialties[0].id])
    doctor.save
    specialty_with_error = doctor.doctor_specialties.select{|specialty| specialty.errors.full_messages.any? }.first
    expect(specialty_with_error.errors[:doctor_id]).to include('has already been taken')
  end
  
end
