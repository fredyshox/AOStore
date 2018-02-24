#!/bin/bash

sql_stmt="CREATE IF NOT EXISTS DATABASE aos_db;";

db_password=${MYSQL_PASSWORD:=password};

mysql -u root -p$db_password <<< $sql_stmt;

if [[ $? -eq 0 ]]; then
  echo "Successfuly created database.";
else
  echo "Unable to create database.";
  exit 1;
fi;
