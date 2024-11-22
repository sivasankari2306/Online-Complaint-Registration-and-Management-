from flask import Flask, render_template, request
from transformers import pipeline
app = Flask(__name__)
# Load pre-trained model for text classification
classifier = pipeline("zero-shot-classification")
# Complaint categories
categories = ["Technical Issue", "Billing Problem", "Service Quality", "Product Damage", "Delivery Delay", "Other"]
# Dictionary to store complaints under respective categories
complaints_dict = {category: [] for category in categories}
	
def categorize_complaint(complaint_text):
     # Classify the complaint text
    result = classifier(complaint_text, categories)
# Select the label with the highest score
    category = result['labels'][0]
    return category
def store_complaint(complaint_text, email, category):
 # Store the complaint in the respective category
    complaints_dict[category].append({"complaint": complaint_text, "email":email})
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        complaint = request.form['complaint']
        email = request.form['email']
        category = categorize_complaint(complaint)
        store_complaint(complaint, email, category)
        return render_template('success.html', category=category)
    return render_template('index.html')
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        complaint = request.form['complaint']
        email = request.form['email']
        category = categorize_complaint(complaint)
        store_complaint(complaint, email, category)
        return render_template('success.html', category=category)
    return render_template('index.html')
@app.route('/complaints')
def get_complaints():
    return render_template('complaints.html', complaints_dict=complaints_dict)
if __name__ == "__main__":
    app.run(debug=True)