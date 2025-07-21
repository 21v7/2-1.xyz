<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>21's Portal</title>
  <style>
    body {
      margin: 0;
      background-color: #000000;
      color: white;
      font-family: Cambria, serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .main-content {
      text-align: center;
    }

    header img {
      width: 120px;
      height: auto;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    h1 {
      margin: 0 0 20px;
      font-size: 2.5em;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 15px;
      align-items: center;
      justify-content: center;
    }

    .btn {
      background-color: #4b0082;
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: Cambria, serif;
    }

    .btn:hover {
      background-color: #6a0dad;
      transform: scale(1.05);
    }

    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      background-color: #2e003e;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
      display: none;
      z-index: 10;
      animation: fadeIn 0.3s ease forwards;
      max-width: 90%;
      text-align: center;
    }

    .popup.active {
      display: block;
    }

    .popup h2 {
      margin-top: 0;
    }

    .popup button {
      margin-top: 15px;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: none;
      z-index: 5;
    }

    .overlay.active {
      display: block;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    a.telegram-link {
      display: inline-block;
      margin-top: 15px;
      padding: 10px 20px;
      background-color: #0088cc;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }

    .socials-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
    }

    .socials-container a {
      color: #c8a2c8;
      text-decoration: none;
      font-size: 16px;
      padding: 5px 10px;
      transition: color 0.3s ease;
    }

    .socials-container a:hover {
      color: #ffffff;
    }

    #stock {
      text-align: left;
      max-height: 70vh; 
      overflow-y: auto; 
    }

    .stock-box {
      background-color: #3a004a;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }

    .stock-box h3 {
      margin: 0 0 10px;
      color: #c8a2c8;
    }

    .stock-box p {
      margin: 0;
      line-height: 1.6;
    }
  </style>
</head>
<body>

  <div class="overlay" id="overlay" onclick="closePopup()"></div>

  <div class="main-content">
    <header>
      <img src="21.jpeg" alt="Logo">
      <h1>21's Portal</h1>
    </header>

    <div class="buttons">
      <button class="btn" onclick="openPopup('stock')">Stock</button>
      <button class="btn" onclick="openPopup('vouches')">Vouches</button>
    </div>
    <div class="socials-container">
      <p>Contact me: 
        <a href="https://www.instagram.com/7521" target="_blank">Instagram</a>
        <a href="https://t.me/id7321" target="_blank">Telegram</a>
        <a href="https://x.com/213333" target="_blank">X</a>
        <a href="https://oguser.com/TwentyOne" target="_blank">OGU</a>
      </p>
    </div>
  </div>

  <div class="popup" id="stock">
    <h2>Stock Actual</h2>
    <div class="stock-box">
      <h3>Instagram</h3>
      <p>
        @la1o current offer 100$<br>
        @mo4p 40$<br>
        @fdwb 40$<br>
        @f40m 35$<br>
        @yg0t 30$<br>
      </p>
    </div>
    <div class="stock-box">
      <h3>CapCut Usernames</h3>
      <p>$5 - $10 (oge / no # linked)</p>
      <h3>Emotions and Mental States</h3>
      <p>
        @antisociality<br>
        @awful<br>
        @delusional<br>
        @ecstasy<br>
        @emotion<br>
        @grateful<br>
        @impatient<br>
        @inferior<br>
        @irresponsible<br>
        @sore<br>
        @timid
      </p>
      <h3>Actions and Verbs</h3>
      <p>
        @adjust<br>
        @alter<br>
        @avoid<br>
        @clap<br>
        @clean<br>
        @crop<br>
        @grasp<br>
        @jailbreak<br>
        @reap<br>
        @talk<br>
        @thread<br>
        @tied
      </p>
      <h3>Concepts and Abstract Nouns</h3>
      <p>
        @Bankroll<br>
        @Boost<br>
        @burden<br>
        @color<br>
        @creature<br>
        @hazard<br>
        @heroism<br>
        @illegal<br>
        @offense<br>
        @orphan<br>
        @physic<br>
        @place<br>
        @producer<br>
        @rack<br>
        @ransom<br>
        @request<br>
        @riot<br>
        @sack<br>
        @science<br>
        @selfless<br>
        @spain<br>
        @spine<br>
        @stair<br>
        @stolen<br>
        @street<br>
        @supervillain<br>
        @tier<br>
        @tool<br>
        @topic<br>
        @turf<br>
        @want<br>
        @writer
      </p>
    </div>
    <a class="telegram-link" href="https://t.me/id7321" target="_blank">Contact me on Telegram</a>
  </div>

  <div class="popup" id="vouches">
    <h2>Vouches</h2>
    <p>We always try to provide the best stock and we provide the best and fast services, here you can check my deals with my customers</p>
    <a class="telegram-link" href="https://t.me/piratas" target="_blank">Check my vouches</a>
  </div>

  <script>
    function openPopup(id) {
      document.getElementById('overlay').classList.add('active');
      document.getElementById(id).classList.add('active');
    }

    function closePopup() {
      document.getElementById('overlay').classList.remove('active');
      document.querySelectorAll('.popup').forEach(p => p.classList.remove('active'));
    }
  </script>

</body>
</html>
