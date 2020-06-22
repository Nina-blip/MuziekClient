"use strict";

//let albumsUrl = "http://localhost:8008/albums/";

document.getElementById("zoeken").onclick = function () {
    if (validatie()) {
        const albumUrl = maakAlbumUrl();
        haalAlbumOp(albumUrl);
    }
}

function validatie() {
    const albumId = document.getElementById("albumId");
    if (albumId.checkValidity()) {
        document.getElementById("albumIdFout").style.display = "none";
        return true;
    } else {
        document.getElementById("albumIdFout").style.display = "block";
        return false;
    }
}

function maakAlbumUrl() {
    const albumId = document.getElementById("albumId").value;
    return "http://localhost:8008/albums/" + albumId;
}


async function haalAlbumOp(url) {
    const response = await fetch(url);
    if (response.ok) {
        document.getElementById("nietGevonden").style.display = "none";
        const album = await response.json();
        maakDetails(album);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
}

function maakDetails(album) {
    document.getElementById("detail").style.display = "block";
    document.getElementById("naam").innerText = album.album;
    document.getElementById("artiest").innerText = album.artiest;
    const tracklistUrl = album._links.tracks.href;
    maakTrackList(tracklistUrl);

}

async function maakTrackList(url) {
    const response = await fetch(url);
    if (response.ok) {
        document.getElementById("trackFout").style.display = "none";
        const tracklist = await response.json();
        const trackOl = document.getElementById("tracks");
        for (const track of tracklist) {
            const li = document.createElement("li");
            const tekst = track.naam + " (" + track.tijd.slice(4, track.tijd.length) + ")";
            li.innerText = tekst;
            trackOl.appendChild(li);
        }
    } else {
        document.getElementById("trackFout").style.display = "block";
    }
}

