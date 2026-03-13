import React, { useState, useEffect } from "react";
import "./styles.css";

// --- 定義 TypeScript 型別 ---
interface QuizItem {
  questionContext: string;
  answer: string;
  qType: string;
}

// --- 圖片題庫資料 (共 275 筆) ---
const imageCSV = `image001.jpg,ZTZ-99式主戰坦克
image002.jpg,ZTD-05式兩棲突擊車
image003.jpg,ZBD-03式履帶式傘兵戰車
image004.jpg,ZBD-04A式裝甲步兵戰鬥車
image005.jpg,ZBL-08式輪式步兵戰鬥車
image006.jpg,ZTZ-96A式主戰坦克
image007.jpg,ZBD-05型兩棲裝甲步兵戰鬥車
image008.jpg,ZBD-04式裝甲步兵戰鬥車
image009.jpg,ZSL-92式輪式步兵戰鬥車
image010.jpg,猛士型突擊車
image011.jpg,ZTL-11式輪式裝甲突擊車
image012.jpg,山貓8x8全地形車
image013.jpg,PHL-191式遠程多管火箭砲
image014.jpg,紅箭8型反坦克飛彈
image015.jpg,紅箭10履式反坦克導彈發射車
image016.jpg,PTL-02式輪式突擊炮
image017.jpg,PHZ-89式122公釐多管火箭砲
image018.jpg,PHL-03式300公釐火箭砲
image019.jpg,紅箭9型反坦克裝甲車
image020.jpg,紅箭73型反坦克飛彈
image021.jpg,PLZ-05式155公釐自走榴彈砲
image022.jpg,PLL-05式120公釐自走迫榴砲
image023.jpg,PCP-001式120公釐速射砲
image024.jpg,PCL-171式122公釐車載榴彈砲
image025.jpg,PLZ-89式122公釐自走榴彈砲
image026.jpg,PLZ-07式122公釐自走榴彈砲
image027.jpg,PLL-09式122公釐自走榴彈砲
image028.jpg,PCL-161式122公釐車載榴彈砲
image029.jpg,PCL-181式155公釐車載榴彈砲
image030.jpg,PLZ-10式120公釐自走迫榴砲
image031.jpg,PCL-09式122公釐車載榴彈砲
image032.jpg,紅旗16型(HQ-16)防空飛彈
image033.jpg,紅旗-17A(HQ-17A)防空導彈
image034.jpg,紅纓6型(HN-6)單兵肩射防空飛彈
image035.jpg,PGZ-95式25公釐自走防空快砲
image036.jpg,紅旗-7B(HQ-7B)防空導彈
image037.jpg,紅旗17型(HQ-17)防空飛彈
image038.jpg,前衛19號單兵肩射防空飛彈
image039.jpg,PG-99式雙35公釐牽引防空快砲
image040.jpg,PGZ-07式雙35公釐自走防空快砲
image041.jpg,PGL-625式防空飛彈
image042.jpg,直9型攻擊直升機
image043.jpg,米17型運輸直升機
image044.jpg,武直19型攻擊直升機
image045.jpg,東風15型彈道飛彈
image046.jpg,直8型運輸直升機
image047.jpg,武直10型攻擊直升機
image048.jpg,卡28型反潛直升機
image049.jpg,直20型運輸直升機
image050.jpg,東風16型彈道飛彈
image051.jpg,東風17型彈道飛彈
image052.jpg,東風26型彈道飛彈
image053.jpg,東風41型洲際彈道飛彈
image054.jpg,071型兩棲船塢登陸艦
image055.jpg,073A型登陸艦
image056.jpg,東風21型彈道飛彈
image057.jpg,東風31型彈道飛彈
image058.jpg,東風100型超音速巡弋飛彈
image059.jpg,072A型戰車登陸艦
image060.jpg,074型登陸艦
image061.jpg,075型兩棲攻擊艦
image062.jpg,726型野馬級氣墊艇
image063.jpg,遼寧號航空母艦(CV-16/001型)
image064.jpg,福建號航空母艦(CV-18/003型)
image065.jpg,殲10機
image066.jpg,MLP半潛船
image067.jpg,728型野牛級氣墊艇
image068.jpg,山東號航空母艦(CV-17/002型)
image069.jpg,殲轟7機
image070.jpg,殲11機
image071.jpg,殲15機
image072.jpg,殲16機
image073.jpg,殲20機
image074.jpg,轟6轟炸機
image075.jpg,運8技術偵察機
image076.jpg,殲16D機
image077.jpg,蘇愷35機
image078.jpg,殲35機
image079.jpg,運8反潛機
image080.jpg,運8遠程干擾機
image081.jpg,運9型電偵機
image082.jpg,空警500預警機
image083.jpg,空警2000預警機
image084.jpg,伊爾76型運輸機
image085.jpg,BZK-007無人偵察機
image086.jpg,空警200預警機
image087.jpg,空警600預警機
image088.jpg,運20型運輸機
image089.jpg,BZK-005戰略無人偵察機
image090.jpg,殲6無人攻擊機
image091.jpg,哈比/JWS-01反輻射無人機
image092.jpg,無偵10無人戰略偵察機
image093.jpg,攻擊11型無人攻擊機(利劍)
image094.jpg,TB-001無人機(雙尾蠍)
image095.jpg,無偵7無人戰略偵察機
image096.jpg,攻擊2型無人攻擊機(翼龍)
image097.jpg,KVD-002無人偵察機
image098.emz.jpg,陸軍
image099.emz.jpg,海軍
image100.emz.jpg,空軍
image101.emz.jpg,火箭軍
image102.emz.jpg,裝甲兵
image103.emz.jpg,砲兵
image104.emz.jpg,防空兵
image105.emz.jpg,陸軍航空兵
image106.emz.jpg,工程兵
image107.emz.jpg,防化兵
image108.emz.jpg,通信兵
image109.emz.jpg,空降兵
image110.emz.jpg,預備役部隊
image111.emz.jpg,基本指揮所
image112.emz.jpg,預備指揮所
image113.emz.jpg,前進指揮所
image114.emz.jpg,後方指揮所
image115.emz.jpg,聯合指揮所
image116.emz.jpg,觀察所
image117.emz.jpg,加農榴彈砲
image118.emz.jpg,戰區
image119.emz.jpg,集團軍級
image120.emz.jpg,旅級
image121.emz.jpg,營級
image122.emz.jpg,連級
image123.emz.jpg,高射機槍
image124.emz.jpg,加農砲
image125.emz.jpg,指揮觀察所
image126.emz.jpg,榴彈砲
image127.emz.jpg,火箭砲
image128.emz.jpg,迫擊砲
image129.emz.jpg,高射砲
image130.emz.jpg,彈砲結合防空系統
image131.emz.jpg,反坦克導彈
image132.emz.jpg,車載反坦克導彈
image133.emz.jpg,水路坦克
image134.emz.jpg,步兵戰車
image135.emz.jpg,坦克指揮車
image136.emz.jpg,裝甲指揮車
image137.emz.jpg,指揮車
image138.emz.jpg,導彈發射車
image139.emz.jpg,航空母艦
image140.emz.jpg,驅逐艦
image141.emz.jpg,護衛艦
image142.emz.jpg,登陸艦
image143.emz.jpg,護衛艇
image144.emz.jpg,導彈艇
image145.emz.jpg,登陸艇
image146.emz.jpg,殲擊機
image147.emz.jpg,轟炸機
image148.emz.jpg,偵察機
image149.emz.jpg,運輸機
image150.emz.jpg,預警機
image151.emz.jpg,無人機
image152.emz.jpg,直升機
image153.emz.jpg,攻擊直升機
image154.emz.jpg,運輸直升機
image155.emz.jpg,軍用衛星
image156.emz.jpg,偵察車
image157.emz.jpg,情報站
image158.emz.jpg,無線電通信偵察站
image159.emz.jpg,電磁頻譜監測站
image160.emz.jpg,無人偵察機設備站
image161.emz.jpg,通信樞紐
image162.emz.jpg,衛星通信站
image163.emz.jpg,警戒雷達
image164.emz.jpg,雷達情報站
image165.emz.jpg,砲瞄雷達
image166.emz.jpg,電子對抗干擾系統
image167.emz.jpg,網路戰系統
image168.emz.jpg,塹壕
image169.emz.jpg,坑(地)道
image170.emz.jpg,掩體
image171.emz.jpg,野戰工事
image172.emz.jpg,地堡
image173.emz.jpg,鐵絲網
image174.emz.jpg,反坦克壕
image175.emz.jpg,欄障
image176.emz.jpg,舟橋
image177.emz.jpg,汽車
image178.emz.jpg,工程機械車
image179.emz.jpg,防化車
image180.emz.jpg,煙幕
image181.emz.jpg,洗消站
image182.emz.jpg,要點
image183.emz.jpg,部隊佔領(集結)地域
image184.emz.jpg,伏擊地區
image185.emz.jpg,進攻(反衝擊)方向
image186.emz.jpg,陸基彈道近程導彈
image187.emz.jpg,陸基巡航近程導彈
image188.emz.jpg,陸基中程核導彈
image189.emz.jpg,預備隊(圈內標註單位)
image190.emz.jpg,電子對抗兵群
image191.emz.jpg,穿插部(分)隊
image192.emz.jpg,運動保障隊
image193.emz.jpg,工程破障隊
image194.emz.jpg,工程設障隊
image195.emz.jpg,分隊(輔助)進攻方向
image196.emz.jpg,摩托化行軍縱隊
image197.emz.jpg,履帶行軍縱隊
image198.emz.jpg,空中輸送
image199.emz.jpg,水路輸送
image200.emz.jpg,公路輸送
image201.emz.jpg,部(分)隊
image202.emz.jpg,聯合部隊
image203.emz.jpg,機降分隊
image204.emz.jpg,反裝甲隊(標示砲兵)
image205.emz.jpg,砲火禁射區
image206.emz.jpg,步兵疏散隊形
image207.emz.jpg,進攻隊形(標示步兵)
image208.emz.jpg,步坦一線進攻隊形
image209.emz.jpg,坦克和步戰車一線進攻隊形
image210.emz.jpg,由進攻轉防禦
image211.emz.jpg,聯合火力封鎖區
image212.emz.jpg,當前任務線
image213.emz.jpg,後續任務線
image214.emz.jpg,電子干擾壓制區
image215.emz.jpg,無緣干擾走廊
image216.emz.jpg,海軍基地
image217.emz.jpg,導彈艇基地
image218.emz.jpg,海上待機點(標示為導彈艇)
image219.emz.jpg,海上布雷
image220.emz.jpg,艦艇編隊
image221.emz.jpg,登陸地段和登陸點
image222.emz.jpg,水雷
image223.emz.jpg,防步兵雷
image224.emz.jpg,防坦克雷
image225.emz.jpg,修理廠
image226.emz.jpg,機場(四級)
image227.emz.jpg,機場(三級)
image228.emz.jpg,機場(二級)
image229.emz.jpg,機場(一級)
image230.emz.jpg,野戰機場
image231.emz.jpg,後方保障部(分)隊、群
image232.emz.jpg,保障基地(標示裝備)
image233.emz.jpg,油料庫
image234.emz.jpg,器材庫
image235.emz.jpg,軍械庫
image236.emz.jpg,導彈發射場坪
image237.emz.jpg,空中巡邏
image238.emz.jpg,航空兵突擊方向
image239.emz.jpg,航空兵突擊目標
image240.emz.jpg,空中直接支援地(海)面戰鬥
image241.emz.jpg,直升機攻擊方向
image242.emz.jpg,傷員集中點
image243.emz.jpg,導彈發射井
image244.emz.jpg,醫院
image245.emz.jpg,救護所
image246.emz.jpg,導彈連
image247.emz.jpg,導彈營
image248.emz.jpg,導彈旅
image249.emz.jpg,彈藥囤積點
image250.emz.jpg,合成第8旅指揮所
image251.emz.jpg,合成第8旅後方指揮所
image252.emz.jpg,第81集團軍裝備指揮所
image253.emz.jpg,東部戰區聯合指揮所
image254.emz.jpg,第1營指揮觀察所
image255.emz.jpg,砲兵連指揮觀察所
image256.emz.jpg,第5合成營觀察所
image257.emz.jpg,工程兵預備隊
image258.emz.jpg,第4集團軍後勤指揮所
image259.emz.jpg,砲兵第3營預備指揮所
image260.emz.jpg,集團聯合指揮所
image261.emz.jpg,多級指揮所(第73集團軍、第86合成旅)
image262.emz.jpg,多級指揮所(東部戰區、第71集團軍、空7旅)
image263.emz.jpg,佔領陣地砲兵群
image264.emz.jpg,佔領陣地砲兵營
image265.emz.jpg,佔領陣地砲兵連
image266.emz.jpg,反坦克預備隊
image267.emz.jpg,戰鬥預備隊
image268.emz.jpg,直升機機降地域(運輸機)
image269.emz.jpg,直升經起降場(運輸機)
image270.emz.jpg,混合地雷場
image271.emz.jpg,佔領陣地防空兵群
image272.emz.jpg,地空導彈連陣地
image273.emz.jpg,導彈飛行走廊
image274.emz.jpg,第3合成營伏擊地區
image275.emz.jpg,坦克修理廠`;

