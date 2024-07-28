import express from 'express';

const app = express();
const port = 3000;
import { DataParser }  from './DataParser.js'


// Route pour la page principale
app.get('/',async  (req, res) => {
    let data = await new DataParser().fetchAndParse();
    res.header('Content-Type', 'text/csv');
    res.attachment('data.csv');
    res.send(data);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});