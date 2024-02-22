class BoggleGame{
    constructor(boardName, secs = 60){
      this.secs = secs
      this.showTimer()
      this.score = 0
      this.words = new Set()
      this.board = $('#' + boardName)
      this.timer = setInterval( this.tick.bind(this),1000)
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

    const res = await axios.get("/check-word", { params: { word: word }});
    if (res.data.result === "not-word") {
      this.showMessage(`${word} is not a valid English word`, "err");
    } else if (res.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word on this board`, "err");
    } else {
    // appends approved word to list of words, adds to score depending on length of word, updates score, updates words, and shows appropriate message
      this.showWord(word);
      this.score += word.length;
      this.showScore();
      this.words.add(word);
      this.showMessage(`Added: ${word}`, "ok");
    }
    // clears $word but also puts the cursor back into the box
    $word.val("").focus();
  }
  //update timer
  showTimer(){
    $('.timer', this.board).text(this.secs)
  }
  //timer
  async tick(){
    this.secs -= 1
    this.showTimer();

    if (this.secs=== 0){
        clearInterval(this.timer)
        await this.scoreGame();
    }
  }
  //shows score and end of game message
  async scoreGame(){
    $('.yourword', this.board).hide()
    const res = await axios.post("/update-score", { score: this.score });
    if (res.data.brokeRecord) {
      this.showMessage(`New record: ${this.score}`, "ok");
    } else {
      this.showMessage(`Final score: ${this.score}`, "ok");
    }
  }

  }

  