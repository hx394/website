


			var drag = document.getElementById('myPet');
			// //点击某物体时，用drag对象即可，move和up是全局区域，
			// 也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
			drag.onmousedown = function(event){
				drag.style.border="3px solid black";


				 var event = event || window.event;  //兼容IE浏览器
			//    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
				 var diffX = event.clientX - drag.offsetLeft;
				 var diffY = event.clientY - drag.offsetTop;
				 if(typeof drag.setCapture !== 'undefined'){
								drag.setCapture();
				 }
			document.onmousemove = function(event){

					var event = event || window.event;
					var moveX = event.clientX - diffX;
					var moveY = event.clientY - diffY;
					if(moveX < 0){
							moveX = 0
					}else if(moveX > window.innerWidth - drag.offsetWidth){
							moveX = window.innerWidth - drag.offsetWidth
					}
					if(moveY < 0){
							moveY = 0
					}else if(moveY > window.innerHeight - drag.offsetHeight){
							moveY =  window.innerHeight - drag.offsetHeight
					}
					drag.style.removeProperty("right");
					drag.style.removeProperty("bottom");
					drag.style.left = moveX + 'px';
					drag.style.top = moveY + 'px';


			}
			document.onmouseup = function(event){
					drag.style.removeProperty("border");
					this.onmousemove = null;
					this.onmouseup = null;
					 //修复低版本ie bug
					if(typeof drag.releaseCapture!='undefined'){
						 drag.releaseCapture();
					}
			}
	}

	var myPet=document.getElementById("myPet");
	myPet.addEventListener('click',sayHello);

	function tea(evt){
		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";
		var contentTea=document.createTextNode("下午茶时间！您一定累了吧。请享用大吉岭红茶。");
		balloon.appendChild(contentTea);
		forBalloon.appendChild(balloon);

		var image = new Image();
		image.src = "img/kika/kika_tea.png";
		image.onload = function(){
    //when it loads
    	document.getElementById("kika").src= image.src;
		}


	}

	function saySomething(evt){

		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";

// 问候语库
        const greetings = [
            "今天过得怎么样？",
            "很高兴见到你！",
            "愿你拥有美好的一天！",
            "阳光因你而灿烂！",
            "期待与你相遇的每一天！",
            "你让世界更美好！",
            "保持微笑，生活更精彩！",
            "今天也要加油哦！",
            "你是最棒的！",
            "感谢你的到来！",
            "现在是美好时光，享受当下吧！",
            "记得多喝水，照顾好自己！",
            "今天也要保持好心情哦！",
            "愿你被世界温柔以待！",
            "生活因你而精彩！",
            "每一天都是新的开始！",
            "保持热爱，奔赴山海！",
            "小小的问候，大大的温暖！",
            "愿你眼中有光，心中有爱！",
            "今天也要元气满满！",
            


"人的心只容得下一定程度的绝望，海绵已经吸够了水，即使大海从它上面流过，也不能再给它增添一滴水了。雨果（法国）",
"世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的心灵。雨果（法国）",
"人生下来不是为了拖着锁链，而是为了展开双翼。雨果（法国）",
"哪里有阴影，哪里就有光。雨果（法国）",
"释放无限光明的是人心，制造无边黑暗的也是人心，光明和黑暗交织着，厮杀着，这就是我们为之眷恋而又万般无奈的人世间。雨果（法国）",

"生活总是让我们遍体鳞伤，但到后来，那些受伤的地方一定会变成我们最强壮的地方。海明威（美国）",
"优于别人，并不高贵，真正的高贵应该是优于过去的自己",
"相爱的人不该争吵；因为他们只有两人，与他们作对的是整个世界；他们一发生隔膜，世界就会将其征服。海明威（美国）",
"等待也是种信念，海的爱太深，时间太浅。海明威（美国）",
"这个世界如此美好，值得人们为它奋斗；我只同意后半句。海明威（美国）",

"黑夜无论怎样悠长，白昼总会到来。莎士比亚（英国）",
"一个人思虑太多，就会失去做人的乐趣。莎士比亚（英国）",
"爱所有人，信任少数人，不负任何人。莎士比亚（英国）",
"生存还是毁灭，这是个问题。莎士比亚（英国）",
"没有人值得你流泪，值得让你这么做的人不会让你哭泣。莎士比亚（英国）",

"每一个不曾起舞的日子，都是对生命的辜负。尼采（德国）",
"你要搞清楚自己人生的剧本——不是你父母的续集，不是你子女的前传，更不是你朋友的外篇。尼采（德国）",
"我感到难过，不是因为你欺骗了我，而是因为我再也不能相信你了。尼采（德国）",
"一个人知道自己为什么而活，就可以忍受任何一种生活。尼采（德国）",
"谁终将声震人间，必长久深自缄默；谁终将点燃闪电，必长久如云漂泊。尼采（德国）",

"每个人都会有缺陷，就像被上帝咬过的苹果，有的人缺陷比较大，正是因为上帝特别喜欢他的芬芳。托尔斯泰（俄国）",
"幸福的家庭有同样的幸福，而不幸的家庭则各有各的不幸。托尔斯泰（俄国）",
"聪明人的特点有三：一是劝别人做的事自己去做；二是决不去做违背自然界的事；三是容忍周围人们的弱点。托尔斯泰（俄国）",
"如果爱一个人，那就爱整个的他，实事求是地照他本来的面目去爱他，而不是脱离实际希望他这样那样的。托尔斯泰（俄国）",
"一个人越聪明、越善良，他看到别人身上的美德越多；而人越愚蠢、越恶毒，他看到别人身上的缺点也越多。托尔斯泰（俄国）",

"当你为错过太阳而哭泣的时候，你也要再错过群星了。泰戈尔（印度）",
"世界以痛吻我，要我报之以歌。泰戈尔（印度）",
"纵然伤心，也不要愁眉不展，因为你不知是谁会爱上你的笑容。泰戈尔（印度）",
"我的心是旷野的鸟，在你的眼睛里找到了它的天空。泰戈尔（印度）",
"生如夏花之绚烂，死如秋叶之静美。泰戈尔（印度）",

"当真理还正在穿鞋的时候，谎言就能走遍半个世界。马克吐温（美国）",
"有皱纹的地方只表示微笑曾在那儿呆过。马克吐温（美国）",
"良好的教养在于隐藏我们对自己较佳的评价，以及隐藏我们对他人较差的评价。马克吐温（美国）",
"绝不要和愚蠢的人争论，他们会把你拖到他们那样的水平，然后回击你。马克吐温（美国）",

"人生有两个悲剧，第一是想得到的得不到，第二是想得到的得到了。王尔德（英国）",
"一个人总是可以善待他毫不在意的人。王尔德（英国）",
"生活并不复杂，复杂的是我们人自己；生活是单纯的，单纯的才是正确的。王尔德（英国）",
"爱，始于自我欺骗，终于欺骗他人；这就是所谓的浪漫。王尔德（英国）",

"世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。罗曼罗兰（法国）",
"一个人的性格决定他的际遇；如果你喜欢保持你的性格，那么，你就无权拒绝你的际遇。罗曼罗兰（法国）",
"任何努力决不落空，或许许多年都会了无音讯；却突然有一天你会发现你的思想已经有了影响。罗曼罗兰（法国）",


"时间决定你会在生命中遇见谁，你的心决定你想要谁出现在你的生命里，而你的行为决定最后谁能留下。梭罗（美国）",
"生命并没有价值，除非你选择并赋予它价值；没有哪个地方有幸福，除非你为自己带来幸福。梭罗（美国）",
"知道自己知道什么，也知道自己不知道什么，这就是真正的知识。梭罗（美国）",


"在生活里，我们命中碰到的一切美好的东西，都是以秒计算的。高尔基（俄罗斯）",
"志在顶峰的人，决不会因留恋半山腰的奇花异草而停止攀登的步伐。高尔基（俄罗斯）",
"世界上最快而又最慢，最长而又最短，最平凡而又最珍贵，最容易忽视而又最令人后悔的就是时间。高尔基（俄罗斯）",

"未曾哭过长夜的人，不足以语人生。歌德（德国）",
"谁若游戏人生，他就一事无成；谁不能主宰自己，便永远是一个奴隶。歌德（德国）",
"凡是让人幸福的东西，往往又会成为他不幸的源泉。歌德（德国）",
"阳光越是强烈的地方，阴影就越是深邃。歌德（德国）",

"教育就是当一个人把在学校所学全部忘光之后剩下的东西。爱因斯坦（美国）",
"不要努力成为一个成功者，要努力成为一个有价值的人。爱因斯坦（美国）",
"如果一个想法在一开始不是荒谬的，那它就是没有希望的。爱因斯坦（美国）",
"把你的手放在滚热的炉子上一分钟，感觉起来像一小时；坐在一个漂亮姑娘身边整整一小时，感觉起来像一分钟；这就是相对论。爱因斯坦（美国）",
"在天才和勤奋之间，我毫不犹豫地选择后者；她几乎是世界上一切成就的催产婆。爱因斯坦（美国）",

"战争不决定谁对了，只决定谁留下了。罗素（英国）",
"乞丐并不会妒忌百万富翁，但是他肯定会妒忌收入更高的乞丐。罗素（英国）",
"我绝不会为我的信仰而献身，因为我可能是错的。罗素（英国）",

"如果你渴望得到某样东西，你得让它自由，如果它回到你身边，它就是属于你的，如果它不会回来，你就从未拥有过它。大仲马（法国）",
"上帝给了人们有限的力量但却给了人们无限的欲望。大仲马（法国）",
"幸福就是一双鞋合不合适只有自己一个人知道。大仲马（法国）",
"别把世界看得像您心里想像的那么美丽，别把社会看得像您的贞操那么纯洁。大仲马（法国）",
"凡是一个深陷在爱情里的人，是决不肯让他的钟表安安稳稳地向前走的。大仲马（法国）",

"有时，我可能脆弱得一句话就泪流满面；有时，也发现自己咬着牙走了很长的路。莫泊桑（法国）",
"生活永远不可能像你想像得那么好，但是也不会像你想像得那么糟。莫泊桑（法国）",
"喜欢读书，就等于把生活中寂寞的时光换成巨大享受的时刻。莫泊桑（法国）",
"我们所爱的，常常不是一个男人，而是爱情本身；那天晚上，月光才是你的真正情人。莫泊桑（法国）",

"不要为那些不愿在你身上花费时间的人而浪费你的时间。玛格丽特米切尔（美国）",
"失去某人，最糟糕的莫过于，他近在身旁，却犹如远在天边。玛格丽特米切尔（美国）",
"爱你的人如果没有按你所希望的方式来爱你，那并不代表他们没有全心全意地爱你。玛格丽特米切尔（美国）",
"也许上帝希望我们在遇到那个对的人之前遇到一些错误的人，因此，当我们最终遇到那个人的时候，我们才知道如何感恩。玛格丽特米切尔（美国）",
"对于世界而言，你是一个人；但是对于某个人，你是他的整个世界。玛格丽特米切尔（美国）",

"不要因为走得太远，忘了我们为什么出发。纪伯伦（黎巴嫩）",
"一个人有两个我,一个在黑暗中醒着,一个在光明中睡着。纪伯伦（黎巴嫩）",
"和你一同笑过的人，你可能把他忘掉；但是一同和你哭过的人，你却永远不忘。纪伯伦（黎巴嫩）",
"昨天不过是今天的回忆，明天不过是今天的梦想。纪伯伦（黎巴嫩）",
"慷慨不是你把我比你更需要的东西给我，而是你把你比我更需要的东西也给了我。纪伯伦（黎巴嫩）",

"惟沉默是最高的轻蔑。鲁迅（中国）",
"勇者愤怒，抽刃向更强者；怯者愤怒，却抽刃向更弱者。鲁迅（中国）",
"猛兽总是独行，牛羊才成群结队。鲁迅（中国）",
"悲剧将人生的有价值的东西毁灭给人看，喜剧将那无价值的撕破给人看。鲁迅（中国）",
"其实地上本没有路，走的人多了，也便成了路。鲁迅（中国）",
"不在沉默中爆发，就在沉默中灭亡。鲁迅（中国）",
"真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血。鲁迅（中国）",
"时间就是性命；无端的空耗别人的时间，其实是无异于谋财害命的。鲁迅（中国）",
"我之所谓生存，并不是苟活，所谓温饱，不是奢侈，所谓发展，也不是放纵。鲁迅（中国）",
"横眉冷对千夫指，俯首甘为孺子牛。鲁迅（中国）"

        ];

		const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        

		var contentTea=document.createTextNode(`${randomGreeting}`);
		balloon.appendChild(contentTea);
		forBalloon.appendChild(balloon);

		var image = new Image();
		const randomImage = Math.random();
		if(randomImage<0.34){
			image.src = "img/kika/kika_smile.png";
		} else if(randomImage < 0.67){
			image.src = "img/kika/kika_think.png";
		} else{
			image.src = "img/kika/kika_speak.png";
		}
		
		
		image.onload = function(){
    //when it loads
    	document.getElementById("kika").src= image.src;
		}


	}
	function hideMe(evt){

		document.getElementById("forBalloon").remove();
		document.getElementById("myPet").remove();
	}

	function sayHello(evt){
		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";

		forBalloon.style.setProperty("background-color","#87CEFA");
		forBalloon.style.setProperty("z-index","100000");
		forBalloon.style.position="fixed";

		forBalloon.style.right="10px";
		forBalloon.style.bottom="10px";
		forBalloon.style.visibility="visible";
		forBalloon.style.width="200px";
		forBalloon.style.height="110px";
		const content=document.createTextNode("现在的时间："+ new Date().toLocaleTimeString());
		const breakLine=document.createElement('br');
		const content0=document.createTextNode("请选择：");
		const option1=document.createElement('button');
		const content1=document.createTextNode("聊聊天");
		option1.appendChild(content1);
		const option2=document.createElement('button');
		const content2=document.createTextNode("喝杯茶");
		option2.appendChild(content2);
		const option3=document.createElement('button');
		const content3=document.createTextNode("隐藏我");
		option3.appendChild(content3);

		const option4=document.createElement('button');
		const content4=document.createTextNode("对我说些什么吧,kikka酱!");
		option4.appendChild(content4);

		balloon.appendChild(content);
		balloon.appendChild(breakLine);
		balloon.appendChild(content0);
		balloon.appendChild(option1);
		balloon.appendChild(option2);
		balloon.appendChild(option4);
		balloon.appendChild(option3);

		forBalloon.appendChild(balloon);

		option1.addEventListener('click',chat);
		option2.addEventListener('click', tea);
		option3.addEventListener('click', hideMe);
		option4.addEventListener('click', saySomething);


	}
	function boyfriend(evt){
		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";
		var contentBoyfriend=document.createTextNode("什么！你是哥哥的男朋友？我早就发现哥哥的性取向不正常，但没想到他喜欢男人……");
		balloon.appendChild(contentBoyfriend);
		forBalloon.appendChild(balloon);
		var image = new Image();
		image.src = "img/kika/kika_shy.png";
		image.onload = function(){
    //when it loads
    	document.getElementById("kika").src= image.src;
		}
	}
	function girlfriend(evt){
		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";
		var contentGirlfriend=document.createTextNode("你自称是哥哥的女朋友啊。那接下来是处刑时间啦~ 哥哥只要有我就够了，我会永远爱着哥哥的。请你死一次试试？");
		balloon.appendChild(contentGirlfriend);
		forBalloon.appendChild(balloon);

		var image = new Image();
		image.src = "img/kika/kika_kill.png";
		image.onload = function(){
		//when it loads
			document.getElementById("kika").src= image.src;
		}


	}
	function stranger(evt){
		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";
		var contentStranger=document.createTextNode("陌生人……虽然用枪指着你很抱歉，但请你务必和哥哥处好关系，加深感情。作为交换，我可以告诉你哥哥的一个秘密哟~");
		balloon.appendChild(contentStranger);
		forBalloon.appendChild(balloon);

		var image = new Image();
		image.src = "img/kika/kika_gun.png";
		image.onload = function(){
		//when it loads
			document.getElementById("kika").src= image.src;
		}

		const option1=document.createElement('button');
		const content1=document.createTextNode("什么秘密？");
		option1.appendChild(content1);
		balloon.appendChild(option1);
		option1.addEventListener('click',secret);

	}

	function secret(evt){
		var forBalloon=document.getElementById("forBalloon");
		var balloonPre=document.getElementById("balloon");
		if(balloonPre!=null){
			balloonPre.remove();
		}
		const balloon=document.createElement('div');
		balloon.id="balloon";
		var contentSecret=document.createTextNode("哥哥画画能力很糟糕，虽然努力画了一个吉祥物，但是还是成为了废案。给你瞧瞧吧~");
		balloon.appendChild(contentSecret);
		forBalloon.appendChild(balloon);

		var image = new Image();
		image.src = "img/kika/painting.png";
		image.onload = function(){
    //when it loads
    	document.getElementById("kika").src= image.src;
			document.getElementById("kika").style.width="278px";
		}

	}




		function chat(evt){
			console.log("chat starts!");
			var forBalloon=document.getElementById("forBalloon");
			var balloonPre=document.getElementById("balloon");
			if(balloonPre!=null){
				balloonPre.remove();
			}
			const balloon=document.createElement('div');
			balloon.id="balloon";
			var contentChat=document.createTextNode("我是主人的妹妹橘花，请问您是哥哥的什么人？");
			balloon.appendChild(contentChat);



			const option1=document.createElement('button');
			const content1=document.createTextNode("男性朋友");
			option1.appendChild(content1);
			const option2=document.createElement('button');
			const content2=document.createTextNode("女性朋友");
			option2.appendChild(content2);
			const option3=document.createElement('button');
			const content3=document.createTextNode("陌生人");
			option3.appendChild(content3);
			const breakLine=document.createElement('br');
			balloon.appendChild(breakLine);

			balloon.appendChild(option1);
			balloon.appendChild(option2);
			balloon.appendChild(option3);
			forBalloon.appendChild(balloon);

			option1.addEventListener('click',boyfriend);
			option2.addEventListener('click', girlfriend);
			option3.addEventListener('click', stranger);

		}


