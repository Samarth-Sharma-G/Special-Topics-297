from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_high_score', methods=['GET'])
def get_high_score():
    try:
        with open('highscores.txt', 'r') as f:
            high_score = int(f.read().strip())
    except (FileNotFoundError, ValueError):
        high_score = 0
    return jsonify({'high_score': high_score})

@app.route('/update_high_score', methods=['POST'])
def update_high_score():
    new_score = request.json['score']
    try:
        with open('highscores.txt', 'r') as f:
            current_high_score = int(f.read().strip())
    except (FileNotFoundError, ValueError):
        current_high_score = 0

    if new_score > current_high_score:
        with open('highscores.txt', 'w') as f:
            f.write(str(new_score))
        return jsonify({'success': True, 'new_high_score': new_score})
    else:
        return jsonify({'success': False, 'high_score': current_high_score})

if __name__ == '__main__':
    app.run(debug=True)