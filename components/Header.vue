<script>
    export default {
        data() {
            return {
                btnIsActive: false,
                menuIsActive: false,
                btnMsg: "MENU",
                menu: this.$el,
            }
        },
        props: {
            controlBoxIsOpen: Boolean,
            HeaderIsOpen: Boolean,
            whereSceneIs: Number
        },
        methods: {
            toggleBtn() {
                if(this.$props.whereSceneIs > 2) {
                    this.btnIsActive = !this.btnIsActive;
                    this.menuIsActive = !this.menuIsActive;
                    // menuの文言を変更する
                    this.btnIsActive === true ? this.btnMsg = "CLOSE" : this.btnMsg = "MENU";
                    // メニューを表示する
                    this.menuIsActive === true ? this.showMenu(): this.hideMenu();
                }
            }, 
            clickIcon(e) {
                // idをScene.vueに渡す
                this.$emit('onClickMenuBtn', e.target.id);
                this.btnIsActive = !this.btnIsActive;
                this.menuIsActive = !this.menuIsActive;
                this.btnIsActive === true ? this.btnMsg = "CLOSE" : this.btnMsg = "MENU";
                this.menuIsActive === true ? this.showMenu(): this.hideMenu();
            }, 
            reset() {
                this.$emit('onReset');
            },
            showMenu() {
                // 見た目上の処理
                const menu = this.$el.children[0].children[0];
                menu.style.display = "block";
                setTimeout(()=>{
                    menu.style.opacity = 1;
                    menu.style.visibility = "visible";
                }, 10);
            },
            hideMenu() {
                // 見た目上の処理
                const menu = this.$el.children[0].children[0];
                menu.style.opacity = 0;
                menu.style.visibility = "hidden";
                setTimeout(()=>{
                    menu.style.display = "none";
                }, 10);
            },
            showControlBox() {
                console.log(this.$props.controlBoxIsOpen);
                if(this.$props.controlBoxIsOpen === false) {
                    this.$emit('onOpenControlMsgBox');
                }
            }
         }, 
    }
</script>
<template>
    <header class="siteHeader">
        <div class="inner" :class="{isActive: this.menuIsActive}">            
            <nav id="siteHeader__nav" :class="{ isActive: this.menuIsActive }">
                <div class="inner">
                    <h1 class="logo"><img src="/logo.png" alt="物流とわたしたち"></h1>
                    <p class="siteHeader__text">何がおこるかみてみる</p>
                    <ul class="siteHeader__nav-list">
                        <li><Button msg="また値上げ！？" :btnIsBorder="true" @click="clickIcon" id="icon1"/></li>
                        <li><Button msg="新鮮な野菜が買えなくなる？" :btnIsBorder="true" id="icon2" @click="clickIcon"/></li>
                        <li><Button msg="品揃えが減る？" :btnIsBorder="true" id="icon3" @click="clickIcon"/></li>
                        <li><Button msg="納車が最短で半年後！" :btnIsBorder="true" id="icon4" @click="clickIcon"/></li>
                        <li><Button msg="なかなか届かない荷物" :btnIsBorder="true" id="icon5" @click="clickIcon"/></li>
                        <li><Button msg="物流2024年問題と医療" :btnIsBorder="true" id="icon6" @click="clickIcon"/></li>
                        <li><Button msg="製品の部品が届かない！" :btnIsBorder="true" id="icon7" @click="clickIcon"/></li>
                    </ul>
                    <Button msg="私たちにできることを考える" />
                    <button class="backToStart" @click="reset">スタート画面にもどる</button>
                </div>
            </nav>
            <div class="siteHeader__btn" @click="toggleBtn" :class="{ isActive: this.btnIsActive }">
                <div class="inner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>{{ btnMsg }}</p>
                </div>
            </div>
            <div class="siteHeader__btn siteHeader__btn-control" @click="showControlBox">
                <div><img src="/icons/question.png" alt="操作説明" class="question"></div>
                <span>操作説明</span>
            </div>
        </div>
    </header>
