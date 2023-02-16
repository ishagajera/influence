import pandas as pd
from datetime import datetime, date
import time
from itertools import dropwhile, takewhile
import csv
import instaloader

def getData(entered_name):


    bot = instaloader.Instaloader(max_connection_attempts=1) 
    #so that bot will only to try to req a resource once and if not found, it wil proceed ahead.
    bot.login("appinfluence","inFluence2023")
    # Loading a profile from an Instagram handle

    profile = instaloader.Profile.from_username(bot.context, entered_name)
    print("Username: ", profile.username)

    print("Number of Posts: ", profile.mediacount)
    posts = instaloader.Profile.from_username(bot.context,entered_name).get_posts()
    today = date.today()
    year = int(today.strftime("%Y"))
    month = int(today.strftime("%m"))
    day = int(today.strftime("%d"))


    # dd/mm/YY  
    SINCE = datetime(year -1, month, day)
    UNTIL = datetime(year, month, day)


    with open(entered_name+'.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                posts = instaloader.Profile.from_username(bot.context, entered_name).get_posts()

                for post in takewhile(lambda p: p.date > SINCE, dropwhile(lambda p: p.date > UNTIL, posts)):
                #for loop above will run in a time limit of range defined in Since - When
                #for post in posts:
                    #for loop above will run for all posts.
                    time.sleep(10)
                    #making code sleep so that we avoid 429 error: too many requests.
                    bot.download_post(post, entered_name)
                    #print("post caption: "+post.caption)
                    posturl = "https://www.instagram.com/p/"+post.shortcode

                    writer.writerow(["post", post.caption, posturl]) #,  post.url ])
                    #writing to csv file
                    print("\n\n")