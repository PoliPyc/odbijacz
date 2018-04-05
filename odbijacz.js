// ==UserScript==
// @name         Odbijacz
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Poliakustyczny
// @match        http://oldtimeturtle.com
// @match        http://oldtimeturtle.com/users/edit
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// ==/UserScript==

(function() {
    'use strict';

    let endpoint = window.location.pathname;
    console.log(endpoint);
    if(endpoint == '/users/edit'){
       $.cookie('rfid_token', $('#user_rfid_number').val(), { expires: 356, path:'/' });
        console.log('cookie set');
    }

    let rfid = $.cookie('rfid_token');

    let status = checkStatus();
    let color;
    if(status){
        color = 'btn-success';
    } else {
        color = 'btn-danger'
    }

    console.log(status);
    if(rfid){
        console.log(rfid);
        let rfidButton = $('<button/>',
        {
            id: 'rfid-push',
            class: 'btn ' + color,
            style: 'height: 56px;',
            text: 'Odbij',
            click: function () { console.log(rfid); }
        });

        let parent = $('<li></li>').append(rfidButton);
        $(".navbar-custom-menu > ul").prepend(parent);
        //$('#rfid-push').on('click', pushRfid());
    }
    

    function checkStatus(){
        let status;
        let userName = $('.user-panel .info p').text();

        $.ajax({
            url: 'http://oldtimeturtle.com/all',
            success: function(data){
               status = data.indexOf(userName);
            }
        });
        if(status === -1){
            return false;
        } else {
            return true;
        }
    }

    function pushRfid(){
        $.ajax({
            url: 'http://oldtimeturtle.com/rfid/' + rfid,
            success: function(data){
               console.log('rfid pushed');
            }
        });
    }
})();
