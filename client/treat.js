//////////////////////////////////
//   Application de jQuery UI   //
//////////////////////////////////

// -------------------------------//
//    Radios buttons jQuery UI    //
// -------------------------------//
$(function() {
    $("#instance").buttonset();
    $("#version").buttonset();
});

// ------------------------//
//    Boutons jQuery UI    //
// ------------------------//
$(function() {
    $("button").button(); // Tous les boutons seront skinnés
    $("button#updateAddFromServer").button({
        icons: {
            primary: "ui-icon-eject"
        } // Icône de disquette sur le bouton AddTag
    });
});

// ------------------------//
//       Notification      //
// ------------------------//
$(function() {
    $("#notification").notify({
        custom: true // Activation du theme jQuery UI
    });
});

function errorNotif(titre, message) {
    $("#notification").notify("create", "error", {
        title: titre,
        text: message
    }, {
        expires: false
    }); // Les erreurs sont sticky
}

function infoNotif(titre, message) {
    $("#notification").notify("create", "info", {
        title: titre,
        text: message
    });
}

// ------------------------//
//   Accordion jQuery UI   //
// ------------------------//
$(function() {
    $("#accordion").accordion({
        collapsible: true,
        // Whether all the sections can be closed at once. Allows collapsing the active section by the triggering event (click is the default).
        autoHeight: false // If set, the highest content part is used as height reference for all other parts. Provides more consistent animations.
    });
    $("#accordion").accordion({
        active: -1
    }); // Pass -1 to close all (only possible with collapsible:true )
});

/////////////////////////////////
//    Gestion des évènements   //
/////////////////////////////////

// ------------------------------------ //
// Click sur bouton updateAddFromServer //
// ------------------------------------ //
$(function() {
    
    var instance = $("#instance :radio:checked").attr("id");
    var version;
    if( $("#version :radio:checked").attr("id") == "master") {
        version = "master";
    } else {
        version = $("#tag").val();
    }
    
    $('#updateAddFromServer').click(function() {
        $.ajax({
            url: 'server/launchScript.php',
            data: {
                script: "install-addfromserver-plugin.sh " + version + " " + instance
            },
            success: function(data) {
                if (jQuery.parseJSON(data).status == "error") {
                    errorNotif("Update AddFromServer", jQuery.parseJSON(data).message);
                } else  {
                    infoNotif("Update AddFromServer", jQuery.parseJSON(data).commande);
                    getStatus(jQuery.parseJSON(data).logPath);
                }
            }
        });
    });
});

/////////////////////////////////
//          Toolbox            //
/////////////////////////////////

// ------------------------//
//  Suivi du script shell  //
// ------------------------//

// Récupération du statut en temps réel
function getStatus(logPath) {
    var timestamp = 0;
    var line = 0;
    var noerror = true;
    var finished = false;

    $.ajax({
        url: 'server/statut.php',
        datatype: 'json',
        data: {
            logPath: logPath,
            timestamp: timestamp,
            line: line
        },

        success: function(data) {
            if (jQuery.parseJSON(data).status == "error") {
                errorNotif("Update AddFromServer", jQuery.parseJSON(data).message);
                finished = true;
                noerror = true;
            }
            else {
                var time = jQuery.parseJSON(data).timestamp;
                if (time != timestamp) // Si le timestamp a changé
                {
                    timestamp = time;
                    $('#content').show();
                    $('#content').append(jQuery.parseJSON(data).log);
                }
        
                line = jQuery.parseJSON(data).line;
        
                if (jQuery.parseJSON(data).finished == "true") {
                    finished = true;
                    infoNotif("Update AddFromServer", "Script terminé");
                }
                noerror = true;
            }
        },

        complete: function() {
            // send a new ajax request when this request is finished
            if (!noerror) {
                // if a connection problem occurs, try to reconnect each 5 seconds
                setTimeout(function() {getStatus(logPath)}, 5000);
            }
            else {
                if (!finished) getStatus(logPath);
            }
            noerror = false;
        }
    });
}

// ------------------------//
//     Interface Piwigo    //
// ------------------------//