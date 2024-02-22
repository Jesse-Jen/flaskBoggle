from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

 
class FlaskTests(TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_route(self):
        with self.client:
            response = self.client.get('/')
            '''if board exist'''
            self.assertIn('board', session)
            self.assertIn(b'<p>High Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Left:', response.data)

    def test_word_in_dictionary(self):
        """Test to see if the word is in the dictionary"""
        self.client.get('/')
        response = self.client.get('/check-word?word=testytest')
        self.assertEqual(response.json['result'], 'not-on-board')

    def test_word_exist(self):
        """Test to see if word exist on the board and in dictionary"""

        self.client.get('/')
        response = self.client.get(
            '/check-word?word=fsjdakfkldsfjdslkfjdlksf')
        self.assertEqual(response.json['result'], 'not-word')


    

