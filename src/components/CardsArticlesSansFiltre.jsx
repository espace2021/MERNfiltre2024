import React from "react";
import CardsArticlesItems from './CardsArticlesItems';
import {fetchArticlesPagination} from "../services/ArticleService";
import TablePagination from '@mui/material/TablePagination';

const CardsArticles= ()=> {

    const [products,setProducts]=React.useState([])

  //les paramètres de la pagination
  const [tot,setTot]=React.useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
       };

    const getProducts=async(page)=>{
        page++
        const data=await fetchArticlesPagination(page,rowsPerPage)
        return data;
    }

    React.useEffect(() => {
        getProducts(page)
        .then((res) => {
            setTot(res.data.tot);
            setProducts(res.data.articles);
        });
      },[page,rowsPerPage]);

    return ( 
      <>
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
     </>

    )
}

export default CardsArticles;
