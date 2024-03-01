<template>
    <section class="intro">
        <div class="inner">
            <!-- 音量調整画面 -->
            <div class="intro__sounds" :class="{isActive: isSoundSettingActive}">
                <div class="inner">
                    <figure class="sounds__pic">
                        <img src="/icons/truck_green.png" alt="はじめに">
                    </figure>
                    <h2>はじめに</h2>
                    <p>当サイトでは音声を使用します。<br>設定後も、メニューからも切り替えが可能です。</p>
                    <div class="soundsIcons">
                        <div class="soundsIcons__icon isSoundOn" @click="setSoundSettingOn">
                            <img src="/icons/volumeon.png" alt="音声ON" class="soundOn">
                            <p>音声ON</p>
                        </div>
                        <div class="soundsIcons__icon isSoundOff" @click="setSoundSettingOff">
                            <img src="/icons/volumeoff.png" alt="音声OFF" class="soundOff">
                            <p>音声OFF</p>
                        </div>
                </div>
                </div>
            </div>
            <!-- スタート画面 -->
            <div class="intro__main" :class="{isActive: isIntroMainActive}">
                <div class="slider slider__top">
                    <div class="slider-wrapper">
                        <img src="/icons/ramen.png" alt="">
                        <img src="/icons/truck_green.png" alt="">
                        <img src="/icons/temperture.png" alt="">
                        <img src="/icons/vegs.png" alt="">
                        <img src="/icons/car_blue.png" alt="">
                        <img src="/icons/ramen.png" alt="">
                        <img src="/icons/truck_green.png" alt="">
                        <img src="/icons/temperture.png" alt="">
                        <img src="/icons/vegs.png" alt="">
                        <img src="/icons/car_blue.png" alt="">
                        <img src="/icons/ramen.png" alt="">
                        <img src="/icons/truck_green.png" alt="">
                        <img src="/icons/temperture.png" alt="">
                        <img src="/icons/vegs.png" alt="">
                        <img src="/icons/car_blue.png" alt="">
                    </div>
                </div>
                <div class="slider slider__bottom">
                    <div class="slider-wrapper">
                        <img src="/icons/ramen.png" alt="">
                        <img src="/icons/truck_green.png" alt="">
                        <img src="/icons/danball.png" alt="">
                        <img src="/icons/vegs.png" alt="">
                        <img src="/icons/car_red.png" alt="">
                        <img src="/icons/ramen.png" alt="">
                        <img src="/icons/truck_green.png" alt="">
                        <img src="/icons/danball.png" alt="">
                        <img src="/icons/vegs.png" alt="">
                        <img src="/icons/car_red.png" alt="">
                        <img src="/icons/ramen.png" alt="">
                        <img src="/icons/truck_green.png" alt="">
                        <img src="/icons/danball.png" alt="">
                        <img src="/icons/vegs.png" alt="">
                        <img src="/icons/car_red.png" alt="">
                    </div>
                </div>
                <div class="inner">
                    <h1 class="mainTitle"><img src="/logo.png" alt="物流と私たち /"></h1>
                    <p class="subTitle">物流2024年問題について考える</p>
                    <div class="intro__text" :class="{isTextOpen: this.isTextOpen}">
                        <p>2024年4月から始まる働き方改革によってトラックドライバーの労働時間が減り、全国で<span class="strong">約35％</span>の荷物が運べなくなる<span class="strong">「物流2024年問題」</span>。</p>
                        <p><span class="strong">これから私たちの暮らしがどうなるか、みてみましょう。</span></p>
                    </div>
                    <Button :msg="this.btnTitle" @click="continueContent" />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import gsap from 'gsap';
    export default {
        data() {
            return {
                count: 0,
                btnTitle: "はじめる",
                isTextOpen: false,
                isSoundSettingActive: true,
                isIntroMainActive: false,
            }
        }, 
        methods: {
            continueContent() {
                if( this.count === 0) {
                    // 説明文を表示し、ボタンの文言も変更する
                    this.btnTitle = "何が起こるかみてみる"
                    this.isTextOpen = !this.isTextOpen;
                    this.count++;
                    const introText = this.$el.children[0].children[1].children[2].children[2];
                    console.log(introText);
                    gsap.to(introText, {
                        height: "auto",
                        opacity: 1,
                        duration: .6,
                        ease: "power4.inOut"
                    })

                } else if( this.count === 1 ){
                    // スタート画面を非表示にする
                    this.$emit('onClickStart', true)
                }
            },
            setSoundSettingOn() {
                // 音量をオンにする
                this.$emit('onSetSoundSetting', true);
                // 設定画面を非表示にする
                this.isSoundSettingActive = !this.isSoundSettingActive;
                this.isIntroMainActive = !this.isIntroMainActive;
            }, 
            setSoundSettingOff() {
                // 音量をオフにする
                this.$emit('onSetSoundSetting', false);
                this.isSoundSettingActive = !this.isSoundSettingActive;
                this.isIntroMainActive = !this.isIntroMainActive;

            }
        }, 
        props: {
            isHidden: Boolean
        }, 
        mounted() {
            // スライダーの無限ループを実装

            const sliderTop = this.$el.children[0].children[1].children[0].children[0];
            const sliderBottom = this.$el.children[0].children[1].children[1].children[0];
            const animateSlider = (slider, duration) => {
                const sliderFirst = slider.children[0].getBoundingClientRect().left;
                const sliderBorder = slider.children[5].getBoundingClientRect().left;
                console.log(sliderFirst, sliderBorder);
                gsap.to(slider, {
                    x: -sliderBorder,
                    duration: duration,
                    repeat: -1,
                    ease: "none"
                })
            }

            animateSlider(sliderTop, 10);
            animateSlider(sliderBottom, 10);
        }
    }
