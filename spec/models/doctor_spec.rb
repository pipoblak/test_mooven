require 'rails_helper'

RSpec.describe Doctor, type: :model do
  it "Doctor is valid when crm is unique and present, phone is present, name is present" do
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test")
    expect(doctor).to be_valid 
  end

  it "Doctor is Invalid when crm is not unique" do
    doctorX = Doctor.create(name: "Doctor Test", crm:"crm test", phone: "phone_test")
    doctor = Doctor.new(name: "Doctor Test", crm:"crm test", phone: "phone_test")
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
  
end
