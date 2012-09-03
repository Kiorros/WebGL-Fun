/**
 * 
 */

COM = {};
COM.KIORROS = {};
COM.KIORROS.webglfun = {};

COM.KIORROS.webglfun = function() {
	
	/* PRIVATE DECLARATIONS */
	
	// Shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame || 
	          window.webkitRequestAnimationFrame || 
	          window.mozRequestAnimationFrame || 
	          window.oRequestAnimationFrame || 
	          window.msRequestAnimationFrame || 
	          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
	
	var running = true;
	
	var viewAngle = 45,
		near = 0.1,
		far = 10000;
	
	var renderer, camera, scene;
	
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
	
	var xScale = 80,
		yScale = 80,
		zScale = 80;
	var sphere = new THREE.Mesh(new THREE.CubeGeometry(xScale, yScale, zScale), sphereMaterial);
	
	/* PUBLIC */
	
	return  {
		init : function($renderTarget) {

			var width = $renderTarget.width(),
				height = $renderTarget.height();
			
			var aspectRatio = width / height;
			
			renderer = new THREE.WebGLRenderer();
			camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
			scene = new THREE.Scene();
			
			scene.add(camera);
			camera.position.z = 300;
			renderer.setSize(width, height);
			
			$renderTarget.append(renderer.domElement);
			
			scene.add(sphere);
			
			var pointLight = new THREE.PointLight(0xFFFFFF);
			pointLight.position = {x: 10, y: 50, z:130};
			scene.add(pointLight);
			
			(function animLoop(time) {
				if (running) {
					render(time);
				}
				window.requestAnimFrame(animLoop);
			})();
		},
		
		toggleRunning : function(value) {
			if (value === undefined)
				running = !running;
			else
				running = value;
		}
	};
	
	/* PRIVATE METHODS */
	
	function render(time) {
		renderer.render(scene, camera);
		sphere.rotation.x += 0.01;
		sphere.rotation.y += 0.015;
	};
	
	function update(time) {
		
	}

}();