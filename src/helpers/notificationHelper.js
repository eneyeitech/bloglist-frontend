 
 // Helper function to display failure messages
  const displayFailureMessage = (message) => {
    setFailureMessage(message);
    setTimeout(() => {
      setFailureMessage(null);
    }, 5000);
  };

  // Helper function to display success messages
  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  export default {
    displayFailureMessage,
    displaySuccessMessage
  }