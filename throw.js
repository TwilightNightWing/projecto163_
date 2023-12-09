AFRAME.registerComponent("paint-balls", {
    init: function () {
      this.shootBullet();
    },
 

        removeBall: function (e){
            var element = e.detail.target.el;

            var elementHit = e.detail.body.el;

            if (elementHit.id.includes("pin")){

                var impulse = new cancelAnimationFrame.Vec3(0,1,-15);
                var worldPoint = new cancelAnimationFrame.Vec3().copy(
                    elementHit.getAttribute("position")
                );

                elementHit.boddy.applyForce(impulse, worldPoint);

                element.removeEventListener("collide", this.removeBall);

                var scene = document.querySelector("#scene");
                scene.removeChild(element);
            }
        },

    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          bullet.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          // Obtener la dirección de la cámara como un vector de Three.js
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          // Establecer la velocidad y su dirección
          bullet.setAttribute("velocity", direction.multiplyScalar(-10));
          bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
           
          })
  
          var scene = document.querySelector("#scene");
  
          scene.appendChild(bullet);
        }
        addEventListener("collide", this.removeBall);
      });
    },
  
})