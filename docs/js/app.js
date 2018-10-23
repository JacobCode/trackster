var Trackster = {};
const apiKey = '&api_key=336a3737af9be634072f5a4c03d2c607&format=json';
var $trackList = $('#track-list');

Trackster.renderTracks = function (tracks) {
    var $trackList = $('#track-list');

    $trackList.empty();

    if ($('input').val().length > 0) {
        for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
            var track = tracks[trackIndex];
            var mediumAlbumArt = track.image[1]["#text"];
            // layout of each track row
            var trackRow =
                '<div class="row track">' +
                '   <div class="col-sm-3 col-md-2 col-lg-2 hide-mobile"><img src="' + mediumAlbumArt + '"/></div>' +
                '   <div class="col-xs-5 col-sm-4 col-md-4 name-container"><p class="art-name">' + track.name + '</p></div>' +
                '   <div class="col-xs-4 col-sm-4 col-md-3"><p class="artist">' + track.artist + '</p></div>' +
                '   <div class="col-xs-2 col-sm-1 col-md-3 play"><p class="hide-tablet">' + track.listeners + '</p><a href="' + track.url + '" target="_blank">' +
                '       <i class="fas fa-play"></i></a>' +
                '   </div>' +
                '</div>';

            $trackList.append(trackRow);
        }
    }
};

Trackster.searchTracks = function (keyword) {
        $.ajax({
            url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + keyword + apiKey,
            success: function (response) {
                if ($('input').val().length > 0) {
                    Trackster.renderTracks(response.results.trackmatches.track);
                    $('title')[0].innerHTML = 'Trackster | ' + $('input')[0].value;
                    var resultsNum = $('#track-list')[0].childElementCount;
                    $('#results')[0].innerHTML = 'Results: ' + resultsNum;
                }
            }
        });
};

$(document).ready(function () {
    // submit when pressing search icon
    $('#search-button').click(function () {
        var inputValue = $('#search-input').val();
        Trackster.searchTracks(inputValue);
    });
    // submit when pressing enter key
    $('input').keypress(function (event) {
        var inputValue = $('#search-input').val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') { // == '13' for enter key
            Trackster.searchTracks(inputValue);
        }
    });
    $(window).on('scroll', function() {
        if (window.pageYOffset == $('#top .attributes')[0].offsetTop) {
            // var topHeight = $('#top')[0].clientHeight;
            // $('#top .attributes').css('top', topHeight);
            console.log('make fixed');
        }
    })
});