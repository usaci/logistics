<template>
  <div>
    <Header :whereSceneIs="this.whereSceneIs" @onClickMenuBtn="clickMenuBtn" @onReset="reset"/>

    <Intro :class="{isHidden: isStartHidden}" @onClickStart="hiddenStart" />

    <Scene @onClick="toggleMsgBox" :whereSceneIs="this.whereSceneIs" :msgBoxIsOpen="this.msgBoxIsOpen" :checkedIcon ="this.checkedIcon" :modalIsOpen ="this.modalIsOpen" :clickedMenuBtn="this.clickedMenuBtn" />

    <MessageBox :title="this.msgBoxTitle" :msg="this.msgBoxMsg" :isOpen="this.msgBoxIsOpen" :msgId="this.msgBoxId" :btnMsg="this.msgBoxBtn" :backBtnMsg="this.msgBoxBtnClose" @onClose="toggleMsgBox" @onOpenModal="openModalBox" :whereSceneIs="this.whereSceneIs" />

    <MainModal :isOpen="this.modalIsOpen" @onCloseModal="closeModalBox" :id="this.modalId" :title="this.modalTitle" :person="this.modalPerson" :quote="this.modalQuote" :mainText="this.modalMsg"/>

    <Date :whereSceneIs="this.whereSceneIs"/>

    <Button msg="私たちにできることを考える" class="toThinking" :class="{isOpen: this.thinkingBtnIsOpen}" @click="openThinkingModalBox" />
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
          {id: "icon2", title: "八百屋の客", msg: "<p>最近新鮮な野菜が見なくなった気がするんですよね・・・。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
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
            person: "ラーメン屋店主",
            quote: "ごめんね、マシマシラーメン、また値上げなんだ・・・。",
            mainText: 
            "<p>この街で行列ができるラーメン屋の名物「マシマシラーメン」の価格が200円ほど上がっているようです。</p><h2>なぜ値上げが発生しうるのか</h2><p>物流2024年問題はトラックドライバーの働き方から端を発する問題です。<br>これまで長時間労働が当たり前だったトラックドライバーの待遇改善が見込まれる一方で、労働時間の減少や人手不足により運送会社の売り上げが減少することが予想されます。</p><p>運送会社は売上の減少分を輸送運賃の値上げによって補うことが予想されます。</p><p>ラーメン屋は、食材や麺、食器など様々な物資を運送業者に頼って調達しています。そのため、物流2024年問題による運賃の高騰は、ラーメン屋の経営を圧迫し、商品への価格転嫁という形で値上げが発生します。</p>",
          },
          {
            id: "modal2", 
            from: "icon2",
            title: "新鮮な野菜が買えなくなる？",
            person: "八百屋の客",
            quote: "最近新鮮な野菜が見なくなった気がするんですよね・・・。",
            mainText: "<p>こちらは街に昔からある八百屋さんです。<br>以前に比べて新鮮な野菜が買いにくくなってしまっているようです。</p><h2>なぜ新鮮な野菜が手に入らないのか</h2><p>物流2024年問題はトラックドライバーの働き方から端を発する問題です。<br>これまで長時間労働が当たり前だったトラックドライバーの待遇改善が見込まれる一方で、時間の制約から長距離の輸送が難しくなることが懸念されています。</p><p>野菜や肉、魚といった生鮮食品は産地から長距離の輸送を経て私たちの元に届きます。長距離輸送が難しくなることによって、鮮度を良い食品が以前よりも買いにくくなることが予想されます。</p>",
          },
          {
            id: "modal3", 
            from: "icon3",
            title: "スーパーマーケットの品揃えが減る？",
            quote: "ここに引用が入ります",
            mainText: "<p>この街を代表する大型スーパーです。最近品揃えが悪くなったという声が街で聞かれるようになりました。</p><h2>品薄のわけ</h2><p>トラックドライバーの働き方改革によって、一人当たりの労働時間が減少します。</p>",
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
        clickedMenuBtn: String,
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
          this.whereSceneIs++;
        }

        // メッセージボックスを表示する
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        const [msgBoxIsOpen, msgBoxId] = args;
        this.msgBoxId = msgBoxId;
        console.log(msgBoxId);

        // アイコンをクリックした際に値に応じたメッセージボックスを表示する
        this.msgGroup.map((element)=> {
          if(element.id === this.msgBoxId) {
            this.msgBoxTitle = element.title;
            this.msgBoxMsg = element.msg;
            this.msgBoxBtn = element.btnMsg;
            this.msgBoxBtnClose = "とじる";
          }
        })

        if(this.msgBoxIsOpen === false) {
          this.clickedMenuBtn = "";
        }
      },
      openModalBox() {
          // モーダルウィンドウを表示する
          this.msgBoxIsOpen = !this.msgBoxIsOpen;
          this.modalIsOpen = true;
          // 値に応じたモーダルウィンドウを表示
          this.modalGroup.map((element) => {        
            if(element.from === this.msgBoxId) {
              this.modalId = element.id;
              this.modalTitle = element.title;
              this.modalPerson = this.msgBoxTitle;
              this.modalQuote = element.quote;
              this.modalMsg = element.mainText;
            }
          })
  
      },
      closeModalBox() {
        // モーダルボックスを閉じる
        this.modalIsOpen = false;
          // アイコンをチェック済みにする
          if(this.whereSceneIs > 2) {
            let checked = this.checkedIcon.indexOf(this.msgBoxId);
            if(checked === -1 ) {
              this.checkedIcon.push(this.msgBoxId);
            }
          }
      }, 
      openThinkingModalBox () {
          this.msgBoxIsOpen = !this.msgBoxIsOpen;
          this.modalIsOpen = true;
          this.modalTitle = "私たちにできること"
          this.modalMsg = "<p>これまで学んできたように、物流2024年問題は物流業界にとどまらず、私たち一般消費者の生活にも大きな影響を及ぼします。</p><p>しかし、私たちの行動を変えることによって、物流業界で働く人々の負担を減らし、物流2024年問題を解決する助けになることができます。物流2024年問題に対して私たちができることを考えてみましょう。</p><h2>指定した時間に必ず受け取ろう</h2><p>不在による再配達は、トラックドライバーの負担を大きく増加させます。荷物の受け取り時間の前後には必ず家にいるようにして、確実に荷物を受け取れるように心がけましょう。また、決まった時間で荷物を受け取るのが難しい場合は、宅配ボックスや置き配、コンビニ受け取りなどの利用も検討しましょう。</p><h2>お急ぎ便は必要な時にだけ</h2><p>最短でその日中に荷物が届くお急ぎ便。無料となるとどうしてもお急ぎ便を使いたくなりがちですが、トラックドライバーの負担を軽減するためにも、本当に必要な時だけ使うようにしましょう。</p><h2>まとめ買いで運ぶ回数を減らそう</h2><p>ネットショッピングなどで買い物をする際、まとめ買いによって注文回数を絞ることによって、配送回数を減らすことにつながります。</p>";
      }, 
      clickMenuBtn(e) {
        // Headerのナビゲーションメニューを押した時の処理
        this.clickedMenuBtn = e;
        console.log(e);
      }, 
      reset() {
        // 最初の画面に戻る
        window.location.reload();
      }
    }, 
    watch: {
      whereSceneIs(count) {
        console.log(count);
        if(count === 1) {
          // シーン1: ダイアログを表示し、時間経過を表す
          setTimeout(()=>{
            this.msgBoxId = "intro1";
            this.msgBoxIsOpen = !this.msgBoxIsOpen;
            this.msgBoxTitle = "はじめに";
            this.msgBoxMsg = "<p>ここは日本のとある街です。物流2024年問題によって、この街でどのような問題が起こっているかを見てみましょう。</p>";
            this.msgBoxBtn = "時間を進める";
            this.msgBoxBtnClose = "";
            }, 3500);

        }else if(count === 2) {
          // シーン2で8秒後にダイアログを再び表示
            setTimeout(()=> {
              this.msgBoxId = "intro2";
              this.msgBoxIsOpen = !this.msgBoxIsOpen;
              this.msgBoxTitle = "街に異変が起きています";
              this.msgBoxMsg = "<p>物流2024年問題によって、街に異変が起きています。街の皆さんがどのようなことで困っているのか、実際にみてみましょう。</p>";
              this.msgBoxBtn = "詳しくみてみる";
              this.msgBoxBtnClose = "操作方法を確認する";
              // 次のシーン(シーン3)へ
              this.whereSceneIs++;
            }, 8000);
        }
      },
      "checkedIcon": {
        handler(val) {
          if(val.length > 2) {
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
    line-height: 2;
    font-weight: 500;
  }

  #__nuxt {
    position: relative;
    overflow: hidden;
  }

  .toThinking {
    position: absolute;
    display: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40rem;
    font-size: 2.4rem;
    z-index: 101;
  }

  .toThinking.isOpen {
    display: block;
  }
</style>