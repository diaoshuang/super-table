<template>
  <el-drawer v-model="drawer2" :direction="direction" size="300">
    <template #title>
      <h4>上传数据文件</h4>
    </template>
    <template #default>
      <el-upload
        class="upload-demo"
        ref="uploadRef"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖动到这里 或者 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            请上传Excel文件
          </div>
        </template>
      </el-upload>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">上传</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits } from 'vue';
import { ElMessageBox } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import type { ElUpload } from 'element-plus'

interface Props {
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const uploadRef = ref<InstanceType<typeof ElUpload>>();
const emit = defineEmits<{
  (type: string, flag: boolean): void
}>()

const drawer2 = computed({
  get() {
    return props.show
  },
  set(nV: boolean) {
    emit('update:show', nV)
  }});
const direction = ref('rtl');
const radio1 = ref('Option 1');
const handleClose = (done: () => void) => {
  done();
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  ElMessageBox.confirm(`开始上传：${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}
const submitUpload = () => {
  uploadRef.value!.submit();
};
</script>
