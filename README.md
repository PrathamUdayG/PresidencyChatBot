# college-enquiry-chatbot-using-RASA

Steps for creating College Enquiry Chatbot: using RASA

### Step - 1

Create a virtual environment using Anaconda Prompt.

![Screenshot (237)](https://user-images.githubusercontent.com/55443395/146378026-ba17a878-5533-4961-b4e4-070d5dfc4606.png)

### Step - 2

1. Activate the virutal environment using prompt (Command Line).
1. Check your python version because rasa works only for few versions.

Install rasa using:

**pip3 install rasa**

For more information follow RASA documentation: 
https://rasa.com/docs/rasa/2.x/

### Step - 3

1. Create a new folder inside the virtual environment where you will initialize rasa project.
1. Go to the path of the newly created folder.
1. Type **rasa shell** on the command line. This will open the command line interface of rasa.
2. Now type **rasa init** which will initialize our project and will create every file we require for training.

### Step - 4

1. Now, we just have to edit the files according to our problem statement.
2. You can use default or customized pipeline for training.

### Step - 5

Train rasa using **rasa train** command on the rasa shell.

### Step - 6

1. Run rasa on the same port you are running your web application using command ' rasa run -m models --enable-api --cors "*" '
2. Open your web application using any browser and see how well your chatbot is responding to your queries.





New Steps:

frontend: 
1.code .
2.npm start
3.http://localhost:3000/

backend :
1.python3 -m venv ./venv
2.source ./venv/bin/activate
3.cd ChatBot
4.rasa train
5.rasa run -m models --enable-api --cors "*"


How to run in Windows:
Run in windows:

C:\Windows\System32>.\rasa_env\Scripts\activate

(rasa_env) C:\Windows\System32>E:

(rasa_env) E:\>cd E:\ChatBot_Project\ChatBot\ChatBot

(rasa_env) E:\ChatBot_Project\ChatBot\ChatBot>rasa train

(rasa_env) E:\ChatBot_Project\ChatBot\ChatBot>rasa run -m models --enable-api --cors "*"
