# Movie showcase app

This project was created for a frontend challenge from Flydevs.

Note: I used a different **API** than the one proposed in the challenge, because it had a hard limit of 500 requests per month, which blocked the development process.

## Getting Started

To run the project locally, you will need to:

1) Clone the project.

2) Open the root folder of the project in a terminal and run ```npm install``` to install the project dependencies.

3) Create a ```.env.local``` file in the root folder of the project with the following keys:

    ```NEXT_PUBLIC_AUTH_TOKEN```: For storing the API token that the application uses to load the data from **The Movie Database API**. To obtain an API key, you will need to [create an account](https://www.themoviedb.org/signup), and request an API key by clicking the "API" link from the left hand sidebar within your account settings page. You need to have a legitimate business name, address, phone number and description to apply for an API key.

    ```NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL```: This is the base url that will be used to fetch images from **The Movie Database API**. You can obtain it by sending a ```GET``` request to ```https://api.themoviedb.org/3/configuration?api_key=your-api-key```.

4) Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5) Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy on Vercel

You can deploy the app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Demo

If you want to see the app in action, you can take a look at the [production environment](https://challenge-flydevs.vercel.app) I set up for the repository.