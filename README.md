# 🚇 Hyderabad Metro Route Finder – Frontend

## 📌 Overview

This is the **frontend application** for the **Hyderabad Metro Route Finder** system, built to provide a user-friendly interface for both **passengers** and **administrators** to interact with the Hyderabad Metro network.

It connects to a backend system that handles metro route optimization, fare and time estimation, and network management.

---

## ✨ Key Features

- 🔍 **Find shortest metro routes** between any two stations.
- 💰 Displays **fare**, **estimated travel time**, and **station count**.
- 🔄 Highlights **interchanges** and **line changes**.
- 🛠️ Includes an **Admin View** for managing metro lines and stations.
- 🌐 Built using modern JavaScript tools and RESTful API integration.

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── AdminView/
│   │   └── AdminView.js             # Admin interface for managing network data
│   ├── MetroNetworkContext/
│   │   └── MetroNetworkContext.js   # React context for shared network state
│   ├── UserView/
│   │   └── UserView.js              # User interface for finding metro routes
├── App.js                           # Main app with route/view switching
```

---

## 🧑‍💻 Tech Stack

- **Framework**: React.js (Functional Components & Hooks)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: Plain CSS / Tailwind / Bootstrap *(specify if you used any)*
- **API Standard**: RESTful (JSON-based)

---

## 🔌 API Integration

The frontend connects to the backend via REST APIs. The key endpoint used for route finding is:

### `POST /api/route/find`

**Request:**
```json
{
  "source": "Miyapur",
  "destination": "Hitec City"
}
```

**Sample Response:**
```json
{
  "route": ["Miyapur", ..., "Hitec City"],
  "totalStations": 19,
  "totalDistance": 28.5,
  "totalFare": 97.0,
  "interchanges": ["Ameerpet"],
  "estimatedTime": "50 minutes",
  "lineChanges": [
    { "from": "Red Line", "to": "Blue Line", "at": "Ameerpet" }
  ]
}
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hyderabad-metro-frontend.git
   cd hyderabad-metro-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**

   Create a `.env` file in the root:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the app:**
   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage

- **User View**:  
  Allows users to search for routes, view station paths, fare, and estimated time.

- **Admin View**:  
  (If connected to management APIs) Allows admin to add/edit metro lines and stations.

- **MetroNetworkContext**:  
  Provides shared state between user and admin views for managing metro network data.

---

## 📝 Future Enhancements (Optional Ideas)

- Station autocomplete in input forms
- Route map visualization
- Admin login/authentication
- Error handling and loading indicators
