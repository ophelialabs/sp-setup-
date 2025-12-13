# Flask
 - Focus on UI dev
 - Create sidebar to be renamed 'appbar' for global site nav and add appropriate styles
 - create second sidebar so that most styles are reused
 - edit styles so that the appbar and sidebar can easily be switched sides
 - create agent ui that can be easily enabled/disabled
 - Setup template to make future site building more efficient

**[Dataverse SDK](https://www.microsoft.com/en-us/power-platform/blog/2025/12/03/dataverse-sdk-python/)**

Flask is a Python project that demonstrates how to build web applications using [Flask](https://flask.palletsprojects.com/) and [Jinja2](https://jinja.palletsprojects.com/).

Flask gives you a powerful, patterns-based way to build dynamic websites that enables a clean separation of concerns and gives you full control over markup for enjoyable, agile development. Flask's functionality can be extended with numerous extensions that are updated independently from Flask itself.
                    
## Best Use Cases

Flask is ideal for:

- **Learning Flask and Jinja2:** FlaskJinjaPy offers a straightforward and well-documented codebase, making it perfect for beginners who want to grasp the fundamentals of web development in Python. The project demonstrates how routing, request handling, and template rendering work together, providing a clear learning path for new developers.

- **Prototyping Web Applications:** With minimal setup and boilerplate, you can quickly spin up a working web application. This makes FlaskJinjaPy ideal for testing new ideas, building proof-of-concept projects, or experimenting with different web features before committing to a larger codebase.

- **Small to Medium Projects:** The structure and flexibility of FlaskJinjaPy make it suitable for personal projects, internal tools, or MVPs (Minimum Viable Products). Its modular design allows you to add new routes, templates, and static assets as your project grows, without unnecessary complexity.

- **Template Customization:** Jinja2 templating enables you to easily extend or modify HTML templates to match your application's requirements. You can create reusable components, implement custom filters, and maintain a clean separation between logic and presentation.

- **Educational and Teaching Tool:** FlaskJinjaPy serves as a practical resource for instructors and students alike. It can be used in workshops, tutorials, or classroom settings to demonstrate core web development concepts and best practices.

This project provides a solid foundation for building web applications that require dynamic content, user interaction, and maintainable code. Whether you're learning, teaching, or rapidly prototyping, FlaskJinjaPy offers a practical and extensible starting point for your Python web development journey.

## Example Use Cases and Related Technologies

Here are some practical scenarios where Flask can be applied, along with specific examples:

- **Personal Portfolio Website:**  
    Use Flask to build a dynamic portfolio that displays your projects, skills, and blog posts. For example, you can create a `/projects` route that renders a list of projects from a Python data structure or database, and a `/blog` route that displays articles using Jinja2 templates.

- **Internal Dashboards:**  
    Develop a dashboard for your team to monitor sales, website analytics, or server status. For instance, you can fetch data from an API or database and render interactive charts using libraries like Chart.js, all within a FlaskJinjaPy app.

- **Event Registration Forms:**  
    Create a registration page for workshops or meetups. Use Flask's form handling to process user input and Jinja2 to display confirmation messages or error feedback. For example, a `/register` route can accept POST requests and store attendee information.

- **API Prototyping:**  
    Quickly prototype RESTful APIs for a mobile app or frontend framework. For example, add a `/api/data` endpoint that returns JSON responses, and use FlaskJinjaPy's structure to test different API behaviors before full-scale development.

- **Educational Demos:**  
    Demonstrate web development concepts in a classroom or workshop setting. For example, show how to implement user authentication, template inheritance, or form validation using simple, readable code.

Flask works well alongside the following technologies and tools:

- **Flask Extensions:**  
    - *Flask-WTF:* Simplifies form creation and validation.  
    - *Flask-Login:* Adds user authentication and session management.  
    - *Flask-SQLAlchemy:* Integrates SQL databases for persistent storage.

- **Front-End Libraries:**  
    - *Bootstrap or Tailwind CSS:* Enhance your site's appearance and responsiveness.  
    - *Alpine.js or Vanilla JavaScript:* Add interactivity to templates.

- **Testing Tools:**  
    - *pytest or unittest:* Write automated tests for your routes and logic to ensure reliability.

- **Deployment Platforms:**  
    - *Heroku, PythonAnywhere, or Docker:* Deploy your FlaskJinjaPy app to the cloud or containers with minimal configuration.

- **Database Backends:**  
    - *SQLite:* Ideal for lightweight, file-based storage during development.  
    - *PostgreSQL or MySQL:* Use for production-ready, scalable data storage.

These examples and integrations make FlaskJinjaPy a flexible starting point for a wide range of Python web projects, from simple prototypes to more complex applications.

## Features

- Lightweight Flask web server
- Jinja2 templating for dynamic HTML
- Easy to extend and customize

## Getting Started
https://github.com/authlib/example-oauth2-server/tree/master

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ophelialabs/projectname/FlaskJinjaPy.git
    cd FlaskJinjaPy
    ```

2. **Setup the environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate     # On Windows: venv\Scripts\activate

2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Set Flask and Authlib environment variables**
   ```bash
   # DO NOT SET THIS IN PRODUCTION!
   export AUTHLIB_INSECURE_TRANSPORT=1
   ```

4. ** Create Database and Run the application:**
    ```bash
    python runserver.py         # app.py
    flask --app runserver run    # __init__ 
    ```

5. **Open your browser:**  
    Visit [http://localhost:5000](http://localhost:5000)

6. **Passwd flow example**
       - Get client_id and client_secret
   ```bash
   $ curl -u ${client_id}:${client_secret} -XPOST http://127.0.0.1:5000/oauth/token -F grant_type=password -F username=${username} -F password=valid -F scope=profile
   ```
      - Note password=valid
   ```bash
   $ curl -H "Authorization: Bearer ${access_token}" http://127.0.0.1:5000/api/me
   ```
      - Grant Auth, send code to Auth server to get access token
   ```bash
   $ curl -u ${client_id}:${client_secret} -XPOST http://127.0.0.1:5000/oauth/token -F grant_type=authorization_code -F scope=profile -F code=${code}
   ```
   ```bash
   $ curl -H "Authorization: Bearer ${access_token}" http://127.0.0.1:5000/api/me
   ```

8. **Auth flow example**
       - Test the auth code flow
   ```bash
   $ open http://127.0.0.1:5000/oauth/authorize?response_type=code&client_id=${client_id}&scope=profile
   ```

## Project Structure

```
Flask/
├── app.py
├── templates/
│   └── index.html
├── static/
├── requirements.txt
└── README.md
```

## License

This project is licensed under the MIT License.
