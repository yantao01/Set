$(function() {

    var layer = layui.layer;
    var form = layui.form;


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
            ,content: $('#dialog-edit').html()
        })

        // 
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates' + id,
            success: function(res) {
                form.val('form-edit',res.data)
            }
        })
    })


    //通过代理的的形式，为修改分类的表单绑定submit事件
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close(indexedit)
                getarcicle();
            }
        })
    })



    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: 'http://api-breakingnews-web.itheima.net/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index);
                    getarcicle() 
                }
            })
            
            
        });
    })
})