<template>
  <div class="container">
    <Header :whereSceneIs="this.whereSceneIs" @onClickMenuBtn="clickMenuBtn" @onReset="reset" @onOpenControlMsgBox="reopenControlMsgBox" :controlBoxIsOpen="this.controlBoxIsOpen"/>
    <Intro :class="{isHidden: isStartHidden}" @onClickStart="hiddenStart" @onSetSoundSetting="setSoundSetting"/>
    <Scene @onClickMsgBox="openMsgBox" :whereSceneIs="this.whereSceneIs" :msgBoxIsOpen="this.msgBoxIsOpen" :checkedIcon ="this.checkedIcon" :modalIsOpen ="this.modalIsOpen" :clickedMenuBtn="this.clickedMenuBtn" />
    <MessageBox :title="this.msgBoxTitle" :msg="this.msgBoxMsg" :isOpen="this.msgBoxIsOpen" :msgId="this.msgBoxId" :btnMsg="this.msgBoxBtn" :backBtnMsg="this.msgBoxBtnClose" @onCloseMsgBox="closeMsgBox" @onOpenModal="openModalBox" :whereSceneIs="this.whereSceneIs" @onOpenControlMsgBox="openControlMsgBox"/>
    <MainModal :isOpen="this.modalIsOpen" @onCloseModal="closeModalBox" :id="this.modalId" :title="this.modalTitle" :quote="this.modalQuote" :mainText="this.modalMsg"/>
    <Date :whereSceneIs="this.whereSceneIs"/>
    <Control :isOpen="this.controlBoxIsOpen" :isTouchDevice="this.isTouchDevice" @onCloseControlMsgBox="closeControlMsgBox"/>
    <Button msg="私たちにできることを考える" class="toThinking" :class="{isOpen: this.thinkingBtnIsOpen}" @click="openThinkingModalBox" />
    <div class="clouds">
      <img src="/cloud_left.png" alt="">
      <img src="/cloud_right.png" alt="">
    </div>
  </div>
