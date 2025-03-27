document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('animals-container');
    const animalTypes = ['cat', 'dog', 'rabbit', 'fox', 'bird'];
    const colorClasses = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8'];
    const numAnimals = 15; // Number of animals to create
    const animals = [];
    
    // Mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Create animals
    for (let i = 0; i < numAnimals; i++) {
        const animal = document.createElement('div');
        
        // Randomly select animal type and color
        const animalType = animalTypes[Math.floor(Math.random() * animalTypes.length)];
        const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        
        // Set classes and initial position
        animal.className = `animal ${animalType} ${colorClass}`;
        animal.style.left = `${Math.random() * window.innerWidth}px`;
        animal.style.top = `${Math.random() * window.innerHeight}px`;
        
        // Add to container and animals array
        container.appendChild(animal);
        
        // Store animal properties
        animals.push({
            element: animal,
            x: parseFloat(animal.style.left),
            y: parseFloat(animal.style.top),
            speed: 0.01 + Math.random() * 0.03, // Much slower random speed between 0.01 and 0.04
            delay: i * 5, // Increased staggered delay for following
            wobble: Math.random() * 3, // Increased random wobble amount
            offsetX: (Math.random() - 0.5) * 100, // Random offset from cursor X
            offsetY: (Math.random() - 0.5) * 100  // Random offset from cursor Y
        });
    }
    
    // Animation function
    function animateAnimals() {
        animals.forEach((animal, index) => {
            // Calculate target position (with delay and offset)
            const targetX = mouseX + animal.offsetX;
            const targetY = mouseY + animal.offsetY;
            
            // Add more randomness to movement (enhanced wobble effect)
            const wobbleX = Math.sin(Date.now() / 1000 * animal.wobble) * 25;
            const wobbleY = Math.cos(Date.now() / 1000 * animal.wobble) * 25;
            
            // Calculate distance to target
            const dx = targetX - animal.x + wobbleX;
            const dy = targetY - animal.y + wobbleY;
            
            // Move animal towards target with easing
            animal.x += dx * animal.speed;
            animal.y += dy * animal.speed;
            
            // Apply position
            animal.element.style.left = `${animal.x}px`;
            animal.element.style.top = `${animal.y}px`;
            
            // Rotate animal to face direction of movement
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            animal.element.style.transform = `rotate(${angle}deg)`;
            
            // Scale based on distance from cursor (closer = slightly bigger)
            const distance = Math.sqrt(dx * dx + dy * dy);
            const scale = Math.max(0.8, Math.min(1.2, 1 - distance / 1000));
            animal.element.style.transform += ` scale(${scale})`;
        });
        
        requestAnimationFrame(animateAnimals);
    }
    
    // Start animation
    animateAnimals();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Reset animals if they go off-screen after resize
        animals.forEach(animal => {
            if (
                parseFloat(animal.element.style.left) > window.innerWidth ||
                parseFloat(animal.element.style.top) > window.innerHeight
            ) {
                animal.x = Math.random() * window.innerWidth;
                animal.y = Math.random() * window.innerHeight;
            }
        });
    });
});
