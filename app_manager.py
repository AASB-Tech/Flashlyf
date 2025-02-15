# If you want to execute BASH commands from Python in a similar way to the package.json scripts in npm, 
# you can use the subprocess module in combination with a dictionary of commands. 
# Here's an example:

# In this example, we define a dictionary commands where the keys are the command names and the values are the corresponding BASH commands. 
# The run_command function takes a command name as input, checks if it exists in the commands dictionary, and then executes the corresponding BASH command using subprocess. Popen.

# You can add more commands to the commands dictionary as needed. To run a specific command, 
# simply pass the command name to the run_command function. If the command exists, it will be executed; 
# otherwise, a message will be printed indicating that the command was not found.

# You can customize the BASH commands in the commands dictionary to fit your specific needs.
# Remember to exercise caution when using user-provided input as part of the BASH commands to avoid security vulnerabilities.

import os
import subprocess
import sys

# Project info
info = {
    "name": "FlashLyf",
    "version": "1.0.0",
    "author": "AASB Tech",
    "description": "The next social media to rock the world",
    "website": "https://flashlyf.com",
    "license": "Private. Copyrighted to- and owned by- AASB Tech."
}

# Available commands to run
commands = {
    "start":                     "cp docker-compose-development.yml docker-compose.yml && docker compose up --build",
    "stop":                      "docker compose down",
    "restart":                   "docker compose restart", 
    "build-frontend-prod":       "cd frontend_web && docker build --target production -t flashlyf-frontend-prod . && cd ..",    
    "build-backend-prod":        "cd backend && docker build -t flashlyf-backend-prod . && cd ..",
    "build-prod":                "python app_manager.py build-frontend && python app_manager.py build-backend",
    "check-containers":          "docker ps",
    "check-memory":              "docker stats",
    "list-packages-frontend":    "cat frontend_web/package.json",
    "list-packages-backend":     "cat backend/requirements.txt",
    "install-packages-frontend": "cd frontend_web && npm install && cd ..",
    "install-packages-backend":  "python app_manager.py add-venv && cd backend && pip install -r backend/requirements.txt && cd..",
    "install-all-packages":      "python app_manager.py install-packages-frontend && python app_manager.py install-packages-backend",
    "reset-migrations":          "chmod u+x ./backend/reset_migrations.sh && ./backend/reset_migrations.sh",
    "flush-db-staging":          "echo 'This command is not implemented yet'",
    "flush-db-local":            "docker exec flashlyf-backend-dev python manage.py flush --no-input",
    "add-venv":                  "cd backend && python3 -m venv venv && source venv/bin/activate && cd ..",
    "test":                      "echo 'This command is not implemented yet'",
    "lint":                      "echo 'This command is not implemented yet'",
    "info":                      "",
    "help":                      ""
}

# Make sure this follows the exact same order as commands
command_descriptions = {
    "start":                     "Starts the development environment.",
    "stop":                      "Stops the development environment.",
    "restart":                   "Restarts the development environment.",
    "build-frontend-prod":       "Builds the frontend docker image.",
    "build-backend-prod":        "Builds the backend docker image.",
    "build-prod":                "Builds both frontend and backend docker images.",
    "check-containers":          "Checks the status of the local running containers.",
    "check-memory":              "Checks the memory usage of the local running containers.",
    "list-packages-frontend":    "Lists the packages of the frontend.",
    "list-packages-backend":     "Lists the packages of the backend.",
    "install-packages-frontend": "Installs the packages of the frontend.",
    "install-packages-backend":  "Installs the packages of the backend.",
    "install-all-packages":     "Install packages on both frontend and backend.",
    "reset-migrations":          "Resets the Django database migrations.",
    "flush-db-staging":          "Flushes the staging environment postgresql database.",
    "flush-db-local":            "Flushes the local postgresql database.",
    "add-venv":                  "Add a virtual environment to the backend (for installing new packages).",
    "test":                      "Test the app.",
    "lint":                      "Runs the linters.",
    "info":                      "See information about the project.",
    "help":                      "Type 'help' to see a list of available commands."
}

# Function to execute a command
def run_command(command, option):
    if command == "help":
        print("Available commands: ")
        print("-------------------")
        for key in commands:
            print(f"{key}: {commands[key]}")
            print(f"description: {command_descriptions[key]} \n")
    elif command == "info":
        print("Project information: ")
        print("-------------------")
        for key in info:
            print(f"{key}: {info[key]}")
    elif command in commands:
        process = subprocess.Popen(commands[command], shell=True)
        process.wait()
    else:
        print(f"Command '{command}' not found. Use command 'help' to see a list of available commands.")

# Get the command from input and execute
def main():
    if len(sys.argv) > 1:
        command_to_run = sys.argv[1]
        option = os.getenv('OPTION', "")
        # if len(sys.argv) > 2:
        #     option = sys.argv[2]
        run_command(command_to_run, option)
    else:
        print("No command given. Format: 'python app_manager.py <command>'")

if __name__ == "__main__":
    main()
