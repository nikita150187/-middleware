import express from "express";

const app = express();
const PORT = 3000;


// Middleware 1: Logs all incoming requests

app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url} at ${new Date().toLocaleTimeString()}`);
    next();
    
});

// Middleware 2: Route-specific authentication middleware

const checkApiKey = (req, res, next) =>{
    const apiKey = req.query.apiKey;
    if (!apiKey || apiKey  !=="mysecretkey") {
        return res.status(403).send("Access Denied: Invalid API Key");
    }
    next();
};


// Public Route (No authentication required)

app.get("/", (req, res) =>{
    res.send("welcome to the public home page!");
});


// Protected Route (Requires valid API key)

app.get("/protected" ,checkApiKey, (req, res) => {
    res.send("Welcome to the protected page! You have access.");
});

app.listen(PORT ,() => {
    console.log(`Server running on port ${PORT}`);
    
});

