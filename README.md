# Wells Fargo x Global Career Accelerator Competition!

In this competition I was tasked with creating an idea that would help people get instant access to financial help.
My solution was to use AI and make a chat bot that would help users.

This wouldn't be any ordinary chat bot if it were to be fully developed. This would be a virtual financial advisor that users can talk to at any time day or night.
The AI could read the user's typical purchases and look for ways the user can save money, analyze and provide a detailed budget, give investment advice, etc.
It would be an entirely optional tool; Users would not be forced to use the AI or allow it to read their finances.

## This project is a proof of concept that uses a general-use, open-source, AI model from huggingface.co. Any information given and received from the AI can not be trusted.

---

# Try it yourself!

## Set up Hugging Face API key

If you don't have a Hugging Face account, make one here https://huggingface.co/.

Click on your `profile` -> select `Access Tokens` -> select `Create new token`.
set User permissions for Repositories to have `Read access`, and for Inference to `Make calls to Inference Providers`.
Save your token and keep your token key, it should look like `hf_xxxxxxxxxxxxxxxxxxxx`.

Clone the repository: `git clone https://github.com/colewortman/WFcompetition`.

Navigate into the project directory.

Open the `backend` directory to open the `.env` file.
Note: normally, .env is excluded from GitHub for security reasons, but in this repo it is set up with a placeholder API key so you can set up quickly.

Change the `API_KEY` to be the same as your token key, which should look like `hf_xxxxxxxxxxxxxxxxxxxx`.

## Build and run the app

Download Docker and docker-compose if needed https://www.docker.com/.

In the main project directory,
Run: `docker build -t my-app .`
Run: `docker run --env-file backend/.env -p 3000:3000 my-app`

Note: For ports, you can change the port in the .env file. If you change the port in .env then you must modify this part of the docker run command: `-p 3000:3000`.
The second number must match the port in .env, `-p 3000:PORT`.
The first number can be changed if you have conflicts on your machine.

Finally, open the home.html file in your browser and chat away!
