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
const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const PLAYER_STORAGE_KEY = 'MY_PLAYER';

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom : false,
    isRepeat : false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    Songs :[
        {
          name: "Kẻ theo đuổi ánh sáng",
          singer: "Huy Vạc",
          path: "./asset/songs/KeTheoDuoiAnhSang-HuyVac-7056896.mp3",
          image:
            "https://tungtang.com.vn/blog/wp-content/uploads/2021/10/ke-theo-duoi-anh-sang-tung-tang-1000x600.jpg"
        },
        {
          name: "Stay",
          singer: "Justin Bieber",
          path: "./asset/songs/Stay.mp3",
          image:
            "./asset/images/stay.jpg"
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
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    //hàm render danh sách bài hát ra trình duyệt
      render: function () {
         const htmls = this.Songs.map((song, index) => {
           return `
           <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
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
      // định nghĩa 
      definiedProperties: function () {
           Object.defineProperty(this, 'currentSong', {
             get: function () {
               return this.Songs[this.currentIndex];
             }
           })
      },
      // Những hàm xử lí được viết vào hàm này
      handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        //xử lí đĩa CD quay
       const cdThumbAnimate = cdThumb.animate([
          { transform: 'rotate(360deg)'}
        ], {
            duration:10000, //10 seconds
            iterations: Infinity, // 
        })
         cdThumbAnimate.pause();
        // Xử lí thu phóng ảnh đĩa CD
           document.onscroll = function () {
           const scrollTop = window.scrollY || document.documentElement.scrollTop;// một số trình duyệt không hỗ trợ scrollY
           const newCdWidth = cdWidth - scrollTop;
           cd.style.width =newCdWidth >0 ? newCdWidth + 'px' : 0;
           cd.style.opacity = newCdWidth / cdWidth;
         }
         // bấm nút play bài hát
         playBtn.onclick = function () {
            if(_this.isPlaying) {
              audio.pause();
            }else {
              audio.play();
            }
         }
         //khi bài đc play 
         audio.onplay = function () {
          _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
         }
         //khi bài hát bị dừng
         audio.onpause = function () {
          _this.isPlaying = false;
          player.classList.remove('playing');
          cdThumbAnimate.pause();
       }
       // khi bài hát thay đổi ( thay đổi thanh thời gian)
          audio.ontimeupdate = function () {
              const progressPercent = Math.floor(audio.currentTime / audio.duration *100);
              progress.value = progressPercent;
              progress.style.background ='linear-gradient(to right, #ec1f55 0%, #ec1f55 ' + progressPercent + '%, #d3d3d3 ' + progressPercent + '%, #d3d3d3 100%)'
          }
          // Xử lí tua bài hát
          progress.oninput = function (e) {
              const seekTime = audio.duration / 100 * e.target.value;
              audio.currentTime = seekTime;
          },
          //khi next bài hát 
          nextBtn.onclick = function () {
            if(_this.isRandom) {
              _this.playRandomSong();
            }else {
                _this.nextSong();
            }
            // _this.nextSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
          }
          // khi prev bài hát 
          prevBtn.onclick = function () {
            if(_this.isRandom) {
              _this.playRandomSong();
            }else {
              _this.prevSong();
            }
             audio.play();
            _this.render();
            _this.scrollToActiveSong();
          }

          // xử lí bật / tắt random song
          randomBtn.onclick = function () {
             _this.isRandom = !_this.isRandom;
             _this.setConfig('isRandom', _this.isRandom);
              randomBtn.classList.toggle('active', _this.isRandom);
            }
          // xử lí lặp lại một bài hát 
          repeatBtn.onclick = function (e) {
             _this.isRepeat = !_this.isRepeat;
             _this.setConfig('isRepeat', _this.isRepeat);
             repeatBtn.classList.toggle('active', _this.isRepeat);
          }
          // chuyển tiếp bài hát khi bài hát kết thúc
          audio.onended = function () {
            if(_this.isRepeat) {
              audio.play();
            }else {
              nextBtn.click(); // Tự động click
            }
          }
           // lắng nghe hành vi click vào playlist
          playlist.onclick = function (e) {
            const songElement = e.target.closest('.song:not(.active)') 
            // if(songElement || e.target.closest('.option')) {
            
            //   }
              //xử lí khi click vào bài hát trong playlist
              if(!e.target.closest('.option')) {
                //xử lí khi click vào bài hát trong playlist
              if(songElement) {
                 _this.currentIndex = Number(songElement.dataset.index);// tương tự getAttribute
                 _this.loadcurrentSong();
                 _this.render();
                 audio.play();
                _this.scrollToActiveSong();
                }
              }
          }
       },
      
      scrollToActiveSong: function () {
        setTimeout(() => {
          // if(this.currentIndex ===0 || this.currentIndex===1 ) {
          //   $('.song.active').scrollIntoView({
          //     behavior: 'smooth',
          //     block: 'end',
          //  })
          // }else {
          //   $('.song.active').scrollIntoView({
          //     behavior: 'smooth',
          //     block: 'nearest',
          //  })
          // }
          $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
             });
        },300)
      },
      // hàm load ra bài hát đầu tiên khi mở trình duyệt
      loadcurrentSong: function () {
          heading.textContent = this.currentSong.name;
          cdThumb.style.backgroundImage =`url('${this.currentSong.image}')`;
          audio.src = this.currentSong.path;
      },
      loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
      },
      // next tiếp bài 
      nextSong: function () {
         this.currentIndex ++;
         if(this.currentIndex >= this.Songs.length) {
            this.currentIndex =0;
         }
         this.loadcurrentSong()
      },
      //lùi lại bài
      prevSong: function () {
        this.currentIndex --;
        if(this.currentIndex < 0) {
           this.currentIndex = this.Songs.length -1;
        }
        this.loadcurrentSong()
     },
    
     playRandomSong: function () {
         var newIndex ; 
       do {
         newIndex = Math.floor(Math.random() * this.Songs.length);
       } while (newIndex === this.currentIndex || newIndex + 1 === this.currentIndex || newIndex - 1 === this.currentIndex);
       this.currentIndex = newIndex;
       this.loadcurrentSong();
      },
      
      start: function () {
         // gán cấu hình từ config vào ứng dụng
         this.loadConfig();
      // Định nghĩa các thuộc tính cho object
          this.definiedProperties ()
          //Lắng nghe / xử  lí các sự kiện
          this.handleEvents()
          // Tải thông tin bài hát đầu tiên vào UI  khi chạy ứng dụng
          this.loadcurrentSong()
          // Render playlist
          this.render();
          // hiển thị trang thái ban đầu của button
          randomBtn.classList.toggle('active', this.isRandom);
          repeatBtn.classList.toggle('active', this.isRepeat);
      }
};
app.start()
