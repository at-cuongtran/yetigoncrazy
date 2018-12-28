const editor = new MediumEditor('.editor', {
  toolbar: {
      /* These are the default options for the toolbar,
         if nothing is passed this is what is used */
      allowMultiParagraphSelection: true,
      buttons: ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'quote'],
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
      updateOnEmptySelection: false
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
  $('#save').on('click', () => {
    console.log(editor.serialize());
  });
})
