import random
import numpy as np

def main(args):
    df = np.loadtxt("/work/games-data-final.csv",delimiter=",", dtype=str, skiprows=1, quotechar='"')
    row = random.sample(range(0, df.shape[1]-1), 1)
    game = {
        "name": df[row][0][1],
        "platform": df[row][0][2],
        "rdate": df[row][0][3],
        "score": df[row][0][4],
        "image": df[row][0][5]
    }
    return {
        "statusCode": 200,
        "body": game
    }
    
