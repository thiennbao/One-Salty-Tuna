# One Salty Tuna
> This is a project of poor student running deadline 12 hours a day in the middle of lonely winter

### How to use
To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer.

From your command line:

Clone this repository
```sh
git clone https://github.com/thiennbao/One-Salty-Tuna.git
```
Go into the repository
```sh
cd One-Salty-Tuna
```
Create environment file
```sh
code .env
```
In your VSCode:
```.env
PORT=<your sever port>
DBPASSWORD=<your database password>
JWTKEY=<your jwt key>
```
Save and return to your command line.

Install dependencies
```sh
npm install
```
Run the app
```sh
npm start
```
All done, your sever is running at ``localhost:<your sever port>``