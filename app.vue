<template>
  <div>
    <Header :whereSceneIs="this.whereSceneIs" />
    <Intro :class="{isHidden: isStartHidden}" @onClickStart="hiddenStart" />
    <Scene @onClick="toggleMsgBox" :whereSceneIs="this.whereSceneIs" :msgBoxIsOpen="this.msgBoxIsOpen" :checkedIcon ="this.checkedIcon" :modalIsOpen ="this.modalIsOpen" />
    <MessageBox :title="this.msgBoxTitle" :msg="this.msgBoxMsg" :isOpen="this.msgBoxIsOpen" :btnMsg="this.msgBoxBtn" :backBtnMsg="this.msgBoxBtnClose" @onClose="toggleMsgBox" @onOpenModal="openModalBox" :whereSceneIs="this.whereSceneIs" />
    <MainModal :isOpen="this.modalIsOpen" @onCloseModal="closeModalBox" :id="this.modalId" :title="this.modalTitle" :quote="this.modalQuote" :mainText="this.modalMsg"/>
    <Date :whereSceneIs="this.whereSceneIs"/>
    <Button msg="私たちにできることを考える" class="toThinking" :class="{isOpen: this.thinkingBtnIsOpen}" @click="openModalBox" />
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
          {id: "icon1", title: "ラーメン屋店主", msg: "<img src='icons/person_ramen.png' alt='ラーメン屋店主' class='msgBox__personImg'><br><p>ごめんね、マシマシラーメン、また値上げなんだ・・・。</p>",link: "", btnMsg: "詳しく話を聞く", backBtnMsg: "とじる", },
          {id: "icon2", title: "タイトル2", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon3", title: "タイトル3", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon4", title: "タイトル4", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon5", title: "タイトル5", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon6", title: "タイトル6", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon7", title: "タイトル7", msg: "ここにメッセージが入ります",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
          {id: "icon8", title: "タイトル8", msg: "<span style='color: red'>ここにメッセージが入ります</span>",link: "", btnMsg: "詳しくみてみる", backBtnMsg: "とじる", },
        ], // メッセージボックスのグループ

        msgBoxTitle: String,
        msgBoxMsg: String,
        msgBoxBtn: String,
        msgBoxBtnClose: String, 
        // モーダルウィンドウのグループ
        modalGroup: [
          {
            id: "modal1", 
            from: "icon1",
            title: "また値上げ！？",
            quote: "ここに引用が入ります",
            mainText: 
            "<p>この街で行列ができるラーメン屋の名物「マシマシラーメン」の価格が200円ほど上がっているようです。</p><h2>なぜ値上げが発生しうるのか</h2><p>物流2024年問題はトラックドライバーの働き方から端を発する問題です。<br>これまで長時間労働が当たり前だったトラックドライバーの待遇改善が見込まれる一方で、労働時間の減少や人手不足により運送会社の売り上げが減少することが予想されます。</p><p>運送会社は売上の減少分を輸送運賃の値上げによって補うことが予想されます。</p><p>ラーメン屋は、食材や麺、食器など様々な物資を運送業者に頼って調達しています。そのため、物流2024年問題による運賃の高騰は、ラーメン屋の経営を圧迫し、商品への価格転嫁という形で値上げが発生します。</p>",
          },
          {
            id: "modal2", 
            from: "icon2",
            title: "新鮮な野菜が買えなくなる！？",
            quote: "ここに引用が入ります",
            mainText: "<p>こちらは街に昔からある八百屋さんです。<br>以前に比べて新鮮な野菜が買いにくくなってしまっているようです。</p><h2>なぜ新鮮な野菜が手に入らないのか</h2><p>物流2024年問題はトラックドライバーの働き方から端を発する問題です。<br>これまで長時間労働が当たり前だったトラックドライバーの待遇改善が見込まれる一方で、時間の制約から長距離の輸送が難しくなることが懸念されています。</p><p>野菜や肉、魚といった生鮮食品は産地から長距離の輸送を経て私たちの元に届きます。長距離輸送が難しくなることによって、鮮度を良い食品が以前よりも買いにくくなることが予想されます。</p>",
          },
          {
            id: "modal3", 
            from: "icon3",
            title: "ここにタイトルが入ります",
            quote: "ここに引用が入ります",
            mainText: "ここに本文が入ります",
          },
          {
            id: "modal4", 
            from: "icon4",
            title: "ここにタイトルが入ります",
            quote: "ここに引用が入ります",
            mainText: "ここに本文が入ります",
          },
          {
            id: "modal5", 
            from: "icon5",
            title: "ここにタイトルが入ります",
            quote: "ここに引用が入ります",
            mainText: "ここに本文が入ります",
          },
          {
            id: "modal6", 
            from: "icon6",
            title: "ここにタイトルが入ります",
            quote: "ここに引用が入ります",
            mainText: "ここに本文が入ります",
          },
          {
            id: "modal7", 
            from: "icon7",
            title: "modal7 ここにタイトルが入ります",
            quote: "<p>ここに引用が入ります</p>",
            mainText: "ここに本文が入ります",
          },
          {
            id: "modal8", 
            from: "icon8",
            title: "ここにタイトルが入ります",
            quote: "ここに引用が入ります",
            mainText: "ここに本文が入ります",
          },

        ], 
        modalIsOpen: false,
        modalId: String,
        modalFrom: String,
        modalTitle: String,
        modalQuote: String,
        modalMsg: String,
        checkedIcon: [],
        thinkingBtnIsOpen: false,
      }
    },
    methods: {
      hiddenStart() {
        // スタート画面を非表示にする
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

          // 値に応じたモーダルウィンドウを表示
          this.modalGroup.map((element) => {        
            if(element.from === this.msgBoxId) {
              console.log(typeof element.id);
              this.modalId = element.id;
              this.modalTitle = element.title;
              this.modalQuote = element.quote;
              this.modalMsg = element.mainText;
              console.log(typeof this.modalTitle, this.modalQuote, this.modalMsg);
            }
          })
  
      },
      closeModalBox() {
        this.modalIsOpen = false;
          // アイコンをチェック済みにする
          if(this.whereSceneIs > 2) {
            let checked = this.checkedIcon.indexOf(this.msgBoxId);
            if(checked === -1 ) {
              this.checkedIcon.push(this.msgBoxId);
            }
          }
      }, 
    }, 
    watch: {
      whereSceneIs(count) {
        console.log(this.whereSceneIs);
        if(count === 1) {
          // シーン1: ダイアログを表示し、時間経過を表す
          setTimeout(()=>{
            this.msgBoxIsOpen = !this.msgBoxIsOpen;
            this.msgBoxTitle = "はじめに";
            this.msgBoxMsg = "<p>ここは日本のとある街です。物流2024年問題によって、この街でどのような問題が起こっているかを見てみましょう。</p>";
            this.msgBoxBtn = "時間を進める";
            this.msgBoxBtnClose = "";
            }, 3500);

        }else if(count === 2) {
          // シーン３で8秒後にダイアログを再び表示
            setTimeout(()=> {
              console.log('scene2');
              this.msgBoxIsOpen = !this.msgBoxIsOpen;
              this.msgBoxTitle = "街に異変が起きています";
              this.msgBoxMsg = "<p>物流2024年問題によって、街に異変が起きています。街の皆さんがどのようなことで困っているのか、実際にみてみましょう。</p>";
              this.msgBoxBtn = "詳しくみてみる";
              this.msgBoxBtnClose = "操作方法を確認する";
              // 次のシーンへ
              this.whereSceneIs++;
            }, 8000);
        }else if(count === 3) {
          // シーン1: ダイアログを表示し、時間経過を表す

        }
      },
      "checkedIcon": {
        handler(val) {
          if(val.length > 3) {
            // 3つ以上のアイコンをクリックしたら、ボタンを表示する
            this.thinkingBtnIsOpen = true;
          }
        }, 
        deep: true,
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

  .toThinking {
    position: absolute;
    display: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40rem;
    font-size: 2.4rem;
  }

  .toThinking.isOpen {
    display: block;
  }
</style>