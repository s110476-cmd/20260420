let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  
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
  image(capture, x, y, videoW, videoH);
}

// 當視窗大小改變時，自動更新畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
