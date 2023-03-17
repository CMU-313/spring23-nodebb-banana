import pandas as pd
import joblib

def predict(feature_vals):
    [clf, feature_names] = joblib.load('/apps/model.pkl')
    data = {}
    for i in range(len(feature_names)):
        feature = feature_names[i]
        try:
            arg = feature_vals[feature]
            data[feature] = pd.Series(arg)
        except:
            return None

    query_df = pd.DataFrame(data)
    query = pd.get_dummies(query_df)
    prediction = clf.predict(query)
    return prediction.item()
