var nodejieba = require("nodejieba");

var sentence = "近日巴黎圣母院大火一直牵动了全世界很多人的心，虽然善后一直在持续，然而起火的原因也是大家关注的，" +
"近日有报道称延时摄影相机或提供“关键线索”，据法国一家在巴黎圣母院施工的脚手架企业18日说，一台火灾发生前数小时架设 " +
"的相机处于延时摄影状态，或许能提供帮助查找起火原因的关键线索。";

'。' 
[ { word: '巴黎圣母院', weight: 21.3636036542 },
  { word: '延时', weight: 20.7486342548 },
  { word: '相机', weight: 17.94684793364 },
  { word: '起火', weight: 17.38238299826 },
  { word: '摄影', weight: 16.28987087678 },
  { word: '线索', weight: 15.04790140816 },
  { word: '关键', weight: 12.24912434976 },
  { word: '近日', weight: 11.76212971516 },
  { word: '前数', weight: 11.739204307083542 },
  { word: '18', weight: 11.739204307083542 } ]

var result;

result = nodejieba.cut(sentence);
console.log(result);
// ['我','是','拖拉机','学院','手扶拖拉机','专业','的','。','不用','多久',',', '我','就','会','升职','加薪',

// '当','上','C','E','O','，','走上','人生','巅峰','。']

result = nodejieba.cut(sentence, true);
console.log(result);

result = nodejieba.cutHMM(sentence);
console.log(result);

result = nodejieba.cutAll(sentence);
console.log(result);

result = nodejieba.cutForSearch(sentence);
console.log(result);

// result = nodejieba.tag(sentence);
// console.log(result);
// console.log('=======');
// console.log(nodejieba.extractWithWords(nodejieba.tagWordsToStr(result), 5));
console.log(nodejieba.extract(sentence, 10));

// console.log(nodejieba.textRankExtractWithWords(nodejieba.tagWordsToStr(result), 5));
// console.log(nodejieba.textRankExtract(sentence, 5));
// console.log('=======');
// var topN = 5;
// result = nodejieba.extract(sentence, topN);
// console.log(result);

// result = nodejieba.cut("男默女泪");
// console.log(result);
// nodejieba.insertWord("男默女泪");
// result = nodejieba.cut("男默女泪");
// console.log(result);

// result = nodejieba.cutSmall("南京市长江大桥", 3);
// console.log(result);