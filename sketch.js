let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background('#e9edc9'); // 設定畫布顏色為 e9edc9

  // 計算顯示影像的寬高（全螢幕的 60%）
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;
  
  // 置中顯示影像
  image(capture, (width - vWidth) / 2, (height - vHeight) / 2, vWidth, vHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