</script>
<style>
    .intro {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100svh;
        transform: translate(-50%, 0%);
        top: 0%;
        left: 50%;
        z-index: 1001;
        text-align: center;
        opacity: 1;
        transition: .8s;
    }

    .intro.isHidden {
        opacity: 0;
        pointer-events: none;
    }

    .intro > .inner {
        width: 50%;
    }

    .intro .inner .mainTitle {
        text-align: center;
        margin-bottom: 2rem;
    }

    .intro .inner .mainTitle img {
        width: 100%;
        margin: 0 auto;
    }
    
    .intro .inner .subTitle {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 3rem;
    }

    .intro .inner .intro__text {
        margin-bottom: 4rem;
        opacity: 0;
        line-height: 1.7;
        pointer-events: none;
        height: 0px;
    
    }

    .intro .inner .intro__text p:first-child {
        margin-bottom: 1rem;
    }

    .intro .inner .intro__text .strong {
        font-size: 2.0rem;
        font-weight: bold;
    }

    /* スタート画面 */
    .intro .inner .intro__main {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: .4s;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: white;
        padding: 10rem 5rem;
        border-radius:10px;
    }

    .intro .inner .intro__main.isActive {
        opacity: 1;
        visibility: visible;
    }
    .intro .inner .intro__main > .inner {
        max-width: 600px;
    }

    /* スライダー */
    .intro .inner .intro__main .slider {
        position: absolute;
        width: 100%;
        height: auto;
    }

    .intro .inner .intro__main .slider.slider__top {
        top: 20px;
    }

    .intro .inner .intro__main .slider.slider__bottom {
        bottom: 20px;
    }

    .intro .inner .intro__main .slider .slider-wrapper {
        display: flex;
        align-items: center;
        gap: 40px;
        width: max-content;
    }  
    .intro .inner .intro__main .slider .slider-wrapper > img {
        height: 150px;
    }

    /* サウンド設定 */
    .intro .inner .intro__sounds {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: .4s;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        background: white;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .intro .inner .intro__sounds.isActive {
        opacity: 1;
        visibility: visible;
    }

    .intro .inner .intro__sounds h2 {
        font-size: 2.6rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .intro .inner .intro__sounds p {
        margin-bottom: 3rem;
    }

    .intro .inner .intro__sounds .soundsIcons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        color: #1771DA;
        gap: 30px;
    }

    .intro .inner .intro__sounds .soundsIcons .soundsIcons__icon {
        cursor: pointer;
    }
    .intro .inner .intro__sounds .soundsIcons .soundsIcons__icon:hover {
        opacity: 0.7;
    }
    
    .intro .inner .intro__sounds .soundsIcons img {
        width: 80px;
    }

    .intro .inner .intro__sounds .sounds__pic img {
        width: 150px;
        margin-bottom: 3rem;
    }

    @media screen and (max-width: 768px){
        .intro .inner {
            width: 100%;
        }

        .intro .inner .intro__main, .intro .inner .intro__sounds {
            width: 100%;
            padding: 2rem;
        }
        .intro .inner .mainTitle img {
            width: 100%;
        }
        .intro .inner .subTitle {
            font-size: 1.7rem;
        }

        .intro .inner .intro__text {
            font-size: 1.3rem;
        }

        .intro .inner .intro__text .strong {
            font-size: 1.7rem;
        }

        .intro .inner .intro__main .slider .slider-wrapper > img {
            height: 75px;
        }
    }
</style>
