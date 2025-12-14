"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from FlaskJinjaPy import app

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route('/pages/admindashboard')
def admindashboard():
    """Renders the admin dashboard page."""
    return render_template(
        'pages/admindashboard.html',
        title='Admin Dashboard',
        year=datetime.now().year,
        message='Admin dashboard overview.'
    )

@app.route('/pages/profile')
def profile():
    """Renders the user profile page."""
    return render_template(
        'pages/profile.html',
        title='User Profile',
        year=datetime.now().year,
        message='Your user profile page.'
    )

@app.route('/partials/_messages')
def messages():
    """Renders the messages partial."""
    return render_template(
        'partials/_messages.html',
        title='Messages Partial',
        year=datetime.now().year,
        message='This is a messages partial.'
    )

"""
Routes and views for AppBar Global Navigation
"""

@app.route('/pages/globalnav/news')
def news():
    """Renders the news page."""
    return render_template(
        'pages/globalnav/news.html',
        title='News',
        year=datetime.now().year,
        message='Latest news and updates.'
    )

@app.route('/pages/globalnav/connections')
def connections():
    """Renders the connections page."""
    return render_template(
        'pages/globalnav/connections.html',
        title='Connections',
        year=datetime.now().year,
        message='Your connections page.'
    )

@app.route('/files')
def files():
    """Renders the files page."""
    return render_template(
        'pages/globalnav/files.html',
        title='Files',
        year=datetime.now().year,
        message='Your files page.'
    )

@app.route('/research')
def research():
    """Renders the research page."""
    return render_template(
        'pages/globalnav/research.html',
        title='Research',
        year=datetime.now().year,
        message='Your research page.'
    )

@app.route('/sites')
def sites():
    """Renders the sites page."""
    return render_template(
        'pages/globalnav/sites.html',
        title='Sites',
        year=datetime.now().year,
        message='Your sites page.'
    )

@app.route('/lists')
def lists():
    """Renders the lists page."""
    return render_template(
        'pages/globalnav/lists.html',
        title='Lists',
        year=datetime.now().year,
        message='Your lists page.'
    )