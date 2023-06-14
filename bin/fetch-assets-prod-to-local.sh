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

wget -P Backoffice/data/uploads/  -i $BIN_DIR/upload_urls.txt