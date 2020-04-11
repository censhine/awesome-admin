export default {
  name: 'awadmin',
  icon: './lib/UEditor/button-icon/awadmin.png',
  tip: 'AWAdmin',
  handler: (editor, name) => {
    editor.execCommand('inserthtml', ``)
  }
}
