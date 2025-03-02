let scene, camera, renderer, controls;
let raycaster = new THREE.Raycaster(),
mouse = new THREE.Vector2();
let plants = []; // Store plant objects and data

function init() {
scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8b0);

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);  
camera.position.set(0, 5, 10);  
  
renderer = new THREE.WebGLRenderer({ antialias: true });  
renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);  
  
controls = new THREE.OrbitControls(camera, renderer.domElement);  
controls.enableDamping = true;  
  
const light = new THREE.DirectionalLight(0xffffff, 1);  
light.position.set(5, 10, 5);  
scene.add(light);  
  
const ground = new THREE.Mesh(  
    new THREE.PlaneGeometry(20, 20),  
    new THREE.MeshStandardMaterial({ color: 0x228B22, side: THREE.DoubleSide })  
);  
ground.rotation.x = -Math.PI / 2;  
scene.add(ground);  
  
// Plant Data (Instead of JSON)  
const plantData = [  
{  
    name: "Aloe Vera",  
    botanical_name: "Aloe barbadensis",  
    remedies: "Skin healing, digestion aid",  
    description: "Aloe Vera is known for its healing properties.",  
    position: { x: -3, y: 0, z: 2 },  
    model: "models/aloe_vera.glb"  
},  
{  
    name: "Tulsi",  
    botanical_name: "Ocimum tenuiflorum",  
    remedies: "Boosts immunity, treats cough",  
    description: "Tulsi, or holy basil, is a powerful medicinal herb.",  
    position: { x: 0, y: 0, z: 2 },  
    model: "models/tulsi.glb"  
},  
{  
    name: "Neem",  
    botanical_name: "Azadirachta indica",  
    remedies: "Antibacterial, purifies blood",  
    description: "Neem is used in Ayurveda for its powerful healing properties.",  
    position: { x: 3, y: 0, z: 2 },  
    model: "models/neem.glb"  
}];  
  
// Load each plant  
plantData.forEach(plant => loadPlant(plant));  
  
window.addEventListener('click', onClick);  
animate();

}

function loadPlant(plantData) {
const loader = new THREE.GLTFLoader();
loader.load(plantData.model, function(gltf) {
let plant = gltf.scene;
plant.position.set(plantData.position.x, plantData.position.y, plantData.position.z);
scene.add(plant);
plants.push({ object: plant, ...plantData });
});
}

function onClick(event) {
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

raycaster.setFromCamera(mouse, camera);  
let intersects = raycaster.intersectObjects(plants.map(p => p.object), true);  
  
if (intersects.length > 0) {  
    let clickedPlant = plants.find(p => intersects[0].object.parent === p.object);  
    if (clickedPlant) {  
        showPlantInfo(clickedPlant);  
    }  
}

}

function showPlantInfo(plant) {
document.getElementById("plant-name").textContent = plant.name;
document.getElementById("botanical-name").textContent = plant.botanical_name;
document.getElementById("uses").textContent = plant.remedies;
document.getElementById("description").textContent = plant.description;
document.getElementById("info-box").style.display = "block";
}

function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

init();