录制屏幕帧数据 保存为图片 并且上传到服务器

配置信息

``` json
{
"outputDir": "./output",  
"uploadUrl": "http://localhost:8080/api/v1/image-detection?equipmentId=32dfSFS&imageId=2222222",
"fps": 3,
"saveLocal": true
}
```

上传文件配置
```js
if (config.uploadUrl) {
    try {
        const formData = new FormData();
        const blob = new Blob([processedImage], {type: 'image/jpg'});
        formData.append('image', blob, `${Date.now()}.jpg`);
        const res = await axios.post(config.uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('res--------->', res.data)
    } catch (error) {
        console.error('上传图片失败:', error);
    }
}

```
