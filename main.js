import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const createscene = () => {

    const renderer = new THREE.WebGLRenderer();

    const range = 50;

    var camera_h_w = window.innerWidth / window.innerHeight;

    const near = 0.1;

    const far = 100;

    const camera = new THREE.PerspectiveCamera(range, camera_h_w, near, far);

    camera.position.set( 1, 1.5, 2 );
    camera.lookAt(0,0,0);

    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 0, 0 );

    window.addEventListener('resize', updateAspectRatio );
    
    const scene = new THREE.Scene();

    const depth = 1;
    const height = 1;
    const width = 1;

    const figure = new THREE.BoxGeometry(width, height, depth);

    const material = new THREE.MeshBasicMaterial({color: C5C2CC})

    const box = new THREE.Mesh(figure, material);
    scene.add(box);

    renderer.render(scene, camera)
    document.body.appendChild(renderer.domElement);

};

createscene();




