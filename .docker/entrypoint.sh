#!/bin/bash

wait_for_postgres() {
  until pg_isready -h base_db_postgres -p 5432 -q -U postgres; do
    echo "Aguardando o PostgreSQL..."
    sleep 2
  done
  echo "O PostgreSQL está pronto."
}

wait_for_postgres

docker build -t base_api_restfull:v1.0 .
