import Api from "../axios/Api";
const ORDER_API="orders"

export const addOrder = async (objectOrder) => {
    try {
        const response = await Api.post(ORDER_API, objectOrder, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici
        console.error("Error adding order:", error);
        throw error; // Vous pouvez choisir de relancer l'erreur ou de la gérer différemment
    }
};


export const fetchOrders=async()=> { 
    const res = await fetch(process.env.API_URL+ORDER_API, { cache: 'no-store' })
    const response=await res.json()
    return response;
    }

export const updateOrder=async(id,status) =>{
        const res = await fetch(process.env.API_URL+ORDER_API+`${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"status":status}),
        });
        const response = await res.json();
        return response;
    }

export const deleteOrder=async(id) =>{
        const res = await fetch(process.env.API_URL+ORDER_API+`${id}`,{
            method: 'DELETE'
        });
        const response = await res.json();
        return response;
    
    }