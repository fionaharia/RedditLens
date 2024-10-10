from flask import Flask, jsonify, request
from dotenv import load_dotenv
from wordcloud import WordCloud
import os
from flask_cors import CORS
import praw
import time
from collections import defaultdict
import matplotlib.pyplot as plt


load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("CLIENT_ID"),
    client_secret=os.getenv("CLIENT_SECRET"),
    user_agent=os.getenv("USER_AGENT")
)



app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Reddit Analysis  Tool!"


@app.route('/api/get_subreddit_data', methods=['POST'])
def get_subreddit_data():
    subreddit_name = request.json.get('subreddit_name')
    subreddit = reddit.subreddit(subreddit_name)

    data = {
        'subscriber_cnt': subreddit.subscribers,
        'description': subreddit.public_description,
        'last_month': [],
        'last_year': [],
        'all_time': [],
        'total_comments': 0,
        'total_ups': 0,
        'total_posts': 0,
        'week_comments': 0,
        'week_ups': 0,
        'week_posts': 0,
    }

    current_time = time.time()
    one_week_ago = current_time - (7 * 24 * 60 * 60)

    # Fetch top posts for the last month
    for submission in subreddit.top(time_filter='month', limit=10):
        data['last_month'].append({
            'title': submission.title,
            'author': str(submission.author) if submission.author else 'Deleted',
            'url': submission.url,
            'ups': submission.ups,
            'comments': submission.num_comments
        })
        data['total_comments'] += submission.num_comments
        data['total_ups'] += submission.ups
        data['total_posts'] += 1

    # Fetch top posts for the last year
    for submission in subreddit.top(time_filter='year', limit=10):
        data['last_year'].append({
            'title': submission.title,
            'author': str(submission.author) if submission.author else 'Deleted',
            'url': submission.url,
            'ups': submission.ups,
            'comments': submission.num_comments
        })
        data['total_comments'] += submission.num_comments
        data['total_ups'] += submission.ups
        data['total_posts'] += 1

    # Fetch top posts of all time
    for submission in subreddit.top(time_filter='all', limit=10):
        data['all_time'].append({
            'title': submission.title,
            'author': str(submission.author) if submission.author else 'Deleted',
            'url': submission.url,
            'ups': submission.ups,
            'comments': submission.num_comments
        })
        data['total_comments'] += submission.num_comments
        data['total_ups'] += submission.ups
        data['total_posts'] += 1

    
    hour_upvotes_week = defaultdict(list)

    # Fetch posts from the last week
    for submission in subreddit.new(limit=None):
        if submission.created_utc >= one_week_ago:
            data['week_comments'] += submission.num_comments
            data['week_ups'] += submission.ups
            data['week_posts'] += 1

        hour = time.localtime(submission.created_utc).tm_hour
        hour_upvotes_week[hour].append(submission.ups)

    #calculating the best hour to post based on average upvotes
    if hour_upvotes_week:
        best_hour = max(hour_upvotes_week, key=lambda hour: sum(hour_upvotes_week[hour]) / len(hour_upvotes_week[hour]))
        data['best_hour'] = best_hour
        data['best_hour_avg_upvotes'] = sum(hour_upvotes_week[best_hour]) / len(hour_upvotes_week[best_hour])

    avg_week_comments = data['week_comments'] / data['week_posts'] if data['week_posts'] > 0 else 0
    avg_week_ups = data['week_ups'] / data['week_posts'] if data['week_posts'] > 0 else 0

    data['avg_week_comments'] = avg_week_comments
    data['avg_week_ups'] = avg_week_ups

    # Calculating the average comments and ups for the top posts
    avg_comments = data['total_comments'] / data['total_posts'] if data['total_posts'] > 0 else 0
    avg_ups = data['total_ups'] / data['total_posts'] if data['total_posts'] > 0 else 0

    # Calculating the average comments and ups for the last 7 days
    avg_week_comments = data['week_comments'] / data['week_posts'] if data['week_posts'] > 0 else 0
    avg_week_ups = data['week_ups'] / data['week_posts'] if data['week_posts'] > 0 else 0

    data['avg_comments'] = avg_comments
    data['avg_ups'] = avg_ups
    data['avg_week_comments'] = avg_week_comments
    data['avg_week_ups'] = avg_week_ups

    #making a wordcloud
    title = []
    for submission in subreddit.top(limit=100):
        title.append(submission.title)

    text = ' '.join(title)

    wordcloud = WordCloud(width=800,height=400,background_color = 'white').generate(text)

    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')  # Turn off the axis
    plt.title(f'Word Cloud for Top 100 Posts in r/{subreddit_name}', fontsize=16)
    plt.show()

    return jsonify(data)








# Example API route
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "This is some data from the backend!",
        "client_id": CLIENT_ID,
        "user_agent": USER_AGENT
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
