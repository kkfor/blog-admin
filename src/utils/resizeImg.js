export default (file, width=800) => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = function (e) {
      const img = new Image()
      img.src = e.target.result

      img.onload = function () {
        // 创建画布
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // 获取图片宽高
        const originWidth = this.width
        const originHeight = this.height

        // 最大宽度
        const maxWidth = width

        let targetWidth = originWidth
        let targetHeight = originHeight

        // 超出之后进行处理
        if (originWidth > maxWidth) {
          targetWidth = maxWidth
          targetHeight = Math.round(originHeight * (maxWidth / originWidth))
        }

        // 设置画布宽高
        canvas.width = targetWidth
        canvas.height = targetHeight

        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 填充画布
        context.drawImage(img, 0, 0, targetWidth, targetHeight)

        canvas.toBlob(function (blob) {
          resolve(blob)
        }, file.type || 'image/png')
      }
    }

  })


}