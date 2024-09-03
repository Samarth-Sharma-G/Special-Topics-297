import unittest
from unittest.mock import Mock, patch
from app import app

class TestDinoDash(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_index_route(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_get_high_score_route(self):
        with patch('builtins.open', create=True) as mock_open:
            mock_open.return_value.__enter__.return_value.read.return_value = '100'
            response = self.app.get('/get_high_score')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'high_score': 100})

    def test_update_high_score_route_new_high_score(self):
        with patch('builtins.open', create=True) as mock_open:
            mock_open.return_value.__enter__.return_value.read.return_value = '50'
            response = self.app.post('/update_high_score', json={'score': 100})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'success': True, 'new_high_score': 100})

    def test_update_high_score_route_no_new_high_score(self):
        with patch('builtins.open', create=True) as mock_open:
            mock_open.return_value.__enter__.return_value.read.return_value = '100'
            response = self.app.post('/update_high_score', json={'score': 50})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'success': False, 'high_score': 100})

if __name__ == '__main__':
    unittest.main()