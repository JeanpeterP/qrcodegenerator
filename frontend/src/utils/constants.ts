export const getBackendUrl = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    return isDevelopment 
        ? 'http://localhost:3000'
        : 'your-production-backend-url';
}; 