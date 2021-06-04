$(function() {

    var layer = layui.layer;

    getarcicle();

    //获取文章分类的列表
    function getarcicle() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates',
            success: function(res) {
                // console.log(res);
                var htmlstr = template('template-table',res)
               $('tbody').html(htmlstr)
                
            }
                
        })
    }


    // 为添加类别按钮添加绑定点击事件
    var indexadd = null;
    $('#btn-addarticle').on('click',function() {
        indexadd = layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '在线调试'
            ,content: $('#dialog-add').html()
        })
    })


    // 通过代理的方式，为form-add表单添加绑定submit事件
    $('body').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                getarcicle()
                layer.msg('新增分类成功')
                layer.close(indexadd)
            }
        })
    })


    // 通过代理的方式，为btn-edit按钮添加绑定点击事件
    var indexedit = null;
    $('tbody').on('click','#btn-edit',function() {
        // console.log('ok');

        // 弹出一个修改文章分类信息的层
        indexedit = layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '修改文章分类'
            ,content: $('#dialog-add').html()
        })
    })
})