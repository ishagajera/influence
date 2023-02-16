import pandas as pd
read_file = pd.read_csv (r'influencers.txt')
read_file.to_csv (r'categories.csv', index=None)
df = pd.read_csv('categories.csv', delimiter = '\t')
df = df.iloc[1:]
df.loc[df['Category'] == 'fasion', 'Category'] = 'fashion'
df.loc[df['Category'] == 'fashion 0.5', 'Category'] = 'fashion'
beautyUN=list(df['Username'][df['Category'] == 'beauty'])
familyUN=list(df['Username'][df['Category'] == 'family'])
fashionUN=list(df['Username'][df['Category'] == 'fashion'])
fitnessUN=list(df['Username'][df['Category'] == 'fitness'])
foodUN=list(df['Username'][df['Category'] == 'food'])
interiorUN=list(df['Username'][df['Category'] == 'interior'])
petUN=list(df['Username'][df['Category'] == 'pet'])
travelUN=list(df['Username'][df['Category'] == 'travel'])
otherUN=list(df['Username'][df['Category'] == 'other'])