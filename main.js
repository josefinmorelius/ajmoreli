
var renderer, scene, camera;

// create global objects 
var boat_ob, fish, fish_2, cubo1, cubo2, cubo3, cubo4, cubo5, cubo6;

var loader_OBJ = new THREE.OBJLoader();
var loader_material = new THREE.TextureLoader();
var loader = new THREE.FontLoader();

// create the scene 

function createscene() 
{
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.getElementById('container').appendChild(renderer.domElement );

    const light = new THREE.DirectionalLight({color: 'red'});
    light.castShadow = true;
    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
    
    
    light.shadow.mapSize.width = 20000; 
    light.shadow.mapSize.height = 20000; 
    light.position.set(0, 30, 20);
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 5000;
    
    
    console.log(light);

    scene.add(light);

    const range = 75;

    camera_h_w = window.innerWidth / window.innerHeight;

    const near = 0.1;

    const far = 10000;

    camera = new THREE.PerspectiveCamera(range, camera_h_w, near, far);

    camera.position.set(34,13,0);

    var cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 0, 0 );
    cameraControls.minDistance = 10;
    cameraControls.maxDistance = 50;
    
    
};

count = 0;
let positionY = 0;
let direction = 1;
const cameraOffset = new THREE.Vector3(20,20,0);

// render the scene and 
function render(){
    requestAnimationFrame(render);
    positionY += 0.02 * direction;
    
    // animation of fishes 
    if (positionY >= 2) {
        direction = -2;
    } else if (positionY <= -2) {
        direction = 2;
    };
    if (fish == undefined) {
        console.log("loading")
    }
    else{

    fish.position.setY(positionY);
    fish_2.position.setY(positionY);
    
    if (cubo1 == undefined || boat_ob == undefined) {
        console.log("loading")
    }

    else {
        count += 1;
        
        // just want to add the text once when the islands had been loaded
        if (count == 1){
            text_to_islands();
    };

    // call on the collision function
    detect_collision(); 

    // target the camera on the boat 
    const boatPosition = new THREE.Vector3();
    boat_ob.getWorldPosition(boatPosition);
    camera.position.copy(boatPosition).add(cameraOffset);
    };

    renderer.render(scene, camera);}
  
}

// create the skybox
function create_skybox(){
    let skybox_array = [];
    let skybox_loader_back = new THREE.TextureLoader().load('images/DaylightBox_Back.png');
    let skybox_loader_bottom = new THREE.TextureLoader().load('images/DaylightBox_Bottom.png');
    let skybox_loader_front = new THREE.TextureLoader().load('images/DaylightBox_Front.png');
    let skybox_loader_left = new THREE.TextureLoader().load('images/DaylightBox_Left.png');
    let skybox_loader_right = new THREE.TextureLoader().load('images/DaylightBox_Right.png');
    let skybox_loader_top = new THREE.TextureLoader().load('images/DaylightBoxTop.png');
   
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_front, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_back, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_top, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_bottom, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_left, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_right, side: THREE.BackSide}));

    let skybox_box = new THREE.BoxGeometry(1000, 1000, 1000);
    let skybox = new THREE.Mesh(skybox_box, skybox_array);
    scene.add(skybox);

}

// create the boat and its texture
const boat_texture = loader_material.load('models/Sailboat.png');
function boat(){
    loader_OBJ.load(

        'models/Sailboat.obj',
        function ( boat_ob_fun ) {
            boat_ob_fun.scale.x = boat_ob_fun.scale.y = boat_ob_fun.scale.z = 0.3;
            //boat_ob_fun.rotateX(-1.55);
            boat_ob_fun.rotateY(-1.55);
            boat_ob_fun.position.set(20,-2,0);  
            const material = new THREE.MeshStandardMaterial({ map: boat_texture });
            boat_ob_fun.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.material = material;
                }
              }); 
            boat_ob_fun.castShadow = true; 
            boat_ob_fun.traverse( function( object ) { if ( object instanceof THREE.Mesh ) { object.castShadow = true; } } );
            boat_ob = boat_ob_fun;
            boat_ob.castShadow = true;
            scene.add( boat_ob );  
            
        },
        function ( error ) {
            console.log('Error');
        } 
        );};


// creating all the islands 

