
	/*
	 *定义类
	 */
	var List = function(){
		//全部数据
		this.all = null;
		//定义一个属性作为Vue对象
		this.vueShop = null;
		//定义 地铁线
		this.metro = null;
		
	}

	/*
	 *定义获取数据的方法
	 */
	 List.prototype.getListData = function(){
	 	//用一个变量存取当前对象
	 	var self = this;

	 	//用ajax发送请求取得数据
	 	$.ajax({
	 		url:'data/list.json',
	 		// type:'GET',
	 		// dataType:'json',
	 		success:function(response){
	 			self.all = response;
	 			console.log(response);
	 			self.showData(response);
	 		},
	 		// error:function(XMLHttpRequest, textStatus, errorThrown){
	 		// 	console.log(XMLHttpRequest.status);
	 		// 	console.log(XMLHttpRequest);
				// console.log(XMLHttpRequest.readyState);
				// console.log(textStatus);
	 		// }
	 	});	

	 }

	 /*
	  *定义显示数据的方法
	  */
	 List.prototype.showData = function(data){
	 	//类的属性设置为Vue对象，同一个类的属性相当于全局变量
	 	this.vueShop = new Vue({
	 		el:'#shopList',
	 		data:{
	 			shopList:data
	 		},
	 		filters: {
        // star：评价星星数量过滤器
		        	starClass: function(val){
			            return {
			                '5': 'star5',
			                '4.5': 'star45',
			                '4': 'star4',
			                '3.5': 'star35',
			                '3': 'star3',
			                '2.5': 'star25',
			                '2': 'star2',
			                '1.5': 'star15',
			                '1': 'star1'
			            }[val]
		        		},
			        tuanT: function (val){
			        	return {
			        		'1': 'tuan-type1',
			        		'2': 'tuan-type2'
			        	}[val]
			        	}
    				}
	 	})
	 }


	 /*
	  *定义筛选的方法 根据 ID来筛选
	  */
	  List.prototype.filterMetro = function(id){
	  	var all = this.all,
	  		all1= this.all,
            data = [];
        if(id == null) {
            data = all;
        }else if(id == 100){
        	data = all1;
        } else{
            for(var i = 0, len = all.length; i < len; i++) {
                if(all[i].shopId == id) {
                    data.push(all[i]);
                    console.log(data);
                }
            }
        }
        if(data.length < 1) {
            alert('该地方租金太贵，木有人想去那开店');
            this.vueShop.shopList =[];
        } else{
            this.vueShop.shopList = data;
        }
	  }

	var list = new List();
	list.getListData();
	
	 
	 /*
	  *定义一个弹出框类
	  */
	var Popup = function(){
	 	//
	 	this.Popupall = null;
	 	//
	 	this.Popupapp =null;
	 	//
	 	// this.Purl = 'data/shopAddr.json';
	 	//
	 	this.ppmetro = null;
	 }

	 /*
	  *获取弹出框数据
	  */
	Popup.prototype.getPopupData = function(){
		var self = this;
		$.ajax({
			url:'data/shopAddress.json',
			success:function(response){
				self.Popupall = response;
				console.log(response);
				self.showPopupData(response);
			}
		});
		$.ajax({
			url:'data/shopAddr.json',
			success:function(response){
				self.ppmetro =response;
			}
		})
		
	}

	/*
	 *显示弹出框数据的方法
	 */
	Popup.prototype.showPopupData = function(data){
		var self =this;
		this.Popupapp = new Vue({
			el:'#selector',
			data:{
				list:data,
				listf:data[0].childs,
				current:null,				
			},
			methods:{
				//点击给当前添加样式 并生成右边小列表
				click:function(e){
					current ='sel';
					console.log(e.target.title);
					var i= e.target.title-2001;
					this.listf = self.Popupapp.list[i].childs;

					$('#selector *').removeClass(current);
					$(e.target).addClass(current);

				},
				//点击进行筛选 并隐藏弹出框
				click2:function(e){
					console.log(e.target.title);
					list.filterMetro(e.target.title);
					$('#selector').addClass('hidn');
	 				$('#overlay').addClass('hidn');
				},

				//点击切换成地铁列表
				change:function(){
					console.log(this);
					$('#business').removeClass('curr');
					$('#metroo').addClass('curr');
					this.list = self.ppmetro;
					this.listf = self.ppmetro[0].childs;
				},
				//点击切换成商区
				change1:function(){
					console.log(this);
					$('#metroo').removeClass('curr');
					$('#business').addClass('curr');
					this.list = self.Popupall;
					this.listf = self.Popupall[0].childs;
				}
			}
		})
	}
	var popup =new Popup();
	popup.getPopupData();

	/*
	 *定义一个新的类 for 弹出框类
	 */
	var Jlove = function(){
		this.kk = null;
		this.ll = null;
	}
	Jlove.prototype.Jclick = function(){
		/*
		 *点击全部商品之后弹出框
		 */
		 this.kk = new Vue({
		 	el:'#showLO',
		 	data:{},
		 	methods:{
		 		click:function(){
		 			$('.selectorListLeft li:first').addClass('sel');
		 			$('#selector').removeClass('hidn');
		 			$('#overlay').removeClass('hidn');
		 		}
		 	}
		 });

		 /*
		  *点击阴影部分隐藏弹出框
		  */
		 this.ll = new Vue({
		 	el:'#overlay',
		 	data:{},
		 	methods:{
		 		click:function(){
		 			$('#selector').addClass('hidn');
		 			$('#overlay').addClass('hidn');
		 		}
		 	}
		 })

	}	
	var jlove = new Jlove();
		jlove.Jclick();
