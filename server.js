// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/generate-profile', (req, res) => {
    // 1. Add email and location to the destructured body
    const { name, bio, imageUrl, dateOfJoin, role, email, location } = req.body;

    if (!name || !bio) {
        return res.status(400).json({ error: 'Name and Bio are required.' });
    }

    const processedProfile = {
        name: name.trim(),
        bio: bio.trim(),
        imageUrl: imageUrl || 'https://via.placeholder.com/150',
        role: role ? role.trim() : 'Independent Contributor',
        
        // 2. Add the new fields here
        email: email ? email.trim() : 'N/A',
        location: location ? location.trim() : 'N/A',
        
        // 3. Fix the date: Just use the raw string provided by the input
        dateOfJoin: dateOfJoin ? dateOfJoin : new Date().toLocaleDateString(),
        
        timestamp: new Date().toISOString()
    };

    res.status(200).json({
        message: 'Profile generated successfully!',
        profile: processedProfile
    });
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});