// --- 文字題庫資料 (共 147 筆) ---
const textCSV = `陸軍,LJ
海軍,H
空軍,K
戰區,ZQ
集團軍,JTJ
軍,J
師,S
旅,U
團,T
群,Q
營,Y
連,L
排,P
班,B
合成,HC
裝甲兵,ZJ
機械化步兵,JH
摩托化步兵,MH
砲兵,PB
航空兵,HK
防空兵,FK
通信兵,TX
特種兵,TZ
空降兵,KJ
防化兵,FH
工程兵,GC
工兵,G
偵察兵,ZC
組,Z
綜合,Z
司令部,SL
司令員,SLY
保障部,BZB
基地,JD
安裝,AZ
爆破,BP
破障,PZ
混編,HB
分隊,FD
梯隊,TD
坦克,TK
榴彈砲,LP
高射砲,GP
高射機槍,GSJ
迫擊砲,PP
加農榴彈砲,JLP
東部戰區(陸軍裝備上),LD
武警,WJ
民兵,MB
陸軍航空兵,LH
聯勤,LQ
海軍航空兵,HH
航空母艦,HM
艦艇,JIT
艦隊,JD
佈雷,BL
場站,CZ
殲擊,JJ
轟炸,HZ
加油機,JY
直升機,ZS
預警機,YJJ
無人機,WRJ
電子,DZ
道橋,DQ
密鑰,MY
南部戰區(陸軍裝備上),LN
西部戰區(陸軍裝備上),LX
北部戰區(陸軍裝備上),LB
中部戰區(陸軍裝備上),LZ
聯合,LHE
先遣,XQ
攻擊,GJ
佯動,YD
佯攻,YG
破障,PZ
獨立,DL
後方,HF
防衛,FW
掩護,YH
預警,YJ
打擊,DJ
伏擊,FJ
襲擊,XJ
破擊,PJ
頻譜管制,PG
氣象水文,QS
衛戍區,WSQ
指揮所,ZHS
運輸,YS
後勤,HQ
勤務,QW
兩棲,LIQ
輕型坦克,QTK
裝甲步兵,ZJB
裝甲,ZJH
導彈,DAD
通信,TOX
空降,KOJ
航空,HAK
轟炸,HZ
激動,JDO
守備,SB
陸戰隊,LZD
火箭軍,HJJ
衛星,WEX
雷達,LED
保障,BAZ
政治部,ZZB
政治工作部,ZGB
救援,JYU
防疫,FAY
火力支援隊,HZD
觀通站,GTZ
預備隊,YBD
搶修隊,QXD
偵察,ZCH
電子偵察,DZZ
封控,FEK
防化,FAH
裝載,ZHZ
舟橋,ZHQ
狙擊,JUJ
反坦克導彈,FTD
地空導彈,DKD
導彈艇,DDT
登陸艦,DLJ
登陸艇,DLT
氣墊船,QDC
驅逐艦,QZJ
護衛艦,HWJ
護衛艇,HWT
掩護群,YHQ
信息戰,XXZ
信息作戰,XZZ
技術勤務,JSQ
收容隊,SRD
法律戰,FLZ
封鎖,FES
第10集團軍,10JTJ
合成第22旅,22HCU
合成第1營,1HCY
坦克第3連,3TKL
砲兵第2營,2PBY
通信第1連,1TXL
機械化步兵第102營,102JHY
裝備第1營,1ZBY
防空第3群,3FKQ
陸戰第1旅,1LZU
心理戰,XLZ
旅預備隊,UYBD
旅砲兵營,UPBY
防空兵群,FKBQ
破障分隊,PZFD
防空第1旅,1FAKU
導彈第14旅,14DADU
特種作戰第8旅,8TZZU
特種作戰集團,TZZJT
加農砲營,JPBY
搶救,QIJ`;

