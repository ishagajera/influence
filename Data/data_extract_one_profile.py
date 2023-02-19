from datetime import datetime, date
import time
from itertools import dropwhile, takewhile
import csv
import instaloader
import random
from argparse import ArgumentParser

def getData(entered_name):
    p = ArgumentParser()
    p.add_argument("--no-metadata-json")
    p.add_argument("-F","--fast-update")
    p.add_argument("--latest-stamps")
    args = p.parse_args()
   
    bot = instaloader.Instaloader(max_connection_attempts=1,download_videos=False, save_metadata=False, post_metadata_txt_pattern='')
    #so that bot will only to try to req a resource once and if not found, it wil proceed ahead.
    bot.load_session_from_file('teaminfluence2023','session-teaminfluence2023')
    #bot.login("influenzer456","influenzer")
    #print("hi")
    # Loading a profile from an Instagram handle
    # profile = instaloader.Profile.from_username(bot.context, entered_name)
    while True:
        try:
            profile = instaloader.Profile.from_username(bot.context, entered_name)
            print("Username: ", profile.username)
            print("Number of Posts: ", profile.mediacount)
            posts = instaloader.Profile.from_username(bot.context,entered_name).get_posts()
            today = date.today()
            year = int(today.strftime("%Y"))
            month = int(today.strftime("%m"))
            day = int(today.strftime("%d"))

            sinceyear = year

            sincemonth = month -6
            if(sincemonth <= 0):
                #reducing the year if the month is in prev year
                sinceyear = year -1
                #changing the month to be of the years month.
                sincemonth +=12

            # dd/mm/YY  
            SINCE = datetime(sinceyear, sincemonth, day)
            UNTIL = datetime(year, month, day)


            with open(entered_name+'.csv', 'w', newline='', encoding='utf-8') as file:
                        writer = csv.writer(file)
                        posts = instaloader.Profile.from_username(bot.context, entered_name).get_posts()

                        for post in takewhile(lambda p: p.date > SINCE, dropwhile(lambda p: p.date > UNTIL, posts)):
                        #for loop above will run in a time limit of range defined in Since - When
                        #for post in posts:
                            #for loop above will run for all posts.
                            time.sleep(random.randint(11,22))
                            #making code sleep so that we avoid 429 error: too many requests.
                            bot.download_post(post, entered_name)
                            posturl = "https://www.instagram.com/p/"+post.shortcode

                            writer.writerow(["post", post.caption, posturl]) #,  post.url ])
                            #writing to csv file
                            print("\n\n")
            break
            
        except Exception:
           print("Oops!  That was no valid username.  Try again...")
           break
            

    
