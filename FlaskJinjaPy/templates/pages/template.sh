#!/bin/bash

# Ask for project name
read -p "Enter your Flask project name: " project_name

# Validate project name
if [ -z "$project_name" ]; then
    echo "Project name cannot be empty."
    exit 1
fi

# Detect OS
os_name=$(uname)
echo "Detected OS: $os_name"

# Get home directory
home_dir=$HOME
project_dir="$home_dir/$project_name"

# Set project directory
if [ -z "$custom_dir" ]; then
    project_dir="$HOME/$project_name"
else
    # Remove trailing slash if present
    custom_dir="${custom_dir%/}"
    project_dir="$custom_dir/$project_name"
fi

# Check if directory exists
if [ -d "$project_dir" ]; then
    echo "Directory $project_dir already exists."
    exit 1
fi

# Validate directory path
parent_dir=$(dirname "$project_dir")
if [ ! -d "$parent_dir" ]; then
    echo "Parent directory $parent_dir does not exist."
    read -p "Would you like to create it? (y/n): " create_parent
    if [ "$create_parent" = "y" ] || [ "$create_parent" = "Y" ]; then
        mkdir -p "$parent_dir"
    else
        echo "Aborting."
        exit 1
    fi
fi

# Create Aspire project structure
mkdir -p "$project_dir/templates"
mkdir -p "$project_dir/static/{css,js,images}"
mkdir -p "$project_dir/$project_name"
mkdir -p "$project_dir/database/{migrations,models,scripts}"
mkdir -p "$project_dir/tests/unit"
mkdir -p "$project_dir/tests/integration"
mkdir -p "$project_dir/config"
mkdir -p "$project_dir/auth"
mkdir -p "$project_dir/utils"
mkdir -p "$project_dir/logs"
mkdir -p "$project_dir/docs"
mkdir -p "$project_dir/ai/{models,pipelines,vectorstores}"
mkdir -p "$project_dir/llm/{embeddings,prompts,chains}"
mkdir -p "$project_dir/ml/{training,inference,evaluation}"
mkdir -p "$project_dir/ai/chat_assistants"
mkdir -p "$project_dir/ai/integrations"

# Create necessary files
touch "$project_dir/$project_name/__init__.py"
touch "$project_dir/database/models/__init__.py"
touch "$project_dir/auth/__init__.py"
touch "$project_dir/utils/__init__.py"
touch "$project_dir/tests/__init__.py"
touch "$project_dir/ai/__init__.py"
touch "$project_dir/llm/__init__.py"
touch "$project_dir/ml/__init__.py"

# Create configuration files
cat > "$project_dir/config/config.py" << 'EOF'
class Config:
    SECRET_KEY = 'your-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost/dbname'
EOF

# Create uwsgi.ini
cat > "$project_dir/uwsgi.ini" << EOF
[uwsgi]
module = $project_name.wsgi:app
master = true
processes = 5
socket = $project_name.sock
chmod-socket = 660
vacuum = true
die-on-term = true
EOF

# Create Apache configuration
cat > "$project_dir/apache_config.conf" << EOF
<VirtualHost *:80>
    ServerName yourdomain.com
    WSGIDaemonProcess $project_name python-path=$project_dir
    WSGIProcessGroup $project_name
    WSGIScriptAlias / $project_dir/$project_name/wsgi.py

    <Directory $project_dir/$project_name>
        Require all granted
    </Directory>
</VirtualHost>
EOF

# Create wsgi.py
cat > "$project_dir/$project_name/wsgi.py" << 'EOF'
from .app import create_app

app = create_app()

if __name__ == "__main__":
    app.run()
EOF

# Create Aspire app.py
cat > "$project_dir/$project_name/app.py" << 'EOF'
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')

    db.init_app(app)
    login_manager.init_app(app)

    from .auth import auth_bp
    app.register_blueprint(auth_bp)

    @app.route('/')
    def home():
        return render_template('index.html')

    return app
EOF

