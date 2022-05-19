<script>
import { h, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    to: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    if (props.to) {
      return () => h(
        RouterLink,
        {
          to: props.to,
          style: 'height: 100%;',
        },
        () => [props.title],
      );
    }
    return () => h('span', {}, [props.title]);
  },
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.svg-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  overflow: hidden;
}
</style>
