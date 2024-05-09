import Api from "../axios/Api";

const ARTICLE_API="articles"

export const fetcharticles=async()=> {
return await Api.get(ARTICLE_API);
}
export const fetcharticleById=async(articleId)=> {
    return await Api.get(ARTICLE_API + '/' + articleId);
    }
export const deletearticle=async(articleId) =>{
    return await Api.delete(ARTICLE_API + '/' + articleId);
    }
export const addarticle=async(article)=> {
    return await Api.post(ARTICLE_API, article);
    }
export const editarticle=(article) =>{
    return Api.put(ARTICLE_API + '/' + article._id, article);
    }

export const fetchArticlesPagination=async(page,limit)=> { 
    return  await Api.get(`${ARTICLE_API}/pagination?page=${page}&limit=${limit}`)
    }

export const fetchArticlesPaginationFilter=async(page,limit,searchTerm,prixMax)=> { 
    return  await Api.get(`${ARTICLE_API}/paginationFilter?page=${page}&limit=${limit}&searchTerm=${searchTerm}&prixMax=${prixMax}`)
    } 
        
export const fetchArticlesByCateg=async(categorieID)=> { 
    return  await Api.get(ARTICLE_API + '/cat/' + categorieID)
   } 

export const fetchArticlesPaginationFilterCateg=async(page,limit,searchTerm,prixMax,categorieID)=> { 
    return  await Api.get(`${ARTICLE_API}/paginationFilterWithCateg/${categorieID}?page=${page}&limit=${limit}&searchTerm=${searchTerm}&prixMax=${prixMax}`)
    } 

export const updateQuantity = async (lineOrder) => {
        const path = "qty/";
        let result = [];
        //La fonction Promise.all() est utilisée pour attendre que toutes les requêtes se terminent simultanément.
        await Promise.all(lineOrder.map(async (line) => { 
           
            try {
                const response = await Api.put(`${ARTICLE_API}/${path}${id}`, {
                    quantity: line.quantity
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                result.push(response.data);
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }));
    
        return result;
    }