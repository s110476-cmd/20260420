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

  // 確保攝影機影像已經載入
  if (capture.width > 0) {
    // 計算最大可容納的範圍 (全螢幕寬高的 60%)
    let maxWidth = width * 0.6;
    let maxHeight = height * 0.6;

    // 自動計算縮放比例，以維持原始寬高比 (Aspect Ratio)
    // min 會確保影像縮放到「剛好碰觸到寬或高的邊界」而不會超過
    let scaleFactor = min(maxWidth / capture.width, maxHeight / capture.height);
    let finalW = capture.width * scaleFactor;
    let finalH = capture.height * scaleFactor;

    push();
    imageMode(CENTER);         // 設定圖片繪製基準點為中心
    translate(width / 2, height / 2); // 移至畫布中心
    
    // 修正左右顛倒：scale(-1, 1) 提供鏡像效果 (像照鏡子一樣)
    // 這樣當你舉起真實的左手，畫面上左邊的手也會舉起來
    scale(-1, 1); 

    // 繪製影像
    image(capture, 0, 0, finalW, finalH);
    pop();
  }
}

// 當視窗大小改變時，自動更新畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
