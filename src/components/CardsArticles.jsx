import React from "react";
import CardsArticlesItems from './CardsArticlesItems';
import {fetchArticlesPaginationFilter,fetchArticlesPaginationFilterCateg} from "../services/ArticleService";
import TablePagination from '@mui/material/TablePagination';

import axios from "axios";

const CardsArticles= ()=> {

    const [products,setProducts]=React.useState([])

  //les paramètres de la pagination
  const [tot,setTot]=React.useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //le mot cherché
  const [searchTerm, setSearchTerm] = React.useState('');

  //le filtre prix
    const [prixMax,setPrixMax]= React.useState('');
    const [maxValuePrix,setMaxValuePrix] = React.useState('')

  //le filtre catégorie
    const [categorieID, setCategorieID] = React.useState('');
  
    const handleChangePage = (event, newPage) => { 
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
       };

       async function getProducts(page) {
        page++;
        let data = '';
        if (categorieID !== '') {
            data = await fetchArticlesPaginationFilterCateg(page, rowsPerPage, searchTerm, prixMax, categorieID);
        } else {
            data = await fetchArticlesPaginationFilter(page, rowsPerPage, searchTerm, prixMax);
        }
        return data;
    }
    

    React.useEffect(() => {
        getProducts(page)
        .then((res) => {
            setTot(res.data.tot);
            setProducts(res.data.articles);
            setMaxValuePrix(res.data.maxValuePrix)
           });
      },[page,rowsPerPage,searchTerm,prixMax,categorieID]);

// categories

const [categories, setCategories] = React.useState([]);


const getData = async () => {
    try {
        const { data } = await axios.get('http://localhost:3001/api/categories');
             setCategories(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

React.useEffect(() => {
    getData();
}, []);

const handleCategories=async(event,_id)=>{

   // Annuler le style précédent pour tous les éléments
   const categoryElements = document.querySelectorAll('#categoriesList > div');
   categoryElements.forEach(element => {
       element.style.backgroundColor = ''; // Annuler le style précédent
   });

   // Appliquer le style uniquement à cet élément cliqué
   event.currentTarget.style.backgroundColor = 'yellow';
 
   //dans le state categorieID on va y mettre le _id de la catégorie sélectionnée
   setCategorieID(_id)
  
}

    return ( 
      <div className="row">
      <div className="col-sm-3 mt-5">
       <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">Filtre Désignation</span>
        </div>
        <input type="text" className="form-control"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon2">Prix Max  {prixMax?prixMax:maxValuePrix} TND</span>
      </div>
      <input 
        type="range" 
        className="form-range" 
        min="0" 
        max={maxValuePrix} 
        step="1" 
        value={prixMax?prixMax:maxValuePrix}
        onChange={(event) => setPrixMax(event.target.value)}
      />
      
    </div>
    <div id="categoriesList">
    <span className="input-group-text" id="basic-addon1">Catégories</span>
    <>
            {categories && categories.length > 0 && categories.map((category) => (
                <div key={category._id} 
                style={{'cursor':'pointer'}} 
                onClick={(event)=>handleCategories(event,category._id)}
                 >
                  {category.nomcategorie}</div>
            ))}
    </>
    </div>
      </div>
    <div className="col-sm">
      
     <div className="row">
            {products && products?.map((product) => (
              
              <CardsArticlesItems key={product?._id} product={product} />
             
            ))}
      </div>
     <div style={{ "display": "flex", "justifyContent": "center"}}> 
     
     <TablePagination
      component="div"
      count={tot}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

     </div>    
     </div>
   </div>


    )
}

export default CardsArticles;