function islands(){
loader_material.load(

	'images/sand.jpg',
  
	function ( sand ) {
    var material = new THREE.MeshStandardMaterial( { map: sand,});

	const globe1 = new THREE.SphereGeometry(1, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo1 = new THREE.Mesh(globe1, material);
    cubo1.castShadow = true;
    cubo1.receiveShadow = true;
    const globe2 = new THREE.SphereGeometry(2, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo2 = new THREE.Mesh(globe2, material);
    cubo2.castShadow = true;
    cubo2.receiveShadow = true;
    const globe3 = new THREE.SphereGeometry(1.5, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo3 = new THREE.Mesh(globe3, material);
    cubo3.castShadow = true;
    cubo3.receiveShadow = true;
    const globe4 = new THREE.SphereGeometry(1, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo4 = new THREE.Mesh(globe4, material);
    cubo4.castShadow = true;
    cubo4.receiveShadow = true;
    const globe5 = new THREE.SphereGeometry(2, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo5 = new THREE.Mesh(globe5, material);
    cubo5.castShadow = true;
    cubo5.receiveShadow = true;
    const globe6 = new THREE.SphereGeometry(1.5, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo6 = new THREE.Mesh(globe6, material);
    cubo6.castShadow = true;
    cubo6.receiveShadow = true;
    
    scene.add(cubo1);
    scene.add(cubo2); // the one in the middle
    scene.add(cubo3);
    scene.add(cubo4);
    scene.add(cubo5);
    scene.add(cubo6);
    
    cubo1.position.x = 15;
    cubo1.position.z = -5;
    cubo1.position.x = 25;
    cubo3.position.z = 22;
    cubo4.position.x = -25;
    cubo5.position.z = 10;
    cubo5.position.x = 15;
    cubo6.position.x = -20;
    cubo6.position.z = -10;  
    
	},
	function ( error ) {
		console.log('');
    }
) };

// add the personal page texts to the islands and check if the islands has been loaded to 100 %
// before adding the text

function text_to_islands(){
loader.load('fonts/helvetiker_regular.typeface.json', 
    function(font){
        var text_material = new THREE.MeshPhongMaterial({color: 'pink'});

        var text_git = new THREE.TextGeometry( 'GitHub', {
                font: font,
                size: 0.6,
                height: 0.2,
            } );

            var text_mesh = new THREE.Mesh(text_git, text_material);
            text_mesh.rotateX = 0.2;
            text_mesh.position.y = 5;
            text_mesh.castShadow = true;
            text_mesh.receiveShadow = true;
            text_mesh.lookAt( camera.position );

            if (cubo1 == undefined) {
                console.log("loading")
            }
            else{
            cubo1.add(text_mesh);  
            };

            var text_facebook= new THREE.TextGeometry( 'Facebook', {
                font: font,
                size: 0.6,
                height: 0.2,
            } );

            var text_mesh = new THREE.Mesh(text_facebook, text_material);
            text_mesh.position.z = 0.2;
            text_mesh.position.y = 5;
            text_mesh.lookAt( camera.position );
            text_mesh.castShadow = true;
            text_mesh.receiveShadow = true;

            if (cubo4== undefined) {
                console.log("loading")
            }
            else{
            cubo4.add(text_mesh);  
            };
            
            var text_instagram = new THREE.TextGeometry( 'Instagram', {
                font: font,
                size: 0.6,
                height: 0.2,
            } );

            var text_mesh = new THREE.Mesh(text_instagram, text_material);
            text_mesh.lookAt( camera.position );
            text_mesh.rotateX = 0.2;
            text_mesh.position.y = 5;
            text_mesh.castShadow = true;
            text_mesh.receiveShadow = true;
        
            
            if (cubo5 == undefined) {
                console.log("loading")
            }
            else{
            cubo5.add(text_mesh);  
            };

            var text_linkedin= new THREE.TextGeometry( 'LinkedIn', {
                font: font,
                size: 0.6,
                height: 0.2,
            } );
        
            var text_mesh = new THREE.Mesh(text_linkedin, text_material);
            text_mesh.position.z = 0.2;
            text_mesh.position.y = 5;
            text_mesh.castShadow = true;
            text_mesh.lookAt( camera.position );

            if (cubo6 == undefined) {
                console.log("loading")
            }
            else{
                cubo6.add(text_mesh);  
            };
        
            var text_tiktok = new THREE.TextGeometry( 'TikTok', {
            font: font,
            size: 0.6,
            height: 0.2,
             });

            var text_mesh = new THREE.Mesh(text_tiktok, text_material);
            text_mesh.rotateX = 0.2;
        
            text_mesh.position.y = 5;
            text_mesh.castShadow = true;
            text_mesh.receiveShadow = true;
            text_mesh.lookAt( camera.position );

            if (cubo3 == undefined) {
                console.log("loading")
            }
            else{
            cubo3.add(text_mesh);  
                }; 

            var text_youtube = new THREE.TextGeometry( 'YouTube', {
                font: font,
                size: 0.6,
                height: 0.2,
            } );

            var text_mesh = new THREE.Mesh(text_youtube, text_material);
            text_mesh.rotateX = 0.2;
            
            text_mesh.position.y = 5;
            text_mesh.castShadow = true;
            text_mesh.receiveShadow = true;
            text_mesh.lookAt( camera.position );

            if (cubo2 == undefined) {
                console.log("loading")
            }
            else{
            cubo2.add(text_mesh);  
                }; 
    })};
        
// create the plane and its materil
function plane(){
loader_material.load(
	'images/water3.jpg',
	function ( water ) {
    var plane = new THREE.PlaneGeometry(1000,1000);
    var material = new THREE.MeshStandardMaterial( { map: water , vertexColors: THREE.NoColors});
    var create_plane = new THREE.Mesh(plane, material);
    create_plane.receiveShadow = true;
    create_plane.rotateX(-Math.PI/2);
    scene.add(create_plane);
    },); };

// creates the two fish objects and the material 

const fish_texture = loader_material.load('models/Tex_Goldfish.png');
function fish_func(){
loader_OBJ.load(

	'models/Mesh_Goldfish.obj',
  
	function ( fish_ob ) {
        fish_ob.scale.x = fish_ob.scale.y = fish_ob.scale.z = 0.05;
        fish_ob.rotateX(-1);
        fish_ob.position.set(10, positionY, 5);
        fish = fish_ob;

        const material = new THREE.MeshStandardMaterial({ map: fish_texture });
        fish.traverse( function( object ) { if ( object instanceof THREE.Mesh ) { object.castShadow = true; } } );
        fish.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = material;
            }
          });
        
        fish.castShadow = true;
        fish_2 = fish_ob.clone();
        fish_2.castShadow = true;
        fish_2.position.set(-20, positionY, 10);

        scene.add(fish);
        scene.add(fish_2);

	},
);};

// detect the movement of the boat from keyinputs

document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        boat_ob.position.x -=1;
        break;
      case 'ArrowDown':
        boat_ob.position.x +=1;
        break;
      case 'ArrowLeft':
        boat_ob.position.z += 1;
        break;
      case 'ArrowRight':
        boat_ob.position.z -= 1;
        break;
    }
  });
  // detect when the boat intersects with the islands in order to open the personal links

  function detect_collision (){

    var boat_bb = new THREE.Box3().setFromObject(boat_ob); // Boat 
    var island_b1 = new THREE.Box3().setFromObject(cubo1); // Git Hub
    var island_b2 = new THREE.Box3().setFromObject(cubo2); // YouTube
    var island_b3 = new THREE.Box3().setFromObject(cubo3); // TikTok 
    var island_b4 = new THREE.Box3().setFromObject(cubo4); // Facebook
    var island_b5 = new THREE.Box3().setFromObject(cubo5); // Instagram 
    var island_b6 = new THREE.Box3().setFromObject(cubo6); // LinkedIn
 

    var collision1 = boat_bb.intersectsBox(island_b1);
    var collision2 = boat_bb.intersectsBox(island_b2); 
    var collision3 = boat_bb.intersectsBox(island_b3);
    var collision4 = boat_bb.intersectsBox(island_b4);
    var collision5 = boat_bb.intersectsBox(island_b5);
    var collision6 = boat_bb.intersectsBox(island_b6);

   
    if (collision1 === true){
        window.open("https://github.com/josefinmorelius/ajmoreli.github.io");
    }
    if (collision2 === true){
        window.open("https://www.youtube.com/channel/UCekQ3pqtuKa6a92H6yEnKcw");
    }
    if (collision3 === true){
        window.open("https://www.tiktok.com/@josmor99");
    }
    if (collision4 === true){
        window.open("https://www.facebook.com/josefin.morelius");
    }
    if (collision5 === true){
        window.open("https://www.instagram.com/josefinmorelius/");
    }
    if (collision6 === true){
        window.open("https://se.linkedin.com/in/josefin-morelius-a45921192");
    }

};

createscene();
create_skybox();
plane();
boat();
islands();
fish_func();
render();
