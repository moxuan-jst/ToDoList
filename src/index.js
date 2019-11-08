;
// 下拉菜单
(function(){
    let btn = $(".navbar-brand");
    // console.log(btn);
    let mask = $(".mask");
    let left = $(".left");
    btn.on('click', function () { 
        // console.log(1)
        mask.css({"display": "block"});
        left.slideDown("slow", function () {
            left.css({"display": "block"});
          })
    });
    mask.on('click',function () {
        mask.css({"display": "none"});
        left.slideUp("slow", function(){
            left.css({"display": "none"});
        });
    })
})();

let vm = new Vue({
    el: "#app",
    data:{
        titles: [{isSelected: false,content:'你还没有写今天的待办事项哦～'}],
        title:'',
        cur:'',
        hash:'',
        flag: false,
    },
    created(){
        // 如果有localstorage，则设置，没有则设置默认
        this.titles = JSON.parse(localStorage.getItem('data')) || this.titles;
        //获取页面hash值
        this.hash = window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange',()=>{
            this.hash = window.location.hash.slice(2)
        });
    },
    computed:{
        count(){
            // 计算完成事件个数
            return this.titles.filter(item => !item.isSelected).length
        },

        // 将路径进行hash
        filterHash(){
            if(this.hash === 'all')
                return this.titles;
            if (this.hash === 'finish' )
                return this.titles.filter(item => item.isSelected);
            if (this.hash === 'unfinish')
                return this.titles.filter(item => !item.isSelected);
            return this.titles;
        }
    },
    methods:{
        // 添加
        add(){
            if (this.title === ''){
                this.flag = true;
                // 自动取消提示
                setTimeout(() => {
                    this.flag = false;
                }, 1500);
            }else{
                this.titles.push({
                    isSelected:false,content:this.title
                });
                this.title = '';
                this.flag = false;
            }
        },

        // 删除
        remove(title){ 
            if (!confirm("确认要删除？")) {
                // confirm("提示内容",func), 弹出对话框，确定返回true，取消返回false
                window.event.returnValue = false;
            }else{
                this.titles = this.titles.filter(item => item !== title);
            }            
        },

        // 记住要修改的一项
        remember(title){
            this.cur = title;
        },
        cancel(){
            this.cur = '';
        },

    },
    directives:{  //自定义指令
        // 双击获取焦点
        focus(el,bindings){
            if(bindings.value){
                el.focus();
            }
        }
    },
    watch:{ //watch默认只监控一层数据变化
        titles:{
            handler(){  //默认写成函数，就相当于默认写了handler
                // localstorage默认存的是字符串
                localStorage.setItem('data', JSON.stringify(this.titles))
            },deep:true
        }
    },
});

    
