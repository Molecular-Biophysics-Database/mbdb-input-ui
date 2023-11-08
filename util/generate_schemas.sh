#! /bin/bash

function tsify_file() {
    echo $(echo "$1" | sed "s/_/-/g")".ts"
}

function tsify_var() {
	TSIFIED=""
	IFS="_" read -ra PARTS <<< "$1"
	for part in ${PARTS[@]}; do
		TSIFIED="${TSIFIED}${part^}"
	done

	echo $TSIFIED
}


function fail() {
    echo "Failed to convert $1, exiting prematurely..."
    exit 1
}


INPUT_PATH=../../mbdb-model/models/oarepo/
OUTPUT_PATH=../src/schema/schemas/

# Imports are not supposed to be used directly as models
# but they are used (=imported) by the actual models
# Imports allow us to factor out common parts of models
IMPORTS=(general_parameters)

# for imp in ${IMPORTS[@]}
# do
#     OUTFILE=$(tsify_file "${imp}")
#     OUTVAR=$(tsify_var "${imp}")
#     echo "Starting to convert $imp import"
#         ./make_ui_defn.py                     \
#         --input  "${INPUT_PATH}${imp}.yaml"   \
#         --output "${OUTPUT_PATH}${OUTFILE}"   \
#         --schema_name "$OUTVAR"               \
#         --partial                             \
#         || fail "$imp"
# 	echo "Finished converting imports"
# done

# MacOS uses older version of bash were some substitutions do not work
echo "Starting to convert general_parameters import"
        ./make_ui_defn.py                     \
        --input  "${INPUT_PATH}general_parameters.yaml"   \
        --output "${OUTPUT_PATH}general-parameters.ts"   \
        --schema_name GeneralParameters               \
        --partial                             \
        || fail "$imp"



MODELS=(MST BLI SPR)

for mod in ${MODELS[@]}
do
    OUTFILE=$(tsify_file "$(echo $mod|tr [A-Z] [a-z])")
    echo "Starting to convert $mod model" 
        ./make_ui_defn.py                     \
        --input  "${INPUT_PATH}${mod}.yaml"   \
        --output "${OUTPUT_PATH}${OUTFILE}"   \
        --schema_name "$mod"                  \
        --imported_defis General_parameters   \
        || fail "$mod"
echo "Finished converting models"
done

echo "All done"
