export default {
  APPLICATION_INIT: 'application_init'
};

if (module.hot) {
  module.hot.accept();
  console.log('Module is hot: events');
}
