class SpecialtiesController < ApplicationController

  def index
    request.format = "json"
    @specialties = Specialty.all
    respond_to do |format|
      format.json { render json: @specialties}
    end
  end
end
