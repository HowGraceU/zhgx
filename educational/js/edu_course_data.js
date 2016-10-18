jsonpCallback({
    "resp": {
        "result": true,
        "err": "0"
    },
    "pubTermList": [
        {
            "term": "第一学期",
            "year": "2016-2017学年",
            //从后台获取数据的时候，需要后台添加这两项以及添加一个接口，接口作用为上次start（开学日期）就修改start（开学日期），上次jieshu（最大节数）则修改jieshu（最大节数）
            "start": '2016-9-4',
            "jieshu": 16,
            //分割线
            "pubCourseList": [
                {
                    "id": "1",
                    "course": "线性代数",
                    "week": "双周",
                    "pitchNo": "周一6到7",
                    "building": "玉泉教4号楼",
                    "room": "404"
                },
                {
                    "id": "2",
                    "course": "大学英语1",
                    "week": "双周",
                    "pitchNo": "周一5到6",
                    "building": "玉泉教4号楼",
                    "room": "404"
                },
                {
                    "id": "17",
                    "course": "科学计算",
                    "week": "1,6,7,10",
                    "pitchNo": "周二1到2",
                    "building": "玉泉教4号楼",
                    "room": "404"
                }
            ]
        },
        {
            "term": "第二学期",
            "year": "2016-2017学年",
            //从后台获取数据的时候，需要后台添加这两项以及添加一个接口，接口作用为上次start（开学日期）就修改start（开学日期），上次jieshu（最大节数）则修改jieshu（最大节数）
            "start": '2017-02-26',
            "jieshu": 16,
            //分割线
            "pubCourseList": [
                {
                    "id": "23",
                    "course": "行政法",
                    "week": "双周",
                    "pitchNo": "周五9到11",
                    "building": "玉泉教4号楼",
                    "room": "404"
                },
                {
                    "id": "1",
                    "course": "线性代数",
                    "week": "双周",
                    "pitchNo": "周一6到7",
                    "building": "玉泉教4号楼",
                    "room": "404"
                },
                {
                    "id": "24",
                    "course": "C语言",
                    "week": "2,7,15,20",
                    "pitchNo": "周五2到4",
                    "building": "玉泉教4号楼",
                    "room": "404"
                }
            ]
        }
    ]
})