</template>
<style>
    .siteHeader {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100px;
        background: transparent;
        z-index: 1000;
    }

    /* ロゴ */
    .siteHeader .logo {
        top: 0;
        margin-bottom: 3rem;
    }
    
    .siteHeader .logo img {
        width: 400px;
    }

    .siteHeader .siteHeader__btn {
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 100%;
        background: #4466E0;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        cursor: pointer;
        z-index: 1000;
    }


    .siteHeader .siteHeader__btn .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        height: 50%;
        width: 60%;
        margin: 0 auto;
        color: #fff;
        text-align: center;
    }

    .siteHeader .siteHeader__btn .inner.isActive {
        opacity: 1;
        pointer-events: all;
        visibility: 1;
    }

    .siteHeader .siteHeader__btn .inner span {
        position: absolute;
        display: block;
        width: 100%;
        height: 3px;
        background: #fff;
    }    

    .siteHeader .siteHeader__btn .inner > p {
        text-align: center;
        position: absolute;
        font-weight: bold;
        font-size: 1.6rem;
        top: 32px;
        width: 100%;
    }
    
    .siteHeader .siteHeader__btn .inner span:nth-child(2) {
        top: 13px;
    }

    .siteHeader .siteHeader__btn .inner span:nth-child(3) {
        top: 26px;
    }

    /* 操作説明のボタン */
    .siteHeader .siteHeader__btn.siteHeader__btn-control {
        background: #B6B6B6;
        right: 120px;
        color: #fff;
        font-size: 1.3rem;
        text-align: center;
        padding: 20px;
    }

    .siteHeader .siteHeader__btn.siteHeader__btn-control img {
        width: 25px;
        height: auto;
    }

    /* menu */
    .siteHeader #siteHeader__nav {
        display: none;
        position: relative;
        opacity: 0;
        visibility: hidden;
        background: #fff;
        width: 100vw;
        height: 100vh;
        transition: .2s;
    }

    .siteHeader #siteHeader__nav .inner {
        width: 70%;
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
    
    .siteHeader #siteHeader__nav .inner .siteHeader__nav-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 2rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .siteHeader #siteHeader__nav .inner .siteHeader__nav-list li {
        width: 48%;
    }

    .siteHeader__text {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2.0rem;
        font-weight: bold;
    }

    .siteHeader #siteHeader__nav .backToStart {
        color: #ccc;
        transition: .2s;
    }

    .siteHeader #siteHeader__nav .backToStart:hover {
        color: #4466E0;
    }

    @media screen and (max-width: 768px) {
        .siteHeader .logo img {
            width: 250px;
        }
        /* ヘッダーのボタン */
        .siteHeader .siteHeader__btn {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 100%;
            width: 100%;
            background: #4466E0;
            border-radius: 50%;
            width: 70px;
            height: 70px;
            cursor: pointer;
            z-index: 1000;
        }
        
        .siteHeader .siteHeader__btn .inner span:nth-child(2) {
            top: 8px;
        }

        .siteHeader .siteHeader__btn .inner span:nth-child(3) {
            top: 16px;
        }
        .siteHeader .siteHeader__btn .inner span {
            position: absolute;
            display: block;
            width: 100%;
            height: 2px;
            background: #fff;
        }    

        .siteHeader .siteHeader__btn .inner > p {
            text-align: center;
            position: absolute;
            font-weight: bold;
            font-size: 1.2rem;
            top: 20px;
            width: 100%;
        }
        
        /* 操作説明のボタン */
        .siteHeader .siteHeader__btn.siteHeader__btn-control {
            background: #B6B6B6;
            right: 75px;
            color: #fff;
            font-size: 1.1rem;
            text-align: center;
            padding: 1rem;
        }

        .siteHeader .siteHeader__btn.siteHeader__btn-control img {
            width: 20px;
            height: auto;
        }

        /* ナビゲーション周り */
        .siteHeader #siteHeader__nav .inner {
            width: 100%;
            padding: 2rem;
        }

        .siteHeader #siteHeader__nav .inner .siteHeader__nav-list {
            gap: 0;
        }

        .siteHeader #siteHeader__nav .inner .siteHeader__nav-list li {
            width: 100%;
            font-size: 1.4rem;
            width: 100%;
        }

        .siteHeader__text {
            position: relative;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 1.6rem;
            font-weight: bold;
        }

        .siteHeader__text:before {
            content: "";
            display: inline-block;
            background-image: url("/icons/alert.png");
            background-size: cover;
            background-repeat: no-repeat;
            width: 2.4rem;
            height: 2.8rem;
            transform: translate(-8px, 5px);
        }
    }
</style>