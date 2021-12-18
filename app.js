function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);
        console.log("... file[" + i + "].type = " + file.type);

        if (file.name.endsWith(".xml")) {
          reader = new FileReader();

          reader.addEventListener(
            "load",
            () => {
              // this will parse the xml file
              var parser = new DOMParser();
              var xmlDoc = parser.parseFromString(reader.result, "text/xml");
              console.log(
                xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue
              );
            },
            false
          );

          reader.readAsText(file);
        }
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log(
        "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
      );
    }
  }
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}
