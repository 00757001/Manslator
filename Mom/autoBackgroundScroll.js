;(function(){
	$.fn.autoBackgroundScroll = function(options) {
		// 変数定義
		var opts = $.extend({}, $.fn.autoBackgroundScroll.defaults, options);
		var $backslider = $(this);

		// オプション
		var duration = opts.duration;
		var speed = opts.speed;
		var imageWidth = opts.imageWidth;
		var imageHeight = opts.imageHeight;
		var direction1 = opts.direction1;
		var direction2 = opts.direction2;

		// 座標リセット
		var posX = 0;
		var posY = 0;

		// スクロール
		scroll(duration, speed, direction1, direction2);

		// スクロール
		function scroll(duration, speed, direction1, direction2){
			setInterval(function(){
				if(direction1 == 'right'){
					moveRight();

					if(direction2 == 'top'){
						moveTop();
					}

					if(direction2 == 'bottom'){
						moveBottom();
					}

				} else if(direction1 == 'left'){
					moveLeft();

					if(direction2 == 'top'){
						moveTop();
					}

					if(direction2 == 'bottom'){
						moveBottom();
					}

				} else if(direction1 == 'bottom'){
					moveBottom();

					if(direction2 == 'right'){
						moveRight();
					}

					if(direction2 == 'left'){
						moveLeft();
					}

				} else if(direction1 == 'top'){
					moveTop();

					if(direction2 == 'right'){
						moveRight();
					}

					if(direction2 == 'left'){
						moveLeft();
					}

				}

				$backslider.css('background-position', posX + 'px ' + posY + 'px');

				// 上方向へのスクロール
				function moveTop(){
					if(posY <= -imageHeight){
						posY = 0;
					}
					posY -= speed;
				}

				// 右方向へのスクロール
				function moveRight(){
					if(posX >= imageWidth){
						posX = 0;
					}
					posX += speed;
				}

				// 下方向へのスクロール
				function moveBottom(){
					if(posY >= imageHeight){
						posY = 0;
					}
					posY += speed;
				}

				// 左方向へのスクロール
				function moveLeft(){
					if(posX <= -imageWidth){
						posX = 0;
					}
					posX -= speed;
				}

			}, duration);
		}

	}

	$.fn.autoBackgroundScroll.defaults = {
		direction1: 'right',
		direction2: '',
		duration: 1,
		speed: 0.5
	};
	
})(jQuery);