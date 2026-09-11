export const SECTIONS = [
    {
        title: { ru: "Кто мы", en: "Who we are", zh: "关于我们" },
        paragraphs: [
            { ru: "Наш адрес сайта: https://podiumspa.com.", en: "Our website address is: https://podiumspa.com.", zh: "我们的网站地址是：https://podiumspa.com。" },
        ],
    },
    {
        title: { ru: "Комментарии", en: "Comments", zh: "评论" },
        paragraphs: [
            {
                ru: "Если посетитель оставляет комментарий на сайте, мы собираем данные, указанные в форме комментария, а также IP-адрес посетителя и данные user-agent браузера с целью определения спама.",
                en: "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.",
                zh: "当访客在网站上发表评论时，我们会收集评论表单中显示的数据，以及访客的IP地址和浏览器用户代理字符串，以帮助检测垃圾评论。",
            },
            {
                ru: "Анонимизированная строка, создаваемая из вашего адреса email («хеш»), может предоставляться сервису Gravatar, чтобы определить, используете ли вы его. После одобрения комментария ваше изображение профиля будет видимо публично в контексте вашего комментария.",
                en: "An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. After approval of your comment, your profile picture is visible to the public in the context of your comment.",
                zh: "根据您的电子邮件地址创建的匿名字符串（也称为哈希值）可能会提供给Gravatar服务，以确认您是否正在使用该服务。评论获得批准后，您的头像将在评论旁公开显示。",
            },
        ],
    },
    {
        title: { ru: "Медиафайлы", en: "Media", zh: "媒体文件" },
        paragraphs: [
            {
                ru: "Если вы зарегистрированный пользователь и загружаете фотографии на сайт, вам стоит избегать загрузки изображений с метаданными EXIF, так как они могут содержать данные о вашем местоположении по GPS. Посетители могут извлечь эту информацию, скачав изображения с сайта.",
                en: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
                zh: "如果您上传图片至本网站，请避免上传包含地理位置信息（EXIF GPS）的图片。网站访客可以下载并提取网站图片中的位置数据。",
            },
        ],
    },
    {
        title: { ru: "Куки", en: "Cookies", zh: "Cookie" },
        paragraphs: [
            {
                ru: "Если вы оставляете комментарий на нашем сайте, вы можете включить сохранение вашего имени, адреса email и веб-сайта в куки. Это делается для вашего удобства, чтобы не заполнять данные снова при повторном комментировании. Эти куки хранятся в течение одного года.",
                en: "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.",
                zh: "如果您在我们的网站上发表评论，您可以选择保存您的姓名、电子邮件地址和网站至Cookie中。这是为了您的方便，以便您下次发表评论时无需重新填写这些信息。这些Cookie的有效期为一年。",
            },
            {
                ru: "Если у вас есть учётная запись на сайте и вы входите в неё, мы устанавливаем временный куки для определения того, поддерживает ли ваш браузер куки. Он не содержит персональных данных и удаляется при закрытии браузера.",
                en: "If you have an account and you log in to this site, we will set a temporary cookie to determine if your browser accepts cookies. It contains no personal data and is discarded when you close your browser.",
                zh: "如果您拥有账户并登录本网站，我们将设置一个临时Cookie以确定您的浏览器是否接受Cookie。该Cookie不包含任何个人数据，并会在您关闭浏览器后自动删除。",
            },
            {
                ru: "При входе в учётную запись мы также устанавливаем несколько куки с данными входа и настройками экрана. Куки входа хранятся в течение двух дней, куки с настройками экрана — год. Если вы выберете «Запомнить меня», данные о входе будут сохраняться в течение двух недель. При выходе из учётной записи куки входа будут удалены.",
                en: 'When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.',
                zh: "当您登录时，我们还会设置若干Cookie以保存您的登录信息和屏幕显示选项。登录Cookie的有效期为两天，屏幕选项Cookie的有效期为一年。如果您选择“记住我”，您的登录状态将保持两周。如果您退出登录，登录Cookie将被删除。",
            },
        ],
    },
    {
        title: { ru: "Встраиваемое содержимое других веб-сайтов", en: "Embedded content from other websites", zh: "来自其他网站的嵌入内容" },
        paragraphs: [
            {
                ru: "Статьи на этом сайте могут включать встраиваемое содержимое (например, видео, изображения, статьи и т.д.). Подобное содержимое ведёт себя так же, как если бы посетитель зашёл на другой сайт.",
                en: "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.",
                zh: "本网站的文章可能包含嵌入内容（例如视频、图片、文章等）。来自其他网站的嵌入内容的行为方式，与访客直接访问该网站完全相同。",
            },
            {
                ru: "Эти сайты могут собирать данные о вас, использовать куки, внедрять дополнительное отслеживание третьей стороной и следить за вашим взаимодействием с внедрённым содержимым, включая отслеживание, если у вас есть учётная запись и вы авторизованы на том сайте.",
                en: "These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
                zh: "这些网站可能会收集有关您的数据、使用Cookie、嵌入额外的第三方跟踪服务，并监测您与该嵌入内容的互动，包括在您登录该网站账户的情况下跟踪您与嵌入内容的互动。",
            },
        ],
    },
    {
        title: { ru: "С кем мы делимся вашими данными", en: "Who we share your data with", zh: "我们与谁共享您的数据" },
        paragraphs: [
            {
                ru: "Если вы запросите сброс пароля, ваш IP будет указан в email-сообщении о сбросе.",
                en: "If you request a password reset, your IP address will be included in the reset email.",
                zh: "如果您申请重置密码，您的IP地址将包含在重置密码的电子邮件中。",
            },
        ],
    },
    {
        title: { ru: "Как долго мы храним ваши данные", en: "How long we retain your data", zh: "我们保留您数据的时长" },
        paragraphs: [
            {
                ru: "Если вы оставляете комментарий, то сам комментарий и его метаданные сохраняются неопределённо долго. Это делается для того, чтобы автоматически определять и одобрять последующие комментарии, вместо помещения их в очередь на одобрение.",
                en: "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.",
                zh: "如果您发表评论，该评论及其元数据将被无限期保留。这样做是为了我们能够自动识别并批准后续的评论，而不必将其放入审核队列中。",
            },
            {
                ru: "Для пользователей с регистрацией на нашем сайте мы храним ту личную информацию, которую они указывают в своём профиле. Все пользователи могут видеть, редактировать или удалить свою информацию из профиля в любое время (кроме имени пользователя). Администрация веб-сайта также может видеть и изменять эту информацию.",
                en: "For users that register on our website, we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.",
                zh: "对于在本网站注册的用户，我们也会存储他们在个人资料中提供的个人信息。所有用户都可以随时查看、编辑或删除自己的个人信息（但不能更改用户名）。网站管理员也可以查看和编辑这些信息。",
            },
        ],
    },
    {
        title: { ru: "Какие у вас права на ваши данные", en: "What rights you have over your data", zh: "您对自己数据享有的权利" },
        paragraphs: [
            {
                ru: "При наличии учётной записи на сайте или если вы оставляли комментарии, вы можете запросить файл экспорта персональных данных, которые мы сохранили о вас, включая предоставленные вами данные. Вы также можете запросить удаление этих данных — это не включает данные, которые мы обязаны хранить в административных целях, по закону или в целях безопасности.",
                en: "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
                zh: "如果您在本网站拥有账户，或曾发表过评论，您可以要求获取我们保存的关于您的个人数据的导出文件，包括您提供给我们的任何数据。您也可以要求我们删除关于您的任何个人数据。但这不包括我们因行政、法律或安全目的而必须保留的数据。",
            },
        ],
    },
    {
        title: { ru: "Куда мы отправляем ваши данные", en: "Where your data is sent", zh: "我们将您的数据发送至何处" },
        paragraphs: [
            {
                ru: "Комментарии пользователей могут проверяться автоматическим сервисом определения спама.",
                en: "Visitor comments may be checked through an automated spam detection service.",
                zh: "访客评论可能会通过自动化的垃圾评论检测服务进行审核。",
            },
        ],
    },
];
