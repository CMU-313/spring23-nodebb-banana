# MAIN API File
from fastapi import FastAPI, HTTPException
from predict import predict, Student

app = FastAPI()


@app.get("/")
def read_root():
    return {"Employability Predictor API"}

@app.post("/predict_student/")
async def predict_students(studentInfo : Student):
    # Run the ML model on input
    prediction = predict(studentInfo)
    # Cast type to int because of type of resonse (numpy int.64)
    return {"good_employee" : int(prediction['good_employee'])}
