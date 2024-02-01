<script>
    import * as THREE from 'three';
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { RGBELoader } from "three/addons/loaders/RGBELoader";
    export default {
        mounted() {
            const init = () => {
                const canvas = this.$el;
                console.log(canvas);

                // renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    antialias: true
                })

                const width = 960;
                const height = 540;

                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(width, height);
                renderer.setClearColor(0x2CBEFF);

                // scene
                const scene = new THREE.Scene();

                // camera

                // デフォルトの数値
                const cameraOffset = .25;
                const deg = 100;
                const camera = new THREE.OrthographicCamera( (width / - 2) * cameraOffset, (width / 2) * cameraOffset, (height / 2) * cameraOffset, (height / - 2) * cameraOffset, -1000, 1000, 1000);
                scene.add( camera );
                camera.position.set(deg, deg * .75, deg);
                camera.lookAt(new THREE.Vector3(0, 0, 0));

                // loader
                const loader = new GLTFLoader();
                loader.load('stage.glb', (glb) => {
                    const stage = glb.scene;
                    scene.add(stage);
                    stage.position.set(0, 0, 0);
                    console.log(glb);
                }, undefined, (error) => {
                    console.error( error );
                })

                // controls
                const controls = new OrbitControls(camera, renderer.domElement);

                // geometry 
                const boxGeometry = new THREE.BoxGeometry(10, 10, 10);

                // material 
                const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000})
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                // scene.add(box);

                // light
                const light = new THREE.DirectionalLight(0xffffff, 1.0);
                light.position.set(0, 0, 200);
                const ambient = new THREE.AmbientLight(0xffffff, 1.0);

                scene.add(light);
                scene.add(ambient);

                // helpers

                // render
                const tick = () => {
                    requestAnimationFrame(tick);
                    renderer.render(scene, camera);
                }
                tick();
            }
            init();
        }
    }
</script>
<template>
    <canvas id="canvas"></canvas>
</template>
<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
