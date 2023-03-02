from datetime import datetime, date
import time
from itertools import dropwhile, takewhile
import csv
import instaloader
import random
from argparse import ArgumentParser
import os

def getData(entered_name):
    
    p = ArgumentParser()
    p.add_argument("--no-metadata-json")
    p.add_argument("-F","--fast-update")
    p.add_argument("--latest-stamps")
    #p.add_argument(50,"--count")
    args = p.parse_args()
    # entered_name = ""
    
    bot = instaloader.Instaloader(max_connection_attempts=1,download_videos=False, save_metadata=False, post_metadata_txt_pattern='')
    bot.load_session_from_file('worlds_influencer','session-worlds_influencer')
   
    while True:
        try:
            profile = instaloader.Profile.from_username(bot.context, entered_name)
            # print(profile)
            print("Username: ", profile.username)
            # print("Number of Posts: ", profile.mediacount)
            posts = profile.get_posts()
            # print("retireved posts:")
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
            top_50_posts = 50
            counter = 0
            # profile = instaloader.Profile.from_username(bot.context, entered_name)
            # posts = profile.get_posts()
            # print("starting to add data in influencer isha .csv")

            
            with open('Users.csv', 'w', newline='', encoding='utf-8') as file:
                        writer = csv.writer(file)    
                        writer.writerow(["Username","Posts Count", "Followees", "Followers","Verified status","Bio"])
                        # likes = set()
                        print("Fetching likes of all posts of profile {}.".format(profile.username)) 
                
                       
                        verified_status  = "Verified" if profile.is_verified == True else "Not Verified"
                        writer.writerow([entered_name,profile.mediacount,profile.followees,profile.followers,verified_status,profile.biography])

          
            comments_list = []
            
            print("data entered in abv csv, now adding to influencername.csv")
            with open('PostsInformation.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Username","Caption", "Caption Mentions","Hashtags","Is sponsored","Sponsor users","Location","Likes"])
                for post in takewhile(lambda p: p.date > SINCE, dropwhile(lambda p: p.date > UNTIL, posts)):
                            if counter <= top_50_posts:
                                time.sleep(random.randint(11,22))
                                bot.download_post(post, entered_name)
                                comments_user = post.get_comments() 
                                ctr =0
                                for itr in comments_user:
                                    if ctr <= 10:
                                        comments_list.append(itr.text)
                                        ctr+=1
                                    else:
                                         break
                                located_at = post.location.name if post.location is not None else "None"
                                writer.writerow([entered_name,post.caption,post.caption_mentions,post.caption_hashtags,post.is_sponsored,post.sponsor_users,located_at,post.likes])
                                counter +=1
                            else:
                                break

            with open('Comments.csv', 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Username","Comments"])
                for itr in comments_list:
                    writer.writerow([entered_name,itr])
                 
            break

            
        except Exception as e:
           print("Oops!  That was no valid username.  Try again...")
           print(e)
           break

            
# getData('babyloveteam')
