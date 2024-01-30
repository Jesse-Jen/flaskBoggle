class BoggleGame{
  constructor(boardName, secs = 60){
    this.secs = secs
    //this.showTimer()
    this.score = 0
    this.words = new Set()
    this.board = $('#' + boardName)
    $('.yourword', this.board).on('submit', this.handleSubmit.bind(this))
}

showWord(word){
  $('.words', this.board).append(`<li>${word}</li>`)
}

showScore(){
  $('.score', this.board).text(this.score)
}

showMessage(msg, cls){
  $('.message', this.board).text(msg).removeClass().addClass(`message ${cls}`)
}

async handleSubmit(e){
  //stopping page from reloading
e.preventDefault()
let $word = $('.word', this.board)
let word = $word.val()
if(this.words.has(word)){
  this.showMessage(`${word} already used`, 'err')
  return
}
}



}