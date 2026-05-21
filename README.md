# Hotel Room Reservation System

This is a full-stack web application designed for a hotel to optimally allocate rooms to guests based on specific travel time constraints.

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express.js

## How to Run

### 1. Start the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
npm start
```
The backend server will run on `http://localhost:3001`.

### 2. Start the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173` (or similar). Open it in your browser.

## Features
1. **Dynamic Room Assignment**: Uses a combinatorial algorithm to minimize total travel time across rooms.
2. **Real-time Visualization**: See a 10-floor grid showing available, booked, and newly assigned rooms.
3. **Control Panel**: Book 1-5 rooms, generate random occupancies, and reset the state entirely.

## Project Structure
- `backend/src/services/roomService.js`: Contains the core algorithm for room optimization.
- `backend/src/models/roomModel.js`: In-memory state of the hotel.
- `frontend/src/components/HotelGrid.jsx`: The visual grid representation of the hotel.
- `frontend/src/components/ControlPanel.jsx`: Controls and status UI.

## Docker Deployment

### Single‑container Dockerfile

A single Dockerfile at the project root builds both the backend API and the React UI, then serves the UI via Express.

**Build and run locally**

```bash
docker build -t hotel-reservation .
docker run -p 3001:3001 hotel-reservation
```

The app will be reachable at `http://localhost:3001`. The API is available under `/api/*`.

### Deploy to a free Docker host (Render, Railway, Fly.io, etc.)

1. Push the repository to GitHub.
2. Create a new Docker service on the platform, pointing at the repository root.
3. The platform will automatically run `docker build .` and start the container.
4. (Optional) Attach a custom domain – the platform provides free TLS.

> **Note:** The previous `docker-compose.yml` and separate backend/frontend Dockerfiles are kept for reference but are not required for a single‑container deployment.
