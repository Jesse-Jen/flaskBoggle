from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret'

boggle_game = Boggle()

@app.route('/', methods = ['GET'])
def game_start():
    '''instance of Boggle calling make board method'''
    board = boggle_game.make_board()
    '''saving to session'''
    session['board'] = board
    '''retrieving saved values from session
        If nothing found, sets to 0
    '''
    highscore = session.get('highscore', 0)
    nplays = session.get('nplays', 0)
    return render_template('index.html', board = board, highscore = highscore, nplays = nplays)

@app.route('/check-word', methods = ['GET'])
def check_word():
    
    word = request.args['word']
    board = session['board']
    result = boggle_game.check_valid_word(board,word)
    return jsonify({'result': result})



@app.route("/update-score", methods=["POST"])
def post_score():
    '''update score, and number of games from session'''

    score = request.json["score"]
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)

    session['nplays'] = nplays + 1
    session['highscore'] = max(score, highscore)
    '''new high score in session'''
    return jsonify(brokeRecord=score > highscore)


if __name__ == '__main__':
    app.run(debug=True)

