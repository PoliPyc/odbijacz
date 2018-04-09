// ==UserScript==
// @name         Odbijacz
// @namespace    http://https://github.com/poliakustyczny/odbijacz/
// @updateURL    https://raw.githubusercontent.com/poliakustyczny/odbijacz/master/odbijacz.js
// @version      0.3.2
// @description  Odbijacz do OTT
// @author       Poliakustyczny
// @match        https://oldtimeturtle.com
// @match        https://oldtimeturtle.com/*
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

    if(rfid){
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
        $('#rfid-push').on('click', pushRfid);
    }
    

    function checkStatus(){
        let matches = [];
        let userName = $('.user-panel .info p').text();
        let reg = new RegExp(userName, "igm");
        $.ajax({
            url: 'https://oldtimeturtle.com/all',
            async: false,
            success: function(data){
               matches = data.match(reg);
            }
        });
        if(matches.length < 3){
            return false;
        } else {
            return true;
        }
    }

    function pushRfid(){
        $.ajax({
            url: 'https://oldtimeturtle.com/rfid/' + rfid,
            success: function(data){
               changeButtonStatus();
            }
        });
    }

    function changeButtonStatus(){
        let status = checkStatus();
        if(status){
            color = 'btn-success';
        } else {
            color = 'btn-danger'
        }

        $('#rfid-push').removeClass('btn-success btn-danger');
        $('#rfid-push').addClass(color);
    }
})();

