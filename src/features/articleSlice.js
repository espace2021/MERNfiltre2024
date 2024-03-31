import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {fetcharticles,addarticle,deletearticle,editarticle,fetcharticleById,fetchArticlesPagination,fetchArticlesPaginationFilter,fetchArticlesPaginationFilterCateg} from
"../services/ArticleService"

export const fetchArticlesPaginationFiltCateg = createAsyncThunk(
    "article/fetchArticlesPaginationFiltCateg",
    async (_, thunkAPI)  => { 
        const { rejectWithValue, getState } = thunkAPI;
        const { page, limit,searchTerm, prixMax , categorieID } = getState().storearticles; 
        try {  
        const res = await fetchArticlesPaginationFilterCateg(page,limit,searchTerm,prixMax,categorieID);
        return res.data;
        }
        catch (error) {
        return rejectWithValue(error.message);
        }
        }
        );

export const fetchArticlesPaginationFilt = createAsyncThunk(
        "article/fetchArticlesPaginationFilt",
        async (_, thunkAPI)  => { 
            const { rejectWithValue, getState } = thunkAPI;
            const { page, limit,searchTerm, prixMax } = getState().storearticles; 
            try {  
            const res = await fetchArticlesPaginationFilter(page,limit,searchTerm,prixMax);
            return res.data;
            }
            catch (error) {
            return rejectWithValue(error.message);
            }
            }
            );

export const getArticlesPagination = createAsyncThunk(
                "article/getArticlesPagination",
                async (_, thunkAPI)  => { 
                    const { rejectWithValue, getState } = thunkAPI;
                    const { page, limit } = getState().storearticles; // Récupérer les valeurs actuelles de page et limit depuis le state
                    try {
                    const res = await fetchArticlesPagination(page,limit);
                    return res.data;
                    }
                    catch (error) {
                    return rejectWithValue(error.message);
                    }
                    }
                    );

export const getArticles = createAsyncThunk(
"article/getArticles",
async (_, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try {
const res = await fetcharticles();
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);

export const createArticle = createAsyncThunk(
"article/createArticle",
async (article, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await addarticle(article);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
} }
);

export const delArticle = createAsyncThunk(
"article/delArticle",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
    const res=await deletearticle(id);
    return res.data
}
catch (error) {
return rejectWithValue(error.message);
}
});

export const updateArticle = createAsyncThunk(
"article/updateArticle",
async (article, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await editarticle(article);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
} }
);

export const findArticleByID = createAsyncThunk(
"article/findArticleByID",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await fetcharticleById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
});

export const articleSlice = createSlice({
name: 'article',
initialState:{
articles:[],
article:{},
isLoading: false,
success:null,
error:null,
page:1,
limit:10,
tot:0,
searchTerm:'',
prixMax:'',
maxValuePrix:'',
categorieID:''
},
reducers: {
    setPage: (state,action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
        state.limit = action.payload;
    },
    setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
    },
    setPrixMax: (state, action) => {
        state.prixMax= action.payload;
    },
    setCategorieID: (state, action) => {
        state.categorieID= action.payload;
    },
},
extraReducers: (builder) => {
    builder
//get articles avec pagination et Filtre avec categ
.addCase(fetchArticlesPaginationFiltCateg.pending, (state, action) => { console.log('pending')
state.isLoading=true;
state.error=null;
})
.addCase(fetchArticlesPaginationFiltCateg.fulfilled, (state, action) => { console.log('fulfilled')
state.isLoading=false;
state.error = null;
state.articles=action.payload.articles;
state.tot=action.payload.tot
state.maxValuePrix=action.payload.maxValuePrix

})
.addCase(fetchArticlesPaginationFiltCateg.rejected, (state, action) => {console.log('rejected')
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})

//get articles avec pagination et Filtre 
.addCase(fetchArticlesPaginationFilt.pending, (state, action) => { console.log('pending')
state.isLoading=true;
state.error=null;
})
.addCase(fetchArticlesPaginationFilt.fulfilled, (state, action) => { console.log('fulfilled')
state.isLoading=false;
state.error = null;
state.articles=action.payload.articles;
state.tot=action.payload.tot
state.maxValuePrix=action.payload.maxValuePrix

})
.addCase(fetchArticlesPaginationFilt.rejected, (state, action) => {console.log('rejected')
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})

//get articles avec pagination
.addCase(getArticlesPagination.pending, (state, action) => { console.log('pending')
state.isLoading=true;
state.error=null;
})
.addCase(getArticlesPagination.fulfilled, (state, action) => { console.log('fulfilled')
state.isLoading=false;
state.error = null;
state.articles=action.payload.articles;
state.tot=action.payload.tot
})
.addCase(getArticlesPagination.rejected, (state, action) => {console.log('rejected')
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})
//get articles 
.addCase(getArticles.pending, (state, action) => { console.log('pending')
state.isLoading=true;
state.error=null;
})
.addCase(getArticles.fulfilled, (state, action) => { console.log('fulfilled')
state.isLoading=false;
state.error = null;
state.articles=action.payload;
})
.addCase(getArticles.rejected, (state, action) => {console.log('rejected')
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})
//insertion article
.addCase(createArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createArticle.fulfilled, (state, action) => {
state.articles.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload; console.log(state.success)
})
.addCase(createArticle.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload; console.log(state.error)
state.success=null;
})
//Modification article
.addCase(updateArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(updateArticle.fulfilled, (state, action) => {
state.articles = state.articles.map((item) =>
item._id === action.payload._id ? action.payload : item
);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
//Delete article
.addCase(delArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(delArticle.fulfilled, (state, action) => {
state.isLoading=false;
state.error=null;
state.articles=state.articles.filter((item)=> item._id!==action.payload)
})
.addCase(delArticle.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})
//Fectch article
.addCase(findArticleByID.pending, (state, action) => {
state.isLoading = true
state.error=null;
})
.addCase(findArticleByID.fulfilled,(state, action) => {
    state.isLoading = false
    state.error = null
    state.article=action.payload;
    })
    } }
    )
export default articleSlice.reducer;
export const { setPage, setLimit , setSearchTerm , setPrixMax , setCategorieID} = articleSlice.actions;
