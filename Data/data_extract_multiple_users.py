import categories
import data_extract_one_profile as usersdata


#print(data.dictUN)

for key in categories.dictUN:

        for j in range(len(categories.dictUN[key])):

            user = categories.dictUN[key][j]
            usersdata.getData(user)