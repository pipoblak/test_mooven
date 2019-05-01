json.extract! doctor, :id, :name, :crm, :phone, :created_at, :updated_at, :described_specialties
json.url doctor_url(doctor, format: :json)
