### Leapfrog Bulletin Board

Leapfrog Bulletin Board is a Web App that helps to build an interactive Kiosk.


### Features

- Embed Google slide
- Queue YouTube videos
- Embed websites


### Requirements

- Heroku account


### Deploy on Heroku

- Click here [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/leapfrogtechnology/LF-Bulletin-board/tree/tree)
- Enter desired app-name
- Click on “Deploy for Free” button
- Install Heroku Command Line  https://devcenter.heroku.com/articles/heroku-command-line
```
$ heroku login
$ heroku run python manage.py migrate --app [app-name]
$ heroku run python manage.py createsuperuser --app [app-name]
```

### Setup

```bash
$ heroku login
$ heroku run python manage.py migrate --app my-bulletin-board
$ heroku run python manage.py createsuperuser --app my-bulletin-board
```

```bash
$ git clone git@github.com:leapfrogtechnology/LF-Bulletin-board.git
$ cd LF-Bulletin-board
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
$ python3 manage.py makemigrations
$ python3 manage.py migrate
$ python3 manage.py createsuperuser
```

```bash
$ # Comment lf_kiosk/settings.py line number 87 to 92 and uncomment line number 83, 84 to use SQLite database instead of Postgres
$ python3 manage.py runserver
```


#### How to embed Google Slide in bulletin board

- Create slide using Google Slide
- Goto File → Publish to the web
- Goto Embed tab
- Choose Start slideshow as soon as the player loads and Restart the slideshow after the last slide
- Click on publish, HTML embed appears
- Just copy src of the &lt;iframe&gt; tag Eg. https://docs.google.com/presentation/d/1FWK0B0PBavrqYKFXbS2JwPn05SwKNsDz9e63Rs0_fuY/embed?start=true&loop=true&delayms=5000
- Open bulletin board dashboard
- Click on Kiosks
- Click on ADD KIOSK
- Paste the URL and click on Save
_Note: If you make changes in slide. Make sure you add new Google Docs URL or just update delayms value to new value. If this is not done slide changes in bulletin board will not reflected._


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


### License

- Leapfrog Bulletin Board is licensed under th MIT license. See [License File](https://github.com/leapfrogtechnology/LF-Bulletin-board/blob/master/LICENSE.txt) for more information.

