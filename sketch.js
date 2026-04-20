let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定攝影機參數，增加行動裝置相容性
  let constraints = {
    video: {
      facingMode: "user" // 使用前鏡頭。若要使用後鏡頭請改為 "environment"
    },
    audio: false
  };

  // 擷取攝影機影像
  capture = createCapture(constraints);
  // 針對 iOS Safari 加入必要屬性，防止影片自動彈出全螢幕
  capture.elt.setAttribute('playsinline', '');
  
  // 隱藏預設產生的 HTML5 video 元件，只在畫布上顯示
  capture.hide();
}

function draw() {
  // 設定背景顏色為 e7c6ff
  background('#e7c6ff');
  
  // 計算影像顯示的寬度與高度 (全螢幕寬高的 60%)
  let videoW = width * 0.6;
  let videoH = height * 0.6;
  
  // 計算置中位置
  let x = (width - videoW) / 2;
  let y = (height - videoH) / 2;
  
  // 在畫布中央顯示攝影機影像
  push();
  translate(x + videoW, y); // 移至影像顯示區域的右上角
  scale(-1, 1);             // 水平鏡像翻轉
  image(capture, 0, 0, videoW, videoH);
  pop();
}

// 當視窗大小改變時，自動更新畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
