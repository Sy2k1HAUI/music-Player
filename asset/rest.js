/**
 * Render songs
 * Scroll top
 * Play/ pause/ seek
 * CD rotate
 * Next/ Prev
 * Random
 * Next/repeat when ended
 * Active song
 * Scroll active song into view
 * play song when click
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAY_STORAGE = 'MY_PLAYER';

const playlist = $('.playlist');
const cdThumb = $('.cd-thumb');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const audio = $('#audio');
const player = $('.player');
const heading = $('header h2');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAY_STORAGE)) || {},
    Songs :[
        {
          name: "Stay",
          singer: "Justin Bieber",
          path: "./asset/songs/Stay.mp3",
          image:
            "./asset/images/stay.jpg"
        },
        {
          name: "Kẻ theo đuổi ánh sáng",
          singer: "Huy Vạc",
          path: "./asset/songs/KeTheoDuoiAnhSang-HuyVac-7056896.mp3",
          image:
            "https://tungtang.com.vn/blog/wp-content/uploads/2021/10/ke-theo-duoi-anh-sang-tung-tang-1000x600.jpg"
        },
        {
          name: "Love yourself",
          singer: "Justin Bieber",
          path: "./asset/songs/Loveyourself.mp3",
          image:
            "./asset/images/JBLoveYS.jpg"
        },
        {
          name: "Peaches",
          singer: "Justin Bieber",
          path: "./asset/songs/Peaches.mp3",
          image:
            "./asset/images/JBPeaches.jpg"
        },
        {
          name: "Viva la vida (cover)",
          singer: "Janes Coller",
          path: "./asset/songs/VivalaVida.mp3",
          image:
            "./asset/images/vivavida.jpg"
        },
        {
          name: "Save me",
          singer: "Deamn",
          path: "./asset/songs/Saveme.mp3",
          image:
            "./asset/images/saveme.jpg"
        },
        {
          name: "Chỉ là muốn nói",
          singer: "Khải",
          path: "./asset/songs/ChiLaMuonNoi1-Khai-6992852.mp3",
          image:
            "https://i.ytimg.com/vi/eOHkG0MBB4Q/maxresdefault.jpg"
        },
        {
          name: "Đành vậy thôi",
          singer: "Reddy, Hữu Duy",
          path:
            "./asset/songs/DanhVayThoi-ReddyHuuDuy-6267935.mp3",
          image: "https://ss-images.saostar.vn/pc/1616251354670/saostar-9gxhfb7gr7l5boe5.jpg"
        },
        {
          name: "Gửi",
          singer: "Reddy",
          path: "./asset/songs/Gui-ReddyHuuDuy-5688174.mp3",
          image:
            "https://i.ytimg.com/vi/rSn1-EXQL-A/maxresdefault.jpg"
        },
        {
          name: "Chẳng ai yêu mãi một người",
          singer: "NB3, Hoài Bảo",
          path: "./asset/songs/ChangAiYeuMaiMotNguoi-NB3HoaiBaoDongDang-6915046.mp3",
          image: "https://avatar-ex-swe.nixcdn.com/song/2021/01/08/d/3/2/f/1610097310446_640.jpg"
        },
        {
          name: "Nợ ai đó lời xin lỗi",
          singer: "Bozzit",
          path:
            "./asset/songs/NoAiDoLoiXinLoi-Bozitt-6424600.mp3",
          image:
            "https://i.ytimg.com/vi/IPuIs-KILug/maxresdefault.jpg"
        },
        {
          name: "Vài giây nữa thôi",
          singer: "Reddy",
          path: "/asset/songs/VaiGiayNuaThoi-ReddyHuuDuy-5404370.mp3",
          image:
            "https://i.ytimg.com/vi/uxptYJP5MP4/maxresdefault.jpg"
        }
      ],
      setConfig: function (key, value) {
          this.config[key] = value;
          localStorage.setItem(PLAY_STORAGE, JSON.stringify(this.config));
      },
      //hàm render danh sách bài hát
      render: function () {
          const htmls = this.Songs.map((song, index) => {
            return `
            <div class="song  ${index === this.currentIndex ? 'active' : '' }" data-index = "${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                     <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
          })
          playlist.innerHTML = htmls.join('');
      },
      defineProperties: function() {
          Object.defineProperty(this, 'currentSong', {
              get: function() {
                  return this.Songs[this.currentIndex];
              }
          }) 
      },
      //hàm xử lí các sự kiện
      handleEvent: function () {
        // xử lí đĩa quay
        const animateCDthumb = cdThumb.animate([
           { transform: 'rotate(360deg)'},
        ], {
           duration:10000 ,
           iterations: Infinity
        });
        const _this = this;
        const cdWidth = cd.offsetWidth;
      // hàm xử lí scrollTop ( khi kéo playlist thì đĩa thu nhỏ rồi ẩn đi)
      document.onscroll = function() {
          const  scrollTop = window.scrollY || document.documentElement.scrollTop;
          const newCdWidth = cdWidth - scrollTop;
          cd.style.width = newCdWidth > 0 ? newCdWidth +'px' : 0;
          cd.style.opacity = newCdWidth / cdWidth ;
      }
      // hàm play bài hát
      playBtn.onclick = function() {
         if(_this.isPlaying) {
             audio.pause();
         }else {
           audio.play();
         }
      }
      // Bật bài hát
      audio.onplay = function() {
         _this.isPlaying = true;
         player.classList.add('playing');
         animateCDthumb.play();
      }
      //dừng bài hát
      audio.onpause = function() {
         _this.isPlaying = false;
         player.classList.remove('playing');
         animateCDthumb.pause();
      }
      // hàm xử lí thanh thời gian thay đổi khi bài hát bật 
      audio.ontimeupdate = function() {
         const progressPercent = Math.floor(audio.currentTime / audio.duration *100);
         progress.value = progressPercent;
         progress.style.background ='linear-gradient(to right, #ec1f55 0%, #ec1f55 ' + progressPercent + '%, #d3d3d3 ' + progressPercent + '%, #d3d3d3 100%)';
      }
      //seek time
      progress.oninput = function(e) {
           const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
      }
      // next bài 
      nextBtn.onclick = function() {
          if(_this.isRandom) {
             _this.randomSong();
          }else {
             _this.nextSong();
          }
          audio.play();
          _this.render();
          _this.scrollActiveSong();
      }
      // prev song
      prevBtn.onclick = function() {
           if(_this.isRandom) {
             _this.randomSong();
           }else {
              _this.prevSong();
           }
           audio.play();
           _this.render();
           _this.scrollActiveSong();
      }
      // Bật tắt random
      randomBtn.onclick = function() {
         _this.isRandom = ! _this.isRandom;
         _this.setConfig('isRandom', _this.isRandom);
         randomBtn.classList.toggle("active", _this.isRandom);
      }
      // bật tắt repeatBtn
      repeatBtn.onclick = function() {
        _this.isRepeat = ! _this.isRepeat;
        _this.setConfig('isRepeat', _this.isRepeat);
        repeatBtn.classList.toggle("active", _this.isRepeat);
      }
     //  next bài hát khi kết thúc bài hát 
     audio.onended = function() {
        if(_this.isRepeat) {
            audio.play();
        }else {
            nextBtn.click();
        }
     }
     // play song khi click
     playlist.onclick = function(e) {
        const songElement = e.target.closest(".song:not(.active)");
        if(!e.target.closest('.option')) {
           if(songElement) {
             _this.currentIndex = Number(songElement.dataset.index);
             _this.loadCurrentSong();
             _this.render();
            audio.play();
           }
        }
     }
    },
    
    // Scroll active song into view
     scrollActiveSong: function () {
        setTimeout(() => {
             $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
             })
        }, 300)
     },
    // next bài hát
     nextSong: function () {
          this.currentIndex ++;
          if(this.currentIndex >= this.Songs.length) {
            this.currentIndex = 0;
          }
          this.loadCurrentSong();
     },
     // lùi lại bài hát
     prevSong : function () {
        this.currentIndex -- ;
        if(this.currentIndex < 0) {
          this.currentIndex = this.Songs.length - 1;
        }
        this.loadCurrentSong();
     },
     randomSong : function () {
         var newIndex;
          do {
            newIndex = Math.floor(Math.random() * this.Songs.length);
          } while(newIndex === this.currentIndex || newIndex + 1 === this.currentIndex || newIndex -1 === this.currentIndex);
          this.currentIndex = newIndex;
          this.loadCurrentSong();
     },
     loadConfig : function () {
         this.isRandom = this.config.isRandom;
         this.isRepeat = this.config.isRepeat;
     },
    loadCurrentSong : function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    start: function() {
      this.loadConfig();
      this.defineProperties();
      this.handleEvent();
      this.loadCurrentSong();
      this.render();
      randomBtn.classList.toggle('active', this.isRandom);
      repeatBtn.classList.toggle('active', this.isRepeat);
    }
};
app.start();
