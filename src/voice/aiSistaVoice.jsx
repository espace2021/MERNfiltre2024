import React, { useEffect,useState } from "react";
import { useAiAssistant, AiAssistantButton } from "@sista/ai-assistant-react";

function TodoApp() {

  const [purchases, setPurchases] = useState([]);

   const addPurchase = (purchase) => {
    console.log(`Purchase added: ${JSON.stringify(purchase)}`);
    const purchaseToAdd = JSON.parse(JSON.stringify(purchase))
    console.log(purchaseToAdd.purchase)
    setPurchases([...purchases, purchaseToAdd.purchase]);
  };

  const removePurchase = (purchase) => {
    console.log(`Purchase removed: ${purchase}`);
  };

 
  // Initialize the aiAssistant instance
  const { registerFunctions } = useAiAssistant();

  useEffect(() => {
    // Define the voice-controlled functions
    const aiFunctions = [
      {
        function: {
          handler: addPurchase,
          description: "Adds a new purchase.",
          parameters: {
            type: "object",
            properties: {
              purchase: {
                type: "string",
                description: "Description of the purchase.",
              },
            },
            required: ["purchase"],
          },
        },
      },
      {
        function: {
          handler: removePurchase,
          description: "Removes an existing purchase.",
          parameters: {
            type: "object",
            properties: {
              purchase: {
                type: "string",
                description: "Description of the purchase.",
              },
            },
            required: ["purchase"],
          },
        },
      },
    ];

    // Register the AI controlled functions
    if (registerFunctions) {  
      registerFunctions(aiFunctions);
    }
  }, [registerFunctions,purchases]);


  return (
    <div>
   
      <AiAssistantButton />
      
      {
        purchases && purchases.map((purchase,ind) =>{
          return <div key={ind}>
            {purchase}
            </div>
        })
      }
    </div>
  );
}

export default TodoApp;