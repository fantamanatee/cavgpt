import pandas as pd
import numpy as np
import os
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

"""
K_values = [2, 3, 4]
alpha_values = [0.0002, 0.001, 0.002]
beta_values = [0.01, 0.02, 0.05]

best_rmse = float('inf')
best_params = {}

for K in K_values:
    for alpha in alpha_values:
        for beta in beta_values:
            print (K, alpha, beta)
            P, Q = matrix_factorization(R, K, alpha=alpha, beta=beta)
            nR = np.dot(P, Q.T)
            rmse = calculate_rmse(R, nR)  # Function to calculate RMSE
            if rmse < best_rmse:
                best_rmse = rmse
                best_params = {'K': K, 'alpha': alpha, 'beta': beta}

print("Best RMSE:", best_rmse)
print("Best parameters:", best_params)
Best RMSE: 0.25014660593566307
Best parameters: {'K': 4, 'alpha': 0.001, 'beta': 0.01}
"""

course_to_index = {'ENGR 102': 0, 'CSCE 121': 1, 'CSCE 181': 2, 'CSCE 221': 3, 'CSCE 222': 4, 'CSCE 312': 5, 'CSCE 313': 6, 'CSCE 314': 7, 'CSCE 315': 8, 'CSCE 310': 9, 'CSCE 410': 10, 'CSCE 411': 11, 'CSCE 412': 12, 'CSCE 420': 13, 'CSCE 421': 14, 'CSCE 430': 15, 'CSCE 431': 16, 'CSCE 435': 17, 'CSCE 436 ': 18, 'CSCE 438': 19, 'CSCE 441': 20, 'CSCE 448': 21, 'CSCE 450': 22, 'CSCE 451': 23, 'CSCE 462': 24, 'CSCE 465': 25, 'CSCE 469': 26, 'CSCE 470': 27, 'CSCE 481': 28}
index_to_course = {0: 'ENGR 102', 1: 'CSCE 121', 2: 'CSCE 181', 3: 'CSCE 221', 4: 'CSCE 222', 5: 'CSCE 312', 6: 'CSCE 313', 7: 'CSCE 314', 8: 'CSCE 315', 9: 'CSCE 310', 10: 'CSCE 410', 11: 'CSCE 411', 12: 'CSCE 412', 13: 'CSCE 420', 14: 'CSCE 421', 15: 'CSCE 430', 16: 'CSCE 431', 17: 'CSCE 435', 18: 'CSCE 436 ', 19: 'CSCE 438', 20: 'CSCE 441', 21: 'CSCE 448', 22: 'CSCE 450', 23: 'CSCE 451', 24: 'CSCE 462', 25: 'CSCE 465', 26: 'CSCE 469', 27: 'CSCE 470', 28: 'CSCE 481'}

def parser(filename):
    df = pd.read_csv(filename)
    data = np.array(df.iloc[:, 1:].values)
    return data

def calculate_rmse(actual, predicted):
    mask = actual > 0
    actual = actual[mask]
    predicted = predicted[mask]
    mse = np.mean((actual - predicted) ** 2)
    rmse = np.sqrt(mse)
    return rmse

def matrix_factorization(R, K=4, steps=5000, alpha=0.001, beta=0.01):
    N = len(R)
    M = len(R[0])
    P = np.random.rand(N, K)
    Q = np.random.rand(M, K)

    Q = Q.T
    for step in range(steps):
        for i in range(N):
            for j in range(M):
                if R[i][j] > 0:
                    eij = R[i][j] - np.dot(P[i, :], Q[:, j])
                    for k in range(K):
                        P[i][k] += alpha * (2 * eij * Q[k][j] - beta * P[i][k])
                        Q[k][j] += alpha * (2 * eij * P[i][k] - beta * Q[k][j])
        
        e = 0
        for i in range(N):
            for j in range(M):
                if R[i][j] > 0:
                    e += pow(R[i][j] - np.dot(P[i, :], Q[:, j]), 2)
                    for k in range(K):
                        e += (beta/2) * (pow(P[i][k], 2) + pow(Q[k][j], 2))
        if e < 0.001:
            break

    return P, Q.T

def predict_new_user_ratings(new_user_ratings, K=4, steps=5000, alpha=0.001, beta=0.01):
    Q_matrix_file = 'Q_matrix.pkl'
    if os.path.exists(Q_matrix_file):
        with open(Q_matrix_file, 'rb') as file:
            Q = pickle.load(file)
    else:
        _, Q = matrix_factorization(parser('data.csv'), K, steps, alpha, beta)
        with open(Q_matrix_file, 'wb') as file:
            pickle.dump(Q, file)

    P_new = np.random.rand(1, K)
    Q = Q.T

    for step in range(steps):
        for j in range(len(new_user_ratings)):
            if new_user_ratings[j] > 0:
                eij = new_user_ratings[j] - np.dot(P_new[0, :], Q[:, j])
                for k in range(K):
                    P_new[0][k] += alpha * (2 * eij * Q[k][j] - beta * P_new[0][k])

    predicted_ratings = np.round(np.dot(P_new, Q).flatten(), 2)
    result = [
        [index_to_course[i], min(predicted_ratings[i], 5.00)] 
        for i in range(len(predicted_ratings)) 
        if new_user_ratings[i] == 0 and predicted_ratings[i] > 0
    ]
    result = dict(sorted(result, key=lambda x: x[1], reverse=True)[:5])
    return result


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Cav's Course Recommender!"

@app.route('/predict', methods=['POST'])
def predict_ratings():
    print("Request received")
    # Check if the incoming request is in JSON format
    if not request.is_json:
        return jsonify({"error": "Invalid data format. Data must be in JSON."}), 400

    data = request.get_json()
    model_input = [0] * 29
    for course, rating in data.items():
        model_input[course_to_index[course]] = rating

    # Predict new user ratings
    result = predict_new_user_ratings(model_input)
    return jsonify({"predicted_ratings": result})

if __name__ == '__main__':
    app.run(debug=True)  # Set debug=False in productio
