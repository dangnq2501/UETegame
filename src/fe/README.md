
<h1 align="center">
  <br>
<!-- <img src="./read_me_src/UETegame.png" alt="UETegame" width="200"> -->
  <a href="https://www.UETegame.games/dashboard">UETegame</a>
</h1>

<h4 align="center">A website provides tools for teachers to automatically converted question files to RPG games. built on top of <a href="https://nextjs.org/" target="_blank">NextJS</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
<!--   <a href="#download">Download</a> • -->
  <a href="#credits">Credits</a> •
<!--   <a href="#related">Related</a> • -->
  <a href="#authors">Authors</a>
</p>

![screenshot](./read_me_src/UETegame_home.png)

## Key Features

* Gamify boring questions
  - With this feature, teachers can pass in boring question files and UETegame will automatically convert it to fun card games to make students pay attention to the lesson. 
* Hero profile
  - Just like a character in a RPG game, each user will earn coins as a reward when finish the quiz game with high score. User can use coins to buy gun, skin for their own character.
* Quiz game:
  - The questions from teacher files will be transformed into a card game that take idea from dungeon. User's character have to choose which card to take. 
  - If user choose monster card, a question will pop up and the animation of hero slaying monster will be played if user choose the correct answer.
  - If user choose buff card, special buff will be given such as increasing health, increasing damage.
* Clan: 
  - A place where many players can join and experience clan games to gain coins and knownledge. Players can also contribute their own questions to clan.
  - Can be used by teachers for their class to track each student progress and accuracy to support them.
* Generated questions from documents: 
  - Reduce the time needed to prepare questions by summarizing documents and then return a list of questions related to the documents.

## Future Features
- [ ] Review game - Players can join older games to review their lessons and pratice.
- [ ] Implement new enviroments, mobs.
- [ ] Increase types of answer.
- [ ] Imporve scalability.
- [ ] Reduce the time to convert question files to game.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/or2er/iai-hackathon-2023-frontend.git

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
