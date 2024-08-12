import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Get window dimensions for renderer and camera
const w = window.innerWidth;
const h = window.innerHeight;

// Create the WebGL renderer and set its size
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

// Attach the renderer's output (canvas) to the HTML document
document.body.appendChild(renderer.domElement);

// Set up the perspective camera
const fov = 75; // Field of view (in degrees)
const aspect = w / h; // Aspect ratio
const near = 0.1; // Near clipping plane
const far = 10; // Far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; // Position the camera away from the scene

// Create the scene
const scene = new THREE.Scene();

// Set up orbit controls for interactive camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth damping (inertia) for controls
controls.dampingFactor = 0.03; // Set the damping factor for controls

// Create an icosahedron geometry and a standard material with flat shading
const geo = new THREE.IcosahedronGeometry(1.2, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
});

// Combine geometry and material into a mesh and add it to the scene
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Create a wireframe material and mesh to overlay on the icosahedron
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001); // Slightly enlarge the wireframe to avoid z-fighting
mesh.add(wireMesh); // Add wireframe mesh as a child of the main mesh

// Add hemisphere lighting to the scene (blue sky and reddish ground light)
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
mesh.add(hemiLight);

// Animation loop to render the scene and update controls
function animate(t = 0) {
    requestAnimationFrame(animate); // Request the next frame
    renderer.render(scene, camera); // Render the scene from the camera's perspective
    controls.update(); // Update controls based on user interaction
    mesh.rotateY(0.001)
}

// Start the animation loop
animate();
