<!-- @format -->

# Software Engineering for Machine Learning Assignment

## API Documentation

### Expected Data

The machine learning model is deployable as a microservice. The microservice
takes a query request with student data as input and returns a scoring for the 
"job candidate" scoring of the student.

### Pre-Conditions

The following technologies must be installed on your machine before running the
model:

1. Docker (required): https://docs.docker.com/get-docker/
2. Python libraries (recommended): This will install all the libraries required
   to run the Jupyter notebooks and pytest tests locally. Run
   `pip install -r requirements.txt`
3. Postman and Postman Desktop Agent (recommended): https://www.postman.com/

### Calling the API

To call the API for the microservice, take the following procedure:

```
1. cd career-service // To navigate to the directory containing all of the necessary files
2. make docker-build // To build the docker container
3. make docker-run // To run the docker container and set up localhost server at http://localhost:5000/
4. You can now make queries to the server (see below)
5. make docker-rm // To stop and remove the docker container
```

### Making Queries

To make queries to the ML model, you must make a POST request to
http://localhost:6000/predict containing a JSON-ified version of features. One way to do this is through using [Postman](https://www.postman.com/). This will
require installing the Postman Desktop Agent.

![Using Postman](https://user-images.githubusercontent.com/43687061/97821057-9b2bf500-1c76-11eb-889b-9f9fdaf49d37.png)

The API expects request with a JSON body in the following form:

```
{
    "feature1": value1,
    "feature2": value2,
    ...
    "featuren": valuen
}
```

### Understanding the Output


**Successful Request** Status Code: `200`

If the query request is successful, the API will provide a response with the property `job_candidate`, which gives a numerical scoring on how suitable of a candidate the student is.

**Unsuccessful Request** Status Code: `404` (Not Found), `400` (Bad Request),
`405` (Method Not Allowed)

If the query request is unsuccessful, the API will provide a response with the
appropriate status code and the property `error`, which is a stringified version
of the error itself.

## Deployment Instructions

To deploy the machine learning model as a microservice, Flask and Docker are
used. The home directory `career-service` holds the contents of the microservice, 
specifically a Flask application that allows us to
create a web application to make query requests and receive outputs. Docker is
used to build a container and run the container on localhost. The Flask
application itself runs on port 6000.

Along with the build and run instructions provided above in the "Calling the
API" section, you can also deploy the application through running the command
`make docker-compose-up` from the home directory.
