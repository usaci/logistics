<template>
  <div>
    <Intro :class="{isHidden: isStartHidden}" @onClickStart="hiddenStart" />
    <Scene @onClick="toggleMsgBox" :whereSceneIs="this.whereSceneIs" />
    <MessageBox :title="this.msgBoxTitle" :msg="this.msgBoxMsg" :isOpen="this.msgBoxIsOpen" @onClose="toggleMsgBox" @onOpenModal="openModalBox" />
    <MainModal :isOpen="this.modalIsOpen" @onCloseModal="closeModalBox"/>
  </div>
</template>
<script>
  import 'destyle.css';
  export default {
    data() {
      return {
        whereSceneIs: 0, 
        isStartHidden: false,
        msgBoxIsOpen: false,
        msgBoxId: String, 
        msgGroup: [
          {id: "icon1", title: "タイトル1", msg: "ここにメッセージが入ります",link: ""},
          {id: "icon2", title: "タイトル2", msg: "ここにメッセージが入ります",link: "" },
        ], // メッセージボックスのグループ

        msgBoxTitle: String,
        msgBoxMsg: String, 
        modalIsOpen: false,
        modalId: String

      }
    },
    methods: {
      hiddenStart() {
        this.isStartHidden = true;
        this.whereSceneIs++;
      },
      toggleMsgBox(...args) {
        // メッセージボックスを表示する
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        console.log(args);
        const [msgBoxIsOpen, msgBoxId] = args;
        this.msgBoxId = msgBoxId;
        console.log(msgBoxId);

        this.msgGroup.map((element)=> {
          if(element.id === this.msgBoxId) {
            this.msgBoxTitle = element.title;
            this.msgBoxMsg = element.msg;
          }
        })
    },
    openModalBox() {
        // モーダルウィンドウを表示する
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        this.modalIsOpen = true;
        console.log('modal', this.modalIsOpen);
    },
    closeModalBox() {
      this.modalIsOpen = false;
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