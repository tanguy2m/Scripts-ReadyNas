#!/bin/sh

# Suppression du dossier courant
rm -rf /c/www/Toolbox/bin/* 

# Récupération du .tar.gz depuis le master GitHub
# https://github.com/tanguy2m/Scripts-ReadyNas/tarball/master
wget -O /tmp/Toolbox.tar.gz https://github.com/tanguy2m/Scripts-ReadyNas/tarball/master --no-check-certificate

# Dézippage de l'archive directement dans le bon dossier en supprimant le dossier chapeau
tar -zxf /tmp/Toolbox.tar.gz -C /c/www/Toolbox/bin --strip-components 1

# Changement de propriétaire du dossier de destination
chown -R admin:admin /c/www/Toolbox/bin

# Rendre le script exécutable
chmod u+x /c/www/Toolbox/bin/scripts/*

# Suppression des fichiers temporaires
rm /tmp/Toolbox.tar.gz

echo "FIN"