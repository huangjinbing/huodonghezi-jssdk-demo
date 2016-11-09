(function($) {

	$(window).on('touchmove',function(e){
		e.preventDefault();
		return false;
	});

	// 是否本地
	var debug = false;
	// 是否测试站
	var isTestSrv = /dev/ig.test(window.location.hostname);

	var baseURL;

	if (debug) {
		baseURL = 'http://demo.emma.dev.huodonghezi.com/';
	}else{
		if (isTestSrv) {
			baseURL = 'http://demo.emma.dev.huodonghezi.com/';
		}else{
			baseURL = "http://demo.emma.huodonghezi.com/";
		}
	}

	var app = {};

	app.initEvent = function() {
		// tar
		$("#container").on('click', '[data-tar]', function() {
			var tar = $(this).data('tar');
			// check trigger
			var trigger = $(this).data('trigger');
			var action_self = $(this).data('action');

			if (action_self) {
				app[action_self].call(app);
			};

			if (trigger) {
				app.trigger(trigger);
			}
			if (tar == "#") return;

			if ($view[tar]) {
				$view.navWrap.show();

				// check action
				var action = $view[tar].data('action');
				if (action) {
					app[action].call(app);
				}

				$view.pages.hide();
				$view[tar] && $view[tar].show();
				if ($view['nav_' + tar]) {
					$view.nav.removeClass('active');
					$view['nav_' + tar].addClass('active');
				}
			};

		});

		// 关联账号
		$("#btn-association").on('touchstart',function(){
			var name = $("#name").val();
			var pwd = $("#pwd").val();

			if (name && pwd) {
				// TODO 关联账号

				var url = baseURL + 'demoGetAppKey';

				$.post(url,{
					account : name,
					password : pwd
				},function(data){
					if (!data.error) {
						localStorage.setItem('emma_demo_key',data.content);
						$view.container.show();
						$view.associationArea.hide();
						app.config();
					}else{
						alert(data.content);
					}

				});
				
			}
		});
	}

	app.hideNotify = function(){
		$(".emmaNotify").hide();
	}

	app.config = function(){

		var key = localStorage.getItem('emma_demo_key');
		if (!key) {
			$view.container.hide();
			$view.associationArea.show();
			return;
		}

		// 配置
        emma.config({
            key : key,
            debug:true,
            // 初始化要用到的事件
            eventList : [
                'iconSmall',
                'iconBig',
                'banner'
            ]
        });
        
		// 埋点banner
		emma.push({
			'isDemo':true,
			'type': "banner",
			'position_key': "HDHZPOSKEY",
			'username': 'mcMore',
			'mobile': '13312344321',
			'nickname': '',
			'sex': '',
			'province': '',
			'city': '',
			'points': ''
		});
	}

	app.hideNav = function() {
		$view.navWrap.hide();
	}

	app.trigger = function(type) {
		console.log(type);
		switch (type) {
			case 'pay':
				emma.push({
					'isDemo':true,
					'type': "icon",
					'event': 'purchase_success',
					'username': 'mcMore',
					'mobile': '13312344321',
					'nickname': '',
					'sex': '',
					'province': '',
					'city': '',
					'points': ''
				});
				break;
			case "login":
				emma.push({
					'isDemo':true,
					'type': "icon",
					'event': 'logged',
					'username': 'mcMore',
					'mobile': '13312344321',
					'nickname': '',
					'sex': '',
					'province': '',
					'city': '',
					'points': ''
				});
				break;
			case "register":
				emma.push({
					'isDemo':true,
					'type': "icon",
					'event': 'registered',
					'username': 'mcMore',
					'mobile': '13312344321',
					'nickname': '',
					'sex': '',
					'province': '',
					'city': '',
					'points': ''
				});
				break;
		}
	}

	

	// load emma.js
	var src = isTestSrv ? 'http://demo.emma.dev.huodonghezi.com/dist/js/emma.js' : 'http://demo.emma.huodonghezi.com/dist/js/emma.js'

	$.getScript(src,function(data){
		app.initEvent();
		app.config();
	});


})(jQuery);