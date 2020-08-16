#!/bin/bash

echo "Install? (y/n) \n"
read install

yes="y"

if [ "$install" = "$yes" ];
    then

    echo "Installing .. \n"
    cd ../main
    
	npm install
	npm install mysql --save
	npm install discord.js --save

    echo "Install sucessfull... \n"
fi

echo "Program stopped."