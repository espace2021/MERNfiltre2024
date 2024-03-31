import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {setPage, setLimit, setSearchTerm, setPrixMax,setCategorieID, fetchArticlesPaginationFilt, fetchArticlesPaginationFiltCateg} from "../features/articleSlice";
import {getCategories} from "../features/categorieSlice";
import AfficheArticles from './AfficheArticles';
import Menuclient from './Menuclient';
import TablePagination from '@mui/material/TablePagination';

const Listarticles = () => {
  

  let {page,limit,tot,searchTerm,prixMax,maxValuePrix,categorieID} = useSelector((state)=>state.storearticles);

  let {categories} = useSelector((state)=>state.storecategories);
  
      const handleChangePage = (event, newPage) => { 
        // on ajoute 1 car mui comptabilise à partir de 0
        dispatch(setPage(newPage+1));
        };
      
      const handleChangeRowsPerPage = (event) => { 
        dispatch(setLimit(parseInt(event.target.value, 10))); 
        dispatch(setPage(1)); // Réinitialiser la page lorsque le nombre d'éléments par page change
   
          };
  
      const getProducts=async()=>{
        if (categorieID !== '') {
           dispatch(fetchArticlesPaginationFiltCateg())
        }
        else {
          dispatch(fetchArticlesPaginationFilt())
        }
            }

    const dispatch=useDispatch()
    useEffect(() => {
      getProducts()
    }, [dispatch,page,limit,searchTerm,prixMax,categorieID])


    const getData = async () => {
      dispatch(getCategories())
  };
  
  React.useEffect(() => {
      getData();
  }, [dispatch]);
  
  const handleCategories=async(event,_id)=>{
  
     // Annuler le style précédent pour tous les éléments
     const categoryElements = document.querySelectorAll('#categoriesList > div');
     categoryElements.forEach(element => {
         element.style.backgroundColor = ''; // Annuler le style précédent
     });
  
     // Appliquer le style uniquement à cet élément cliqué
     event.currentTarget.style.backgroundColor = 'yellow';
   
     //dans le state categorieID on va y mettre le _id de la catégorie sélectionnée
     dispatch(setCategorieID(_id))
    
  }
  
  return (
    <div>
      <Menuclient/>

      <div className="row">
      <div className="col-sm-3 mt-5">
       <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">Filtre Désignation</span>
        </div>
        <input type="text" className="form-control"
        value={searchTerm}
        onChange={(event) =>  dispatch(setSearchTerm(event.target.value))}
        />
      </div>
      <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon2">Prix Max  { prixMax?prixMax:maxValuePrix } TND</span>
      </div>
      <input 
        type="range" 
        className="form-range" 
        min="0" 
        max={maxValuePrix} 
        step="1" 
        value={ prixMax?prixMax:maxValuePrix }
        onChange={(event) => dispatch(setPrixMax(event.target.value))}
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

      <AfficheArticles/>


      <div style={{ "display": "flex", "justifyContent": "center"}}> 
     
     <TablePagination
      component="div"
      count={tot}
      // on soustrait 1 car mui comptabilise à partir de 0
      page={page-1}
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

      </div>    
     </div>
   </div>

     </div>    

    </div>
  )
}

export default Listarticles
