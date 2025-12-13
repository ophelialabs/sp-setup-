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

@app.route('/admindashboard.html')
def admindashboard():
    """Renders the admin dashboard page."""
    return render_template(
        'admindashboard.html',
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

@app.route('/partials/_messages.html')
def messages():
    """Renders the messages partial."""
    return render_template(
        'partials/_messages.html',
        title='Messages Partial',
        year=datetime.now().year,
        message='This is a messages partial.'
    )
