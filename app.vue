<template>
  <div>
    <Intro :class="{isHidden: isStartHidden}" @onClickStart="hiddenStart" />
    <Scene @onClick="toggleMsgBox" :whereSceneIs="this.whereSceneIs" :msgBoxIsOpen="this.msgBoxIsOpen"/>
    <MessageBox :title="this.msgBoxTitle" :msg="this.msgBoxMsg" :isOpen="this.msgBoxIsOpen" :btnMsg="this.msgBoxBtn" :backBtnMsg="this.msgBoxBtnClose" @onClose="toggleMsgBox" @onOpenModal="openModalBox" />
    <MainModal :isOpen="this.modalIsOpen" @onCloseModal="closeModalBox"/>
    <Date :whereSceneIs="this.whereSceneIs"/>
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
          {id: "icon1", title: "タイトル1", msg: "ここにメッセージが入ります。ここに",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon2", title: "タイトル2", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon3", title: "タイトル3", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon4", title: "タイトル4", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon5", title: "タイトル5", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon6", title: "タイトル6", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon7", title: "タイトル7", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon8", title: "タイトル8", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
        ], // メッセージボックスのグループ

        msgBoxTitle: String,
        msgBoxMsg: String,
        msgBoxBtn: String,
        msgBoxBtnClose: String, 
        modalIsOpen: false,
        modalId: String,
        checkedIconCount: Number,

      }
    },
    methods: {
      hiddenStart() {
        this.isStartHidden = true;
        this.whereSceneIs++;
      },
      toggleMsgBox(...args) {
        // シーン1では、閉じるボタンを押すと時間経過のトリガーになる
        if(this.whereSceneIs === 1) {
          console.log('時を進める');
          this.whereSceneIs++;
        }


        // メッセージボックスを表示する
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        const [msgBoxIsOpen, msgBoxId] = args;
        this.msgBoxId = msgBoxId;

        // アイコンをクリックした際に値に応じたメッセージボックスを表示する
        this.msgGroup.map((element)=> {
          if(element.id === this.msgBoxId) {
            this.msgBoxTitle = element.title;
            this.msgBoxMsg = element.msg;
            this.msgBoxBtn = element.btnMsg;
            this.msgBoxBtnClose = "とじる"
          }
        })

      },
      openModalBox() {
          // モーダルウィンドウを表示する
          this.msgBoxIsOpen = !this.msgBoxIsOpen;
          this.modalIsOpen = true;
      },
      closeModalBox() {
        this.modalIsOpen = false;
      }
    }, 
    watch: {
      whereSceneIs(count) {
        console.log(this.whereSceneIs);
        if(count === 1) {
          // シーン1: ダイアログを表示し、時間経過を表す
          setTimeout(()=>{
            console.log('scene1')
            this.msgBoxIsOpen = !this.msgBoxIsOpen;
            this.msgBoxTitle = "はじめに";
            this.msgBoxMsg = "ここは日本のとある街です。物流2024年問題によって、この街でどのような問題が起こっているかを見てみましょう。";
            this.msgBoxBtn = "何が起こるかみてみる";
            this.msgBoxBtnClose = "";
            }, 1000);

        }else if(count === 2) {
          // シーン３で8秒後にダイアログを再び表示
            setTimeout(()=> {
              console.log('scene2');
              this.msgBoxIsOpen = !this.msgBoxIsOpen;
              this.msgBoxTitle = "街に異変が起きています";
              this.msgBoxMsg = "物流2024年問題によって、街に異変が起きています。街の皆さんがどのようなことで困っているのか、実際にみてみましょう。";
              this.msgBoxBtn = "詳しくみてみる";
              this.msgBoxBtnClose = "操作方法を確認する";
              // 次のシーンへ
              this.whereSceneIs++;
            }, 400);
        }else if(count === 3) {
          // シーン1: ダイアログを表示し、時間経過を表す
          console.log('scene3')

        }
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