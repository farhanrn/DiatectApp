# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from joblib import load

# =[Variabel Global]=============================

app   = Flask(__name__, static_url_path='/static')
tree_classifier = None

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]	
@app.route("/api/deteksi",methods=['POST'])
def apiDeteksi():

	input_pregnancies = 6
	input_glucose = 148
	input_blood_pressure = 80
	input_skin_thickness = 35
	input_insulin = 78
	input_bmi = 1.2
	input_diabetes_pedigree_function = 0.167
	input_age = 70
	
	if request.method=='POST':
		

		input_pregnancies = float(request.form['pregnancies'])
		input_glucose  = float(request.form['glucose'])
		input_blood_pressure = float(request.form['blood_pressure'])
		input_skin_thickness  = float(request.form['skin_thickness'])
		input_insulin = float(request.form['insulin'])
		input_bmi  = float(request.form['bmi'])
		input_diabetes_pedigree_function = float(request.form['diabetes_pedigree_function'])
		input_age  = float(request.form['age'])
		
		df_test = pd.DataFrame(data={
			"Pregnancies"                : [input_pregnancies],
			"Glucose"                    : [input_glucose],
			"BloodPressure"              : [input_blood_pressure],
			"SkinThickness"              : [input_skin_thickness],
			"Insulin"                    : [input_insulin],
			"BMI"                        : [input_bmi],
			"DiabetesPedigreeFunction"   : [input_diabetes_pedigree_function],
			"Age"                        : [input_age]
})

		hasil_prediksi = tree_classifier.predict(df_test[0:1])[0]

		if hasil_prediksi == '1':
			print('Diabetes Terdeteksi')
		else:
			print('Diabetes Tidak Terdeteksi')
		
		# Return hasil prediksi dengan format JSON
		return jsonify({
			"prediksi": hasil_prediksi
			# "outcome_prediksi" : outcome_prediksi
		})

# =[Main]========================================

if __name__ == '__main__':
	
	# Load model yang telah ditraining
	tree_classifier = load('model_prediksi_diabetes.model')

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	
	


