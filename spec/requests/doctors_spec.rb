require 'rails_helper'

RSpec.describe "Doctors", type: :request do
  describe "GET /doctors" do
    it "Recieve Status 200 in /GET Doctors" do
      get doctors_path
      expect(response).to have_http_status(200)
    end
    it "Recieve a JSON Array response in /GET Doctors" do
      get doctors_path
      parsed_body = JSON.parse(response.body)
      expect(parsed_body.class).to eq(Array)
    end
  end
  describe "POST /doctors" do
    it "Recieve Status 201 in /POST Doctors" do
      specialties = Specialty.create([{name: "Test Specialty 1"},{name: "Test Specialty 2"}])
      post doctors_path(doctor: {name: "Doctor Test", crm:"crm test", phone: "phone_test", specialty_ids:[specialties[0].id,specialties[1].id]})
      expect(response).to have_http_status(201)
    end
  end
end
