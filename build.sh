#!/bin/bash
if [[ $1 == "prod" ]];
	then
cat >.env <<EOL
NODE_PATH=./src
REACT_APP_API_URL=''
REACT_APP_ENV='production'

EOL
echo "Production environment created"

elif [[ $1 == "stage" ]];
	then
cat >.env <<EOL
NODE_PATH=./src
REACT_APP_API_URL=''
REACT_APP_ENV='stage'

EOL
echo "Stage environment created"

elif [[ $1 != "" ]];
	then
cat >.env <<EOL
NODE_PATH=./src
REACT_APP_API_URL=''
REACT_APP_ENV='development'

EOL
echo "Developers environment created"


else 
echo "Provide a parameter to create the environment. You can use 'prod', 'stage', or a dev's name like 'duke' or 'foogee'"
fi
