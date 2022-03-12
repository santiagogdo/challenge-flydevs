# Movie showcase app

This project was created for a frontend challenge from Flydevs.

## Getting Started

To run the project locally, you will need to:

1) Clone the project.

2) Open the root folder of the project in a terminal and run ```npm install```.

3) Create an .env.local file in the root folder of the project with the following keys:

    ```NEXT_PUBLIC_AUTH_TOKEN```: For storing the API token that the application uses to load the data from **The Movie Database API**. To obtain an API key, you will need to create an account, and request an API key by clicking the "API" link from the left hand sidebar within your account settings page. You need to have a legitimate business name, address, phone number and description to apply for an API key.

    ```NEXT_PUBLIC_MOVIE_IMAGE_BASE_URL```: This is the base url that will be used to fetch images from **The Movie Database API**. You can obtain it by sending a ```GET``` request to ```https://api.themoviedb.org/3/configuration?api_key=your-api-key```.

    ```NEXT_PUBLIC_PLACEHOLDER_IMAGE```: This is a placeholder image to be used during the load of the images. Since the next/image component will blur and resize the image, the recommended size is 10px or less for a better performance, for example, a base64 2x2 image.

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