function StandardPost (url,args) 
{
    var form = $("<form method='post'></form>");
    form.attr({"action":url});
    for (arg in args)
    {
        var input = $("<input type='hidden'>");
        input.attr({"name":arg});
        input.val(args[arg]);
        form.append(input);
    }
    $("body").append(form);
    form.submit();
}

// 身份证校验
function checkzjhm(zjhm) {
    var ret = false;
    //15位和18位身份证号码的正则表达式
    var regzjhm = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //console.log(zjhm);
    //console.log(regzjhm.test(zjhm));

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regzjhm.test(zjhm)) {
        if (zjhm.length == 18) {
            var zjhmWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var zjhmY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var zjhmWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                zjhmWiSum += zjhm.substring(i, i + 1) * zjhmWi[i];
            }

            var zjhmMod = zjhmWiSum % 11; //计算出校验码所在数组的位置
            var zjhmLast = zjhm.substring(17); //得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (zjhmMod == 2) {
                if (zjhmLast == "X" || zjhmLast == "x") {
                    ret = true;
                } else {
                    mui.alert("身份证格式号码错误，请检查", '提示', function() {
                    });
                    ret = false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (zjhmLast == zjhmY[zjhmMod]) {
                    ret = true;
                } else {
                    mui.alert("身份证格式号码错误，请检查", '提示', function() {
                    });
                    ret = false;
                }
            }
        }
    } else {
        mui.alert("身份证格式号码错误，请检查", '提示', function() {
        });
        ret = false;
    }
    return ret;
}