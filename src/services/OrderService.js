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


export const fetchOrders = async () => {
    try {
      const response = await Api.get(`${ORDER_API}`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      });
        return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

export const updateOrder = async (id, status) => {
    try {
      const response = await Api.put(`${ORDER_API}/${id}`, {
        status: status
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  export const deleteOrder = async (id) => {
    try {
      const response = await Api.delete(`${ORDER_API}/${id}`);
       return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };