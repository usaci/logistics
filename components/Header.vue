<script>
    export default {
        data() {
            return {
                btnIsActive: false,
                menuIsActive: false,
                btnMsg: "MENU",
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
                }
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
        <div class="inner">            
            <nav id="siteHeader__nav" :class="{ isActive: this.menuIsActive }">
                <div class="inner">
                    <h1 class="logo"><img src="/logo.png" alt="物流とわたしたち"></h1>
                    <ul class="siteHeader__nav-list">
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
                        <li><Button msg="ここにメッセージ" :btnIsBorder="true" /></li>
                    </ul>
                    <Button msg="私たちにできることを考える" />
                    <p class="backToStart">スタート画面にもどる</p>
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
        position: relative;
        opacity: 0;
        pointer-events: none;
        user-select: none;
        background: #fff;
        width: 100vw;
        height: 100vh;
        display: none;
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

    .siteHeader #siteHeader__nav.isActive {
        user-select: auto;
        display: block;
        opacity: 1;
        pointer-events: all;
    }

    .siteHeader #siteHeader__nav .backToStart {
        color: #ccc;
    }
</style>