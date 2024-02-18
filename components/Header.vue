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
        methods: {
            toggleBtn() {
                if(this.$props.whereSceneIs > 2) {
                    this.btnIsActive = !this.btnIsActive;
                    this.menuIsActive = !this.menuIsActive;
                    console.log('toggle', this.btnIsActive, this.menuIsActive);
                    // menuの文言を変更する
                    this.btnIsActive === true ? this.btnMsg = "CLOSE" : this.btnMsg = "MENU";

                    // メニューを表示する
                    this.menuIsActive === true ? this.showMenu(): this.hideMenu();
                }
            }, 
            clickIcon(e) {
                if(this.menuIsActive === true ) {
                    // idをScene.vueに渡す
                    this.$emit('onClickMenuBtn', e.target.id);
                    this.btnIsActive = !this.btnIsActive;
                    this.menuIsActive = !this.menuIsActive;
                    this.btnIsActive === true ? this.btnMsg = "CLOSE" : this.btnMsg = "MENU";
                    this.menuIsActive === true ? this.showMenu(): this.hideMenu();
                }
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
            }
         }, 
        props: {
            HeaderIsOpen: Boolean,
            whereSceneIs: Number
        }
    }
</script>
<template>
    <header class="siteHeader">
        <div class="inner" :class="{isActive: this.menuIsActive}">            
            <nav id="siteHeader__nav" :class="{ isActive: this.menuIsActive }">
                <div class="inner">
                    <h1 class="logo"><img src="/logo.png" alt="物流とわたしたち"></h1>
                    <ul class="siteHeader__nav-list">
                        <li><Button msg="また値上げ！？" :btnIsBorder="true" @click="clickIcon" id="icon1"/></li>
                        <li><Button msg="新鮮な野菜が買えなくなる？" :btnIsBorder="true" id="icon2" @click="clickIcon"/></li>
                        <li><Button msg="スーパーマーケットの品揃えが悪くなる？" :btnIsBorder="true" id="icon3" @click="clickIcon"/></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" id="icon4" @click="clickIcon"/></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" id="icon5" /></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
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
            <div>操作説明</div>
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
        margin: 0 auto;
        width: 50%;
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
    
    .siteHeader #siteHeader__nav .inner .siteHeader__nav-list {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem 2rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .siteHeader #siteHeader__nav .inner .siteHeader__nav-list li {
        width: 48%;

    }

    .siteHeader #siteHeader__nav .backToStart {
        color: #ccc;
    }

    @media screen and (max-width: 768px) {
        .siteHeader .siteHeader__btn {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 100%;
            width: 100%;
            background: #4466E0;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            z-index: 1000;
        }
        
    }
</style>