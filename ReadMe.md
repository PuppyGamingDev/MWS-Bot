# Multi-Chain Whitelist Submission
This Discord Bot allows any user to set their wallet address for specific supported Blockchains and then any project can grab a list of users wallets based off a given role and have a list of wallets exported for them.

## Requrements
- NodeJS v16+
- Ability to Copy&Paste some stuff

## Setup
Create a new file called `.env` and paste the following into it
```
TOKEN=
CLIENTID=
MONGOURI=
```
Install the required packages with `npm install` or `npm i discord.js mongoose dotenv`

While they are installing you can begin gathering your information for the `.env` file.

- `TOKEN` and `CLIENTID` are your Bot Token and Client ID from Discord Application > [GUIDE HERE](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- `MONGOURI` is a MongoDB Connection String > [GUIDE HERE](https://www.mongodb.com/docs/guides/atlas/connection-string/)

Once you have all your values, close & open the terminal (avoids any issues with it not reading the .env values) and then in the console run `node deploy-commands.js` and it will register the Bot's commands globally so any server the bot is in will be able to use them.


On the Discord Developer Dashboard for your application, navigate to `OAUTH2 > URL Generator` and tick the boxes for `bot` & `application.commands` and copy the URL that is generated below it and paste into your browser to invite the bot to your server. (The bot shouldn't need any extra permissions as all interactions are based on replying to interactions and not actual posting)

Once your bot is in, in the console run `node bot.js` and you should see that it's running when it outputs to the console!

## Commands

### /wallets
All users can view or set their wallets

### /getlist
Server administrators (by default) can get a snapshot of all linked wallets from users of a specific role and chain

## Finishing up
If you have any questions, my DMs are always open on

- Twitter > @iamshiffed
- Discord > Shiffed#2071
- New Discord Handles > shiffed
- Email > shiffed@puppy.tools

Tips are always welcome and help continue development

- XRPL: `rm2AEVUcxeYh6ZJUTkWUqVRPurWdn4E9W`
- Solana: `DvGPrXra1XgXrUY2skBqrvuAxHRCsgiSBndXhKe6HdhK`
