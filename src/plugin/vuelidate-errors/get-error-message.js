export default {
  install: (app) => {
    app.mixin({
      methods: {
        $et(validation) {
          if (!this.$options.errors) {
            return '';
          }
          return Object.keys(validation)
            .filter((key) => !key.startsWith('$'))
            .reduce((prev, curr) => {
              if (!validation[curr].$response && validation.$dirty) {
                return this.$options.errors[curr];
              }
              return prev;
            }, '');
        },
      },
    });
  },
};
