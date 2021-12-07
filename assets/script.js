var demo = new Moovie({
    selector: "#tvnjor",
    icons: {
         path: "https://raw.githubusercontent.com/BMSVieira/moovie.js/main/icons/"
    }
});

var video = demo.video;
var hls = new Hls();

const play = (name, url) => {
    document.getElementById('load_it').style.display = "block";
    document.getElementById('ch_title').innerHTML = name;
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
        document.getElementById('load_it').style.display = "none";
        document.getElementById('ch_input').value = "";
        document.getElementById('ch_input').dispatchEvent(new Event("keyup"));
    });
    demo.togglePlay();
}

if (Hls.isSupported()) {
    play('France 24 Français (1080p)','https://static.france24.com/live/F24_FR_HI_HLS/live_tv.m3u8');
}else{
    alert('Navigator not supported !')
}

var input = document.getElementById('ch_input');
input.onkeyup = function () {
    var filter = input.value.toUpperCase();
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        var name = lis[i].textContent;
        if (name.toUpperCase().indexOf(filter) == 0) 
            lis[i].style.display = 'list-item';
        else
            lis[i].style.display = 'none';
    }
}

fetch('/channels/bin.json')
.then(response => {
    document.getElementById('channel_list').innerHTML = ""
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(json => {
    json.map(elt => {
        document.getElementById('channel_list').innerHTML += "<li class='lk' onclick=\"play(\'" + elt["name"] + "\',\'" + elt["url"] + "\')\">" + elt["name"] + "</li>";
    });
})
.catch(function () {
    this.dataError = true;
});
