const ContactButtons = () => {
  const openMessenger = () => {
      window.location.href = "https://m.me/jandyze"; // Change this to your Messenger link
  };

  const openDiscord = () => {
    window.location.href = "https://discordapp.com/users/1142455754826199130"; // Replace with actual Discord User ID
  };

  return (
      <div className="flex flex-col md:flex-row gap-4">
          <button 
              onClick={openMessenger} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
              Message Us on Messenger
          </button>

          <button 
              onClick={openDiscord} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
              Join Us on Discord
          </button>
      </div>
  );
};

export default ContactButtons;
