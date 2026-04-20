let capture;
let pg; // 宣告一個繪圖圖層物件 (p5.Graphics)

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 強制像素密度為 1，確保 capture.pixels 的索引計算在所有裝置上一致
  pixelDensity(1);
  
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
    // 如果圖層尚未建立，或大小與攝影機不符，則初始化圖層
    if (!pg || pg.width !== capture.width || pg.height !== capture.height) {
      pg = createGraphics(capture.width, capture.height);
    }

    pg.clear(); // 清除上一幀內容，保持背景透明
    
    // 載入攝影機像素資料
    capture.loadPixels();
    
    // 以 20x20 為單位遍歷影像
    for (let y = 0; y < capture.height; y += 20) {
      for (let x = 0; x < capture.width; x += 20) {
        // 計算該座標在 pixels 陣列中的索引位置 (r, g, b, a)
        let i = (x + y * capture.width) * 4;
        
        let r = capture.pixels[i];
        let g = capture.pixels[i + 1];
        let b = capture.pixels[i + 2];
        
        // 計算平均值 (pixel[0] + pixel[1] + pixel[2]) / 3
        let avg = Math.floor((r + g + b) / 3);

        // 將數值畫在 pg 圖層上
        pg.fill(255); // 白色文字
        pg.noStroke();
        pg.textSize(9);
        pg.textAlign(CENTER, CENTER);
        // 由於外部有 scale(-1, 1)，此處將文字個別翻轉回來以利閱讀
        pg.push();
        pg.translate(x + 10, y + 10);
        pg.scale(-1, 1);
        pg.text(avg, 0, 0);
        pg.pop();
      }
    }

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
    
    // 將繪圖圖層疊加在攝影機影像上方
    image(pg, 0, 0, finalW, finalH);
    pop();
  }
}

// 當視窗大小改變時，自動更新畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
