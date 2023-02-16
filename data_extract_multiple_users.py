import instaloader
import pandas as pd
from datetime import datetime
import time
from itertools import dropwhile, takewhile
import csv
import categories
import data_extract_one_profile as usersdata


#print(data.dictUN)

for key in categories.dictUN:
    if(key != 'beautyUN'):
        for j in range(len(categories.dictUN[key])):
        #print(data.dictUN[key][j])
            user = categories.dictUN[key][j]
            usersdata.getData(user)