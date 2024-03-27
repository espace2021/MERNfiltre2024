const express = require('express');
const router = express.Router();
const Article=require("../models/article")
const Scategorie =require("../models/scategorie")

// afficher la liste des articles.

router.get('/', async (req, res, )=> {
    try {
        const articles = await Article.find({}, null, {sort: {'_id': -1}}).populate("scategorieID").exec();
                
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new Article(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

// afficher la liste des articles par page
router.get('/pagination', async(req, res) => { 
    const page = req.query.page ||1 // Current page
    const limit = req.query.limit ||5; // Number of items per page
     
        // Calculez le nombre d'éléments à sauter (offset)
        const offset = (page - 1) * limit;
     
     try {
 
     // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
   
             const articlesTot = await Article.countDocuments();
 
     const articles =  await Article.find( {}, null, {sort: {'_id': -1}})
         .skip(offset)
         .limit(limit)
 
       res.status(200).json({articles:articles,tot:articlesTot});
   } catch (error) {
       res.status(404).json({ message: error.message });
   }
   });
 
   // afficher la liste des articles par page avec filtres
   router.get('/paginationFilter', async (req, res) => { 
    const page = req.query.page || 1; // Current page
    const limit = req.query.limit || 5; // Number of items per page
    const searchTerm = req.query.searchTerm || ""; // searchedTerm

    const offset = (page - 1) * limit;

    // retrouver le prix le plus grand : Utilisation de findOne avec un tri descendant sur le champ prix et ne retourne que le champ prix
    // Le champ _id est toujours présent sauf si on l'exclue explicitement. on ajoute la syntaxe - à select
    const maxValueDoc = await Article.findOne().sort('-prix').select('prix -_id');
   
    const prixMax = req.query.prixMax || maxValueDoc.prix; // le prix max si vide prend la valeur max de la BD
   
    try {
       
        let query = {};

         // Si le terme de recherche est défini, ajouter un filtre pour la désignation
         if (searchTerm) {
            query.designation = { $regex: new RegExp(searchTerm, 'i') };
        }

        // Ajouter un filtre pour le prix
       
            query.prix = { $lte: prixMax };
       

        const articlesTot = await Article.find(query).countDocuments();

        const articles = await Article.find(query)
            .sort({ '_id': -1 })
            .skip(offset)
            .limit(limit);
    
        res.status(200).json({ articles, tot: articlesTot , maxValuePrix:maxValueDoc.prix});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// chercher un article
router.get('/:articleId',async(req, res)=>{
    try {
        const art = await Article.findById(req.params.articleId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// modifier un article
router.put('/:articleId', async (req, res)=> {
    try {
     const art = await Article.findByIdAndUpdate(
         req.params.articleId,
         { $set: req.body },
       { new: true }
     );
     const articles = await Article.findById(art._id).populate("scategorieID").exec();
     res.status(200).json(articles);
     } catch (error) {
     res.status(404).json({ message: error.message });
     }
 });
 
// Supprimer un article
router.delete('/:articleId', async (req, res)=> {
    const  id  = req.params.articleId;
    await Article.findByIdAndDelete(id);

    res.json({ message: "article deleted successfully." });

});

// chercher un article par s/cat
router.get('/scat/:scategorieID',async(req, res)=>{
    try {
        const art = await Article.find({ scategorieID: req.params.scategorieID}).exec();
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// chercher un article par cat
router.get('/cat/:categorieID', async (req, res) => { 
    try {
        // Recherche des sous-catégories correspondant à la catégorie donnée
        const sousCategories = await Scategorie.find({ categorieID: req.params.categorieID  }).exec();
     
        // Initialiser un tableau pour stocker les identifiants des sous-catégories trouvées
        const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);

        // Recherche des articles correspondant aux sous-catégories trouvées
        const articles = await Article.find({ scategorieID: { $in: sousCategorieIDs } }).exec();
        
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

  // modifier quantité seulement

  router.put('/qty/:id', async (req, res) => { console.log(req.body)
    const qty = req.body.quantity||0;
    const articleId=req.params.id||null;

    const oldArticle=await Article.findById(articleId)
   
     try {
       const articleUpdated = await Article.findByIdAndUpdate(
         articleId,
         { qtestock: oldArticle.qtestock - qty},
         { new: true } // Return the updated document
       );
   
       if (!articleUpdated) {
         return res.status(404).json({ message: 'Product not found' });
       }
   
       res.status(200).json(articleUpdated);
     } catch (error) {
       res.status(404).json({ message: error.message });
     }
   });

   // afficher la liste des articles par page avec filtres et par catégorie
   router.get('/paginationFilterWithCateg/:categorieID', async (req, res) => { 
    const page = parseInt(req.query.page) || 1; // Page actuelle
    const limit = parseInt(req.query.limit) || 5; // Nombre d'articles par page
    const searchTerm = req.query.searchTerm || ""; // Terme de recherche
    const catg = req.params.categorieID // Catégorie 

    // retrouver le prix le plus grand : Utilisation de findOne avec un tri descendant sur le champ prix et ne retourne que le champ prix
    // Le champ _id est toujours présent sauf si on l'exclue explicitement. on ajoute la syntaxe - à select
    const maxValueDoc = await Article.findOne().sort('-prix').select('prix -_id');
   
    const prixMax = req.query.prixMax || maxValueDoc.prix; // le prix max si vide prend la valeur max de la BD
   
    
    const offset = (page - 1) * limit;

    try {
        // Recherche des sous-catégories correspondant à la catégorie donnée
        const sousCategories = await Scategorie.find({ categorieID: catg }).exec();
        // Récupération des identifiants des sous-catégories trouvées
        const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);

        let query = {};
        // Si un terme de recherche est défini, ajoute un filtre pour la désignation
        if (searchTerm) {
            query.designation = { $regex: new RegExp(searchTerm, 'i') };
        }
        // Ajoute un filtre pour le prix maximum
        if (prixMax) {
            query.prix = { $lte: prixMax };
        }
        // Ajoute un filtre pour les sous-catégories
        if (sousCategorieIDs.length > 0) {
            query.scategorieID = { $in: sousCategorieIDs };
        }

        // Compte le nombre total d'articles
        const articlesTot = await Article.countDocuments(query);
        // Recherche les articles avec les filtres et la pagination
        const articles = await Article.find(query)
            .sort({ '_id': -1 })
            .skip(offset)
            .limit(limit);
        
        // Envoi de la réponse avec les articles, le nombre total d'articles et le prix maximal
        res.status(200).json({ articles, tot: articlesTot  , maxValuePrix:maxValueDoc.prix});
    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur
        res.status(404).json({ message: error.message });
    }
});
    
module.exports = router;
