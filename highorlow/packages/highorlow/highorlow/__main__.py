from http import HTTPStatus
import pandas as pd

def main(args):
    df = pd.read_csv('./games-data-final.csv')
    row = df.sample()
    game = {
        "name": row['name'].values[0],
        "platform": row['platform'].values[0],
        "rdate": row['r-date'].values[0],
        "score": row['score'].values[0],
        "image": row['image-link'].values[0]
    }
    return {
        "statusCode": HTTPStatus.OK,
        "body": game
    }
    