</template>
<script>
  import 'destyle.css';
  export default {
    data() {
      return {
        isTouchDevice: "",
        isSoundOn: true,
        whereSceneIs: 0, 
        isStartHidden: false,
        msgBoxIsOpen: false,
        msgBoxId: "", 
        msgGroup: [
          {id: "icon1", title: "ラーメン屋店主", msg: "<img src='icons/person_ramen.png' alt='ラーメン屋店主' class='msgBox__personImg'><br><p>ごめんね、マシマシラーメン、また値上げなんだ・・・。</p>",link: "", btnMsg: "詳しく話を聞く", backBtnMsg: "とじる", },
          {id: "icon2", title: "八百屋の客", msg: "<img src='icons/person_customer.png' alt='八百屋の客' class='msgBox__personImg'><p>最近新鮮な野菜が見なくなった気がするんですよね・・・。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon3", title: "スーパーの店員", msg: "<img src='icons/person_sp.png' alt='スーパー店員' class='msgBox__personImg'><p>すみません、この商品は現在品薄となっております・・・。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon4", title: "ディーラーの営業マン", msg: "<img src='icons/person_carDealer.png' alt='ディーラーの営業マン' class='msgBox__personImg'><p>部品の調達が遅れている関係で納車は最短で半年後になりそうです。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon5", title: "住民", msg: "<img src='icons/person_resident.png' alt='住民' class='msgBox__personImg'><p>ネットショッピングの翌日配送サービスを利用したのに、なかなか荷物が届かないのよね・・・。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon6", title: "看護師", msg: "<img src='icons/person_nurse.png' alt='看護師' class='msgBox__personImg'><p>医療器具の配達が遅れてしまって困っています。今すぐにでも必要だというのに・・・。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon7", title: "電子機器メーカー社員", msg: "<img src='icons/person_maker.png' alt='メーカー社員' class='msgBox__personImg'><p>部品が届かないからなかなか商品を作れないよ・・・。</p>",link: "", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
        ], // メッセージボックスのグループ

        msgBoxTitle: "",
        msgBoxMsg: "",
        msgBoxBtn: "",
        msgBoxBtnClose: "", 
        // コントロール
        controlBoxIsOpen: false,
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
            mainText: "<p>こちらは街に昔からある八百屋さんです。<br>以前に比べて新鮮な野菜が買いにくくなってしまっているようです。</p><h2>なぜ新鮮な野菜が手に入らないのか</h2><p>物流2024年問題はトラックドライバーの働き方から端を発する問題です。<br>これまで長時間労働が当たり前だったトラックドライバーの待遇改善が見込まれる一方で、時間の制約から長距離の輸送が難しくなることが懸念されています。</p><p>野菜や肉、魚といった生鮮食品は産地から長距離の輸送を経て私たちの元に届きます。長距離輸送が難しくなることによって、鮮度を良い食品を手に入れにくくなることが考えられます。</p>",
          },
          {
            id: "modal3", 
            from: "icon3",
            title: "品揃えが減る？",
            quote: "ここに引用が入ります",
            mainText: "<p>この街を代表する大型スーパーです。最近品揃えが悪くなったという声が街で聞かれるようになりました。</p><h2>品揃えが少なくなる理由</h2><p>トラックドライバーの働き方改革によって、一人当たりの労働時間が減少します。労働時間の減少に伴う輸送効率の低下や、長距離輸送が難しくなることによって、スーパーマーケットなどの小売店の品揃えに影響が出る恐れがあります。</p>",
          },
          {
            id: "modal4", 
            from: "icon4",
            title: "納車が最短で半年後！",
            quote: "ここに引用が入ります",
            mainText: "<p>ついに憧れのマイカーを購入！・・・のはずが、納車はまさかの半年後・・・。</p><h2>物流2024年問題と部品輸送</h2><p>トラックドライバーの働き方改革によって、製品の製造に必要な部品の輸送が滞る恐れがあります。<br>これにより、メーカー側でも納期通りに部品を手に入れることができなくなり、その結果として製品の製造にも遅延が生じる可能性が指摘されています。</p>",
          },
          {
            id: "modal5", 
            from: "icon5",
            title: "なかなか届かない荷物",
            quote: "ここに引用が入ります",
            mainText: "<p>いつでも、どこでも買い物ができて便利なネットショッピング。ただ、以前よりも配送に時間がかかっているみたいです。</p><h2>物流サービスの低下</h2><p>トラックドライバーの労働時間が減少することで、以前よりも1日あたりの輸送回数が減少します。1日あたりの輸送頻度が少なくなることで、翌日配送やお急ぎ便のような従来通りの輸送サービスが受けにくくなることが予想されているのです。</p>",
          },
          {
            id: "modal6", 
            from: "icon6",
            title: "物流2024年問題と医療",
            quote: "ここに引用が入ります",
            mainText: "<p>物流2024年問題は医療にも影響を及ぼす恐れがあります。</p><h2>医療機器の流通に悪影響</h2><p>トラックドライバーの働き方改革によって、輸送サービスの品質低下が懸念されています。<br>医療機器の配送遅延が生じ、本来であれば受けられるはずの患者の治療が遅れてしまう恐れがあります。</p><h2>過疎地域の医療格差が深刻化</h2><p>過疎地域では都市部と比べて物流が不安定になり、医療機器の配送がより困難になることが予想されます。これにより、都市部と過疎地域の医療格差が深刻化する恐れがあるのです。</p><cite>参考：https://www.mhlw.go.jp/content/10807000/001154230.pdf</cite>",
          },
          {
            id: "modal7", 
            from: "icon7",
            title: "製品の部品が届かない！",
            quote: "<p>ここに引用が入ります</p>",
            mainText: "ここに本文が入ります",
          },
        ], 
        modalIsOpen: false,
        modalId: "",
        modalFrom: "",
        modalTitle: "",
        modalQuote: "",
        modalMsg: "",
        checkedIcon: [],
        thinkingBtnIsOpen: false,
        clickedMenuBtn: "",
        maskCloud: "",
      }
    },
    mounted() {
      // デバイスを判定する
      const isTouchDevice = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        console.log(userAgent);
        if(userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('android') !== -1) {
          this.isTouchDevice = true;
        }else {
          this.isTouchDevice = false;
        }
      }
      isTouchDevice();

      // 雲のテクスチャを取得する
      const clouds = this.$el.children[8];
      this.maskCloud = clouds;
      console.log(clouds.children[0]);
    }, 
    methods: {
      hiddenStart() {
        // スタート画面を非表示にする
        this.isStartHidden = true;
        this.whereSceneIs++;
      },
      openMsgBox(...args) {
        // メッセージボックスを表示する
        const [msgBoxIsOpen, msgBoxId] = args;
        this.msgBoxIsOpen = msgBoxIsOpen;
        this.msgBoxId = msgBoxId;

        // シーンのアイコンをクリックした際に値に応じたメッセージボックスを表示する
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
        // 私たちにできることを考えるボタンを非表示にする
        if(this.checkedIcon.length > 2) {
          this.thinkingBtnIsOpen = true;
        }
      },
      closeMsgBox() {
        if(this.whereSceneIs === 1) {
          this.whereSceneIs++;
        }
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        if(this.checkedIcon.length > 2) {
          this.thinkingBtnIsOpen = true;
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
          if(this.checkedIcon.length > 2) {
            this.thinkingBtnIsOpen = true;
          }
          console.log(document.body);    
  
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
          if(this.checkedIcon.length > 2) {
            this.thinkingBtnIsOpen = true;
          }
      }, 
      openThinkingModalBox () {
          this.msgBoxIsOpen = false;
          this.modalIsOpen = true;
          this.modalTitle = "私たちにできること"
          this.modalMsg = "<p>これまで学んできたように、物流2024年問題は物流業界にとどまらず、私たち一般消費者の生活にも大きな影響を及ぼします。</p><p>しかし、私たちの行動を変えることによって、物流業界で働く人々の負担を減らし、物流2024年問題を解決する助けになることができます。物流2024年問題に対して私たちができることを考えてみましょう。</p><h2>指定した時間に必ず受け取ろう</h2><p>不在による再配達は、トラックドライバーの負担を大きく増加させます。荷物の受け取り時間の前後には必ず家にいるようにして、確実に荷物を受け取れるように心がけましょう。また、決まった時間で荷物を受け取るのが難しい場合は、宅配ボックスや置き配、コンビニ受け取りなどの利用も検討しましょう。</p><h2>お急ぎ便は必要な時にだけ</h2><p>最短でその日中に荷物が届くお急ぎ便。無料となるとどうしてもお急ぎ便を使いたくなりがちですが、トラックドライバーの負担を軽減するためにも、本当に必要な時だけ使うようにしましょう。</p><h2>まとめ買いで運ぶ回数を減らそう</h2><p>ネットショッピングなどで買い物をする際、まとめ買いによって注文回数を絞ることによって、配送回数を減らすことにつながります。</p>";

          // ボタンを非表示にする
          this.thinkingBtnIsOpen = false;
      }, 
      clickMenuBtn(e) {
        // Headerのナビゲーションメニューを押した時の処理
        this.clickedMenuBtn = e;
      }, 
      reset() {
        // 最初の画面に戻る
        window.location.reload();
      }, 
      openControlMsgBox() {
        // メッセージボックスを非表示
        this.msgBoxIsOpen = !this.msgBoxIsOpen;
        // 操作説明のメッセージボックスを開く
        this.controlBoxIsOpen = !this.controlBoxIsOpen;
        if(this.checkedIcon.length > 2) {
          this.thinkingBtnIsOpen = false;
        }   
      },
      reopenControlMsgBox() {
        // 操作説明のメッセージボックスを再度開く
        this.controlBoxIsOpen = true;
        if(this.checkedIcon.length > 2) {
          this.thinkingBtnIsOpen = false;
        }    
      }, 
      closeControlMsgBox() {
        // 操作説明のメッセージボックスを閉じる
        this.controlBoxIsOpen = false;
        if(this.checkedIcon.length > 2) {
          this.thinkingBtnIsOpen = true;
        }    
      },
      setSoundSetting(val) {
        this.isSoundOn = val;
        console.log(this.isSoundOn);
      }

    }, 
    watch: {
      whereSceneIs(count) {
        if(count === 1) {
          // シーン1: ダイアログを表示し、時間経過を表す
            // 雲のトランジションを開始
            this.maskCloud.classList.add('isHidden');
          setTimeout(()=>{
            // メッセージを表示
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

  .clouds {
    position: fixed;
    pointer-events: none;
    user-select: none;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  .clouds img {
    transition: ease-out 3.0s;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
  }

  .clouds.isHidden img:nth-of-type(1) {
    left: -50%;
    /* top: 150%; */
  }

  .clouds.isHidden img:nth-of-type(2) {
    left: 150%;
    /* top: -50%; */
  }

  @media screen and (max-width: 768px) {
    body {
      font-size: 1.4rem;
    }

    .toThinking {
      width: 90%;
      font-size: 1.7rem;
    }
  }

</style>