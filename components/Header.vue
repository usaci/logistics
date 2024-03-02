<script>
    export default {
        data() {
            return {
                headerIsActive: false,
                btnIsActive: false,
                menuIsActive: false,
                btnMsg: "MENU",
                menu: this.$el,
            }
        },
        props: {
            controlBoxIsOpen: Boolean,
            HeaderIsOpen: Boolean,
            whereSceneIs: Number,
            isSoundOn: Boolean,
            checkedIconLength: Number,
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
                }, 80);
            },
            hideMenu() {
                // 見た目上の処理
                const menu = this.$el.children[0].children[0];
                const menuInner = menu.children[0];
                console.log(menuInner)
                menu.style.opacity = 0;
                menu.style.visibility = "hidden";
                setTimeout(()=>{
                    menu.style.display = "none";
                    menuInner.scrollTop = 0;
                    console.log(menu.scrollTop)
                }, 80);
            },
            showControlBox() {
                console.log(this.$props.controlBoxIsOpen);
                if(this.$props.controlBoxIsOpen === false) {
                    this.$emit('onOpenControlMsgBox');
                }
            }, 
            setSoundSettingOn() {
                this.$emit('onSetSoundSetting', true);
            },
            setSoundSettingOff() {
                this.$emit('onSetSoundSetting', false);
            }
         }, 
         watch: {
            whereSceneIs() {
                if(this.$props.whereSceneIs > 2) {
                    this.headerIsActive = true;
                }
            }
         }
    }
</script>
<template>
    <header class="siteHeader" :class="{isActive: this.headerIsActive}">
        <div class="inner">            
            <nav id="siteHeader__nav" :class="{ isActive: this.menuIsActive }">
                <div class="inner">
                    <h1 class="logo"><img src="/logo.png" alt="物流とわたしたち"></h1>
                    <p class="siteHeader__text">何がおこるかみてみる</p>
                    <ul class="siteHeader__nav-list">
                        <li><Button msg="また値上げ！？" :btnIsBorder="true" @click="clickIcon" id="icon1"/></li>
                        <li><Button msg="新鮮な野菜が買えなくなる？" :btnIsBorder="true" id="icon2" @click="clickIcon"/></li>
                        <li><Button msg="スーパーから品揃えが減る？" :btnIsBorder="true" id="icon3" @click="clickIcon"/></li>
                        <li><Button msg="納車が最短で半年後！？" :btnIsBorder="true" id="icon4" @click="clickIcon"/></li>
                        <li><Button msg="なかなか届かない荷物" :btnIsBorder="true" id="icon5" @click="clickIcon"/></li>
                        <li><Button msg="物流2024年問題と医療" :btnIsBorder="true" id="icon6" @click="clickIcon"/></li>
                        <li><Button msg="製品の部品が届かない！" :btnIsBorder="true" id="icon7" @click="clickIcon"/></li>
                    </ul>
                    <Button msg="私たちにできることを考える" v-if="checkedIconLength > 2"/>
                    <button class="backToStart" @click="reset">スタート画面にもどる</button>
                    <div class="soundsIcons">
                        <div class="soundsIcons__icon isSoundOn" @click="setSoundSettingOn" v-if="this.$props.isSoundOn === false">
                            <img src="/icons/volumeon.png" alt="音声ON" class="soundOn">
                            <p>音声ON</p>
                        </div>
                        <div class="soundsIcons__icon isSoundOff" @click="setSoundSettingOff" v-else>
                            <img src="/icons/volumeoff.png" alt="音声OFF" class="soundOff">
                            <p>音声OFF</p>
                        </div>
                    </div>
                    <small>&nbsp;2024 物流とわたしたち</small>
                </div>
            </nav>
            <div class="siteHeader__btn" @click="toggleBtn" :class="{ isOpen: this.btnIsActive }">
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
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        transition: .4s;
    }

    .siteHeader.isActive {
        opacity: 1;
        pointer-events: all;
        visibility: visible;
    }

    /* ロゴ */
    .siteHeader .logo {
        top: 0;
        margin-bottom: 6rem;
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
        background: #1771DA;
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
        transition: .4s;
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

    .siteHeader .siteHeader__btn.isOpen .inner span:nth-child(1) {
        transform: translateY(13px) rotate(45deg);
    }
    .siteHeader .siteHeader__btn.isOpen .inner span:nth-child(2) {
        opacity: 0;
    }

    .siteHeader .siteHeader__btn.isOpen .inner span:nth-child(3) {
        transform: rotate(-45deg);
        top: 13px;
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
        margin-bottom: 3rem;
    }

    .siteHeader #siteHeader__nav .backToStart:hover {
        color: #1771DA;
    }

    .siteHeader #siteHeader__nav .soundsIcons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        color: #1771DA;
        gap: 20px;
    }

    .siteHeader #siteHeader__nav .soundsIcons__icon {
        cursor: pointer;
    }

    .siteHeader #siteHeader__nav .soundsIcons .soundsIcons__icon:hover {
        opacity: 0.7;
    }
    
    .siteHeader #siteHeader__nav .soundsIcons img {
        width: 60px;
    }

    @media screen and (max-width: 768px) {
        .siteHeader .logo {
            margin-bottom: 3rem;
        }

        .siteHeader .logo img {
            width: 280px;
        }
        /* ヘッダーのボタン */
        .siteHeader .siteHeader__btn {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 100%;
            width: 100%;
            background: #1771DA;
            border-radius: 50%;
            width: 75px;
            height: 75px;
            cursor: pointer;
            z-index: 1000;
        }
        
        .siteHeader .siteHeader__btn .inner span:nth-child(2) {
            top: 8px;
        }

        .siteHeader .siteHeader__btn .inner span:nth-child(3) {
            top: 16px;
        }
        .siteHeader .siteHeader__btn.isOpen .inner span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .siteHeader .siteHeader__btn.isOpen .inner span:nth-child(2) {
            opacity: 0;
        }

        .siteHeader .siteHeader__btn.isOpen .inner span:nth-child(3) {
            transform: rotate(-45deg);
            top: 8px;
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
            top: 23px;
            width: 100%;
        }
        
        /* 操作説明のボタン */
        .siteHeader .siteHeader__btn.siteHeader__btn-control {
            background: #B6B6B6;
            right: 80px;
            color: #fff;
            font-size: 1.1rem;
            text-align: center;
            padding: 1rem;
        }

        .siteHeader .siteHeader__btn.siteHeader__btn-control img {
            width: 21px;
            height: auto;
        }

        /* ナビゲーション周り */
        .siteHeader #siteHeader__nav .inner {
            width: 100%;
            padding: 10rem 2rem 4rem;
            height: 100svh;
            overflow: scroll;
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
            width: 1.9rem;
            height: 2.8rem;
            transform: translate(-8px, 5px);
        }
    }
</style>