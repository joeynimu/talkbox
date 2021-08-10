## About

This is a voice-to-speech prototype using [Microsoft's speech-to-text service][https://azure.microsoft.com/en-gb/services/cognitive-services/speech-to-text/#overview]

## Tech Stack used

- React/Nextjs for the UI layer and API routes
- Tailwindcss for styling
- Azure Speech Congnitive Service for the speech-to-text functionality

## Getting started

Start by cloning the repo by running `git clone https://github.com/joeynimu/talkbox.git`. After cloning ensure you have checkout to the specific repo's directory.

You'll need to setup/have an Azure congnitive service. You can setup a free-tier one to begin with. Please see [the get started guide here](https://azure.microsoft.com/en-gb/free/cognitive-services/).

Once you have that setup, please copy your `SPEECH_KEY` and `SPEECH_REGION` keys from the Azure dashboard. Create a `.env.local` file and save the values on there. See example below

```bash
SPEECH_KEY=SPEECH_KEY_GOES_HERE
SPEECH_REGION=SPEECH_REGION_GOES_HERE
```

Once you have the `variables` set, install the dependencies by running `yarn install`. Then start the dev server by running `yarn dev`. You can now browse/intereact with the app at `http://localhost:3000`
