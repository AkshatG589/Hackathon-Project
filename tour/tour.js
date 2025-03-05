window.onload = function() {
    const modelViewer = document.getElementById('modelViewer');
    let minZoom = 2; // Minimum zoom level (fully zoomed out)
    let maxZoom = 10; // Maximum zoom level (fully zoomed in)
    let currentZoom = maxZoom; // Start at fully zoomed out
    let zoomSpeed = 0.2; // Smooth zoom speed
    
    function updateZoom(delta) {
        let newZoom = currentZoom + delta * zoomSpeed;
        newZoom = Math.max(minZoom, Math.min(newZoom, maxZoom)); // Ensure within limits
        
        if (newZoom !== currentZoom) { // Only update if zoom changes
            currentZoom = newZoom;
            
            let orbitValues = modelViewer.getAttribute('camera-orbit').split(' ');
            let azimuth = orbitValues[0];
            let elevation = orbitValues[1];
            
            modelViewer.setAttribute('camera-orbit', `${azimuth} ${elevation} ${currentZoom}m`);
        }
    }
    
    // Smooth Mouse Scroll Zoom
    modelViewer.addEventListener('wheel', (event) => {
        event.preventDefault();
        updateZoom(event.deltaY > 0 ? 1 : -1); // Scroll up zooms in, scroll down zooms out
    });
    
    // Pinch Zoom (Touch Devices)
    let lastPinchDistance = null;
    
    modelViewer.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            let touch1 = event.touches[0];
            let touch2 = event.touches[1];
            
            let pinchDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            if (lastPinchDistance !== null) {
                let zoomChange = (lastPinchDistance - pinchDistance) * 0.05;
                updateZoom(zoomChange);
            }
            
            lastPinchDistance = pinchDistance;
        }
    });
    
    modelViewer.addEventListener('touchend', () => {
        lastPinchDistance = null;
    });
    
    console.log("🚀 Smooth Zoom & Rotation Script Loaded Successfully!");
};