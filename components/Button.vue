<script>
    export default {
        props: {
            msg: String,
            btnIsBorder: Boolean,
        }
    }
</script>

<template>
    <button class="btn" :class="{ btnIsBorder }" @click="openModal">{{ msg }}</button>
</template>

<style>
    .btn {
        display: block;
        position: relative;
        background: #1771DA;
        color: #fff;
        font-weight: bold;
        padding: 1rem 2rem;
        width: 100%;
        text-align: center;
        margin: 0 auto 1.4rem;
        transition: all .2s;      
        transition: opacity .2s;
        max-width: 600px;
        border-radius: 6px;
        overflow: hidden;
        line-height: 1.6;
    }

    .btn.btnIsBorder {
        background: transparent;
        color: #1771DA;
        border: solid 2px #1771DA;
    }

    .btn:hover {
        opacity: 0.8;
    }

    .btn.btnIsBorder:hover {
        background: #1771DA;
        color: #fff;
        opacity: 1;
    }

    .btn.btnIsBorder:after {
        display: none;
    }
</style>