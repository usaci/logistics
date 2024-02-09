<template>
  <div>
    <Scene @onClick="toggleMsgBox" />
    <MessageBox title="こんにちは" msg="ここにメッセージが入ります" :isOpen="this.msgBoxIsOpen" @onClose="toggleMsgBox" />
  </div>
</template>
<script>
  import 'destyle.css';
  export default {
    data() {
      return {
        msgBoxIsOpen: false,
        msgBoxId: 0
      }
    },
    methods: {
      toggleMsgBox(...args) {
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        console.log(args);
        const [msgBoxIsOpen, msgBoxId] = args;
        this.msgBoxId = msgBoxId;
        console.log(msgBoxId);
    }
  }
  }
</script>
<style>
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    letter-spacing: 0.1em;
    line-height: 1.7;
    font-weight: 500;
  }
</style>