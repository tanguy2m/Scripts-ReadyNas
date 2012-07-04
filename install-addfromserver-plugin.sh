#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: install-addfromserver-plugin VERSION INSTANCE"
    echo "       Version = v2.3.a, v2.3.b ... ou master"
    echo "       Instance = prod ou dev"
    exit 1
fi

# Récupération du .tar.gz depuis le master GitHub
# https://github.com/tanguy2m/AddFromServer/tarball/master
# Ou pour les versions: https://github.com/tanguy2m/AddFromServer/tarball/v2.3.a
wget -P ~ -O AddFromServer-$1.tar.gz https://github.com/tanguy2m/AddFromServer/tarball/$1 --no-check-certificate

# Dézippage de l'archive directement dans le bon dossier
tar -zxf ~/AddFromServer-$1.tar.gz -C /c/www/piwigo-$2/bin/plugins/

# TODO: à supprimer
#cp -r /c/archive/Geek/Piwigo/AddFromServer/$1 /c/www/piwigo-$2/bin/plugins/
#mv /c/www/piwigo-$2/bin/plugins/$1 /c/www/piwigo-$2/bin/plugins/AddFromServer

# TODO: à conserver
#chown -R admin:admin /c/www/piwigo-$2/bin/plugins/AddFromServer/

# Suppression des fichiers temporaires
rm ~/AddFromServer-$1.tar.gz