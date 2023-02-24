import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const createscene = () => {

    const renderer = new THREE.WebGLRenderer();

    const range = 50;

    const camera_h_w = 2;

    const near = 0.1;

    const far = 5;

    const camera = new THREE.PerspectiveCamera(range, camera_h_w, near, far);

    const scene = new THREE.Scene();

    const depth = 1;
    const height = 1;
    const width = 1;

    const figure = new THREE.BoxGeometry(width, height, depth);

    const material = new THREE.MeshBasicMaterial({color: C5C2CC})

    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

};


createscene();



