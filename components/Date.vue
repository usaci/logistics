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
            calcTime() {
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

            }
        }, 
        props: {
            whereSceneIs: Number,
        },
        mounted() {
            // デフォルトの日時を定義
            const time = new Date("2024/01/01");
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
                    this.timer = setInterval(this.calcTime, 20);
                }
            }, 
            "time.month": function() {
                if(this.time.month === 8 ) {
                    console.log('time.should be stopped!!!');
                    // タイマーを解除する
                    clearInterval(this.timer);
                }
            }
        },
    }
</script>

<template>
    <div class="date" :class="{isActive: isDateActive}">
        <p class="year">2024</p>
        <p class="month">{{ parseInt(this.time.month).toString().padStart(2, "0") }}.{{ parseInt(this.time.date).toString().padStart(2, "0") }}(月)</p>
    </div>
</template>
<style>
    .date {
        position: absolute;
        z-index: 100;
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
        color: #4466E0;
        font-size: 2.8rem;
    }

    .date > p:nth-of-type(2) {
        font-size: 4.4rem;
    }
</style>
