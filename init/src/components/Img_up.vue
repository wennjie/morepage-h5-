<template>
	<div class="img-up">
		<el-upload class='upload-demo' :on-error='error' :action="action" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-change='change'  :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-success='success' >
		</el-upload>
		<div class="img-loding" v-if="loding">
			<i class="weui-loading"></i>
		</div>
	</div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    name: {
      default: ""
    },
    index: {
      type: String,
      default: "banner"
    }
  },
  watch: {
    loding(e) {
    //   console.log(e);
    }
  },
  data() {
    return {
      timestamp: new Date().getTime(),
      loding: false
    };
  },
  computed: {
    action() {
      return (
        "http://file.skylinuav.com/u/" +
        this.type +
        "/" +
        this.name +
        "/" +
        this.timestamp
      );
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    success(e, file, fileList) {
      setTimeout(() => {
        this.loding = false;
      }, 20);
      let res = "http://file.skylinuav.com/r/" + e.split(" ")[1];
      this.$emit("res", {
        res: res,
        index: this.name
      });
    },
    progress(e, file, fileList) {
      // 	this.$vux.loading.show({
      // 	text: '图片上传中...'
      // })
    },
    change(file, fileList) {
      var timestamp = new Date().getTime();
      this.timestamp = timestamp;
      this.loding = true;
    },
    beforeAvatarUpload(file) {
      if (file.type == "image/jpeg" || file.type == "image/png") {
      } else {
        mui.toast("请上传jpg/png格式图片");
        return false;
      }
    },
    error() {
      this.loding = false;
      mui.toast("上传失败");
    }
  }
};
</script>
<style lang="less">
.img-up {
  position: absolute !important;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  //   position: relative;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    z-index: 0;
  }
}
.img-loding {
  position: absolute !important;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
.upload-demo {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}

.el-upload__input {
  /*display: block;*/
}

.el-upload-list,
.el-upload-list--picture-card {
  display: none;
}
</style>