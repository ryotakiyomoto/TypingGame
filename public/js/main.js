'use strict';

{
 const words = [
   'apple',
   'sky',
   'blue',
   'middle',
   'set',
];

   let word;

   // 変数を宣言
   let loc;
   let score;
   let miss;
   // javaScriptでは、時間はミリ秒で扱うため、
   const timeLimit = 3 * 1000;
   let startTime;
   let isPlaying = false;

   const target = document.getElementById('target');
   const scoreLabel = document.getElementById('score');
   const missLabel = document.getElementById('miss');
   const timerLabel = document.getElementById('timer');

   function updateTarget() {
     let placeholder = '';
     for (let i = 0; i < loc; i++) {
       placeholder += '_';
     }
     target.textContent = placeholder + word.substring(loc);
   }

   function showResult() {
     const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
     alert(`$(score) letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
   }

   function updateTimer() {

     const timeLeft = startTime + timeLimit - Date.now();

     timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
        updateTimer();
     }, 10);

     if (timeLeft < 0) {
       isPlaying = false;
       clearTimeout(timeoutId);
       setTimeout(() => {
         showResult();
       }, 100);

       timerLabel.textContent = '0.00';
       target.textContent = 'click to replay';
     }
   }

    // windowがクリックされた時
   window.addEventListener('click', () => {
     if (isPlaying === true) {
       return;
     }
     isPlaying = true;

     loc = 0;
     score = 0;
     miss = 0;
     scoreLabel.textContent = score;
     missLabel.textContent = miss;
     word = words[Math.floor(Math.random() * words.length)];

     updateTarget();
     startTime = Date.now();
     updateTimer();
   });

  // keyをクリックして、upした時。
  window.addEventListener('keyup', e => {
   if (isPlaying !== true) {
     return;
   }
      // e.keyと、word[loc]が合致しているか確認する。
   if (e.key === word[loc]) {
     loc++;

     if (loc === word.length) {
       word = words[Math.floor(Math.random() * words.length)];
       loc = 0;
     }

     score++;
     scoreLabel.textContent = score;
     updateTarget();
   } else {
      miss++;
      missLabel.textContent = miss;
   }
  });

}
