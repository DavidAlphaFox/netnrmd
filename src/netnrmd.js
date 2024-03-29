﻿/*                                                                          *\
 *  netnrmd编辑器 v2.2.2
 *
 *  Monaco Editor 编辑器 + Marked 解析 + DOMPurify 清洗 + highlight 代码高亮
 *
 *  https://github.com/netnr/netnrmd
 *
 *  Date：2019-08-22
 *
 *  Author：netnr
 *                                                                          */

(function (window) {

    var netnrmd = function (id, obj) { return new netnrmd.fn.init(id, obj) }

    netnrmd.fn = netnrmd.prototype = {
        init: function (id, obj) {
            var that = this;
            obj = obj || {};

            //解析延迟毫秒
            obj.defer = netnrmd.dv(obj.defer, 500);
            //快捷键前缀
            obj.prefixkey = netnrmd.dv(obj.prefixkey, 'Ctrl+');
            //工具栏，svg来源于阿里矢量图标，仅提取单个path的d属性
            obj.items = netnrmd.dv(obj.items,
                [
                    { title: '粗体', cmd: 'bold', key: 'B', svg: "M426.857143 869.142857q42.285714 18.285714 80 18.285714 214.857143 0 214.857143-191.428571 0-65.142857-23.428572-102.857143-15.428571-25.142857-35.142857-42.285714t-38.571428-26.571429-46-14.285714-48-6-54-1.142857q-41.714286 0-57.714286 5.714286 0 30.285714-0.285714 90.857142t-0.285715 90.285715q0 4.571429-0.571428 38.571428t-0.285715 55.142857 2.571429 47.714286 6.857143 38z m-8-426.285714q24 4 62.285714 4 46.857143 0 81.714286-7.428572t62.857143-25.428571 42.571428-51.142857 14.571429-81.142857q0-40-16.571429-70t-45.142857-46.857143T559.428571 140t-70.857142-8q-28.571429 0-74.285715 7.428571 0 28.571429 2.285715 86.285715t2.285714 86.857143q0 15.428571-0.285714 45.714285t-0.285715 45.142857q0 26.285714 0.571429 39.428572z m-309.142857 508l1.142857-53.714286q8.571429-2.285714 48.571428-9.142857t60.571429-15.428571q4-6.857143 7.142857-15.428572t4.857143-19.142857 3.142857-18.571429 1.714286-21.428571 0.285714-19.428571V741.142857q0-561.142857-12.571428-585.714286-2.285714-4.571429-12.571429-8.285714t-25.428571-6.285714-28.285715-4-27.714285-2.571429-17.428572-1.714285l-2.285714-47.428572q56-1.142857 194.285714-6.571428t213.142857-5.428572q13.142857 0 39.142857 0.285714t38.571429 0.285715q40 0 78 7.428571t73.428571 24 61.714286 40.571429 42.285714 59.714285 16 78.571429q0 29.714286-9.428571 54.571429t-22.285714 41.142857T798.857143 412.571429t-41.714286 25.714285-48 22.857143q88 20 146.571429 76.571429t58.571428 141.714285q0 57.142857-20 102.571429t-53.428571 74.571429-78.857143 48.857142T668.571429 933.142857t-100.571429 8q-25.142857 0-75.428571-1.714286t-75.428572-1.714285q-60.571429 0-175.428571 6.285714t-132 6.857143z" },
                    { title: '斜体', cmd: 'italic', key: 'I', svg: "M191.92288 949.728l9.728-48.576q3.424-1.152 46.56-12.288t63.712-21.44q16-20 23.424-57.728 0.576-4 35.424-165.152t65.152-310.56 29.728-169.44l0-14.272q-13.728-7.424-31.136-10.56t-39.712-4.576-33.152-3.136l10.848-58.848q18.848 1.152 68.576 3.712t85.44 4 68.864 1.44q27.424 0 56.288-1.44t69.152-4 56.288-3.712q-2.848 22.272-10.848 50.848-17.152 5.728-58.016 16.288t-62.016 19.136q-4.576 10.848-8 24.288t-5.152 22.848-4.288 26.016-3.712 24q-15.424 84.576-50.016 239.712t-44.288 203.136q-1.152 5.152-7.424 33.152t-11.424 51.424-9.152 47.712-3.424 32.864l0.576 10.272q9.728 2.272 105.728 17.728-1.728 25.152-9.152 56.576-6.272 0-18.56 0.864t-18.56 0.864q-16.576 0-49.728-5.728t-49.152-5.728q-78.848-1.152-117.728-1.152-29.152 0-81.728 5.152t-69.152 6.272z" },
                    { title: '删除', cmd: 'strikethrough', key: 'D', svg: "M1024 512 1024 576 789.504 576C816.992 614.496 832 658.688 832 704 832 774.88 795.328 843.04 731.424 890.976 672.064 935.488 594.144 960 512 960 429.856 960 351.936 935.488 292.576 890.976 228.672 843.04 192 774.88 192 704L320 704C320 773.376 407.936 832 512 832 616.064 832 704 773.376 704 704 704 634.624 616.064 576 512 576L0 576 0 512 299.52 512C297.184 510.336 294.848 508.672 292.576 506.976 228.672 459.04 192 390.88 192 320 192 249.12 228.672 180.96 292.576 133.024 351.936 88.512 429.856 64 512 64 594.144 64 672.064 88.512 731.424 133.024 795.328 180.96 832 249.12 832 320L704 320C704 250.624 616.064 192 512 192 407.936 192 320 250.624 320 320 320 389.376 407.936 448 512 448 590.976 448 666.048 470.688 724.48 512L1024 512Z" },
                    { title: '标题', cmd: 'header', key: 'H', svg: "M961.142857 950.857143q-25.142857 0-75.714286-2t-76.285714-2q-25.142857 0-75.428571 2t-75.428571 2q-13.714286 0-21.142857-11.714286t-7.428571-26q0-17.714286 9.714286-26.285714t22.285714-9.714286 29.142857-4 25.714286-8.571429q18.857143-12 18.857143-80l-0.571429-223.428571q0-12-0.571429-17.714286-7.428571-2.285714-28.571429-2.285714l-385.714286 0q-21.714286 0-29.142857 2.285714-0.571429 5.714286-0.571429 17.714286l-0.571429 212q0 81.142857 21.142857 93.714286 9.142857 5.714286 27.428571 7.428571t32.571429 2 25.714286 8.571429 11.428571 26q0 14.857143-7.142857 27.428571t-20.857143 12.571429q-26.857143 0-79.714286-2t-79.142857-2q-24.571429 0-73.142857 2t-72.571429 2q-13.142857 0-20.285714-12t-7.142857-25.714286q0-17.142857 8.857143-25.714286t20.571429-10 27.142857-4.285714 24-8.571429q18.857143-13.142857 18.857143-81.714286l-0.571429-32.571429 0-464.571429q0-1.714286 2.857143-14.857143t0-20.857143-0.857143-22-2-24-3.714286-20.857143-6.285714-18-9.142857-10.285714q-8.571429-5.714286-25.714286-6.857143t-30.285714-1.142857-23.428571-8-10.285714-25.714286q0-14.857143 6.857143-27.428571t20.571429-12.571429q26.285714 0 79.142857 2t79.142857 2q24 0 72.285714-2t72.285714-2q14.285714 0 21.428571 12.571429t7.142857 27.428571q0 17.142857-9.714286 24.857143t-22 8.285714-28.285714 2.285714-24.571429 7.428571q-20 12-20 91.428571l0.571429 182.857143q0 12 0.571429 18.285714 7.428571 1.714286 22.285714 1.714286l399.428571 0q14.285714 0 21.714286-1.714286 0.571429-6.285714 0.571429-18.285714l0.571429-182.857143q0-79.428571-20-91.428571-10.285714-6.285714-33.428571-7.142857t-37.714286-7.428571-14.571429-28.285714q0-14.857143 7.142857-27.428571t21.428571-12.571429q25.142857 0 75.428571 2t75.428571 2q24.571429 0 73.714286-2t73.714286-2q14.285714 0 21.428571 12.571429t7.142857 27.428571q0 17.142857-10 25.142857t-22.857143 8.285714-29.428571 1.714286-25.142857 7.142857q-20 13.142857-20 92l0.571429 538.857143q0 68 19.428571 80 9.142857 5.714286 26.285714 7.714286t30.571429 2.571429 23.714286 8.857143 10.285714 25.428571q0 14.857143-6.857143 27.428571t-20.571429 12.571429z" },
                    { title: '引用', cmd: 'quote', key: 'Q', svg: "M475.428571 548.571429v219.428571q0 45.714286-32 77.714286t-77.714285 32H146.285714q-45.714286 0-77.714285-32T36.571429 768V365.714286q0-59.428571 23.142857-113.428572T122.285714 158.857143t93.428572-62.571429T329.142857 73.142857h36.571429q14.857143 0 25.714285 10.857143t10.857143 25.714286v73.142857q0 14.857143-10.857143 25.714286t-25.714285 10.857142h-36.571429q-60.571429 0-103.428571 42.857143t-42.857143 103.428572v18.285714q0 22.857143 16 38.857143t38.857143 16h128q45.714286 0 77.714285 32t32 77.714286z m512 0v219.428571q0 45.714286-32 77.714286t-77.714285 32h-219.428572q-45.714286 0-77.714285-32t-32-77.714286V365.714286q0-59.428571 23.142857-113.428572T634.285714 158.857143t93.428572-62.571429T841.142857 73.142857h36.571429q14.857143 0 25.714285 10.857143t10.857143 25.714286v73.142857q0 14.857143-10.857143 25.714286t-25.714285 10.857142h-36.571429q-60.571429 0-103.428571 42.857143t-42.857143 103.428572v18.285714q0 22.857143 16 38.857143t38.857143 16h128q45.714286 0 77.714285 32t32 77.714286z" },
                    { title: '有序列表', cmd: 'list-ol', key: 'O', svg: "M6.526 279.054c0-14.954 7.834-23.144 23.146-23.144h30.262V176.156c0-10.326 1.068-21.006 1.068-21.006h-0.712s-3.558 5.34-5.696 7.476c-8.902 8.546-21.008 8.902-31.332-2.136l-11.036-12.462c-10.684-10.682-9.968-22.432 1.068-32.758l43.44-39.876C65.63 67.204 73.464 64 85.57 64H109.78c15.312 0 23.498 7.832 23.498 23.144v168.768h30.976c15.31 0 23.144 8.188 23.144 23.144v17.802c0 14.954-7.834 23.144-23.144 23.144H29.672c-15.312 0-23.146-8.19-23.146-23.144v-17.804zM4.422 609.182c0-94.556 101.91-112.766 101.91-138.33 0-14.36-11.908-17.51-18.56-17.51-6.306 0-12.958 2.102-18.91 7.704-10.158 9.806-21.014 14.008-32.222 4.902l-17.158-13.658c-11.558-9.106-14.36-19.61-5.606-30.818C27.184 403.962 52.05 384 94.774 384c38.874 0 88.952 21.012 88.952 79.146 0 76.694-93.506 92.804-97.358 113.818h78.098c15.058 0 23.114 8.054 23.114 22.764v17.51c0 14.708-8.056 22.764-23.114 22.764h-135.88c-14.01 0-24.166-8.056-24.166-22.764v-8.056zM11.308 909.22l11.206-18.56c7.706-13.308 18.21-14.008 31.168-6.304 9.806 4.202 19.26 6.304 28.718 6.304 20.31 0 28.716-7.004 28.716-16.46 0-13.308-11.208-18.212-31.868-18.212h-9.456c-11.908 0-18.56-4.202-24.516-15.76l-2.1-3.852c-4.902-9.456-2.452-19.612 5.602-29.768l11.208-14.008c13.658-16.81 24.514-26.966 24.514-26.966v-0.7s-8.406 2.102-25.216 2.102H33.37c-15.06 0-22.766-8.056-22.766-22.764v-17.51c0-15.06 7.706-22.764 22.766-22.764h116.968c15.058 0 22.764 8.054 22.764 22.764v6.654c0 11.556-2.802 19.612-10.158 28.366l-35.018 40.274c39.222 10.156 57.432 40.974 57.432 69.69 0 42.726-28.716 88.252-97.006 88.252-33.272 0-56.384-9.456-71.792-18.91-11.558-8.404-12.608-19.61-5.252-31.868zM288 264h704c17.674 0 32-14.326 32-32V152c0-17.674-14.326-32-32-32H288c-17.674 0-32 14.326-32 32v80c0 17.674 14.326 32 32 32z m0 320h704c17.674 0 32-14.326 32-32v-80c0-17.674-14.326-32-32-32H288c-17.674 0-32 14.326-32 32v80c0 17.674 14.326 32 32 32z m0 320h704c17.674 0 32-14.326 32-32v-80c0-17.674-14.326-32-32-32H288c-17.674 0-32 14.326-32 32v80c0 17.674 14.326 32 32 32z" },
                    { title: '无序列表', cmd: 'list-ul', key: 'U', svg: "M219.428571 804.571429q0 45.714286-32 77.714286t-77.714286 32-77.714286-32-32-77.714286 32-77.714286 77.714286-32 77.714286 32 32 77.714286zm0-292.571429q0 45.714286-32 77.714286t-77.714286 32-77.714286-32-32-77.714286 32-77.714286 77.714286-32 77.714286 32 32 77.714286zm804.571429 237.714286l0 109.714286q0 7.428571-5.428571 12.857143t-12.857143 5.428571l-694.857143 0q-7.428571 0-12.857143-5.428571t-5.428571-12.857143l0-109.714286q0-7.428571 5.428571-12.857143t12.857143-5.428571l694.857143 0q7.428571 0 12.857143 5.428571t5.428571 12.857143zm-804.571429-530.285714q0 45.714286-32 77.714286t-77.714286 32-77.714286-32-32-77.714286 32-77.714286 77.714286-32 77.714286 32 32 77.714286zm804.571429 237.714286l0 109.714286q0 7.428571-5.428571 12.857143t-12.857143 5.428571l-694.857143 0q-7.428571 0-12.857143-5.428571t-5.428571-12.857143l0-109.714286q0-7.428571 5.428571-12.857143t12.857143-5.428571l694.857143 0q7.428571 0 12.857143 5.428571t5.428571 12.857143zm0-292.571429l0 109.714286q0 7.428571-5.428571 12.857143t-12.857143 5.428571l-694.857143 0q-7.428571 0-12.857143-5.428571t-5.428571-12.857143l0-109.714286q0-7.428571 5.428571-12.857143t12.857143-5.428571l694.857143 0q7.428571 0 12.857143 5.428571t5.428571 12.857143z" },
                    { title: '选中', cmd: 'checked', svg: "M763.1 69.5H265.8c-112.1 0-202.9 90.8-202.9 202.9v497.3c0 112.1 90.8 202.9 202.9 202.9h497.3c112.1 0 202.9-90.8 202.9-202.9V272.5c0-112.1-90.8-203-202.9-203zM442 742.8L204.3 505.1l84.9-84.9 155.9 155.9L743 299.3l81.7 87.9L442 742.8z" },
                    { title: '未选中', cmd: 'unchecked', svg: "M237.397333 160c-29.866667 0-40.106667 1.962667-50.645333 7.594667a45.568 45.568 0 0 0-19.157333 19.157333c-5.632 10.538667-7.594667 20.778667-7.594667 50.645333v549.205334c0 29.866667 1.962667 40.106667 7.594667 50.645333 4.48 8.32 10.837333 14.677333 19.157333 19.157333 10.538667 5.632 20.778667 7.594667 50.645333 7.594667h549.205334c29.866667 0 40.106667-1.962667 50.645333-7.594667 8.32-4.48 14.677333-10.837333 19.157333-19.157333 5.632-10.538667 7.594667-20.778667 7.594667-50.645333V237.397333c0-29.866667-1.962667-40.106667-7.594667-50.645333a45.568 45.568 0 0 0-19.157333-19.157333c-10.538667-5.632-20.778667-7.594667-50.645333-7.594667H237.397333z m0-64h549.205334c39.509333 0 59.733333 3.925333 80.853333 15.189333 19.456 10.410667 34.944 25.898667 45.354667 45.354667 11.264 21.077333 15.189333 41.344 15.189333 80.853333v549.205334c0 39.509333-3.925333 59.733333-15.189333 80.853333-10.410667 19.456-25.898667 34.944-45.354667 45.354667-21.077333 11.264-41.344 15.189333-80.853333 15.189333H237.397333c-39.509333 0-59.733333-3.925333-80.853333-15.189333a109.525333 109.525333 0 0 1-45.354667-45.354667c-11.264-21.077333-15.189333-41.344-15.189333-80.853333V237.397333c0-39.509333 3.925333-59.733333 15.189333-80.853333 10.410667-19.456 25.898667-34.944 45.354667-45.354667 21.077333-11.264 41.344-15.189333 80.853333-15.189333z" },
                    { title: '链接', cmd: 'link', key: 'L', svg: "M911.513786 71.375501l-3.854828-3.854828c-90.007168-90.007168-237.286062-90.007168-327.29323 0L371.837905 276.048496c-90.007168 90.007168-90.007168 237.255468 0 327.262636l3.854828 3.854828c7.495498 7.495498 15.449905 14.256744 23.649062 20.528487l76.331708-76.331708c-8.902816-5.262146-17.316131-11.533889-24.964599-19.182357l-3.854828-3.854828c-48.858412-48.858412-48.858412-128.371882 0-177.230293L655.3819 142.536844c48.858412-48.858412 128.371882-48.858412 177.230293 0l3.854828 3.854828c48.858412 48.858412 48.858412 128.402476 0 177.230293l-94.351497 94.351497c16.367721 40.445097 24.138564 83.551861 23.465499 126.566843l145.90217-145.90217C1001.49036 308.630968 1001.49036 161.352074 911.513786 71.375501zM603.311132 371.837905c-7.495498-7.495498-15.449905-14.256744-23.649062-20.497893l-76.331708 76.331708c8.902816 5.262146 17.316131 11.533889 24.964599 19.182357l3.854828 3.854828c48.858412 48.858412 48.858412 128.371882 0 177.230293L323.621965 836.497615c-48.858412 48.858412-128.371882 48.858412-177.230293 0l-3.854828-3.854828c-48.858412-48.858412-48.858412-128.371882 0-177.230293l94.351497-94.351497c-16.367721-40.445097-24.138564-83.551861-23.465499-126.566843l-145.90217 145.90217c-90.007168 90.007168-90.007168 237.286062 0 327.29323l3.854828 3.854828c90.007168 90.007168 237.286062 90.007168 327.29323 0l208.527823-208.527823c90.007168-90.007168 90.007168-237.286062 0-327.29323L603.311132 371.837905z" },
                    { title: '图片', cmd: 'image', key: 'G', svg: "M928 896H96c-53.02 0-96-42.98-96-96V224c0-53.02 42.98-96 96-96h832c53.02 0 96 42.98 96 96v576c0 53.02-42.98 96-96 96zM224 240c-61.856 0-112 50.144-112 112s50.144 112 112 112 112-50.144 112-112-50.144-112-112-112zM128 768h768V544l-175.03-175.03c-9.372-9.372-24.568-9.372-33.942 0L416 640l-111.03-111.03c-9.372-9.372-24.568-9.372-33.942 0L128 672v96z" },
                    { title: '表格', cmd: 'table', key: 'T', svg: "M329.142857 786.285714l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm0-219.428571l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm292.571429 219.428571l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm-292.571429-438.857143l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm292.571429 219.428571l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm292.571429 219.428571l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm-292.571429-438.857143l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm292.571429 219.428571l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm0-219.428571l0-109.714286q0-8-5.142857-13.142857t-13.142857-5.142857l-182.857143 0q-8 0-13.142857 5.142857t-5.142857 13.142857l0 109.714286q0 8 5.142857 13.142857t13.142857 5.142857l182.857143 0q8 0 13.142857-5.142857t5.142857-13.142857zm73.142857-182.857143l0 621.714286q0 37.714286-26.857143 64.571429t-64.571429 26.857143l-768 0q-37.714286 0-64.571429-26.857143t-26.857143-64.571429l0-621.714286q0-37.714286 26.857143-64.571429t64.571429-26.857143l768 0q37.714286 0 64.571429 26.857143t26.857143 64.571429z" },
                    { title: '代码', cmd: 'code', key: 'K', svg: "M352.548571 799.451429l-28.598857 28.598857q-5.705143 5.705143-13.165714 5.705143t-13.165714-5.705143l-266.313143-266.313143q-5.705143-5.705143-5.705143-13.165714t5.705143-13.165714l266.313143-266.313143q5.705143-5.705143 13.165714-5.705143t13.165714 5.705143l28.598857 28.598857q5.705143 5.705143 5.705143 13.165714t-5.705143 13.165714l-224.548571 224.548571 224.548571 224.548571q5.705143 5.705143 5.705143 13.165714t-5.705143 13.165714zM690.322286 189.732571l-213.138286 737.718857q-2.267429 7.460571-8.850286 11.117714t-13.458286 1.462857l-35.401143-9.728q-7.460571-2.267429-11.117714-8.850286t-1.462857-13.970286l213.138286-737.718857q2.267429-7.460571 8.850286-11.117714t13.458286-1.462857l35.401143 9.728q7.460571 2.267429 11.117714 8.850286t1.462857 13.970286zM1065.691429 561.737143l-266.313143 266.313143q-5.705143 5.705143-13.165714 5.705143t-13.165714-5.705143l-28.598857-28.598857q-5.705143-5.705143-5.705143-13.165714t5.705143-13.165714l224.548571-224.548571-224.548571-224.548571q-5.705143-5.705143-5.705143-13.165714t5.705143-13.165714l28.598857-28.598857q5.705143-5.705143 13.165714-5.705143t13.165714 5.705143l266.313143 266.313143q5.705143 5.705143 5.705143 13.165714t-5.705143 13.165714z" },
                    { title: '分隔线', cmd: 'line', key: 'R', svg: "M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" },
                    { title: '帮助', cmd: 'question', cmd: 'help', svg: "M426.666667 810.666667h128v128h-128v-128m85.333333-725.333334c228.266667 9.386667 327.68 239.786667 192 412.586667-35.413333 42.666667-92.586667 70.826667-120.746667 106.666667C554.666667 640 554.666667 682.666667 554.666667 725.333333h-128c0-71.253333 0-131.413333 28.586666-174.08 28.16-42.666667 85.333333-67.84 120.746667-96C679.253333 359.68 653.653333 224.426667 512 213.333333a128 128 0 0 0-128 128H256a256 256 0 0 1 256-256z" },
                    { title: '全屏', cmd: 'fullscreen', key: 'M', float: 'right', svg: "M639.328 416c8.032 0 16.096-3.008 22.304-9.056l202.624-197.184-0.8 143.808c-0.096 17.696 14.144 32.096 31.808 32.192 0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808l1.248-222.208c0-0.672-0.352-1.248-0.384-1.92 0.032-0.512 0.288-0.896 0.288-1.408 0.032-17.664-14.272-32-31.968-32.032L671.552 96l-0.032 0c-17.664 0-31.968 14.304-32 31.968C639.488 145.632 653.824 160 671.488 160l151.872 0.224-206.368 200.8c-12.672 12.32-12.928 32.608-0.64 45.248C622.656 412.736 630.976 416 639.328 416zM896.032 639.552 896.032 639.552c-17.696 0-32 14.304-32.032 31.968l-0.224 151.872-200.832-206.4c-12.32-12.64-32.576-12.96-45.248-0.64-12.672 12.352-12.928 32.608-0.64 45.248l197.184 202.624-143.808-0.8c-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808-0.096 17.696 14.144 32.096 31.808 32.192l222.24 1.248c0.064 0 0.128 0 0.192 0 0.64 0 1.12-0.32 1.76-0.352 0.512 0.032 0.896 0.288 1.408 0.288l0.032 0c17.664 0 31.968-14.304 32-31.968L928 671.584C928.032 653.952 913.728 639.584 896.032 639.552zM209.76 159.744l143.808 0.8c0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808 0.096-17.696-14.144-32.096-31.808-32.192L131.68 95.328c-0.064 0-0.128 0-0.192 0-0.672 0-1.248 0.352-1.888 0.384-0.448 0-0.8-0.256-1.248-0.256 0 0-0.032 0-0.032 0-17.664 0-31.968 14.304-32 31.968L96 352.448c-0.032 17.664 14.272 32 31.968 32.032 0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968l0.224-151.936 200.832 206.4c6.272 6.464 14.624 9.696 22.944 9.696 8.032 0 16.096-3.008 22.304-9.056 12.672-12.32 12.96-32.608 0.64-45.248L209.76 159.744zM362.368 617.056l-202.624 197.184 0.8-143.808c0.096-17.696-14.144-32.096-31.808-32.192-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808l-1.248 222.24c0 0.704 0.352 1.312 0.384 2.016 0 0.448-0.256 0.832-0.256 1.312-0.032 17.664 14.272 32 31.968 32.032L352.448 928c0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968s-14.272-32-31.968-32.032l-151.936-0.224 206.4-200.832c12.672-12.352 12.96-32.608 0.64-45.248S375.008 604.704 362.368 617.056z" },
                    { title: '分屏', cmd: 'splitscreen', float: 'right', svg: "M416 96v384H141.984l105.024-104.992L200.96 328.96l-160 160L19.008 512l21.984 23.008 160 160L247.04 648.96 141.984 544H416v384h64V96h-64z m128 0v832h64V544h274.016l-105.024 104.992 46.016 46.016 160-160 21.984-23.008-21.984-23.008-160-160-46.016 46.016L882.016 480H608V96h-64z" }
                ]);

            //预览提示文字
            obj.ph = netnrmd.dv(obj.ph, "预览区域");

            //Monaco Editor容器
            obj.mebox = $(id);

            //编辑器父容器
            obj.container = obj.mebox.parent();

            //渲染前回调
            if (typeof obj.viewbefore == "function") {
                obj.viewbefore.call(obj)
            }

            //工具条
            var lis = [];
            $(obj.items).each(function () {
                var lcs = this.float == "right" ? 'float-right' : '',
                    keytip = this.title + "/" + this.cmd + " " + (this.key ? obj.prefixkey + this.key : '');
                lis.push('<li class="' + lcs + '" data-cmd="' + this.cmd + '" title="' + keytip + '">');
                lis.push('<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">');
                lis.push('<path d="' + this.svg + '"></path></svg>');
                lis.push('</li>');
            });
            //工具条加持命令响应
            obj.toolbar = $('<div class="netnrmd-toolbar"><ul class="netnrmd-menu"></li></div>').children().append($(lis.join(''))).click(function (e) {
                e = e || window.event;
                var target = e.target || window.event.target;
                if (target.nodeName == "LI") {
                    var cmdname = target.getAttribute('data-cmd');
                    //执行命令
                    netnrmd.cmd(cmdname, that);
                }
            }).end();
            //写
            obj.write = $('<div class="netnrmd-write"></div>').append(obj.mebox);
            //视图
            obj.view = $('<div class="markdown-body netnrmd-view"></div>');
            //编辑器
            obj.editor = $('<div class="netnrmd"></div>').append(obj.toolbar).append(obj.write).append(obj.view);

            //载入编辑器
            obj.container.append(obj.editor);

            //Monaco Editor对象
            obj.me = monaco.editor.create(obj.mebox[0], {
                language: 'markdown',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                minimap: { enabled: false }
            });

            //编辑器内容变动回调
            obj.me.onDidChangeModelContent(function () {
                if (typeof obj.input == "function" && obj.input.call(that) == false) {
                    return false;
                }

                //自动保存
                if (obj.autosave) {
                    that.setstore();
                }

                //渲染
                that.render();
            });

            //滚动条同步
            obj.me.onDidScrollChange(function (sc) {
                var hratio = sc.scrollTop / (sc.scrollHeight - obj.mebox.height() - 4);
                obj.view[0].scrollTop = (obj.view[0].scrollHeight - obj.view.height()) * hratio;
            });

            //按键事件监听
            $.each(obj.items, function () {
                var item = this;
                if (item.key) {
                    obj.me.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode["KEY_" + item.key], function () {
                        //执行命令
                        netnrmd.cmd(item.cmd, that);
                    })
                }
            });

            this.obj = obj;

            //初始化响应配置

            //全屏
            this.toggleFullScreen(obj.fullscreen = netnrmd.dv(obj.fullscreen, false));
            $(window).resize(function () {
                if (obj.fullscreen) {
                    that.height($(window).height(), true);
                }
            });
            //视图模式：1输入|2分屏|3预览
            obj.viewmodel = netnrmd.dv(obj.viewmodel, 2);
            //高度
            this.height(obj.height = netnrmd.dv(obj.height, 250));
            //本地保存键
            obj.storekey = netnrmd.dv(obj.storekey, "netnrmd_markdown");
            //本地自动保存
            obj.autosave = netnrmd.dv(obj.autosave, true);
            //载入本地保存
            if (obj.autosave > 0) {
                this.getstore();
            }
            obj.mebox.data('netnrmd', this);
            return this;
        },
        //获取焦点
        focus: function () {
            this.obj.me.focus();
            return this;
        },
        //设置高度
        height: function (height, force) {
            if (height != null) {
                if (force || !this.obj.fullscreen) {
                    !this.obj.fullscreen && (this.obj.height = height);
                    var weh = height - (this.obj.toolbar.is(':hidden') ? 0 : this.obj.toolbar.outerHeight());
                    this.obj.write.css('height', weh);
                    this.obj.mebox.css('height', weh);
                    this.obj.view.css('height', weh);
                }
                return this;
            } else {
                return this.obj.height;
            }
        },
        //全屏切换
        toggleFullScreen: function (fullscreen) {
            var obj = this.obj, tit = this.getToolItemTarget('fullscreen');
            obj.fullscreen = !obj.fullscreen;
            if (fullscreen != null) {
                obj.fullscreen = fullscreen;
            }
            if (!obj.fullscreen) {
                obj.editor.removeClass('netnrmd-fullscreen');
                $(tit).removeClass('active');
                this.height(obj.height, true);
            } else {
                obj.editor.addClass('netnrmd-fullscreen');
                $(tit).addClass('active');
                this.height($(window).height(), true);
            }
        },
        //分屏切换
        toggleSplitScreen: function (splitscreen) {
            var obj = this.obj;
            obj.splitscreen = !obj.splitscreen;
            if (splitscreen != null) {
                obj.splitscreen = splitscreen;
            }
            if (!obj.splitscreen) {
                this.togglePreview(0);

                obj.write.addClass('netnrmd-write-w100');
                obj.view.addClass('netnrmd-view-hidden');
            } else {
                obj.write.removeClass('netnrmd-write-w100');
                obj.view.removeClass('netnrmd-view-hidden');
            }
        },
        //预览切换
        togglePreview: function (preview) {
            var obj = this.obj;
            obj.preview = !obj.preview;
            if (preview != null) {
                obj.preview = preview;
            }
            if (obj.preview) {
                this.toggleSplitScreen(1);
                obj.write.addClass('netnrmd-write-hidden');
                obj.view.addClass('netnrmd-view-w100');
            } else {
                obj.write.removeClass('netnrmd-write-hidden');
                obj.view.removeClass('netnrmd-view-w100');
            }
        },
        //视图切换
        toggleView: function (n) {
            if (n == null) {
                n = this.obj.viewmodel - 1;
                if (n < 1) {
                    n = 3;
                }
            }
            this.obj.viewmodel = n;
            switch (n) {
                case 1:
                    this.togglePreview(0);
                    this.toggleSplitScreen(0);
                    break;
                case 2:
                    this.togglePreview(0);
                    this.toggleSplitScreen(1);
                    break;
                case 3:
                    this.toggleSplitScreen(0);
                    this.togglePreview(1);
                    break;
            }
        },
        //根据命令获取工具条的对象
        getToolItemTarget: function (cmd) {
            var target;
            this.obj.toolbar.find('li').each(function () {
                if (this.getAttribute('data-cmd') == cmd) {
                    target = this;
                    return false;
                }
            });
            return target;
        },
        //赋值md
        setmd: function (md) {
            this.obj.me.setValue(md);
            return this;
        },
        //获取md
        getmd: function () {
            return this.obj.me.getValue();
        },
        //呈现html
        sethtml: function (html) {
            this.obj.view.html(html);
            return this;
        },
        //获取html
        gethtml: function () {
            return this.obj.view.html();
        },
        //清理md、html、本地缓存
        clear: function () {
            this.setmd('');
            this.sethtml('<div class="netnrmd-view-empty">' + this.obj.ph + '</div>');
            this.setstore();
        },
        //渲染
        render: function () {
            var that = this;
            clearTimeout(that.obj.deferIndex);
            that.obj.deferIndex = setTimeout(function () {
                var md = that.getmd();
                if (md == "") {
                    that.clear();
                } else {
                    that.sethtml(netnrmd.render(md));
                }
            }, that.obj.defer);
        },
        //隐藏
        hide: function (area) {
            switch (area) {
                case "toolbar":
                    this.obj.toolbar.hide();
                    break;
                default:
                    this.obj.editor.hide();
            }
        },
        //显示
        show: function (area) {
            switch (area) {
                case "toolbar":
                    this.obj.toolbar.show();
                    break;
                default:
                    this.obj.editor.show();
            }
        },
        //写入本地保存
        setstore: function () {
            localStorage[this.obj.storekey] = this.getmd();
        },
        //获取本地保存
        getstore: function () {
            var md = localStorage[this.obj.storekey]
            if (md) {
                this.setmd(md);
                this.render();
            }
        }
    }

    netnrmd.fn.init.prototype = netnrmd.fn;

    /**
     * 命令
     * @param {any} cmdname 命名名称
     * @param {any} that netnrmd创建的对象
     */
    netnrmd.cmd = function (cmdname, that) {

        var obj = that.obj;

        //执行命令前回调
        if (typeof obj.cmdcallback == "function") {
            if (obj.cmdcallback.call(that, cmdname) == false) {
                return false;
            }
        }

        //允许响应命令
        if (obj.preview && "help,preview,splitscreen,fullscreen".indexOf(cmdname) == -1) {
            return false;
        }

        var ops = {
            me: obj.me,
            cmd: cmdname,
            txt: obj.mebox,
            before: '',
            dv: '',
            after: '',
            //执行公共插入
            isdo: true
        }
        switch (cmdname) {
            case "bold":
                ops.before = '**';
                ops.dv = '粗体';
                ops.after = '**';
                break;
            case "italic":
                ops.before = '_';
                ops.dv = '斜体';
                ops.after = '_';
                break;
            case "strikethrough":
                ops.before = '~~';
                ops.dv = '删除';
                ops.after = '~~';
                break;
            case "header":
                ops.dv = '标题';
                ops.before = '### ';
                break;
            case "quote":
                ops.before = '> ';
                break;
            case "list-ol":
                ops.before = '1. ';
                ops.dv = '列表文本';
                break;
            case "list-ul":
                ops.before = '- ';
                ops.dv = '列表文本';
                break;
            case "checked":
                ops.before = '- [x] ';
                ops.dv = '列表文本';
                break;
            case "unchecked":
                ops.before = '- [ ] ';
                ops.dv = '列表文本';
                break;
            case "link":
                ops.before = '[链接说明](';
                ops.dv = 'https://';
                ops.after = ')';
                break;
            case "image":
                ops.before = '![图片说明](';
                ops.dv = 'https://';
                ops.after = ')';
                break;
            case "table":
                var cols = ' col 1 | col 2 | col 3 ', hd = ' ---- | ---- | ---- ', nl = '\r\n';
                ops.before = cols + nl + hd + nl + cols + nl + cols + nl + nl;
                break;
            case "code":
                {
                    if (obj.me.getSelection().startColumn == 1) {
                        ops.before = '```\n';
                        ops.after = '\n```';
                    } else {
                        ops.before = '`';
                        ops.after = '`';
                    }
                    ops.dv = '输入代码';
                }
                break;
            case "line":
                ops.before = '---\r\n';
                break;
            case "help":
                ops.isdo = false;
                window.open('https://netnr.gitee.io/markdownguide/', '_blank');
                break;
            case "fullscreen":
                ops.isdo = false;
                obj.mebox.data('netnrmd').toggleFullScreen();
                break;
            case "splitscreen":
                ops.isdo = false;
                obj.mebox.data('netnrmd').toggleView();
                break;
            default:
                ops.isdo = false;
                break;
        }

        if (ops.isdo && ops.cmd && ops.cmd != "") {
            var before = ops.before, dv = ops.dv, after = ops.after;
            var gse = ops.me.getSelection();
            var text = netnrmd.getSelectText(ops.me);
            if (text.join('').trim() == "") {
                text = dv;
            } else {
                text = text.join('\n');
            }

            netnrmd.insertAfterText(ops.me, before + text + after);

            var startPos = gse.startColumn + before.length,
                endPos = startPos + text.length,
                startLine = gse.startLineNumber,
                addline = before.split('\n').length - 1;
            //有换行时选择下一行
            if (addline) {
                startLine += addline;
                startPos = 0;
                endPos = 99;
            }
            netnrmd.setSelectText(ops.me, startLine, startPos, startLine, endPos);

            //编辑器内容变动回调
            var that = ops.txt.data('netnrmd'), obj = that.obj;
            if (typeof obj.input == "function" && obj.input.call(that) == false) {
                return false;
            }
            that.render();
        }
    };

    /**
     * 默认值
     * @param {any} obj 对象
     * @param {any} v 默认值
     */
    netnrmd.dv = function (obj, v) {
        return (obj == null || obj == undefined) ? v : obj;
    }

    /**
     * 解析Markdown
     * @param {any} md
     */
    netnrmd.render = function (md) {
        return DOMPurify.sanitize(marked(md, {
            headerIds: false,
            highlight: function (str, lang) {
                if (window.hljs && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (__) { }
                }
                try {
                    return hljs.highlightAuto(str).value;
                } catch (__) { }
                return '';
            }
        }))
    }

    /**
     * 获取选中文字
     * @param {any} me Monaco Editor 对象
     */
    netnrmd.getSelectText = function (me) {
        var gse = me.getSelection(), gm = me.getModel(), rows = [];
        if (gse.startLineNumber == gse.endLineNumber) {
            var row = gm.getLineContent(gse.startLineNumber);
            row = row.substring(gse.startColumn - 1, gse.endColumn - 1);
            rows.push(row)
        } else {
            for (var i = gse.startLineNumber; i <= gse.endLineNumber; i++) {
                var row = gm.getLineContent(i);
                if (i == gse.startLineNumber) {
                    row = row.substring(gse.startColumn - 1);
                }
                if (i == gse.endLineNumber) {
                    row = row.substring(0, gse.endColumn - 1);
                }
                rows.push(row);
            }
        }
        return rows;
    }

    /**
     * 选中特定范围的文本
     * @param {any} me Monaco Editor 对象
     * @param {any} startRow 开始行
     * @param {any} startPos 开始列
     * @param {any} endRow 结束行
     * @param {any} endPos 结束列
     */
    netnrmd.setSelectText = function (me, startRow, startPos, endRow, endPos) {
        me.setSelection(new monaco.Selection(startRow, startPos, endRow, endPos));
        me.focus();
    }

    /**
     * 在光标后插入文本
     * @param {any} me Monaco Editor 对象
     * @param {any} text 文本
     */
    netnrmd.insertAfterText = function (me, text) {
        var gse = me.getSelection();
        var range = new monaco.Range(gse.startLineNumber, gse.startColumn, gse.endLineNumber, gse.endColumn);
        var op = { identifier: { major: 1, minor: 1 }, range: range, text: text, forceMoveMarkers: true };
        me.executeEdits("", [op]);
        me.focus();
    }

    /**
     * 弹窗
     * @param {any} title 标题
     * @param {any} content 内容主体
     */
    netnrmd.popup = function (title, content) {
        var pp = document.createElement("div");

        var htm = [];
        htm.push('<div class="np-card">');
        htm.push('<div class="np-header">');
        htm.push('<a class="np-close" href="javascript:void(0);" title="关闭">✖</a>');
        htm.push(title + '</div>');
        htm.push('<div class="np-body">' + content + '</div>');
        htm.push('</div>');

        pp.className = "netnrmd-popup";
        pp.innerHTML = htm.join('');
        document.body.appendChild(pp);
        $(pp).click(function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!this.children[0].contains(target)) {
                $(this).hide();
            }
        }).find('.np-close').click(function () {
            $(pp).hide();
        })
        return pp;
    }

    window.netnrmd = netnrmd;

})(window);