### Leapfrog Bulletin Board

Leapfrog Bulletin Board is a Web App that helps to build an interactive Kiosk.


### Features

- Embed Google slide
- Queue YouTube videos
- Embed websites


### Requirements

- Heroku account


### Deploy on Heroku

- Click here [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/leapfrogtechnology/LF-Bulletin-board/tree/dev)
- Enter desired App Name
- Click on “Deploy for Free” button
- Click on “Manage App” button
- Overview of app appears. Click on “Heroku Postgres” link
- Postgres “Connection Settings” appears. Note down these credentials
- Go back to bulletin board app on Heroku Dashboard
- Click on “Settings” tab
- Click on “Reveal Config Vars”
- Now enter Postgres Connection Settings of step 7 (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT) in Key, Value pair
- Install Heroku Command Line  https://devcenter.heroku.com/articles/heroku-command-line
- Open Terminal

```bash
- $ heroku login
- $ heroku run python manage.py migrate --app my-bulletin-board
- $ heroku run python manage.py createsuperuser --app my-bulletin-board
```


#### How to embed Google Slide in bulletin board

- Create slide using Google Slide
- Goto File → Publish to the web
- Goto Embed tab
- Choose Start slideshow as soon as the player loads and Restart the slideshow after the last slide
- Click on publish, HTML embed appears
- Just copy src of the <iframe> tag Eg. https://docs.google.com/presentation/d/1ETZi4bNQov9M5UEEnJEJgj3s40vZ_ORsddaeisUUcamE5kW0/embed?start=true&loop=true&delayms=3000
- Open bulletin board dashboard
- Click on Kiosks
- Click on ADD KIOSK
- Paste the URL and click on Save
__Note: If you make changes in slide. Make sure you add new Google Docs URL or just update delayms value to new value. If this is not done slide changes in bulletin board will not reflected._


#### How to embed Website in bulletin board

- Goto bulletin board dashboard
- Click on Kiosk
- Click on ADD KIOSK
- Enter URL of the website URL and click on Save


#### How to embed YouTube videos

- Go to Leapfrog bulletin board dashboard
- Add youtube videos to playlist
- Click on YouTubes
- Click on ADD YOUTUBE
- Paste YouTube video URL
- Click on save Repeat the steps to add more videos in playlist
- Set timing to play youtube video
- Go to dashboard
- Click on “Schedules”
- Click on “ADD SCHEDULE”
- Enter Start time and End time
- Click on Save


### License?

- Leapfrog Bulletin Board is licensed under th MIT license. See [License File](https://github.com/leapfrogtechnology/LF-Bulletin-board/blob/master/LICENSE.txt) for more information.

