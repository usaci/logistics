<script>
    import * as THREE from 'three';
    import { gsap } from "gsap";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { RGBELoader } from "three/addons/loaders/RGBELoader";
    export default {
        data() {
            return {
                w: window.innerWidth,
                h: window.innerHeight,
                cameraScale: .17
            }
        },
        mounted() {
            // three.jsに関する記述
            const init = () => {
                const canvas = this.$el;

                // renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    antialias: true
                })

                const width = this.w;
                const height = this.h;

                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(width, height);
                renderer.setClearColor(0x2CBEFF);

                // scene
                const scene = new THREE.Scene();

                // camera

                // デフォルトの数値
                const cameraOffset = this.cameraScale;
                const deg = 100;
                const camera = new THREE.OrthographicCamera( (this.w / - 2) * cameraOffset, (this.w / 2) * cameraOffset, (this.h / 2) * cameraOffset, (this.h / - 2) * cameraOffset, -1000, 1000, 1000);
                scene.add( camera );
                camera.position.set(deg, deg * .75, deg);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
                camera.aspect = width / height;

                // loader
                const loader = new GLTFLoader();
                loader.load('stage.glb', (glb) => {
                    const stage = glb.scene;
                    scene.add(stage);
                    stage.position.set(0, 0, 0);
                }, undefined, (error) => {
                    console.error( error );
                })

                // // controls
                // const controls = new OrbitControls(camera, renderer.domElement);

                // geometry 
                const boxGeometry = new THREE.BoxGeometry(10, 10, 10);

                // material 
                const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000})
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                // scene.add(box);

                // light
                const light = new THREE.DirectionalLight(0xffffff, 1.5);
                scene.add(light);
                light.position.set(100, 100, 0);

                // lightHelper
                const lightHelper = new THREE.DirectionalLightHelper( light, 5 );
                scene.add(lightHelper);

                // ambient
                const ambient = new THREE.AmbientLight(0xffffff, 2.5);
                scene.add(ambient);

                // helpers


                // watch change of windowSize
                window.addEventListener('resize', () => {
                    this.w = window.innerWidth;
                    this.h = window.innerHeight;

                    // modify camera's aspect ratio
                    // (this.w / - 2) * cameraOffset, (this.w / 2) * cameraOffset, (this.h / 2) * cameraOffset, (this.h / - 2) * cameraOffset
                    renderer.setSize(this.w, this.h);
                    renderer.setPixelRatio(window.devicePixelRatio);

                    camera.left = (this.w / - 2) * cameraOffset;
                    camera.right = (this.w / 2) * cameraOffset;
                    camera.top = (this.h / 2) * cameraOffset;
                    camera.bottom = (this.h / - 2) * cameraOffset;
                    camera.updateProjectionMatrix();
                })

                // render
                const tick = () => {
                    requestAnimationFrame(tick);
                    renderer.render(scene, camera);
                }
                tick();

                // when you use PC
                // ドラッグした際の座標を取得
                let prevX;
                let currentX;
                let x;
                let prevY;
                let currentY;
                const moveSceneInPC = (e) => {
                    x = ( e.clientX / this.w - 0.5) * 2;
                    console.log(x);
                    camera.position.x += x * 10;
                }
                canvas.addEventListener('mousedown', () => {
                    canvas.addEventListener('mousemove', moveSceneInPC);
                    canvas.style.cursor = "grab";
                });

                canvas.addEventListener('mouseup', () => {
                canvas.removeEventListener('mousemove', moveSceneInPC);
                                    canvas.style.cursor = "initial";
                });
                canvas.addEventListener('mouseleave', () => {
                canvas.removeEventListener('mousemove', moveSceneInPC);
                });

                // canvas.addEventListener('mousedown', (e) => {
                //     prevX = (e.clientX / this.w - 0.5 )* 2;
                //     prevY = - ( (e.clientY/ this.h - 0.5 )* 2 );
                //     console.log(e);
                //     canvas.style.cursor = "grab";
                // })
                // canvas.addEventListener('mousemove', (e) => {
                //     console.log( -(e.clientY / this.h - 0.5) * 2);
                // })
                // canvas.addEventListener('mouseup', (e) => {
                //     currentX = - ( (e.clientX / this.w - 0.5 )* 2 - prevX );
                //     currentY = -( (e.clientY / this.h - 0.5 )* 2 - prevY );
                //     gsap.to(camera.position, {
                //         duration: .6,
                //         x: currentX * 300,
                //         y: currentY * 200
                //     })
                //     canvas.style.cursor = "initial";
                // })


                // when you use SP or tablet
            }

            
            init(); // execute
        }
    }
</script>
<template>
    <canvas id="canvas" draggable></canvas>
</template>
<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
