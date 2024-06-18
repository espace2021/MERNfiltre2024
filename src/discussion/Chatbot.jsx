import { AiChat } from '@nlux/react';
import { useChatAdapter } from '@nlux/langchain-react';
import '@nlux/themes/nova.css';
import React, { useState } from 'react';
import './Chatbot.css'; // Import du fichier CSS

const adapterOptions = {
  url: 'https://pynlux.api.nlkit.com/pirate-speak',
};

export const ChatBot = () => {
  const chatGptAdapter = useChatAdapter(adapterOptions);

  // Créez un état pour gérer la visibilité du composant
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour changer la visibilité
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="chatbot">
      {/* Bouton qui change l'état lorsqu'il est cliqué */}
      <button onClick={toggleVisibility}>
        {isVisible 
        ? <img src="https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-3/24/5003-512.png" width="20" height="20" alt="close" />
        : <img src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png" width="70" height="70" alt="robot"/> 
        }
      </button>

      {/* Utilisation d'une condition pour rendre le composant visible ou non */}
      {isVisible && (
        <AiChat
          adapter={chatGptAdapter}
          composerOptions={{
            placeholder: 'How can I help you today?',
          }}
          displayOptions={{ colorScheme: 'dark' }}
        />
      )}
    </div>
  );
};

export default ChatBot;
