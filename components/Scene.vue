<script>
    import * as THREE from 'three';
    import { gsap } from "gsap";
    import { MapControls } from 'three/addons/controls/MapControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    export default {
        data() {
            return {
                w: "",
                h: "",
                mouse: {x: Number, y: Number},
                msgBox: false,
                msgBoxId: "",
                iconGroup: "",
                iconIsClicked: false,
            }
        },
        props: {
            whereSceneIs: Number,
            msgBoxIsOpen: Boolean,
            checkedIcon: Array,
        },
        methods: {
            submitMsgBox() {
                // どのメッセージボックスを表示するのかを親コンポーネントに送信する
                this.$emit('onClick', this.msgBox, this.msgBoxId);
            }, 
        }, 
        mounted() {
            // 初期のウィンドウサイズを設定
            this.w = window.innerWidth;
            this.h = window.innerHeight;

            // three.jsに関する記述å
            const canvas = this.$el;
            this.canvas = canvas;

            // renderer
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true
            })

            this.renderer = renderer;

            const width = this.w;
            const height = this.h;

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            renderer.setClearColor(0x2CBEFF);

            // scene
            const scene = new THREE.Scene();
            this.scene = scene;

            // デフォルトの数値
            const cameraOffset = .17;
            const deg = 100;
            const camera = new THREE.OrthographicCamera( (this.w / - 2) * cameraOffset, (this.w / 2) * cameraOffset, (this.h / 2) * cameraOffset, (this.h / - 2) * cameraOffset, -1000, 1000, 1000);
            const cameraHelper = new THREE.CameraHelper(camera);
            // scene.add(cameraHelper);
            scene.add( camera );
            camera.position.set(deg, deg * .75, deg);
            // camera.position.set(0, 100, 0)
            camera.aspect = width / height;
            this.camera = camera;

            // gridHelper
            var size = 1000;
            var step = 100;

            var gridHelper = new THREE.GridHelper(size, step);
            scene.add(gridHelper);

            // loader
            const loader = new GLTFLoader();
            loader.load('stage.glb', (glb) => {
                const stage = glb.scene;
                scene.add(stage);
                stage.position.set(0, 0, 0);
            }, undefined, (error) => {
                console.error( error );
            })

            // light
            const light = new THREE.DirectionalLight(0xffffff, 1.5);
            scene.add(light);
            light.position.set(100, 100, 0);
            this.light = light;

            // // lightHelper
            // const lightHelper = new THREE.DirectionalLightHelper( light, 5 );
            // // scene.add(lightHelper);

            // ambient
            const ambient = new THREE.AmbientLight(0xffffff, 2.5);
            scene.add(ambient);


            // ------------------------- ここからiconを配置する

            // iconGroup
            const iconGroup = new THREE.Group();
            iconGroup.name = "iconGroup";
            scene.add(iconGroup);
            this.iconGroup = iconGroup;

            // アイコンをcanvas上で描画する
            const iconGeometry = new THREE.PlaneGeometry(7.5, 10, 10);
            const textureLoader = new THREE.TextureLoader();
            const iconTexture = textureLoader.load('icons/alert.png')
            iconTexture.encoding = THREE.sRGBEncoding;
            const iconMaterial = new THREE.MeshBasicMaterial({
                map: iconTexture,
                side: THREE.DoubleSide,
                opacity: 1,
                transparent: true,
                lightMapIntensity: 0,

            })

            // ------------------------- iconを配置する
            const createIcon = (name, posX, posY, posZ) => {
                const icon = new THREE.Mesh(iconGeometry, iconMaterial);
                icon.position.set(posX, posY, posZ);
                icon.name = name;
                iconGroup.add(icon);
                icon.rotation.y = Math.PI/180 * 45;

            }

            // 1つ目　ラーメン屋
            createIcon("icon1", 14, 15, 58);

            // // 2つ目　八百屋
            createIcon("icon2", 14, 15, 75);   
            
            // // 3つ目　コンビニ
            createIcon("icon3", -10, 15, 75);

            // // 4つ目 スーパーマーケット
            createIcon("icon4", -73, 15, 60);

            // // 5つ目 カーディーラー
            createIcon("icon5", 52, 15, 60);

            // // 6つ目 住宅街
            createIcon("icon6", 61, 15, 0); 


            // // 7つ目 病院
            createIcon("icon7", 50, 25, -60);   

            // // 8つ目 メーカー
            createIcon("icon8", -60, 55, 0);


            // グループでまとめて制御する
            this.iconGroup = iconGroup;
            iconGroup.children.map((mesh) => {
                mesh.scale.set(0, 0, 0);

            })

            // ------------------------- icon終了

            // マウス座標取得
            const getMousePosition = (event) => {
                const element = event.currentTarget;
                // canvas要素上のXY座標
                const x = event.clientX - element.offsetLeft;
                const y = event.clientY - element.offsetTop;
                // canvas要素の幅・高さ
                const w = element.offsetWidth;
                const h = element.offsetHeight;

                // -1〜+1の範囲で現在のマウス座標を登録する
                this.mouse.x = ( x / w ) * 2 - 1;
                this.mouse.y = -( y / h ) * 2 + 1;

            }
            // マウスカーソルが動くたびに座標を取得
            // 初期化
            canvas.addEventListener('mousemove', getMousePosition);

            // リサイズ処理
            window.addEventListener('resize', () => {
                this.w = window.innerWidth;
                this.h = window.innerHeight;

                // modify camera's aspect ratio
                renderer.setSize(this.w, this.h);
                renderer.setPixelRatio(window.devicePixelRatio);

                camera.left = (this.w / - 2) * cameraOffset;
                camera.right = (this.w / 2) * cameraOffset;
                camera.top = (this.h / 2) * cameraOffset;
                camera.bottom = (this.h / - 2) * cameraOffset;
                camera.updateProjectionMatrix();
                controls.update();
            })

            // MapControls

            const controls = new MapControls( camera, canvas );
            controls.target.set(0, 0, 0);
            controls.enabled = false;
            controls.enableRotate = false;
            controls.enableDamping = true;
            controls.enablePan = true; // パンを有効にする
            this.controls = controls;

            // rayCaster
            const raycaster = new THREE.Raycaster();
            raycaster.near = -10000;
            raycaster.far = 10000;

            // render
            const onMouseDown = (event) => {
                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                this.iconIsClicked = true; // マウスが押されたときにフラグを設定
            }

            const onMouseUp = () => {
                this.iconIsClicked = false; // マウスが離されたときにフラグをリセット
            }

            const tick = () => {
                // メイン部分の挙
                // カメラの位置を更新（例：x軸方向に10移動）
                // カメラの変更をレンダラーに通知
                // レイキャスターの始点と方向を取得
                requestAnimationFrame(tick);

                renderer.render(scene, camera);
                const intersects = raycaster.intersectObjects(scene.children[4].children);
                this.intersects = intersects;

                // アイコンにマウスが重なった時の処理
                iconGroup.children.map((mesh) => {
                    // シーン3以降で有効になる
                    if(this.whereSceneIs > 2) {
                        
                        // controlsを有効にする
                        controls.enabled = true;

                        // マウスカーソルの状態変化
                        if(intersects.length > 0 ) {
                            document.body.style.cursor = "pointer";

                        } else {
                            document.body.style.cursor = "initial";
                        }
                        if(intersects.length > 0 && intersects[0].object === mesh && this.msgBox === false) {
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: 1.2,
                                y: +1.2,
                                z: +1.2
                            });

                            
                        }else {
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: +1.0,
                                y: +1.0,
                                z: +1.0
                            })
                        }

                        // レイキャスターをクリックした時の処理
                    if(intersects.length > 0 && this.msgBox === false) {
                        if(this.iconIsClicked) {
                            // 目標位置を取得する
                            let pos = new THREE.Vector3();
                            intersects[0].object.getWorldPosition(pos);

                            // 1秒でカメラを移動する
                            gsap.to(controls.target, {
                                ease: "power1.inOut",
                                duration: 1,
                                x: pos.x,
                                y: pos.y,
                                z: pos.z
                            })

                            gsap.to(camera.position, {
                                ease: "power1.inOut",
                                duration: 1,
                                x: pos.x + 100,
                                y: pos.y + 75,
                                z: pos.z + 100
                            })

                            gsap.to(camera, {
                                ease: "power1.inOut",
                                duration: 1,
                                zoom: 3
                            })

                            // 一時的にcontrolsを無効にする
                            controls.enabled = false;

                            // 1.5秒後にメッセージを表示する
                            const openModal = () => {
                                this.msgBox = true;
                                this.msgBoxId = intersects[0].object.name;
                                this.submitMsgBox();
                                this.checkedModal++;

                                // 再びcontrolsを有効にする
                                controls.enabled = true;
                            }

                            setTimeout(openModal, 1500);
                            raycaster.setFromCamera(this.mouse, camera);
                            controls.update();
                            camera.updateProjectionMatrix();
                            // １回で処理を終了する
                            this.iconIsClicked = false;
                        }
                    }
                    }
                })
                raycaster.setFromCamera(this.mouse, camera);
                camera.updateProjectionMatrix();
                controls.update();
                
                }

            
            window.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
            tick();

        }, 
        watch: {
            whereSceneIs() {
                // シーンを進める処理を行う
                // シーン2では5秒前後でiconが次々と増えていく
                if(this.whereSceneIs === 2) {
                    this.iconGroup.children.map((mesh) => {
                        const random = Math.random() * 5000;
                        const appearIcon = () => {
                            // アイコンをスケールアップする
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: +1.0,
                                y: +1.0,
                                z: +1.0
                            })
                            // 音を鳴らす
                            const sound = new Audio('sounds/icon.mp3');
                            sound.play();
                        }
                        setTimeout(appearIcon, random);

                    })
                }
                // シーン3では操作説明
                // シーン4で自由にシーンを回遊可能
            }, 
            msgBoxIsOpen() {
                this.msgBox = this.msgBoxIsOpen;
            }, 
            "checkedIcon": {
                // アイコンのチェック状態を監視
                handler: function (val) {
                    // 最後尾の要素 = 直前に追加されたアイコン に対して処理を実行する
                    console.log(val[val.length - 1]);
                    this.iconGroup.children.map((mesh) => {
                        if(mesh.name === val[val.length - 1]) {
                            // アイコンを回転させる
                            console.log(mesh);
                            // テクスチャをチェック済みに変更する
                        }
                    })
                },
                deep: true
            },
        },
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


    .icon {
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
