function addElement() {
  // erstelle ein neues div Element
  // und gib ihm etwas Inhalt
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode("Hi there and greetings!");
  newDiv.appendChild(newContent); // füge den Textknoten zum neu erstellten div hinzu.

  // füge das neu erstellte Element und seinen Inhalt ins DOM ein
  document.getElementById("drop_zone").appendChild(newDiv);
  console.log("here I am ");
}

function deleteElementById(id) {
  try {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
  } catch (e) {
    console.log(e);
  }
}

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
                "first tile is: ",
                xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue
              );
              var books = xmlDoc.getElementsByTagName("book");
              for (i = 0; i < books.length; i++) {
                console.log(
                  "in the for loop: ",
                  books[i].getElementsByTagName("author")[0].innerHTML
                );
              }

              //here I can add and remove elements to show the results:
              // addElement();
              // deleteElementById("dropBoxText");
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
      console.log("the browser does not support DataTransferItemList!");
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
