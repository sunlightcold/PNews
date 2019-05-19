var nodemailer = require('nodemailer')

var mailTransport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: '840289075@qq.com',
        pass: 'errhdgubsehdbffb'
    },
});

// var options = {
//     from: '"FZEROF" <840289075@qq.com>',
//     to: '"用户1" <1326788407777777@163.com>',
//     // cc         : ''  //抄送
//     // bcc      : ''    //密送
//     subject: '一封来自Node Mailer的邮件',
//     text: '一封来自Node Mailer的邮件',
//     html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1>',
// };

// mailTransport.sendMail(options, function (err, msg) {
//     if (err) {
//         console.log(err);
//         console.log('index', { title: err });
//     }
//     else {
//         console.log(msg);
//         console.log('index', { title: "已接收：" + msg.accepted });
//     }
// });

function checkEmail(str) {
    var
        re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str)) {
        console.log('success');
    } else {
        console.log('error');
        
    }
}
// checkEmail("contact@cnblogs.");//调用


function checkPassword(str) {
    var re = /\*{6,}/;

    if (re.test(str)) {
      return true;
    } else {
      return false;
    }
}

console.log(checkPassword('1111111'))