const parseCSV = (csvStr: string, type: string): QuizItem[] => {
  return csvStr
    .trim()
    .split("\n")
    .map((line: string) => {
      const parts = line.split(",");
      if (parts.length >= 2) {
        return {
          questionContext: parts[0].trim(),
          answer: parts[1].trim(),
          qType: type,
        } as QuizItem;
      }
      return null;
    })
    .filter((item: any): item is QuizItem => item !== null);
};

const fullImageBank: QuizItem[] = parseCSV(imageCSV, "image");
const fullTextBank: QuizItem[] = parseCSV(textCSV, "text");

const shuffleArray = (array: any[]): any[] =>
  [...array].sort(() => 0.5 - Math.random());

// 相似關鍵字分析池
const SIMILARITY_KEYWORDS = [
  "指揮所",
  "直升機",
  "防空",
  "登陸",
  "坦克",
  "導彈",
  "飛彈",
  "雷達",
  "機",
  "砲",
  "艦",
  "艇",
  "車",
  "營",
  "連",
  "旅",
  "軍",
  "兵",
  "站",
  "所",
  "雷",
];

export default function App() {
  const [currentView, setCurrentView] = useState<string>("menu");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [wrongRecords, setWrongRecords] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [selectedCount, setSelectedCount] = useState<string>("25");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [isGameMode, setIsGameMode] = useState<boolean>(false);
  const [isHardcore, setIsHardcore] = useState<boolean>(false);
  const [playerHP, setPlayerHP] = useState<number>(100);
  const [monsterLevel, setMonsterLevel] = useState<number>(1);
  const [monsterMaxHP, setMonsterMaxHP] = useState<number>(1);
  const [monsterCurrentHP, setMonsterCurrentHP] = useState<number>(1);
  const [gameStatus, setGameStatus] = useState<string>("playing");
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [isElite, setIsElite] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const [learningTab, setLearningTab] = useState<string>("image");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const startQuiz = (
    mode: string,
    isGame: boolean = false,
    isHardcoreMode: boolean = false
  ) => {
    let rawData: QuizItem[] = [];
    if (mode === "image") rawData = [...fullImageBank];
    else if (mode === "text") rawData = [...fullTextBank];
    else if (mode === "mixed") rawData = [...fullImageBank, ...fullTextBank];

    let shuffledData = shuffleArray(rawData);

    if (isGame || isHardcoreMode) {
      shuffledData = shuffledData.slice(0, 100);
    } else if (selectedCount !== "all") {
      const count = parseInt(selectedCount, 10);
      shuffledData = shuffledData.slice(0, count);
    }

    const preparedQuestions = shuffledData.map(
      (item: QuizItem, index: number) => {
        const isReversed = Math.random() > 0.5;
        const pool = item.qType === "image" ? fullImageBank : fullTextBank;
        let similarItems = pool;

        if (isHardcoreMode) {
          const matchedKeyword = SIMILARITY_KEYWORDS.find(
            (kw: string) => item.answer.indexOf(kw) !== -1
          );
          if (matchedKeyword) {
            similarItems = pool.filter(
              (x: QuizItem) => x.answer.indexOf(matchedKeyword) !== -1
            );
          }
        }

        let validItems = similarItems.filter(
          (x: QuizItem) => x.answer !== item.answer
        );

        // 使用 indexOf 確保相容性
        if (validItems.length < 3) {
          const others = pool.filter(
            (x: QuizItem) =>
              x.answer !== item.answer && validItems.indexOf(x) === -1
          );
          validItems = [...validItems, ...others];
        }

        const chosenDistractors = shuffleArray(validItems).slice(0, 3);

        const correctOpt = isReversed ? item.questionContext : item.answer;
        const distractorOpts = chosenDistractors.map((d: any) =>
          isReversed ? d.questionContext : d.answer
        );

        const options = shuffleArray([correctOpt, ...distractorOpts]);

        return {
          id: index + 1,
          originalQ: item.questionContext,
          originalA: item.answer,
          displayQuestion: isReversed ? item.answer : item.questionContext,
          correctAnswer: correctOpt,
          options: options,
          type: item.qType,
          isReversed: isReversed,
        };
      }
    );

    setQuizData(preparedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setWrongRecords([]);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCombo(0);
    setMaxCombo(0);

    setIsGameMode(isGame);
    setIsHardcore(isHardcoreMode);

    if (isGame) {
      setPlayerHP(100);
      setMonsterLevel(1);
      setMonsterMaxHP(1);
      setMonsterCurrentHP(1);
      setGameStatus("playing");
      setIsElite(false);
      setTimeLeft(10);
    }

    setCurrentView("quiz");
  };

  useEffect(() => {
    if (
      isGameMode &&
      isElite &&
      !isAnswered &&
      gameStatus === "playing" &&
      timeLeft > 0
    ) {
      const timer = setTimeout(
        () => setTimeLeft((prev: number) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (
      isGameMode &&
      isElite &&
      !isAnswered &&
      gameStatus === "playing" &&
      timeLeft === 0
    ) {
      handleTimeOut();
    }
  }, [timeLeft, isGameMode, isElite, isAnswered, gameStatus]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedAnswer("⏳ 超時未答");
    setWrongRecords((prev: any[]) => [
      ...prev,
      {
        originalQ: quizData[currentQuestion].originalQ,
        originalA: quizData[currentQuestion].originalA,
        displayQuestion: quizData[currentQuestion].displayQuestion,
        correctAnswer: quizData[currentQuestion].correctAnswer,
        yourAnswer: "⏳ 超時未答",
        type: quizData[currentQuestion].type,
        isReversed: quizData[currentQuestion].isReversed,
      },
    ]);
    triggerDamage();
  };

  const triggerDamage = () => {
    setCombo(0);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    const damage = isElite ? 30 : 15;
    setPlayerHP((prev: number) => {
      const newHP = prev - damage;
      if (newHP <= 0) {
        setGameStatus("gameover");
        return 0;
      }
      return newHP;
    });
  };

  const advanceToNext = (currentIndex: number) => {
    const nextQ = currentIndex + 1;
    if (nextQ < quizData.length) {
      setCurrentQuestion(nextQ);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setTimeLeft(10);
    } else {
      if (isGameMode && gameStatus !== "gameover") setGameStatus("victory");
      setCurrentView("result");
    }
  };

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === quizData[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev: number) => prev + 1);
      if (isGameMode) {
        setCombo((prevCombo: number) => {
          const newCombo = prevCombo + 1;
          if (newCombo > maxCombo) setMaxCombo(newCombo);
          if (newCombo % 20 === 0) {
            setPlayerHP((prevHP: number) => Math.min(100, prevHP + 10));
          }
          return newCombo;
        });

        setMonsterCurrentHP((prev: number) => {
          const newMonsterHP = prev - 1;
          if (newMonsterHP <= 0) {
            setMonsterLevel((prevLvl: number) => {
              const nextLevel = prevLvl + 1;
              const nextIsElite = nextLevel % 10 === 0;
              setIsElite(nextIsElite);
              setMonsterMaxHP(nextIsElite ? 3 : 1);
              return nextLevel;
            });
            return isElite ? 3 : 1;
          }
          return newMonsterHP;
        });
      }

      setTimeout(() => {
        setCurrentQuestion((prev: number) => {
          const nextQ = prev + 1;
          if (nextQ < quizData.length) {
            setIsAnswered(false);
            setSelectedAnswer(null);
            setTimeLeft(10);
            return nextQ;
          } else {
            if (isGameMode && gameStatus !== "gameover")
              setGameStatus("victory");
            setCurrentView("result");
            return prev;
          }
        });
      }, 1000);
    } else {
      setWrongRecords((prev: any[]) => [
        ...prev,
        {
          originalQ: quizData[currentQuestion].originalQ,
          originalA: quizData[currentQuestion].originalA,
          displayQuestion: quizData[currentQuestion].displayQuestion,
          correctAnswer: quizData[currentQuestion].correctAnswer,
          yourAnswer: option,
          type: quizData[currentQuestion].type,
          isReversed: quizData[currentQuestion].isReversed,
        },
      ]);
      if (isGameMode) triggerDamage();
    }
  };

  const handleManualNextQuestion = () => {
    advanceToNext(currentQuestion);
  };

  const backToMenu = () => {
    setCurrentView("menu");
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const getTitle = () => {
    if (score < 20) return "二兵 (菜鳥體驗中)";
    if (score < 40) return "下士班長 (漸入佳境)";
    if (score < 60) return "少尉排長 (小有成就)";
    if (score < 80) return "上尉連長 (戰術專家)";
    if (score < 95) return "中校營長 (身經百戰)";
    if (score < 100) return "少將旅長 (運籌帷幄)";
    return "🎖️ 總司令 (共軍編裝大師) 🎖️";
  };

  const copyBattleReport = () => {
    const report = `⚔️ 共軍編裝測驗戰報 ⚔️\n🎯 最終存活血量：${playerHP}/100\n👾 擊退怪物：Lv.${
      monsterLevel - 1
    }\n🎖️ 獲得軍階：${getTitle()}\n🔥 最高連擊：${maxCombo} 題\n快來挑戰我的紀錄吧！`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(report)
        .then(() => {
          alert("✅ 戰報已成功複製到剪貼簿！快去貼給同學看吧！");
        })
        .catch(() => {
          alert("複製失敗，請手動圈選文字複製。");
        });
    } else {
      alert("您的瀏覽器不支援自動複製，請手動截圖分享！");
    }
  };

  if (currentView === "learning") {
    const displayData = learningTab === "image" ? fullImageBank : fullTextBank;
    const filteredData = displayData.filter(
      (item: QuizItem) =>
        item.questionContext
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) !== -1 ||
        item.answer.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );

    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "sans-serif",
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={backToMenu}
            style={{
              cursor: "pointer",
              padding: "8px 15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#f8f9fa",
              fontWeight: "bold",
            }}
          >
            ← 返回首頁
          </button>
          <h2 style={{ margin: 0, color: "#333" }}>📚 題庫學習系統</h2>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => setLearningTab("image")}
            style={{
              flex: 1,
              padding: "12px",
              cursor: "pointer",
              backgroundColor: learningTab === "image" ? "#007bff" : "#e9ecef",
              color: learningTab === "image" ? "white" : "#333",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            圖片題庫 ({fullImageBank.length})
          </button>
          <button
            onClick={() => setLearningTab("text")}
            style={{
              flex: 1,
              padding: "12px",
              cursor: "pointer",
              backgroundColor: learningTab === "text" ? "#28a745" : "#e9ecef",
              color: learningTab === "text" ? "white" : "#333",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            文字題庫 ({fullTextBank.length})
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 搜尋解答名稱或題目..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredData.map((item: QuizItem, index: number) => (
            <div
              key={index}
              style={{
                border: "1px solid #dee2e6",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {item.qType === "image" ? (
                <div
                  style={{
                    height: "180px",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    padding: "10px",
                  }}
                >
                  <img
                    src={`/image/${item.questionContext}`}
                    alt="題目圖片"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/300x180/dc3545/ffffff?text=圖片載入失敗`;
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e9ecef",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
                    {item.questionContext}
                  </h3>
                </div>
              )}
              <div
                style={{
                  padding: "20px 15px",
                  borderTop: "1px solid #dee2e6",
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#28a745",
                    textAlign: "center",
                  }}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredData.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#6c757d",
              fontSize: "18px",
            }}
          >
            找不到符合的題目
          </div>
        )}
      </div>
    );
  }

  if (currentView === "menu") {
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          fontFamily: "sans-serif",
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
        }}
      >
        <style>
          {`
            .menu-btn { transition: transform 0.1s, box-shadow 0.2s; }
            .menu-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.15) !important; }
            .menu-btn:active { transform: translateY(1px); }
          `}
        </style>
        <h1
          style={{
            color: "#333",
            marginBottom: "40px",
            fontSize: "32px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          共軍編裝測驗系統
        </h1>

        <div
          style={{
            marginBottom: "30px",
            padding: "25px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            maxWidth: "450px",
            margin: "0 auto 30px auto",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#555",
              borderBottom: "2px solid #007bff",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            設定一般測驗題數
          </h3>
          <select
            value={selectedCount}
            onChange={(e: any) => setSelectedCount(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "15px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="25">25 題</option>
            <option value="50">50 題</option>
            <option value="100">100 題</option>
            <option value="all">全部題目</option>
          </select>
          <p style={{ fontSize: "12px", color: "#888", marginTop: "10px" }}>
            * 特殊模式固定為隨機 100 題挑戰
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          <button
            className="menu-btn"
            onClick={() => startQuiz("image", false, false)}
            style={{
              padding: "15px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,123,255,0.3)",
              fontWeight: "bold",
            }}
          >
            裝備與戰術符號識別 (正反混測)
          </button>
          <button
            className="menu-btn"
            onClick={() => startQuiz("text", false, false)}
            style={{
              padding: "15px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(40,167,69,0.3)",
              fontWeight: "bold",
            }}
          >
            單位名詞與縮寫測驗 (正反混測)
          </button>
          <button
            className="menu-btn"
            onClick={() => startQuiz("mixed", false, false)}
            style={{
              padding: "15px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#6f42c1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(111,66,193,0.3)",
              fontWeight: "bold",
            }}
          >
            綜合測驗 (圖片 + 文字混合)
          </button>

          <div
            style={{ margin: "10px 0", borderBottom: "2px dashed #ccc" }}
          ></div>

          <button
            className="menu-btn"
            onClick={() => startQuiz("mixed", true, false)}
            style={{
              padding: "20px",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(220,53,69,0.4)",
              fontWeight: "bold",
            }}
          >
            ⚔️ RPG 破關模式 (隨機 100 題挑戰)
          </button>

          <button
            className="menu-btn"
            onClick={() => startQuiz("mixed", false, true)}
            style={{
              padding: "20px",
              fontSize: "20px",
              cursor: "pointer",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(23,162,184,0.4)",
              fontWeight: "bold",
            }}
          >
            🔥 專家地獄特訓 (同類別高度相似)
          </button>

          <div
            style={{ margin: "10px 0", borderBottom: "2px dashed #ccc" }}
          ></div>

          <button
            className="menu-btn"
            onClick={() => setCurrentView("learning")}
            style={{
              padding: "15px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#ffc107",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(255,193,7,0.3)",
              fontWeight: "bold",
            }}
          >
            📚 學習系統 (題庫總覽)
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "result") {
    return (
      <div
        style={{
          padding: "40px 20px",
          fontFamily: "sans-serif",
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: "30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: isGameMode && gameStatus === "gameover" ? "#dc3545" : "#333",
            fontSize: "32px",
          }}
        >
          {isGameMode
            ? gameStatus === "gameover"
              ? "💀 戰死沙場 (血量歸零)"
              : "🏆 成功稱霸題庫！"
            : "測驗結束！"}
        </h2>

        <div
          style={{
            textAlign: "center",
            margin: "30px 0",
            padding: "30px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
          }}
        >
          {(isGameMode || isHardcore) && (
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{ fontSize: "16px", color: "#666", margin: "0 0 5px 0" }}
              >
                榮譽稱號
              </p>
              <h3 style={{ fontSize: "28px", color: "#ff8c00", margin: 0 }}>
                {getTitle()}
              </h3>
            </div>
          )}

          <p style={{ fontSize: "20px", margin: "0 0 10px 0", color: "#555" }}>
            總答對題數
          </p>
          <p
            style={{
              fontSize: "48px",
              color: "#007bff",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {score}{" "}
            <span style={{ fontSize: "24px", color: "#6c757d" }}>
              / {quizData.length}
            </span>
          </p>

          {isGameMode && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
                borderTop: "1px dashed #ccc",
                paddingTop: "20px",
              }}
            >
              <div>
                <p style={{ margin: "0 0 5px 0", color: "#666" }}>擊殺怪物</p>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#dc3545",
                  }}
                >
                  {monsterLevel - 1}
                </span>
              </div>
              <div>
                <p style={{ margin: "0 0 5px 0", color: "#666" }}>最高連擊</p>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#28a745",
                  }}
                >
                  {maxCombo}
                </span>
              </div>
              <div>
                <p style={{ margin: "0 0 5px 0", color: "#666" }}>剩餘血量</p>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#17a2b8",
                  }}
                >
                  {playerHP}
                </span>
              </div>
            </div>
          )}
        </div>

        {(isGameMode || isHardcore) && (
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <button
              onClick={copyBattleReport}
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                cursor: "pointer",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(40,167,69,0.3)",
              }}
            >
              📋 複製戰績與朋友分享
            </button>
          </div>
        )}

        {/* --- 升級版的錯題檢討區 --- */}
        {wrongRecords.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3
              style={{
                color: "#dc3545",
                borderBottom: "2px solid #dc3545",
                paddingBottom: "10px",
              }}
            >
              錯題檢討區 ({wrongRecords.length} 題)
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              {wrongRecords.map((record: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: "15px",
                    border: "1px solid #f5c6cb",
                    borderRadius: "8px",
                    backgroundColor: "#f8d7da",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#721c24",
                      fontSize: "18px",
                    }}
                  >
                    {record.type === "image" ? `圖片題` : `文字題`}{" "}
                    {record.isReversed ? "(依名稱選圖片)" : ""}
                  </div>

                  {record.type === "image" ? (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        borderRadius: "8px",
                        display: "inline-block",
                        border: "1px solid #dee2e6",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={`/image/${record.originalQ}`}
                        alt="錯題圖片"
                        style={{
                          maxHeight: "150px",
                          objectFit: "contain",
                          borderRadius: "4px",
                          display: "block",
                          margin: "0 auto",
                        }}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/150x100/dc3545/ffffff?text=圖片載入失敗`;
                        }}
                      />
                      <div
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          marginTop: "8px",
                          color: "#333",
                          fontSize: "16px",
                        }}
                      >
                        {record.originalA}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6",
                        marginBottom: "10px",
                        color: "#333",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {record.originalQ} ＝ {record.originalA}
                    </div>
                  )}

                  <div
                    style={{
                      color: "#721c24",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>您的錯誤作答：</span>
                    {record.type === "image" &&
                    record.isReversed &&
                    record.yourAnswer !== "⏳ 超時未答" ? (
                      <span
                        style={{
                          border: "2px solid #dc3545",
                          borderRadius: "4px",
                          padding: "4px",
                          backgroundColor: "#fff",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={`/image/${record.yourAnswer}`}
                          style={{ maxHeight: "80px", opacity: 0.7 }}
                          alt="錯誤選項"
                        />
                      </span>
                    ) : (
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontSize: "16px",
                        }}
                      >
                        {record.yourAnswer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={backToMenu}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#343a40",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            }}
          >
            返回系統首頁
          </button>
        </div>
      </div>
    );
  }

  const currentQData = quizData[currentQuestion];
  const isWrongAnswerSelected =
    isAnswered && selectedAnswer !== currentQData.correctAnswer;

  return (
    <div
      className={isShaking ? "shake-animation" : ""}
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "20px auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s",
      }}
    >
      <style>
        {`
          @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
          }
          .shake-animation { animation: shake 0.5s; background-color: #fff0f0 !important; }
          @keyframes pulse-glow {
            0% { box-shadow: 0 0 10px #ffd700; border-color: #ffd700; }
            50% { box-shadow: 0 0 25px #ff8c00, 0 0 15px #ff8c00; border-color: #ff8c00; }
            100% { box-shadow: 0 0 10px #ffd700; border-color: #ffd700; }
          }
          .combo-glow { animation: pulse-glow 1.5s infinite; }
        `}
      </style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        <button
          onClick={backToMenu}
          style={{
            cursor: "pointer",
            padding: "8px 15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#f8f9fa",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          ← 結束
        </button>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#007bff",
            backgroundColor: "#e9ecef",
            padding: "5px 15px",
            borderRadius: "20px",
          }}
        >
          題目進度：{currentQuestion + 1} / {quizData.length}
        </div>
      </div>

      {isGameMode && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            backgroundColor: isElite ? "#4a0000" : "#343a40",
            padding: "15px",
            borderRadius: "10px",
            color: "white",
            border: isElite ? "2px solid #dc3545" : "none",
            transition: "all 0.3s",
          }}
        >
          {isElite ? (
            <div
              style={{
                fontSize: "14px",
                color: "#ffcccc",
                marginBottom: "12px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              ⚠️ 警告：遭遇菁英怪！限時{" "}
              <span style={{ fontSize: "18px" }}>{timeLeft}</span>{" "}
              秒，傷害加倍！
            </div>
          ) : (
            <div
              style={{
                fontSize: "13px",
                color: combo >= 10 ? "#ffd700" : "#ffc107",
                marginBottom: "12px",
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              {combo >= 10
                ? `🔥 狂熱狀態！${combo} 連擊！`
                : `💡 連續答對 20 題恢復 10 點血量 (目前連擊: ${combo})`}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "45%" }}>
              <div
                style={{
                  marginBottom: "5px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                🧑 玩家血量 (HP: {playerHP})
              </div>
              <div
                style={{
                  width: "100%",
                  height: "15px",
                  backgroundColor: "#495057",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.max(0, playerHP)}%`,
                    height: "100%",
                    backgroundColor: playerHP > 30 ? "#28a745" : "#dc3545",
                    transition: "width 0.3s",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                alignSelf: "center",
                color: isElite ? "#dc3545" : "#fff",
              }}
            >
              VS
            </div>
            <div style={{ width: "45%", textAlign: "right" }}>
              <div
                style={{
                  marginBottom: "5px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: isElite ? "#ffcccc" : "#fff",
                }}
              >
                {isElite ? "👑 菁英" : "👾 Lv."}
                {monsterLevel} 怪物 (HP: {monsterCurrentHP}/{monsterMaxHP})
              </div>
              <div
                style={{
                  width: "100%",
                  height: "15px",
                  backgroundColor: "#495057",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transform: "rotate(180deg)",
                }}
              >
                <div
                  style={{
                    width: `${(monsterCurrentHP / monsterMaxHP) * 100}%`,
                    height: "100%",
                    backgroundColor: isElite ? "#ff8c00" : "#dc3545",
                    transition: "width 0.3s",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 題目區 */}
      <div
        className={isGameMode && combo >= 10 ? "combo-glow" : ""}
        style={{
          margin: "20px auto",
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #ced4da",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "12px",
          transition: "all 0.3s",
        }}
      >
        {currentQData.type === "image" && !currentQData.isReversed ? (
          <img
            src={`/image/${currentQData.displayQuestion}`}
            alt="題目圖片"
            style={{
              maxWidth: "100%",
              maxHeight: "350px",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/400?text=圖片載入失敗`;
            }}
          />
        ) : (
          <h2
            style={{
              margin: 0,
              textAlign: "center",
              color: "#212529",
              fontSize: "36px",
              letterSpacing: "2px",
            }}
          >
            {currentQData.displayQuestion}
          </h2>
        )}
      </div>

      {/* 選項區 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        {currentQData.options.map((option: string, index: number) => {
          let bgColor = "#ffffff";
          let textColor = "#333333";
          let borderColor = "#ced4da";
          let cursorStyle = "pointer";

          if (isAnswered || (isGameMode && gameStatus === "gameover")) {
            cursorStyle = "default";
            if (option === currentQData.correctAnswer) {
              bgColor = "#28a745";
              textColor = "#ffffff";
              borderColor = "#28a745";
            } else if (option === selectedAnswer) {
              bgColor = "#dc3545";
              textColor = "#ffffff";
              borderColor = "#dc3545";
            } else {
              bgColor = "#f8f9fa";
              textColor = "#adb5bd";
              borderColor = "#e9ecef";
            }
          }

          const isImageOption =
            currentQData.type === "image" && currentQData.isReversed;

          return (
            <button
              key={index}
              style={{
                padding: isImageOption ? "10px" : "18px",
                fontSize: "18px",
                cursor: cursorStyle,
                border: `2px solid ${borderColor}`,
                borderRadius: "8px",
                backgroundColor: bgColor,
                color: textColor,
                fontWeight:
                  isAnswered &&
                  (option === currentQData.correctAnswer ||
                    option === selectedAnswer)
                    ? "bold"
                    : "normal",
                boxShadow: isAnswered ? "none" : "0 2px 4px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: isImageOption ? "150px" : "auto",
              }}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered || (isGameMode && gameStatus === "gameover")}
            >
              {isImageOption ? (
                <img
                  src={`/image/${option}`}
                  alt="選項圖片"
                  style={{
                    maxHeight: "130px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/150?text=圖片載入失敗`;
                  }}
                />
              ) : (
                option
              )}
            </button>
          );
        })}
      </div>

      {(isWrongAnswerSelected || (isGameMode && gameStatus === "gameover")) && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          {isGameMode && gameStatus === "gameover" ? (
            <button
              onClick={() => setCurrentView("result")}
              style={{
                padding: "15px 40px",
                fontSize: "20px",
                cursor: "pointer",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(220,53,69,0.4)",
              }}
            >
              查看戰鬥結算 ➔
            </button>
          ) : (
            <button
              onClick={handleManualNextQuestion}
              style={{
                padding: "15px 40px",
                fontSize: "20px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0,123,255,0.4)",
              }}
            >
              {currentQuestion + 1 < quizData.length
                ? "繼續推進 ➔"
                : "查看測驗結果"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