# Create auth blueprint
cat > "$project_dir/auth/routes.py" << 'EOF'
from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_user, logout_user, login_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    return render_template('auth/login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))
EOF

# Create base template
cat > "$project_dir/templates/base.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{% endblock %}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    {% block content %}{% endblock %}
    <script src="{{ url_for('static', filename='js/main.js') }}"></script>
</body>
</html>
EOF

# Update requirements.txt
cat > "$project_dir/requirements.txt" << EOF
flask
flask-login
flask-jwt-extended
flask-cors
flask-sqlalchemy
flask-migrate
flask-wtf
uwsgi
gunicorn
python-dotenv
requests
openai
transformers
pytest
pytest-cov
black
flake8
sphinx

# General Database packages
pymysql
psycopg2-binary
sqlalchemy
alembic

# Oracle Integration
cx_Oracle
oracledb
oracle-asmlib
exadata-express-client

# Amazon Integration
boto3
botocore
amazon-dax-client
aws-xray-sdk

# Google Cloud Integration
google-cloud-sql
google-cloud-spanner
google-cloud-datastore
google-cloud-bigquery

# IBM Integration
ibm-db
ibm-db-sa
cloudant
ibmcloudant

# AI/ML packages
torch
tensorflow
huggingface-hub[cli,torch,tensorflow]
faiss-cpu
langchain
sentence-transformers
pandas
numpy
scikit-learn
matplotlib
seaborn

# Vector Stores
chromadb
qdrant-client
pinecone-client

# LLM packages
anthropic
cohere
llama-cpp-python
EOF

# Create .env file
cat > "$project_dir/.env" << EOF
FLASK_APP=$project_name/app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///dev.db
SECRET_KEY=your-secret-key-here
EOF

# Create .gitignore
cat > "$project_dir/.gitignore" << EOF
__pycache__/
*.py[cod]
*$py.class
*.so
.env
.venv
env/
venv/
ENV/
*.db
.DS_Store
logs/
.coverage
htmlcov/
EOF

echo "Aspire Flask project '$project_name' created at $project_dir"
# Create and activate virtual environment
python3 -m venv "$project_dir/venv"
source "$project_dir/venv/bin/activate"

# Install requirements
cd "$project_dir"
pip install -r requirements.txt

# Prompt for deployment method
echo "How would you like to deploy the application?"
echo "1. Local development server"
echo "2. uWSGI"
echo "3. Apache (Linux/macOS)"
read -p "Enter your choice (1-3): " deploy_choice

case $deploy_choice in
    1)
        export FLASK_APP=$project_name/app.py
        export FLASK_ENV=development
        flask run
        ;;
    2)
        uwsgi --ini uwsgi.ini
        ;;
    3)
        echo "Deploying with Apache..."
        if [ "$os_name" = "Linux" ]; then
            # For Debian/Ubuntu-based systems
            if [ -d "/etc/apache2" ]; then
                if [ -w "/etc/apache2/sites-available/" ]; then
                    sudo cp apache_config.conf /etc/apache2/sites-available/${project_name}.conf
                    sudo a2ensite ${project_name}.conf
                    sudo systemctl restart apache2
                    echo "Apache configuration completed successfully!"
                else
                    echo "Requesting sudo privileges to configure Apache..."
                    if sudo -v; then
                        sudo cp apache_config.conf /etc/apache2/sites-available/${project_name}.conf
                        sudo a2ensite ${project_name}.conf
                        sudo systemctl restart apache2
                        echo "Apache configuration completed successfully!"
                    else
                        echo "Failed to get sudo privileges"
                        echo "Please run the following commands manually:"
                        echo "sudo cp apache_config.conf /etc/apache2/sites-available/${project_name}.conf"
                        echo "sudo a2ensite ${project_name}.conf"
                        echo "sudo systemctl restart apache2"
                    fi
                fi
            # For RHEL/CentOS-based systems
            elif [ -d "/etc/httpd" ]; then
                if [ -w "/etc/httpd/conf.d/" ]; then
                    sudo cp apache_config.conf /etc/httpd/conf.d/${project_name}.conf
                    sudo systemctl restart httpd
                    echo "Apache configuration completed successfully!"
                else
                    echo "Requesting sudo privileges to configure Apache..."
                    if sudo -v; then
                        sudo cp apache_config.conf /etc/httpd/conf.d/${project_name}.conf
                        sudo systemctl restart httpd
                        echo "Apache configuration completed successfully!"
                    else
                        echo "Failed to get sudo privileges"
                        echo "Please run the following commands manually:"
                        echo "sudo cp apache_config.conf /etc/httpd/conf.d/${project_name}.conf"
                        echo "sudo systemctl restart httpd"
                    fi
                fi
            fi
        elif [ "$os_name" = "Darwin" ]; then
            # For macOS
            if [ -d "/etc/apache2" ]; then
                if [ -w "/etc/apache2/other/" ]; then
                    sudo cp apache_config.conf /etc/apache2/other/${project_name}.conf
                    sudo apachectl restart
                    echo "Apache configuration completed successfully!"
                else
                    echo "Requesting sudo privileges to configure Apache..."
                    if sudo -v; then
                        sudo cp apache_config.conf /etc/apache2/other/${project_name}.conf
                        sudo apachectl restart
                        echo "Apache configuration completed successfully!"
                    else
                        echo "Failed to get sudo privileges"
                        echo "Please run the following commands manually:"
                        echo "sudo cp apache_config.conf /etc/apache2/other/${project_name}.conf"
                        echo "sudo apachectl restart"
                    fi
                fi
            fi
        else
            echo "Unsupported operating system for Apache deployment"
            echo "Please configure Apache manually according to your system"
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

# Create enhanced project structure
# mkdir -p "$project_dir/templates"
# ...
