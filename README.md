# Backend for AI Scraping on Facebook

This backend serves as the server-side of an application designed to scrape data from Facebook using artificial intelligence. It was developed with **Express** and **TypeScript**, integrating the **Gemini API** alongside **Puppeteer** for automated scraping. Additionally, it uses **Server-Sent Events (SSE)** for real-time data streaming to the frontend.

## Technologies Used

- **Express**: A framework for creating and managing the HTTP server.
- **TypeScript**: Provides static typing for greater code robustness and maintainability.
- **Gemini API**: An AI service used for data processing.
- **Puppeteer**: A browser automation tool used for Facebook data scraping.
- **Server-Sent Events (SSE)**: A protocol for real-time data streaming from the server to the frontend.

## Features

- **Facebook Data Scraping**: Puppeteer is used to simulate a browser and perform scraping.
- **AI Processing**: The Gemini API processes the extracted information before sending it to the frontend.
- **Real-Time Streaming with SSE**: Processed data is sent to the frontend as it becomes available.
- **TypeScript Development**: Enhances code stability and facilitates maintenance.

## Installation

```bash
# Clone the repository
git clone https://github.com/Quide1/marketplace-ia-backend

# Install dependencies
cd marketplace-ia-backend
npm install

# Start the server in development mode
npm run dev
