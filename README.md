# HealthChat

HealthChat is an AI-powered healthcare assistant designed to provide instant answers to health-related queries, book appointments, and offer personalized health tips. This project is built using React and integrates with Google's Vertex AI for natural language processing.

---

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **AI-Powered Chat**: Get instant responses to healthcare-related queries.
- **Appointment Booking**: Schedule appointments with healthcare professionals.
- **Personalized Health Tips**: Receive tailored health advice.
- **Speech Recognition**: Use voice commands for interaction.
- **Responsive Design**: Works seamlessly across devices.

---

## File Structure

The project is organized as follows:

```
Health-Care/
├── public/              # Static files
│   ├── index.html       # Main HTML file
│   ├── favicon.ico      # Favicon
│   └── manifest.json    # PWA configuration
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── ChatPage.js          # Chat interface
│   │   ├── LandingPage.js       # Landing page
│   │   ├── FeatureSection.js    # Features section
│   │   ├── TestimonialSection.js # Testimonials section
│   │   ├── ContactSection.js    # Contact form
│   │   └── ui/                  # Reusable UI components
│   ├── services/        # API integrations
│   │   └── geminiApi.js # Handles communication with Vertex AI
│   ├── App.js           # Main application component
│   ├── App.css          # Global styles
│   ├── index.js         # Entry point
│   └── index.css        # Base styles
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

---

## Setup and Installation

Follow these steps to set up the project on your local machine:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Google Cloud account with Vertex AI enabled

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vanshjain2060/healthchat.git
   cd healthchat
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_GEMINI_API_URL=https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/models/MODEL_ID:predict
   REACT_APP_GEMINI_API_KEY=YOUR_API_KEY
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Build for Production**:
   To create a production build, run:
   ```bash
   npm run build
   ```

---

## Usage

- **Landing Page**: The homepage introduces the app and its features.
- **Chat Interface**: Interact with the AI assistant for healthcare-related queries.
- **Contact Form**: Submit feedback or inquiries through the contact section.

---

## Contributing

We welcome contributions from the open-source community! To contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add feature-name"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature-name
   ```
5. **Submit a pull request**.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.