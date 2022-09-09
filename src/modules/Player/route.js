export default [
  {
    path: 'player',
    name: 'Player',
    component: () => {
      return import('./index.vue');
    },
    meta: {
      title: '玩家',
      // icon: 'el-icon-edit',
    },
  },
];
