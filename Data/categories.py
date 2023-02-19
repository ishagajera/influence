import pandas as pd
read_file = pd.read_csv (r'influencers.txt')
read_file.to_csv (r'data.csv', index=None)
df = pd.read_csv('data.csv', delimiter = '\t')
df = df.iloc[1:]
df.loc[df['Category'] == 'fasion', 'Category'] = 'fashion'
df.loc[df['Category'] == 'fashion 0.5', 'Category'] = 'fashion'
UN = df['Category'].unique()
beautyUN=list(df['Username'][df['Category'] == 'beauty'])[:20]
familyUN=list(df['Username'][df['Category'] == 'family'])[:20]
fashionUN=list(df['Username'][df['Category'] == 'fashion'])[:20]
fitnessUN=list(df['Username'][df['Category'] == 'fitness'])[:20]
foodUN=list(df['Username'][df['Category'] == 'food'])[:20]
interiorUN=list(df['Username'][df['Category'] == 'interior'])[:20]
petUN=list(df['Username'][df['Category'] == 'pet'])[:20]
travelUN=list(df['Username'][df['Category'] == 'travel'])[:20]
otherUN=list(df['Username'][df['Category'] == 'other'])[:20]

dictUN = {}
dictUN['beautyUN'] = beautyUN
dictUN['familyUN'] = familyUN
dictUN['fashionUN'] = fashionUN
dictUN['fitnessUN'] = fitnessUN
dictUN['foodUN'] = foodUN
dictUN['interiorUN'] = interiorUN
dictUN['petUN'] = petUN
dictUN['travelUN'] = travelUN
dictUN['otherUN'] = otherUN