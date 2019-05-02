class DoctorsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_doctor, only: [:show, :update, :destroy]
  before_action :json_request
  
  # GET /doctors
  # GET /doctors.json
  def index
    @doctors = Doctor.all
    respond_to do |format|
      format.json { render json: @doctors.to_json(:methods => [:described_specialties, :specialty_ids])}
    end
  end

  # GET /doctors/1
  # GET /doctors/1.json
  def show
  end

  # POST /doctors
  # POST /doctors.json
  def create
    @doctor = Doctor.new(doctor_params)

    respond_to do |format|
      if @doctor.save
        format.json { render json: @doctor, status: :created}
      else
        format.json { render json: @doctor.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /doctors/1
  # PATCH/PUT /doctors/1.json
  def update
    respond_to do |format|
      if @doctor.update(doctor_params)
        format.json { render json: @doctor, status: :ok}
      else
        format.json { render json: @doctor.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /doctors/1
  # DELETE /doctors/1.json
  def destroy
    @doctor.destroy
    respond_to do |format|
      format.json { head :no_content}
    end
  end

  private
    def set_doctor
      @doctor = Doctor.find(params[:id])
    end

    def doctor_params
      params.require(:doctor).permit(:id, :name, :crm, :phone, specialty_ids:[])
    end

    def json_request
      request.format = "json"
    end 
end
