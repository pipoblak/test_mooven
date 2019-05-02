# README

* Requirements
  - Ruby 2.5.1
  - Rails 5.2.3
  - Yarn
  - ElasticSearch
  
* Ensure your elasticsearch is running on localhost:9200

* Run Following Commands:
  > bundle install
  
  > rake db:create
  
  > rake db:migrate
  
  > rake db:seed
  
  > yarn install
  
  > rake searchkick:reindex:all

* Start server 
  > rails s

* Tests available with RSPEC, RUN
  > rspec spec/\<DesiredTarget\>/\<TestName\>

  - availables Target
    - models
    - routing
    - requests
