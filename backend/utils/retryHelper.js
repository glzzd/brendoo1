/**
 * Retry helper utility for database operations
 */

const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain types of errors
      if (error.name === 'ValidationError' || 
          error.name === 'CastError' || 
          error.message.includes('required')) {
        throw error;
      }
      
      console.warn(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        console.error(`All ${maxRetries} attempts failed. Last error:`, error.message);
        throw lastError;
      }
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

module.exports = {
  retryOperation
};