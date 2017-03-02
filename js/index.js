window.onload = function(){
	var ulDom = document.getElementById("main");
	init();
	// 初始化
	function init(){
		var liNum = 5 * 5 * 5; // li 总个数
		/* 文字数组 */
		var arr = [
			'HTML',
			'CSS',
			'JS',
			'C++',
			'Java',
			'C#',
			'Less',
			'Sass'
		];
		for(var i=0;i<liNum;i++){
			var x = (Math.random() - 0.5) * 5000;
			var y = (Math.random() - 0.5) * 5000;
			var z = (Math.random() - 0.5) * 5000;
			var text = arr[Math.floor(Math.random() * arr.length)];
			var liDom = document.createElement("li");
			liDom.innerHTML = "<h2>"+text+"</h2><p>King</p><p>2016-09-26</p>";
			liDom.style.transform = "translate3d("+(x)+"px,"
				+(y)+"px,"+(z)+"px)";
			ulDom.appendChild(liDom);
		};
		var styleBtn = document.getElementById("styleBtn");
		setTimeout(function(){
			Grid();
//			styleBtn.style.cssText = "transform:scale(1);display:block;";
			styleBtn.style.transform = "scale(1)";
			styleBtn.style.left = "20px";
		},300);
		
		var btns = styleBtn.children;
		for(var i=0;i<btns.length;i++){
			switch(i){
				case 0:
					btns[i].onclick = Sphere;
					break;
				case 1:
					btns[i].onclick = Helix;
					break;
				case 2:
					btns[i].onclick = Grid;
					break;
			};
		};
	};
	// 网格特效
	function Grid(){
		var tX = 400,tY = 400,tZ = 500;
		var firstX = -2*tX;
		var firstY = -2*tY;
		var firstZ = -2*tZ;
		var liDoms = ulDom.children;
		liDoms = randomArray(liDoms);
		for(var i=0;i<liDoms.length;i++){
			var ix = Math.floor((i % (5 * 5)) % 5);
			var iy = Math.floor((i % (5 * 5)) / 5);
			var iz = Math.floor(i / (5 * 5));
			var liDom = liDoms[i];
			liDom.style.transform = "translate3d("+(firstX + ix * tX)+"px,"
				+(firstY + iy * tY)+"px,"+(firstZ + iz * tZ)+"px)";
			liDom.style.transition = "all 5s ease-in-out";
		};
	};
	// 螺旋特效
	function Helix(){
		var liDoms = ulDom.children;
		liDoms = randomArray(liDoms);
		var roY = 10,tY = 10;
		var firstY = -300,firstTY = Math.floor(liDoms.length >> 1) * -tY;
		console.log(typeof (firstTY + tY * 2));
		for(var i=0;i<liDoms.length;i++){
			var liDom = liDoms[i];
			liDom.style.transform = "rotateY("+(firstY + roY * i)+"deg) translateZ(1800px)" 
				+ "translateY("+(firstTY + tY * i)+"px)";
		};
	};
	// 球
	function Sphere(){
		var liDoms = ulDom.children;
		liDoms = randomArray(liDoms);
		var tZ = 1200;
		var roX = 50;
		var firstX = 0;
		for(var i=0;i<liDoms.length;i++){
			var liDom = liDoms[i];
			liDom.style.transform = "rotateX("+(firstX + roX * i)+"deg) translateZ("+
				tZ+"px)";
		}
	};
	// 打乱数组顺序
	function randomArray(arr){
		var temp = [];
		arr = Array.prototype.slice.call(arr);
		var len = arr.length;
		while(len > 0){
			var random = Math.floor(Math.random() * len);
			temp.push(arr[random]);
			arr.splice(random,1);
			len--;
		};
		return temp;
	};
	// 拖拽特效
	(function(){
		var nowX,pervX,minusX,nowY,prevY,minusY;
		var roX = 0,roY = 0,roZ = -2500;
		var timerXY,timerZ;
		document.onmousedown = function(e){
			clearInterval(timerXY);
			e = e || window.event;
			prevX = e.clientX;
			prevY = e.clientY;
			console.log("鼠标按下");
			document.onmousemove = function(e){
				console.log("鼠标移动");
				e = e || window.event;
				nowX = e.clientX;
				nowY = e.clientY;
				minusX = nowX - prevX;
				minusY = nowY - prevY;
				roY += minusX * 0.2;
				roX -= minusY * 0.2;
				ulDom.style.transform = "translateZ("+ roZ +"px) rotateX("+roX+"deg) rotateY("+
					roY+"deg)";
				prevX = nowX;
				prevY = nowY;
				this.onmouseup = function(){
					this.onmousemove = null;
					timerXY = setInterval(function(){
						minusX *= 0.95;
						minusY *= 0.95;
						if(Math.abs(minusX) < 0.5 && Math.abs(minusY) <0.5){
							clearInterval(timerXY);
						}
						roY += minusX * 0.2;
						roX -= minusY * 0.2;
						ulDom.style.transform = "translateZ("+ roZ +"px) rotateX("+roX+"deg) rotateY("+
							roY+"deg)";
						prevX = nowX;
						prevY = nowY;
					},13);
				};
				
			};
		};
		// onmousewheel/DOMMouseScroll   event.wheelDelta+向上   event.detail+向下
		document.addEventListener("mousewheel",function(e){
			e = e || window.event;
			MyMouseWhell(e);
		});
		document.addEventListener("DOMMouseScroll",function(e){
			e = e || window.event;
			MyMouseWhell(e);
		});
		function MyMouseWhell(e){
			clearInterval(timerZ);
			// 谷歌浏览器
			var wheelDelta = e.wheelDelta;
			// 火狐浏览器
			var detail = e.detail;
			if(wheelDelta){
				roZ += wheelDelta * 2;
				// 画面缓冲
				timerZ = setInterval(function(){
					wheelDelta *= 0.8;
					if(wheelDelta <= 1){
						clearInterval(timerZ);
					}
					roZ += wheelDelta * 2;
					roZ = Math.min(0,roZ);
					roZ = Math.max(-8000,roZ);
					ulDom.style.transform = "translateZ("+ roZ +"px) rotateX("+roX+"deg) rotateY("+
					roY+"deg)";
				},13);
			}else if(detail){
				roZ += detail * -100;
				timerZ = setInterval(function(){
					detail *= 0.8;
					if(detail <= 0.05){
						clearInterval(timerZ);
					}
					roZ += detail * -100;
					roZ = Math.min(0,roZ);
					roZ = Math.max(-8000,roZ);
					ulDom.style.transform = "translateZ("+ roZ +"px) rotateX("+roX+"deg) rotateY("+
					roY+"deg)";
				},13);
			}else{
				alert("您当前浏览器不支持滚轮操作,请使用谷歌浏览器!");
			}
			roZ = Math.min(0,roZ);
			roZ = Math.max(-8000,roZ);
			ulDom.style.transform = "translateZ("+ roZ +"px) rotateX("+roX+"deg) rotateY("+
			roY+"deg)";
			
		};
	})();
};