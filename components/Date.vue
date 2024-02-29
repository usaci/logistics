<script>
    import { gsap } from "gsap";
    export default {
        data() {
            return {
                time: {
                    year: 2024, 
                    month: Number,
                    date: Number,
                    day: String,
                }, 
                isDateActive: false,
                timer: Function,
            }
        }, 
        methods: {
            // 実際に日付を計算する
            calcDays() {
                gsap.to(this.time, {
                    year: 2031,
                    duration: 1,
                });
                // 2, 4, 6, 9, 11
                const samurai = [4, 6, 9, 11];
                if(this.time.month === 2) {
                    if(this.time.month < 12) {

                        if(this.time.date < 28) {
                            this.time.date++;
                        } else {
                            this.time.date = 1;
                            this.time.month++;
                        }
                    }
                }else if(samurai.includes(this.time.month)) {
                    if(this.time.month < 12) {
                        if(this.time.date < 30) {
                            this.time.date++;
                        } else {
                            this.time.date = 1;
                            this.time.month++;
                        }
                    }
                }else {
                    if(this.time.month < 12) {
                        if(this.time.date < 31) {
                            this.time.date++;
                        } else {
                            this.time.date = 1;
                            this.time.month++;
                        }
                    }
                }
            }, 
            calcYears() {
                gsap.to(this.time, {
                    year: 2030,
                    duration: 6,
                    ease: "power1.inOut"
                });
            }
        }, 
        props: {
            whereSceneIs: Number,
        },
        mounted() {
            // デフォルトの日時を定義
            const time = new Date("2024/04/01");
            const month = time.getMonth() + 1;
            const date = time.getDate();

            this.time.month = month;
            this.time.date = date;

        },
        watch: {
            whereSceneIs() {
                // タイマーを設定
                if(this.whereSceneIs === 1) {
                    this.isDateActive = true;
                    console.log(this.isDateActive);
                }else if(this.whereSceneIs === 2) {
                    this.timer = setInterval(this.calcDays, 20);
                }
            }, 
            "time.month": function() {
                if(this.time.year === 2030 ) {
                    // タイマーを解除する
                    clearInterval(this.timer);
                }
            }
        },
    }
</script>

<template>
    <div class="date" :class="{isActive: isDateActive}">
        <p class="year">{{ parseInt(this.time.year) }}</p>
        <p class="month">{{ parseInt(this.time.month).toString().padStart(2, "0") }}.{{ parseInt(this.time.date).toString().padStart(2, "0") }}</p>
    </div>
</template>
<style>
    .date {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        font-family: 'Barlow', sans-serif;
        font-weight: bold;
        line-height: 1.2;
        display: none;
    }

    .date.isActive {
        display: block;
    }

    .date > p {
        background: #fff;
        width: fit-content;
        color: #1771DA;
        font-size: 2.8rem;
    }

    .date > p:nth-of-type(2) {
        font-size: 4.4rem;
    }

    @media screen and (max-width: 768px) {
        .date > p {
            font-size: 2.4rem;
        }

        .date > p:nth-of-type(2) {
            font-size: 3.6rem;
        }
    }
</style>
