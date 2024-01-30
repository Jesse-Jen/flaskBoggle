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
    return render_template('index.html', board = board)



if __name__ == '__main__':
    app.run(debug=True)