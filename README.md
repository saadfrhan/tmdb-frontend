# MERN Movie App ([visit](https://tmdb-frontend-chi.vercel.app/))

## Running Locally

```bash
mkdir movie-app && cd movie-app

git clone https://github.com/saadfrhan/tmdb-frontend client
cd client
pnpm install

cd ..
git clone https://github.com/saadfrhan/tmdb-backend server
cd server
pnpm install
```

```bash
# .env file frontend
VITE_TMDB_READ_ACCESS_TOKEN=""
VITE_CLERK_PUBLISHABLE_KEY=""
VITE_TMDB_API_KEY=""

# .env file backend
CLERK_SECRET_KEY=""
DATABASE_URL=""
```

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. Star the project if you like it.

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request
