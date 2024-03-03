<template>
  <div class="container">
    <Header :whereSceneIs="this.whereSceneIs" @onClickMenuBtn="clickMenuBtn" @onReset="reset" @onOpenControlMsgBox="reopenControlMsgBox" :controlBoxIsOpen="this.controlBoxIsOpen" @onSetSoundSetting="setSoundSetting" :isSoundOn="this.isSoundOn" :checkedIconLength="this.checkedIcon.length"/>
    <Intro :class="{isHidden: isStartHidden}" @onClickStart="hiddenStart" @onSetSoundSetting="setSoundSetting"/>
    <Scene :isTouchDevice="this.isTouchDevice" @onClickMsgBox="openMsgBox" :whereSceneIs="this.whereSceneIs" :msgBoxIsOpen="this.msgBoxIsOpen" :checkedIcon ="this.checkedIcon" :modalIsOpen ="this.modalIsOpen" :clickedMenuBtn="this.clickedMenuBtn" :isSoundOn="this.isSoundOn"/>
    <MessageBox :title="this.msgBoxTitle" :msg="this.msgBoxMsg" :isOpen="this.msgBoxIsOpen" :msgId="this.msgBoxId" :btnMsg="this.msgBoxBtn" :backBtnMsg="this.msgBoxBtnClose" @onCloseMsgBox="closeMsgBox" @onOpenModal="openModalBox" :whereSceneIs="this.whereSceneIs" @onOpenControlMsgBox="openControlMsgBox" :imgLink="this.msgBoxImgLink" />
    <MainModal :isOpen="this.modalIsOpen" @onCloseModal="closeModalBox" :id="this.modalId" :title="this.modalTitle" :person="this.modalPerson" :imgLink="this.modalImgLink" :quote="this.modalQuote" :mainText="this.modalMsg" :isTouchDevice="this.isTouchDevice"/>
    <Date :whereSceneIs="this.whereSceneIs"/>
    <Control :isOpen="this.controlBoxIsOpen" :isTouchDevice="this.isTouchDevice" @onCloseControlMsgBox="closeControlMsgBox"/>
    <Button msg="私たちにできることを考える" class="toThinking" :class="{isOpen: this.thinkingBtnIsOpen}" @click="openThinkingModalBox" />
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
          {id: "icon1", title: "ラーメン屋店主", msg: "ごめんね、マシマシラーメン、また値上げなんだ・・・。",imgLink: "icons/person_ramen.png", btnMsg: "詳しく話を聞く", backBtnMsg: "とじる", },
          {id: "icon2", title: "八百屋の客", msg: "最近新鮮な野菜が見なくなった気がするんですよね・・・。",imgLink: "icons/person_customer.png", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon3", title: "スーパーの店員", msg: "大変申し訳ございません。この商品は現在品切れとなっております・・・。",imgLink: "icons/person_sp.png", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon4", title: "ディーラーの営業マン", msg: "部品の調達が遅れている関係で納車は最短で半年後になりそうです。",imgLink: "icons/person_carDealer.png", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon5", title: "住民", msg: "ネットショッピングの翌日配送サービスを利用したのに、なかなか荷物が届かないのよね・・・。",imgLink: "icons/person_resident.png", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon6", title: "看護師", msg: "医療器具の配達が遅れてしまって困っています。今すぐにでも必要だというのに・・・。",imgLink: "icons/person_nurse.png", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
          {id: "icon7", title: "電子機器メーカー社員", msg: "部品が届かないからなかなか商品を作れないよ・・・。",imgLink: "icons/person_maker.png", btnMsg: "詳しく話を聞いてみる", backBtnMsg: "とじる", },
        ], // メッセージボックスのグループ

        msgBoxTitle: "",
        msgBoxPerson: "",
        msgBoxImgLink: "",
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
            "<p>この街で行列ができるラーメン屋の名物「マシマシラーメン」の価格が200円ほど上がっているようです。</p><h2>なぜラーメンが値上げするのか</h2><p>物流2024年問題はトラックドライバーの働き方改革から端を発する問題です。<br>働き方改革による労働時間の減少や人手不足により運送会社の売り上げが減少することが予想されます。</p><p>運送会社は売上が減った分を、<em>運賃の値上げ</em>によって補うことが予想されます。</p><figure><img src='icons/ramen.png' alt/></figure><p>ラーメン屋をはじめとする飲食店は、食材などの様々な物資を運送業者に頼って調達しています。輸送運賃が高くなることで、結果として<em>商品の値上げ</em>につながる可能性があるのです。</p>",
          },
          {
            id: "modal2", 
            from: "icon2",
            title: "新鮮な野菜が買えなくなる？",
            person: "八百屋の客",
            quote: "最近新鮮な野菜が見なくなった気がするんですよね・・・。",
            mainText: "<p>こちらは街に昔からある八百屋さんです。<br>以前に比べて新鮮な野菜が買いにくくなってしまっているようです。</p><h2>なぜ新鮮な野菜が手に入らないのか</h2><p>トラックドライバーの働き方改革によって、これまで長時間労働が当たり前だったトラックドライバーの待遇改善が見込まれる一方で、時間の制約から長距離の輸送が難しくなることが懸念されています。</p><figure><img src='icons/vegs.png' alt></figure><p>野菜や肉、魚といった生鮮食品は産地から長時間の輸送を経て、私たちの元に届きます。これまでのような長距離輸送が難しくなることによって、<em>鮮度を良い食品を手に入れにくくなることが考えられます。</em></p><p>スーパーマーケットや八百屋、魚屋などで売られる食材の質はもちろんのこと、それらを使って提供される飲食店でのサービスにも影響が及ぶ可能性があります。</p>",
          },
          {
            id: "modal3", 
            from: "icon3",
            title: "スーパーから品揃えが減る？",
            quote: "ここに引用が入ります",
            mainText: "<p>この街を代表する大型スーパーです。最近、商品の品揃えが悪くなったという声が街で聞かれるようになりました。</p><h2>品揃えが少なくなる理由</h2><figure><img src='icons/soldOut.png' alt></figure><p>トラックドライバーの働き方改革によって、一人当たりの労働時間が減少します。トラックドライバーの労働時間が制限されることによって、最適なタイミングでの輸送や、長距離にわたる輸送が従来よりも難しくなリます。その結果として、スーパーマーケットなどの小売店の品揃えが悪くなるといった影響が出る可能性があります。</p><p>スーパーマーケットやコンビニエンスストアのような小売店での品揃えが悪くなることで、生活必需品が思うように手に入りにくくなることが考えられます。</p>",
          },
          {
            id: "modal4", 
            from: "icon4",
            title: "納車が最短で半年後！？",
            mainText: "<p>ついに憧れのマイカーを新車で購入！・・・のはずが、納車はまさかの半年後・・・。</p><h2>物流2024年問題と部品輸送</h2><figure><img src='icons/car_red.png' alt></figure><p>トラックドライバーの働き方改革によって、2030年には日本全体での<em>輸送能力が３割以上減少</em>するという予測があります。輸送能力の低下によって、製品の製造に必要な部品の輸送が滞る恐れがあります。<br>自動車の製造に必要な部品を納期通りに手に入れることができなくなり、納車が遅くなることが考えられます。</p><p>このような問題は自動車に限らず、提供される過程に輸送を必要とする商品やサービスで発生する可能性があります。</p>",
          },
          {
            id: "modal5", 
            from: "icon5",
            title: "なかなか届かない荷物",
            mainText: "<p>いつでも、どこでも買い物ができて便利なネットショッピング。ただ、利便性が以前よりも下がっているようです。</p><h2>物流サービスの低下</h2><figure><img src='icons/danball.png' alt></figure><p>トラックドライバーの労働時間が減少することで、以前よりも1日あたりの輸送回数が減少します。1日あたりの輸送頻度が少なくなることで、<em>翌日配送やお急ぎ便のように、従来では当たり前のように使えていた便利な輸送サービスが受けにくくなる</em>ことが予想されているのです。</p><p>また、時間短縮の必要から「置き配」によるお届けが増えることも予想されています。</p><p>今までのように「今日注文すれば明日届く」「その日中に再配達ができる」というわけにはいかなくなるのです。</p>",
          },
          {
            id: "modal6", 
            from: "icon6",
            title: "物流2024年問題と医療",
            mainText: "<p>物流2024年問題は医療にも影響を及ぼす恐れがあります。</p><h2>医療機器の流通に悪影響</h2><figure><img src='icons/temperture.png' alt /></figure><p>トラックドライバーの働き方改革によって、輸送サービスの品質低下が懸念されています。<br>医療機器の配送遅延が生じ、本来であれば受けられるはずの患者の治療が遅れてしまう恐れがあります。</p><h2>過疎地域の医療格差が深刻化</h2></figure><p>これに加えて、過疎地域では都市部と比べて物流が不安定になり、医療機器の配送がより困難になることが予想されます。これにより、<em>都市部と過疎地域の医療格差が深刻化</em>する恐れがあるのです。</p><p>これらの問題が直接関係するのは医療従事者の人々ですが、時に患者となる私たちに全く関係のないものではありません。</p><cite>参考：<a href='https://www.mhlw.go.jp/content/10807000/001154230.pdf' target='_blank' rel='noopener noreferrer'>https://www.mhlw.go.jp/content/10807000/001154230.pdf</a></cite>",
          },
          {
            id: "modal7", 
            from: "icon7",
            title: "製品の部品が届かない！",
            mainText: "<p>この街で創業した日本を代表する電子機器メーカー本社です。製品の製造に必要な備品の納期が延期され、予定通りに製品が作れないという状況になっています。</p><h2>物流2024年問題と部品輸送</h2><figure><img src='icons/parts.png' alt></figure><p>トラックドライバーの働き方改革によって、2030年には日本全体での<em>輸送能力が３割以上減少</em>するという予測があります。これにより、必要な部品の輸送が滞る恐れがあります。<br>このように、メーカー側でも納期通りに部品や材料を手に入れることができなくなり、製品の製造などに影響が出ることが懸念されています。</p><p>製品の製造が遅れれば、当然私たち消費者の手に届くまでに時間がかかることにもなります。</p>",
          },
        ], 
        modalIsOpen: false,
        modalId: "",
        modalFrom: "",
        modalTitle: "",
        modalQuote: "",
        modalMsg: "",
        modalImgLink: "",
        modalPerson: "",
        checkedIcon: [],
        thinkingBtnIsOpen: false,
        clickedMenuBtn: "",
      }
    },
    mounted() {
      // デバイスを判定する
      const isTouchDevice = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if(userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('android') !== -1) {
          this.isTouchDevice = true;
        }else {
          this.isTouchDevice = false;
        }
      }
      // 実行
      isTouchDevice();

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
            this.msgBoxPerson = element.title;
            this.msgBoxTitle = this.msgBoxPerson + "が話をしています";
            this.msgBoxMsg = element.msg;
            this.msgBoxBtn = element.btnMsg;
            this.msgBoxBtnClose = "とじる";
            this.msgBoxImgLink = element.imgLink;
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
              this.msgBoxPerson ? this.modalPerson = this.msgBoxPerson: this.modalPerson = "";
              this.modalQuote = this.msgBoxMsg;
              this.modalMsg = element.mainText;
              this.modalImgLink = this.msgBoxImgLink;
            }
          })

          
          if(this.checkedIcon.length > 2) {
            this.thinkingBtnIsOpen = true;
          }
  
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
          this.modalId = "thinkingModal";
          this.msgBoxPerson = "";
          this.modalPerson = this.msgBoxPerson;
          this.msgBoxIsOpen = false;
          this.modalIsOpen = true;
          this.modalImgLink = "";
          this.modalQuote = "";
          this.modalTitle = "私たちにできること"
          this.modalMsg = "<div class='flex'><figure><img src='/icons/person_maker.png' alt></figure><figure><img src='/icons/person_customer.png' alt></figure><figure><img src='/icons/person_resident.png' alt></figure></div><p>これまで学んできたように、物流2024年問題は物流業界にとどまらず、私たち一般消費者の生活にも大きな影響を及ぼします。</p><p>しかし、私たちの行動によって、物流業界で働く人々の負担を減らし、物流2024年問題を解決する助けになることができます。物流2024年問題に対して私たちができることを考えてみましょう。</p><h2>指定した時間に必ず受け取ろう</h2><p>不在による再配達は、トラックドライバーの負担を大きく増加させます。荷物の受け取り時間の前後には必ず家にいるようにして、<em>確実に荷物を受け取れる</em>ように心がけましょう。<br>また、決まった時間で荷物を受け取るのが難しい場合は、<em>宅配ボックスや置き配、コンビニ受け取り</em>など対面しなくても荷物の受け取りが可能なサービス利用しましょう。</p><h2>お急ぎ便は必要な時にだけ</h2><p>最短でその日中に荷物が届くお急ぎ便。無料となるとどうしてもお急ぎ便を使いたくなりがちですが、トラックドライバーの負担を軽減するためにも、<em>本当に必要な時だけ</em>使うようにしましょう。</p><h2>まとめ買いで運ぶ回数を減らそう</h2><p>ネットショッピングなどで買い物をする際、まとめ買いによって注文回数を絞ることによって、配送回数を減らすことにつながります。なるべく<em>一度にまとめてお買い物をする</em>ことを心がけましょう。</p><h2>送り状の住所は正しく入力しよう</h2><p>送り状の記入ミスによって、配達の無駄が生じてしまいます。ネットショッピングを利用する際は、フォームに入力した住所などが間違っていないか確認しましょう。</p>";

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
      }, 
    }, 
    watch: {
      whereSceneIs(count) {
        if(count === 1) {
          // シーン1: ダイアログを表示し、時間経過を表す
          setTimeout(()=>{
            // メッセージを表示
            this.msgBoxId = "intro1";
            this.msgBoxIsOpen = !this.msgBoxIsOpen;
            this.msgBoxTitle = "ようこそ！";
            this.msgBoxMsg = "ここは日本のとある街です。物流2024年問題によって、この街でどのような問題が起こっているかを見てみましょう。";
            this.msgBoxBtn = "時間を進める";
            this.msgBoxBtnClose = "";
            }, 3500);

        }else if(count === 2) {
          // シーン2で8秒後にダイアログを再び表示
            setTimeout(()=> {
              this.msgBoxId = "intro2";
              this.msgBoxIsOpen = !this.msgBoxIsOpen;
              this.msgBoxTitle = "街に異変が起きています";
              this.msgBoxMsg = "物流2024年問題によって、街に異変が起きています。街の皆さんがどのようなことで困っているのか、実際にみてみましょう。";
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
    },
    
  }
</script>
<style>
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    letter-spacing: 0.05em;
    line-height: 2;
    font-weight: 500;
    color: #302E2D;
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
    font-size: 2.4rem;
    z-index: 100;
    padding: 1rem 2rem;
  
  }
  .toThinking:after {
    content: "";
    display: block;
    position: absolute;
    margin-left: 2rem;
    width: 35px;
    right: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 40px;
    background: #fff;
    opacity: 1;
    z-index: -1;
    background: url(icons/button-arrow.png) no-repeat center center;
    background-size: contain;
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