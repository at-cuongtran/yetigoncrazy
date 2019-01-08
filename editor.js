
var HighlighterButton = MediumEditor.Extension.extend({
  name: 'highlighter',

  init: function () {
    this.classApplier = rangy.createClassApplier('highlight', {
        elementTagName: 'mark',
        normalize: true
    });
    console.log('init: ', this);
    this.button = this.document.createElement('button');
    this.button.classList.add('medium-editor-action');
    this.button.innerHTML = '<i class="fa fa-paint-brush"></i>';
    this.button.innerHTML = '<b>H</b>';
    
    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  getButton: function () {
    return this.button;
  },

  handleClick: function (event) {
    this.classApplier.toggleSelection();

    // Ensure the editor knows about an html change so watchers are notified
    // ie: <textarea> elements depend on the editableInput event to stay synchronized
    this.base.checkContentChanged();
  }
});

const editor = new MediumEditor('.editor', {
  toolbar: {
      /* These are the default options for the toolbar,
         if nothing is passed this is what is used */
      allowMultiParagraphSelection: true,
      buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'anchor', 'h1', 'h2', 'h3', 'id'],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
      relativeContainer: null,
      standardizeSelectionStart: false,
      static: false,
      /* options which only apply when static is true */
      align: 'center',
      sticky: false,
      updateOnEmptySelection: false,
    },
    buttonLabels: 'fontawesome',
  spellcheck: false,
  extensions: {
    'highlighter': new HighlighterButton(),
    'id': new IDForm()
  }
});

const triggerAutoSave = (event, editable) => {
  save();
};
const throttledAutoSave = MediumEditor.util.throttle(triggerAutoSave, 2000); // 1 second
// Listening to editable events starts here
editor.subscribe('editableInput', throttledAutoSave);


const save = () => {
  // call ajax to save data
  // update google map
}

$(() => {
  $('#save').on('click', function() {
    var mapUrl = $('#mymap').val();
    if (mapUrl) {
      new google.maps.KmlLayer({
        url: mapUrl,
        map: map
      });
      fetchKml(mapUrl)
        .then(v => {
          var placemarks = v.kml.Document.Folder.Placemark;
          
          console.log(v.kml.Document.Folder.Placemark);
          
        })
    }
  })
})

const fetchKml = function(url) {
  return fetch(`${url}&forcekml=1`)
      .then(response => response.text())
      .then(d => {
        return JSON.parse(xml2json(d, {compact: true, spaces: 2}));
      })
}

// fetchKml('http://www.google.com/maps/d/kml?mid=1lEe_sgnXv9bwxQG2Ea1dBcYBFRIC9gAh')
//   .then(v => {
//     console.log(v);
//   });
