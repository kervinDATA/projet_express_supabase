const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

const PORT = 3000;

// Connexion à Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;  // Utilise l'URL définie dans Docker
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Route par défaut
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route pour récupérer les données
app.get('/data', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('listings') // Assure-toi que 'listings' est bien le nom de ta table
        .select('*');
      
      if (error) {
        console.error('Erreur Supabase:', error); // Log l'erreur de Supabase
        return res.status(500).json({ message: 'Erreur lors de la récupération des données', error });
      }
  
      if (data.length === 0) {
        return res.status(404).send('Aucune donnée trouvée.');
      }
  
      res.json(data);
    } catch (err) {
      console.error('Erreur serveur:', err); // Log une erreur serveur générale
      res.status(500).json({ message: 'Erreur interne du serveur', error: err });
    }
  });
  

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
