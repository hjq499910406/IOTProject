import { autoUpdate } from '@teld/dev-update';

const devUpgradePlugin = () => {

  return {
    name: 'dev-upgrade',
    configResolved(config) {

      if (config.command === 'serve'){
        autoUpdate();
      }  

    }
  };
};

export default devUpgradePlugin;