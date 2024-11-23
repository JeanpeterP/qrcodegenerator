(function() {
    // Find the container or create one
    let container = document.getElementById('qr-code-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'qr-code-container';
        document.body.appendChild(container);
    }

    // Create and configure the iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'http://192.168.196.129:3000'; // Your React app URL
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    
    // Add the iframe to the container
    container.appendChild(iframe);

    // Handle messages from the iframe
    window.addEventListener('message', function(event) {
        if (event.origin === 'http://192.168.196.129:3000') {
            console.log('Message received:', event.data);
            // Handle any messages from your QR code generator
        }
    });
})(); 