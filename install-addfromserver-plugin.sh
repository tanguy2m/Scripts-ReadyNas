#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]; then
	echo "Usage: installPlugin VERSION INSTANCE, avec instance = prod ou dev"
	exit 1
fi

# Récupération du .tar.gz depuis le master GitHub
# TODO: https://github.com/tanguy2m/AddFromServer/tarball/master

# Dézippage de l'archive dasn un dossier temporaire
# TODO

# Copie des fichiers dans le bon dossier Piwigo
# TODO: à updater

cp -r /c/archive/Geek/Piwigo/AddFromServer/$1 /c/www/piwigo-$2/bin/plugins/
mv /c/www/piwigo-$2/bin/plugins/$1 /c/www/piwigo-$2/bin/plugins/AddFromServer
chown -R admin:admin /c/www/piwigo-$2/bin/plugins/AddFromServer/