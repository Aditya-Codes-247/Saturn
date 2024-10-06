import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 7;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const saturnGroup = new THREE.Group();
scene.add(saturnGroup);
new OrbitControls(camera, renderer.domElement);

const Loader = new THREE.TextureLoader();

// Saturn geometry and material (Planet)
const saturnGeo = new THREE.SphereGeometry(1, 64, 64);
const saturnMaterial = new THREE.MeshPhongMaterial({
  map: Loader.load("./saturn.jpg"),  // Saturn surface texture
});
const saturnMesh = new THREE.Mesh(saturnGeo, saturnMaterial);
saturnGroup.add(saturnMesh);

// Saturn rings geometry and material
const ringGeo = new THREE.RingGeometry(1.5, 2.5, 64);
const ringTexture = Loader.load("./saturn_rings.jpg");
const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
  transparent: true, // To make the ring background invisible
});
const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
ringMesh.rotation.x = Math.PI / 2;  // Rotate the ring to align with Saturn's axis
saturnGroup.add(ringMesh);

// Adding light to illuminate Saturn
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  saturnMesh.rotation.y += 0.002; // Slow rotation of Saturn
  ringMesh.rotation.z += 0.001;  // Slight rotation of the rings
  renderer.render(scene, camera);
}

animate();
renderer.render(scene, camera);

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
