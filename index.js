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
        add(){
            if (this.title === ''){
                this.flag = true;
            }else{
                this.titles.push({
                    isSelected:false,content:this.title
                });
                this.title = '';
                this.flag = false;
            }
        },
        remove(title){ 
            $('#myModal').on('hidden.bs.modal', function (e) {
                // this.titles = this.titles.filter(item => item !== title);
                console.log(this.titles);
              })
            

                
            
        },
        remember(title){
            this.cur = title;
        },
        cancel(){
            this.cur = '';
        }
    },
    directives:{
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