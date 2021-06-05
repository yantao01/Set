$(function() {

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;


    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);


        var y = dt.getFullYear();
        var m = addzero(dt.getMonth() + 1);
        var d = addzero(dt.getDate());

        var hh = addzero(dt.getHours());
        var mm = addzero(dt.getMinutes());
        var ss = addzero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义补零的函数
    function addzero(n) {
        return n > 9 ? n : '0' + n
    }


    //定义一个查询的参数对象
    //需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,  //页码值
        pagesize: 2,  //每页显示多少条数据
        cate_id: '',  //文章分类的 Id
        state: ''     //文章的状态
    }

    initTable()
    initCate()
    renderPage()
    
    

    // 获取文章列表的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/list',
            data: q,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取文章列表数据失败')
                }
                // 使用模板引擎渲染页面的数据
                var htmlstr = template('temp-table',res)
                $('tbody').html(htmlstr)
            }
        })
    }


    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlstr = template('template-cate',res)
                $('name=cate_id').html(htmlstr)
                //通知layui重新渲染表单区域的ui结构    
                form.render();
            }
        })
    }


    // 为筛选表单绑定submit事件
    $('#form-search').on('click',function(e) {
        e.preventDefault()

        // 获取表单中选项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        // 为查询参数对象q中对应的属性赋值
        q.cate_id = cate_id
        q.state = state

        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })


    // 定义渲染分页的方法
    function renderPage(total) {
        //调用laypage。render方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', //分页容器的id
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum  //设置默认被选中的分页
        })
    }
})