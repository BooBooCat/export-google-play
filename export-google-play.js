alert("Please scroll through the playlist so that each album is visible once.\n" + 
      "Then double-click the page to export a spreadsheet.");

var albums = ["Artist,Album,Purchased"];

var addVisibleAlbums = function(){
	[].forEach.call(document.querySelectorAll(".song-row"), function(e){ 
		var albumNodes = [e.querySelector("td[data-col='artist']"), 
				e.querySelector("td[data-col='album']"),
				e.querySelector("td[data-col='title'] .title-right-items")];

		var albumString = albumNodes.map(function(s){ 
			return s.innerText.trim().replace(/,/g,""); 
		}).join(",");
 
		if(albums.indexOf(albumString) === -1){
			albums.push(albumString); console.log("Added: " + albumString)
		}
	});
}

var createCsv = function(){
    var csv = "data:text/csv;charset=utf-8,";
    albums.forEach(function(row){ csv += row + "\n"; }); 

    var uri = encodeURI(csv);
    var link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "export-google-play.csv");
    document.body.appendChild(link);
    link.click(); 

    alert("Download beginning!")
}

document.body.addEventListener("DOMNodeInserted", addVisibleAlbums, false);
document.body.addEventListener("dblclick", createCsv, false);
