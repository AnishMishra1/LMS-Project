# LMS Frontend

### SetUp instruction

1. clone the project

...
   git clone https://github.com/AnishMishra1/LMS-Project.git
...

2. Move into the directory

...
   cd Frontend
...

3. install dependencies

...
   npm install
...

4. run the server

...
   npm start
...


### Setup instruction for tailwind

[Tail wind official instruction doc]
(https://tailwindcss.com/docs/installation)

1. install Tailwind CSS

...
   npm install -D tailwindcss  
...

2. Create Tailwind config file

...
   npx tailwindcss init
...

3. Add file extension to tailwind config file

....
    "./src/**/*.{html,js,jsx,ts,tsx}"
....

4. Add the tailwind directives at the top of the index.css

...
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
...