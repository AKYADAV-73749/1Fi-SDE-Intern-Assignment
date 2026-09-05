# 1Fi Marketplace

**🌟 Live Demo:** [View the live app here!](https://1-fi-sde-intern-assignment-zeta.vercel.app/)

This repository contains my submission for the 1Fi SDE Intern Assignment. 

## 🚀 Overview
The objective of this project was to build the **1Fi Marketplace** section within the existing Shop page, ensuring consistency with the 1Fi brand's UI/UX and maintaining high engineering standards.

## ✨ Key Features Implemented
- **Custom Navigation**: Built a seamless tab navigation system matching the required flow (`Top Brands`, `Nearby Stores`, `1Fi Marketplace`).
- **Dynamic Data Handling**: To avoid hardcoding, products and EMI plans are fetched dynamically via a mock API service (`src/api/mockApi.js`) that simulates real network latency.
- **State Management**: Implemented robust loading and error states while data is being fetched.
- **Premium UI/UX**: Designed a highly responsive, modern interface matching 1Fi's brand identity (typography, spacing, and colors).
- **Interactive Flow**: Users can browse products, choose specific storage variants, pick an EMI plan, and proceed to checkout.

## 🏗️ Project Architecture
To ensure code readability and component reusability, the project follows a clean, modular structure:
- `/src/api` - Contains the mock API services to simulate backend data fetching.
- `/src/components` - Holds highly reusable UI components (like `ProductCard.js`).
- `/src/screens` - Contains the main view logic and state management for the marketplace.
- `App.js` - Acts as the clean entry point and navigation controller.

## 🛠️ Tech Stack
- React Native
- Expo
- JavaScript (ES6+)

## 🏃‍♂️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AKYADAV-73749/1Fi-SDE-Intern-Assignment.git
   cd 1Fi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo server:**
   ```bash
   npx expo start --clear
   ```
4. Open the **Expo Go** app on your iOS or Android device and scan the QR code in the terminal to view the app!

---
*Thank you for reviewing my assignment!*
