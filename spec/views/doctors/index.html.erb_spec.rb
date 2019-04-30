require 'rails_helper'

RSpec.describe "doctors/index", type: :view do
  before(:each) do
    assign(:doctors, [
      Doctor.create!(
        :name => "Name",
        :crm => "Crm",
        :phone => "Phone"
      ),
      Doctor.create!(
        :name => "Name",
        :crm => "Crm",
        :phone => "Phone"
      )
    ])
  end

  it "renders a list of doctors" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Crm".to_s, :count => 2
    assert_select "tr>td", :text => "Phone".to_s, :count => 2
  end
end
