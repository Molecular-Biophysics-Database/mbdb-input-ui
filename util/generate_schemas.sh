#! /bin/bash


INPUT_PATH=../../mbdb-model/models/oarepo/
OUTPUT_PATH=../src/schema/schemas/

MODELS=(MST BLI SPR)

for mod in ${MODELS[@]}
do
echo "Starting to convert $mod model"
    ./make_ui_defn.py                  \
    --input $INPUT_PATH$mod.yaml       \
    --output $OUTPUT_PATH"${mod,,}".ts \
    --schema_name $mod
echo "Finished"
done
