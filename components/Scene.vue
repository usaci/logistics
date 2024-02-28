<script>
    import * as THREE from "three";
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
                iconGroup: Object,
                iconIsClicked: false,
                maskCloudGroup: Array,
            }
        },
        props: {
            whereSceneIs: Number,
            msgBoxIsOpen: Boolean,
            checkedIcon: Array,
            modalIsOpen: Boolean,
            clickedMenuBtn: String,
            isSoundOn: Boolean
        },
        methods: {
            submitMsgBox() {
                // どのメッセージボックスを表示するのかを親コンポーネントに送信する
                this.$emit('onClickMsgBox', this.msgBox, this.msgBoxId);
            }, 
        }, 
        mounted() {
            /* ========================================================

            基本設定

            ======================================================== */

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

            // 画面サイズの設定
            const width = this.w;
            const height = this.h;

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            renderer.setClearColor(0x2CBEFF);

            // scene
            const scene = new THREE.Scene();
            this.scene = scene;

            // AxesHelper
            const size = 5;
            scene.add(new THREE.AxesHelper(size));

            // loader
            const loader = new GLTFLoader();

            /* ========================================================

            カメラの設定

            ======================================================== */

            const cameraOffset = .17;
            const deg = 100;
            const camera = new THREE.OrthographicCamera( (this.w / - 2) * cameraOffset, (this.w / 2) * cameraOffset, (this.h / 2) * cameraOffset, (this.h / - 2) * cameraOffset, -10000, 10000, 1000);
            scene.add( camera );
            camera.position.set(deg, deg * .75, deg);
            // camera.position.set(0, deg * .75, 0);
            camera.aspect = width / height;
            // camera.zoom = .1;
            camera.zoom = 0.8;
            this.camera = camera;

            /* ========================================================

            メインステージ読み込み

            ======================================================== */

            // シーン読み込み
            loader.load('stage.glb', (glb) => {
                const stage = glb.scene;
                scene.add(stage);
                stage.position.set(0, 0, 0);
            })

            // // GridHelper
            // const gridHelper = new THREE.GridHelper(10000, 10000);
            // scene.add(gridHelper);


            /* ========================================================

            雲のアニメーション

            ======================================================== */

            const clouds = new THREE.Group();
            const createCloud = (scale, posX, posY, posZ) => {
                loader.load('cloud.glb', (glb) => {
                    const cloud = glb.scene;
                    cloud.position.set(posX, posY, posZ);
                    cloud.scale.set(scale, scale, scale)
                    clouds.add(cloud);
                })
            }

            createCloud(1.2, -100, 50, 0);
            createCloud(0.4, -80, 70, 80);
            createCloud(0.7, -90, 40, -80);
            createCloud(1.4, 140, 40, -80);
            createCloud(1.4, 140, 60, -80);
            createCloud(.8, 150, 40, -80);
            createCloud(.6, 170, 40, 20);
            createCloud(1.0, 240, 60, 140);

            scene.add(clouds);

            // 雲をランダムに動かす
            const moveCloud = (clouds) => {
                const tick = () => {
                    requestAnimationFrame(tick);
                    clouds.children.forEach((cloud, index) => {
                        let speed;
                        if(index % 3 === 0) {
                            speed = 0.0002;
                        }else if(index % 3 === 1) {
                            speed = 0.0007;
                        }else {
                            speed = 0.0004;
                        }
                        cloud.position.z += speed;
                    })
                }
                tick();
            }

            moveCloud(clouds);

            /* ========================================================

            車のアニメーション

            ======================================================== */
            
            // 右側コースの頂点座標
            //  平面の頂点座標
            const vertices = new Float32Array([
                -87, 1, 87,
                -33, 1, 87,
                27, 1, 87,
                87, 1, 87,
                147, 1, 87,

                147, 1, 33,
                87, 1, 33,
                27, 1, 33,
                -33, 1, 33,
                -93, 1, 33,

                -93, 1, -33,
                -33, 1, -33,
                27, 1, -33,
                87, 1, -33,
                147, 1, -33,

                147, 1, -87,
                87, 1, -87,
                27, 1, -87,
                -33, 1, -87,
                -87, 1, -87,

                -87, 1, 87,
                
            ]);

            //バッファーオブジェクトの生成
            const geometry = new THREE.BufferGeometry();
                
            //バッファーオブジェクトのattributeに頂点座標を設定
            geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices, 3));
            
            const material = new THREE.PointsMaterial({
            // 一つ一つのサイズ
            size: 10,
            // 色
            color: 0xff0000,
            });
            const lineMesh = new THREE.Line(geometry,material);
            const pointMesh = new THREE.Points(geometry,material);

            // 車を走らせる

            // 頂点の配列をTHREE.Vector3の配列に変換
            const points = [];
            for (let i = 0; i < vertices.length; i += 3) {
                points.push(new THREE.Vector3(vertices[i], 1.4, vertices[i + 2]));
            }

            // 左側のコースを作成
            // 超点在表を設定
            const verticesLeft = new Float32Array([
                -87, 1, -93,
                -33, 1, -93,
                27, 1, -93,
                87, 1, -93,
                147, 1, -93,

                147, 1, -27,
                87, 1, -27,
                27, 1, -27,
                -33, 1, -27,
                -87, 1, -27,

                -87, 1, 27,
                -33, 1, 27,
                27, 1, 27,
                87, 1, 27,
                153, 1, 27,

                153, 1, 93,
                87, 1, 93,
                27, 1, 93,
                -33, 1, 93,
                -93, 1, 93,

                -93, 1, -93,
            ]);

            //バッファーオブジェクトの生成
            const geometryLeft = new THREE.BufferGeometry();
                
            //バッファーオブジェクトのattributeに頂点座標を設定
            geometryLeft.setAttribute('position',new THREE.Float32BufferAttribute(verticesLeft, 3));
            
            const materialLeft = new THREE.PointsMaterial({
            // 一つ一つのサイズ
            size: 10,
            // 色
            color: 0x00ff00,
            });
            const lineMeshLeft = new THREE.Line(geometryLeft,materialLeft);
            const pointMeshLeft = new THREE.Points(geometryLeft,materialLeft);

            // scene.add(lineMeshLeft);
            // scene.add(pointMeshLeft);   

            const pointsLeft = [];
            for (let i = 0; i < verticesLeft.length; i += 3) {
                pointsLeft.push(new THREE.Vector3(verticesLeft[i], 1.4, verticesLeft[i + 2]));
            }

            // 左方向2つ目
            const verticesLeft02 = new Float32Array([
                -87, 1, -87,
                -87, 1, 87,

                -33, 1, 87,
                -33, 1, -33,

                33, 1, -33,
                33, 1, 87,

                87, 1, 87,
                87, 1, -87,

            ]);

            //バッファーオブジェクトの生成
            const geometryLeft02 = new THREE.BufferGeometry();
                
            //バッファーオブジェクトのattributeに頂点座標を設定
            geometryLeft02.setAttribute('position',new THREE.Float32BufferAttribute(verticesLeft02, 3));
            
            const materialLeft02 = new THREE.PointsMaterial({
            // 一つ一つのサイズ
            size: 10,
            // 色
            color: 0x00ffff,
            });
            const lineMeshLeft02 = new THREE.Line(geometryLeft02,materialLeft02);
            const pointMeshLeft02 = new THREE.Points(geometryLeft02,materialLeft02);

            // scene.add(lineMeshLeft02);
            // scene.add(pointMeshLeft02);   

            const pointsLeft02 = [];
            for (let i = 0; i < verticesLeft02.length; i += 3) {
                pointsLeft02.push(new THREE.Vector3(verticesLeft02[i], 1.4, verticesLeft02[i + 2]));
            }


            const animateCar = (glb, pos, index, points, speed) => {
                const car = glb.scene;
                // 車を平面の頂点にセットする
                car.position.set(pos.x, 1.3, pos.z);
                scene.add(car);

                // 現在の目標頂点のインデックス
                let targetIndex = index + 1;

                // アニメーションループ
                const animate = () => {
                requestAnimationFrame(animate);

                // 現在の位置
                const currentPosition = new THREE.Vector3().copy(car.position);
                // 目標頂点
                const targetPoint = points[targetIndex];

                // 目標頂点に向かって移動
                const direction = new THREE.Vector3().subVectors(targetPoint, car.position).normalize();
                const newPosition = new THREE.Vector3().addVectors(car.position, direction.multiplyScalar(speed));  

                car.position.copy(newPosition);
                if(currentPosition.distanceTo(targetPoint) < speed) {
                    targetIndex = (targetIndex + 1) % points.length;
                } else {
                    car.lookAt(targetPoint);
                }
                }
                animate();
            }


            // 車を走らせる
            let speed = .1;
            loader.load('car_red.glb', (glb) => {
                animateCar(glb, points[1], 1, points, speed);
            })

            loader.load('car_red.glb', (glb) => {
                animateCar(glb, pointsLeft[2], 2, pointsLeft, speed);
            })

            loader.load('truck_yellow.glb', (glb) => {
                animateCar(glb, pointsLeft02[3], 3, pointsLeft02, speed);
            })

            loader.load('truck_yellow.glb', (glb) => {
                animateCar(glb, pointsLeft[4], 4, pointsLeft, speed);
            })

            loader.load('car_blue.glb', (glb) => {
                animateCar(glb, pointsLeft02[pointsLeft02.length - 2], pointsLeft02.length - 2, pointsLeft02, speed);
            })

            loader.load('car_blue.glb', (glb) => {
                animateCar(glb, pointsLeft[pointsLeft.length - 5], pointsLeft.length - 5, pointsLeft, speed);
            })

            loader.load('truck_blue.glb', (glb) => {
                animateCar(glb, points[points.length - 3], points.length - 3, points, speed);
            })
            
            /* ========================================================

            環境照明

            ======================================================== */      
            // light
            const light = new THREE.DirectionalLight(0xffffff, 1.5);
            scene.add(light);
            light.position.set(100, 100, 0);
            this.light = light;

            // ambient
            const ambient = new THREE.AmbientLight(0xffffff, 2.5);
            scene.add(ambient);

            // ------------------------- ここからiconを配置する

            // iconGroup
            const iconGroup = new THREE.Group();
            iconGroup.name = "iconGroup";
            scene.add(iconGroup);
            this.iconGroup = iconGroup;


            // ------------------------- iconを配置する
            const createIcon = (name, posX, posY, posZ) => {
                // アイコンをcanvas上で描画する
                const iconGeometry = new THREE.PlaneGeometry(7.5, 10, 10);
                const textureLoader = new THREE.TextureLoader();
                const iconTexture = textureLoader.load('icons/alert.png');
                iconTexture.encoding = THREE.sRGBEncoding;
                const iconMaterial = new THREE.MeshBasicMaterial({
                    map: iconTexture,
                    side: THREE.DoubleSide,
                    opacity: 1,
                    transparent: true,
                    lightMapIntensity: 0,
                })
                const icon = new THREE.Mesh(iconGeometry, iconMaterial);
                icon.position.set(posX, posY, posZ);
                icon.name = name;
                iconGroup.add(icon);
                icon.rotation.y = Math.PI/180 * 45;

            }

            // 1つ目　ラーメン屋
            createIcon("icon1", 14, 15, 58);
            // 2つ目　八百屋
            createIcon("icon2", 14, 15, 75);   
            // 3つ目 スーパーマーケット
            createIcon("icon3", -73, 15, 60);
            // 4つ目 カーディーラー
            createIcon("icon4", 52, 15, 60);
            // 5つ目 住宅街
            createIcon("icon5", 61, 15, 0); 
            // 6つ目 病院
            createIcon("icon6", 50, 25, -60);   
            // 7つ目 メーカー
            createIcon("icon7", -60, 55, 0);


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

            const getTouchEndPosition = (event) => {
                const element = event.currentTarget;
                // canvas要素上のXY座標
                const x = event.changedTouches[0].clientX - element.offsetLeft;
                const y = event.changedTouches[0].clientY - element.offsetTop;
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

            // タッチ座標取得
            canvas.addEventListener('touchend', getTouchEndPosition);

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
            controls.enableRotate = true;
            controls.enableDamping = true;
            controls.enablePan = true;
            // controls.minZoom = 1;
            // controls.maxZoom = 4;
            this.controls = controls;

            // rayCaster
            const raycaster = new THREE.Raycaster();
            raycaster.near = -10000;
            raycaster.far = 10000;
            this.raycaster = raycaster;

            // render
            const onMouseDown = (event) => {
                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                this.iconIsClicked = true; // マウスが押されたときにフラグを設定]
            }

            // マウス制御
            const onMouseUp = () => {
                this.iconIsClicked = false; // マウスが離されたときにフラグをリセット
            }

            // タッチ制御
            const onTouchStart = () => {
                this.iconIsClicked = true;
            }

            // アニメーション処理
            console.log(scene.children)
            const tick = () => {
                requestAnimationFrame(tick);
                renderer.render(scene, camera);
                const intersects = raycaster.intersectObjects(scene.children[5].children);
                this.intersects = intersects;
                // PCの場合はマウス座標を取得する
                // アイコンにマウスが重なった時の処理
                iconGroup.children.map((mesh) => {
                    // シーン3以降で有効になる
                    if(this.whereSceneIs > 2) {

                        // PCの場合
                        if((window.matchMedia('(min-width: 768px)').matches)) {
                            // マウスカーソルの状態変化
                            intersects.length > 0 && this.msgBoxIsOpen === false ? document.body.style.cursor = "pointer" : document.body.style.cursor = "initial"; 
                            
                            if(intersects.length > 0 && intersects[0].object === mesh && this.modalIsOpen === false && this.msgBoxIsOpen === false) {
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
                            if(intersects.length > 0 && intersects[0].object === mesh && this.modalIsOpen === false && this.msgBoxIsOpen === false) {
                                if(this.iconIsClicked) {
                                    // 一時的にcontrolsを無効にする
                                    this.controls.enabled = false;
                                    // 目標位置を取得する
                                    let pos = new THREE.Vector3();
                                    intersects[0].object.getWorldPosition(pos);

                                    // 1秒でカメラを移動する
                                    gsap.to(this.controls.target, {
                                        ease: "power1.inOut",
                                        duration: 1,
                                        x: pos.x,
                                        y: pos.y,
                                        z: pos.z
                                    })

                                    gsap.to(this.camera.position, {
                                        ease: "power1.inOut",
                                        duration: 1,
                                        x: pos.x + 100,
                                        y: pos.y + 75,
                                        z: pos.z + 100
                                    })

                                    gsap.to(this.camera, {
                                        ease: "power1.inOut",
                                        duration: 1,
                                        zoom: 3
                                    })

                                    // 1.5秒後にメッセージを表示する
                                    const openModal = () => {
                                        this.msgBox = true;
                                        this.msgBoxId = intersects[0].object.name;
                                        this.submitMsgBox();
                                    }
                                    if(this.camera.zoom === 3) {
                                        openModal();
                                    } else {
                                        setTimeout(openModal, 1500);
                                    }
                                    raycaster.setFromCamera(this.mouse, camera);
                                    controls.update();
                                    camera.updateProjectionMatrix();
                                    // １回で処理を終了する
                                    this.iconIsClicked = false;
                                }
                            }

                        } else {
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: +1.0,
                                y: +1.0,
                                z: +1.0
                            })
                            if(intersects.length > 0 && intersects[0].object === mesh && this.modalIsOpen === false && this.msgBoxIsOpen === false) {
                                if(this.iconIsClicked) {
                                    // アイコンをクリックした後は一時的にcontrolsを無効にする
                                    this.controls.enabled = false;
                                    // 目標位置を取得する
                                    let pos = new THREE.Vector3();
                                    intersects[0].object.getWorldPosition(pos);

                                    // 1秒でカメラを移動する
                                    gsap.to(this.controls.target, {
                                        ease: "power1.inOut",
                                        duration: 1,
                                        x: pos.x,
                                        y: pos.y,
                                        z: pos.z
                                    })

                                    gsap.to(this.camera.position, {
                                        ease: "power1.inOut",
                                        duration: 1,
                                        x: pos.x + 100,
                                        y: pos.y + 75,
                                        z: pos.z + 100
                                    })

                                    gsap.to(this.camera, {
                                        ease: "power1.inOut",
                                        duration: 1,
                                        zoom: 3
                                    })

                                    // 1.5秒後にメッセージを表示する
                                    const openModal = () => {
                                        this.msgBox = true;
                                        this.msgBoxId = intersects[0].object.name;
                                        this.submitMsgBox();
                                    }
                                    if(this.camera.zoom === 3) {
                                        openModal();
                                    } else {
                                        setTimeout(openModal, 1500);
                                    }
                                    raycaster.setFromCamera(this.mouse, camera);
                                    controls.update();
                                    camera.updateProjectionMatrix();
                                    // １回で処理を終了する
                                    this.iconIsClicked = false;
                                
                            }}
                        }
                    }
                    }
                )
                // レイキャスターを更新する
                raycaster.setFromCamera(this.mouse, camera);
                // カメラ更新する
                camera.updateProjectionMatrix();
                controls.update()
            }
            
            window.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchstart', onTouchStart);
            // SPの場合はタッチ座標取得する
            canvas.addEventListener('touchstart', (event) => {
                this.mouse.x = (event.targetTouches[0].clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.targetTouches[0].clientY / window.innerHeight) * 2 + 1;
                console.log(this.mouse.x, this.mouse.y);
                this.iconGroup.children.map((mesh) => {
                    if(mesh.name === "icon1") {
                        console.log(mesh.position)
                    }
                })
            })
            tick();
        }, 
        watch: {
            whereSceneIs(val) {
                // シーンを進める処理を行う
                // シーン1ではカメラをズームインし、雲を動かす
                if(val === 1) {
                    gsap.to(this.camera, {
                        ease: "power1.inOut",
                        duration: 3.6,
                        zoom: 1
                    })
                }
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
                            if(this.$props.isSoundOn === true) {
                                const sound = new Audio('sounds/icon.mp3');
                                sound.play();
                            }
                        }
                        setTimeout(appearIcon, random);

                    })
                }

            }, 
            "checkedIcon": {
                // アイコンのチェック状態を監視
                handler: function (val) {
                    // 最後尾の要素 = 直前に追加されたアイコン に対して処理を実行する
                    this.iconGroup.children.map((mesh) => {
                        if(mesh.name === val[val.length - 1]) {
                            // アイコンを回転させる
                            setTimeout(() => {
                                gsap.to(mesh.rotation, {
                                    duration: 1,
                                    y: mesh.rotation.y + Math.PI/180 * 360,
                                })
                                // テクスチャをチェック済みに変更する
                                const textureLoader2 = new THREE.TextureLoader();
                                const iconTextureChecked = textureLoader2.load('icons/checked.png');
                                iconTextureChecked.encoding = THREE.sRGBEncoding;
                                mesh.material.map = iconTextureChecked;
                                
                                // 音を鳴らす
                                if(this.$props.isSoundOn === true) {
                                    const checkedSound = new Audio('sounds/checked.mp3');                           
                                    checkedSound.play();                        
                                }
                            }, 500);
                        }
                    })
                },
                deep: true
            },
            modalIsOpen(val) {
                // モーダルが開いた時にcontrolsを無効にする
                val === true ? this.controls.enabled = false: this.controls.enabled = true;
            }, 
            msgBoxIsOpen(val) {
                //  メッセージボックスが開いた時にcontrolsを無効にする
                val === true ? this.controls.enabled = false: this.controls.enabled = true;
            }, 
            clickedMenuBtn(val, oldVal) {
                console.log(val, oldVal);
                this.iconGroup.children.map((mesh)=> {
                    if((val && mesh.name === val) || (val ==="" && oldVal && mesh.name === oldVal)) {
                        // アイコンをクリックした時と同様の処理を実行
                         // 一時的にcontrolsを無効にする
                            this.controls.enabled = false;
                            // 目標位置を取得する
                            let pos = new THREE.Vector3();
                            mesh.getWorldPosition(pos);

                            // 1秒でカメラを移動する
                            gsap.to(this.controls.target, {
                                ease: "power1.inOut",
                                duration: 1,
                                x: pos.x,
                                y: pos.y,
                                z: pos.z
                            })

                            gsap.to(this.camera.position, {
                                ease: "power1.inOut",
                                duration: 1,
                                x: pos.x + 100,
                                y: pos.y + 75,
                                z: pos.z + 100
                            })

                            gsap.to(this.camera, {
                                ease: "power1.inOut",
                                duration: 1,
                                zoom: 3
                            })

                            // 1.5秒後にメッセージを表示する
                            const openModal = () => {
                                this.msgBox = true;
                                this.msgBoxId = mesh.name;
                                this.submitMsgBox();
                            }
                            if(this.camera.zoom === 3) {
                                openModal();
                            } else {
                                setTimeout(openModal, 1500);
                            }
                            this.raycaster.setFromCamera(this.mouse, this.camera);
                            this.controls.update();
                            this.camera.updateProjectionMatrix();
                    }
                })

            }
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
