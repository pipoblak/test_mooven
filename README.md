# README

* Requirements
  - Ruby 2.5.1
  - Yarn
  - ElasticSearch

* Run Following Commands:

  > rake db:create
  
  > rake db:migrate
  
  > rake db:seed
  
  > yarn install
  
  > rake searchkick:reindex:all

* Ensure your elasticsearch is running on localhost:9200

* Start server 
  > rails s

* Tests available with RSPEC, RUN
  > rspec spec/\<DesiredTarget\>/\<TestName\>

  - availables Target
    - models
    - routing
    - requests
