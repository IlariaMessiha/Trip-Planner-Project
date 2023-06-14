#!/bin/bash

##
# Bootstrap
##
if [ -z "$BASH" ]
then
    "Error: You need to execute this script with bash"
    exit 1
fi

BIN_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROOT_DIR="$(cd "$BIN_DIR/.." && pwd)"

if [ -f .env.local ]; then
  export $(echo $(cat .env.local | sed 's/#.*//g'| xargs) | envsubst)
fi

# MySQL
LOCAL_POSTGRES_USER=postgres
LOCAL_POSTGRES_PASSWORD=postgres
LOCAL_DB_NAME=trip-planner

REMOTE_POSTGRES_USER=postgres
REMOTE_POSTGRES_HOST="containers-us-west-99.railway.app"
REMOTE_DB_PORT=5787
REMOTE_DB_NAME=railway


echo "Creating database ${LOCAL_DB_NAME} if it doesn't exist.."

docker exec -i "$(docker-compose ps -q postgres)" psql -U ${LOCAL_POSTGRES_USER} -c "CREATE DATABASE \"${LOCAL_DB_NAME}\""


echo "Dumping ${REMOTE_DB_NAME} data."

CONNECTION_STRING="postgresql://${REMOTE_POSTGRES_USER}:${REMOTE_POSTGRES_PASSWORD}@${REMOTE_POSTGRES_HOST}:${REMOTE_DB_PORT}/${REMOTE_DB_NAME}"

docker exec -i "$(docker-compose ps -q postgres)" bash -c "pg_dump -c --dbname=${CONNECTION_STRING} | psql -U ${LOCAL_POSTGRES_USER} ${LOCAL_DB_NAME}"

